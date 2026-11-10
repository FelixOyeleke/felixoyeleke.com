// Adds a mailing-list subscriber as a Resend contact.
// Requires RESEND_API_KEY. RESEND_SEGMENT_ID is optional: when set, new contacts are added to that segment.

import { formResultPage, wantsJson } from "@/lib/formResponse";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = { email?: unknown; company?: unknown };

async function readBody(request: Request): Promise<SubscribeBody> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return (await request.json()) as SubscribeBody;
  // Plain HTML form post (JavaScript disabled)
  return Object.fromEntries(await request.formData()) as SubscribeBody;
}

export async function POST(request: Request) {
  const json = wantsJson(request);
  // Errors come back as JSON for the page's own fetch, or as a readable page for a plain form post.
  const fail = (error: string, status: number) =>
    json
      ? Response.json({ error }, { status })
      : formResultPage(request, { title: "Not subscribed", message: error, status });
  const done = () =>
    json
      ? Response.json({ ok: true })
      : formResultPage(request, {
          title: "You’re on the list",
          message: "Thanks for subscribing. You’ll get an occasional email when something new is published.",
        });

  let body: SubscribeBody;
  try {
    body = await readBody(request);
  } catch {
    return fail("Invalid request.", 400);
  }

  const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const email = str(body.email).toLowerCase();

  // Honeypot filled in: pretend success so bots learn nothing.
  if (str(body.company)) return done();

  if (!EMAIL.test(email) || email.length > 320) {
    return fail("Please enter a valid email address.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return fail("The mailing list is not configured yet. Please try again later.", 500);
  }

  const segment = process.env.RESEND_SEGMENT_ID;
  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false, ...(segment && { segments: [{ id: segment }] }) }),
  });

  if (!response.ok) {
    const detail = await response.text();
    // Someone signing up twice is fine; tell them they're on the list.
    if (response.status === 409 || /already exists/i.test(detail)) return done();
    console.error("Resend error", response.status, detail);
    return fail("Could not subscribe. Please try again in a little while.", 502);
  }

  return done();
}
