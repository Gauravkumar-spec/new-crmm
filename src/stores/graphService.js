// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <GetUserSnippet>
import { Client, PageIterator } from "@microsoft/microsoft-graph-client";
import { endOfWeek, startOfWeek } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

let graphClient = undefined;

function ensureClient(authProvider) {
    if (!graphClient) {
        graphClient = Client.initWithMiddleware({
            authProvider: authProvider,
        });
    }

    return graphClient;
}

export async function getUser(authProvider) {
    ensureClient(authProvider);

    // Return the /me API endpoint result as a User object
    const user = await graphClient
        .api("/me")
        // Only retrieve the specific fields needed
        .select("displayName,mail,mailboxSettings,userPrincipalName")
        .get();

    return user;
}
// </GetUserSnippet>

// <GetUserWeekCalendarSnippet>
export async function getUserWeekCalendar(authProvider, timeZone) {
    ensureClient(authProvider);

    // Generate startDateTime and endDateTime query params
    // to display a 7-day window
    const now = new Date();
    const startDateTime = fromZonedTime(startOfWeek(now), timeZone).toISOString();
    const endDateTime = fromZonedTime(endOfWeek(now), timeZone).toISOString();

    // GET /me/calendarview?startDateTime=''&endDateTime=''
    // &$select=subject,organizer,start,end
    // &$orderby=start/dateTime
    // &$top=50
    var response = await graphClient
        .api("/me/calendarview")
        .header("Prefer", `outlook.timezone="${timeZone}"`)
        .query({ startDateTime: startDateTime, endDateTime: endDateTime })
        .select("subject,organizer,start,end")
        .orderby("start/dateTime")
        .top(25)
        .get();

    if (response["@odata.nextLink"]) {
        // Presence of the nextLink property indicates more results are available
        // Use a page iterator to get all results
        var events = [];

        // Must include the time zone header in page
        // requests too
        var options = {
            headers: { Prefer: `outlook.timezone="${timeZone}"` },
        };

        var pageIterator = new PageIterator(
            graphClient,
            response,
            (event) => {
                events.push(event);
                return true;
            },
            options
        );

        await pageIterator.iterate();

        return events;
    } else {
        return response.value;
    }
}
// </GetUserWeekCalendarSnippet>

// <CreateEventSnippet>
export async function createEvent(authProvider, newEvent) {
    ensureClient(authProvider);

    // POST /me/events
    // JSON representation of the new event is sent in the
    // request body
    return await graphClient.api("/me/events").post(newEvent);
}
// </CreateEventSnippet>
// ===== Mail helpers =====
export async function getInbox(authProvider, top = 25) {
    ensureClient(authProvider);

    const res = await graphClient
        .api("/me/mailFolders/inbox/messages")
        .select("id,subject,from,receivedDateTime,isRead,webLink,bodyPreview")
        .orderby("receivedDateTime DESC")
        .top(top)
        .get();

    return res;
}

export async function getMessagesNextPage(authProvider, nextLink) {
    ensureClient(authProvider);

    const relative = nextLink.replace(/^https?:\/\/graph\.microsoft\.com\/v1\.0/, "");
    return await graphClient.api(relative).get();
}

export async function sendMail(authProvider, to, subject, htmlContent) {
    ensureClient(authProvider);

    await graphClient.api("/me/sendMail").post({
        message: {
            subject,
            body: { contentType: "HTML", content: htmlContent },
            toRecipients: [{ emailAddress: { address: to } }],
        },
        saveToSentItems: true,
    });
}

// GraphService.ts
export async function getMessage(authProvider, id) {
    ensureClient(authProvider);
    return await graphClient
        .api(`/me/messages/${id}`)
        .select(
            "id,subject,from,toRecipients,ccRecipients,receivedDateTime,body,webLink,hasAttachments,internetMessageId,isRead"
        )
        .get();
}

// (optional) mark message read
export async function markMessageRead(authProvider, id) {
    ensureClient(authProvider);
    await graphClient.api(`/me/messages/${id}`).patch({ isRead: true });
}
