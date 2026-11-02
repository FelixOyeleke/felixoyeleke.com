"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "done" | "error";

export function SubscribeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (response.status === 400) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Please enter a valid email address.");
        setStatus("error");
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("done");
    } catch {
      setError("That didn’t work. Please try again in a little while.");
      setStatus("error");
    }
  }

  return (
    <form className="subscribe-form" method="POST" action="/api/subscribe" onSubmit={onSubmit}>
      <p className="sr-only" aria-hidden="true">
        <label>
          Leave this empty
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="subscribe-field">
        <label className="sr-only" htmlFor="subscribe-email">
          Email address
        </label>
        <input
          id="subscribe-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          maxLength={320}
        />
        <button className="button-link" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p className="form-status" role="status" aria-live="polite">
        {status === "done" && "You’re on the list. Thanks for subscribing."}
        {status === "error" && error}
      </p>
    </form>
  );
}
