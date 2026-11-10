// Forwards contact-form messages by email via Resend.
// Requires RESEND_API_KEY. CONTACT_TO and CONTACT_FROM are optional overrides.

import { site } from "@/lib/content";
import { formResultPage, wantsJson } from "@/lib/formResponse";

const TO = process.env.CONTACT_TO || site.email;
const FROM = process.env.CONTACT_FROM || "Website <contact@felixoyeleke.com>";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactBody = { name?: unknown; email?: unknown; message?: unknown; company?: unknown };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function readBody(request: Request): Promise<ContactBody> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return (await request.json()) as ContactBody;
  // Plain HTML form post (JavaScript disabled)
  return Object.fromEntries(await request.formData()) as ContactBody;
}

export async function POST(request: Request) {
  const json = wantsJson(request);
  // Errors come back as JSON for the page's own fetch, or as a readable page for a plain form post.
  const fail = (error: string, status: number) =>
    json
      ? Response.json({ error }, { status })
      : formResultPage(request, { title: "Message not sent", message: error, status, fallback: "/about#contact" });
  const sent = () =>
    json
      ? Response.json({ ok: true })
      : formResultPage(request, {
          title: "Message sent",
          message: "Thanks for getting in touch. I’ll reply by email.",
          fallback: "/about#contact",
        });

  let body: ContactBody;
  try {
    body = await readBody(request);
  } catch {
    return fail("Invalid request.", 400);
  }

  const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);

  // Honeypot filled in: pretend success so bots learn nothing.
  if (str(body.company)) return sent();

  if (!name || !EMAIL.test(email) || !message) {
    return fail("Name, a valid email and a message are required.", 400);
  }
  if (name.length > 200 || email.length > 320 || message.length > 10000) {
    return fail("Message is too long.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return fail("Email is not configured. Please email me directly instead.", 500);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Website message from ${name.slice(0, 80)}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p>${escapeHtml(message).replace(/\n/g, "<br>")}</p><p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend error", response.status, await response.text());
    return fail("Could not send message. Please try again, or email me directly.", 502);
  }

  return sent();
}
