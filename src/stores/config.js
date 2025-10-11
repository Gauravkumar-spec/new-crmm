// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// config.js
const config = {
    msalConfig: {
        auth: {
            clientId: "e6d462b8-80a4-4f54-82a7-8797ef2dd29d", // same as your appId
            authority: "https://login.microsoftonline.com/common", // or your tenant ID
            redirectUri: "http://localhost:3000",
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false,
        },
    },

    // Your app-specific scopes
    scopes: ["User.Read", "MailboxSettings.Read", "Calendars.ReadWrite", "Mail.Read", "Mail.Send"],
};

export default config;
