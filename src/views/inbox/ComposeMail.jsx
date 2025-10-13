import { useState } from "react";
import { useSelector } from "react-redux";

import { sendMail } from "../../stores/graphService.js";

export default function ComposeMail() {
    const { authProvider, setError } = useSelector((state) => state.auth);
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState(null);

    // Narrow type early
    if (!authProvider) {
        return (
            <div className="container mt-4">
                <p>Please sign in first.</p>
            </div>
        );
    }

    async function onSend(e) {
        e.preventDefault();
        setStatus(null);
        if (!authProvider) {
            setError?.({ message: "Authentication provider not available." });
            return;
        }
        try {
            setSending(true);
            await sendMail(authProvider, to.trim(), subject.trim(), content);
            setStatus("Sent ✔");
            setTo("");
            setSubject("");
            setContent("");
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            // Push error to global context so <ErrorMessage /> can display it
            setError?.({
                message,
                debug: typeof err === "object" ? JSON.stringify(err, null, 2) : undefined,
            });
        } finally {
            setSending(false);
        }
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-3">Compose</h1>

            {status && <div className="alert alert-success">{status}</div>}

            <form onSubmit={onSend}>
                <div className="mb-3">
                    <label className="form-label">To</label>
                    <input
                        className="form-control"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="someone@contoso.com"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Hello from ERP"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your message…"
                    />
                </div>

                <button className="btn btn-primary" type="submit" disabled={sending}>
                    {sending ? "Sending…" : "Send"}
                </button>
            </form>
        </div>
    );
}
