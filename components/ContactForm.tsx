"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" method="POST" action="/api/contact" onSubmit={onSubmit}>
      <p className="sr-only" aria-hidden="true">
        <label>
          Leave this empty
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label>
        Name
        <input type="text" name="name" autoComplete="name" required maxLength={200} />
      </label>
      <label>
        Email
        <input type="email" name="email" autoComplete="email" required maxLength={320} />
      </label>
      <label>
        Message
        <textarea name="message" required maxLength={10000} />
      </label>
      <div className="form-actions">
        <button className="button-link" type="submit" disabled={status === "sending"}>
          Start a conversation
        </button>
        <p className="form-status" role="status" aria-live="polite">
          {status === "sending" && "Sending…"}
          {status === "sent" && "Thanks — your message is on its way. I’ll reply by email."}
          {status === "error" && (
            <>
              That didn’t send. Please email <a href={`mailto:${site.email}`}>{site.email}</a> directly.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
