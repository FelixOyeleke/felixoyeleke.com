// Adds a mailing-list subscriber as a Resend contact.
// Requires RESEND_API_KEY. RESEND_SEGMENT_ID is optional: when set, new contacts are added to that segment.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeBody = { email?: unknown; company?: unknown };

async function readBody(request: Request): Promise<SubscribeBody> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) return (await request.json()) as SubscribeBody;
  // Plain HTML form post (JavaScript disabled)
  return Object.fromEntries(await request.formData()) as SubscribeBody;
}

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = await readBody(request);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const email = str(body.email).toLowerCase();
  const isJson = (request.headers.get("content-type") ?? "").includes("application/json");
  const done = () =>
    isJson ? Response.json({ ok: true }) : Response.redirect(new URL("/blog?subscribed=1", request.url), 303);

  // Honeypot filled in: pretend success so bots learn nothing.
  if (str(body.company)) return done();

  if (!EMAIL.test(email) || email.length > 320) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "The mailing list is not configured." }, { status: 500 });
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
    return Response.json({ error: "Could not subscribe." }, { status: 502 });
  }

  return done();
}
