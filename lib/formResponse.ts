// Replies for form posts made without JavaScript. The forms normally submit with fetch and read JSON;
// when JavaScript is off the browser posts the form itself, so it needs a readable page back, not JSON.

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** True when the request came from the page's own fetch call (JSON), false for a plain form post. */
export const wantsJson = (request: Request) => (request.headers.get("content-type") ?? "").includes("application/json");

/** Same-origin page the visitor came from, so "Back" returns them there. Falls back to `fallback`. */
function backPath(request: Request, fallback: string) {
  try {
    const referer = new URL(request.headers.get("referer") ?? "");
    if (referer.origin === new URL(request.url).origin) return referer.pathname + referer.hash;
  } catch {}
  return fallback;
}

/** A small, self-contained page in the site's colours for both themes. */
export function formResultPage(
  request: Request,
  { title, message, status = 200, fallback = "/" }: { title: string; message: string; status?: number; fallback?: string },
) {
  const back = escapeHtml(backPath(request, fallback));
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(title)} | Felix Oyeleke</title>
<style>
  :root { color-scheme: light dark; --bg: #fbfbfb; --ink: #171717; --muted: #666666; --accent: #262626; --on-accent: #ffffff; }
  @media (prefers-color-scheme: dark) { :root { --bg: #0a0a0a; --ink: #f5f5f5; --muted: #a3a3a3; --accent: #f5f5f5; --on-accent: #171717; } }
  * { box-sizing: border-box; }
  body { min-height: 100vh; margin: 0; display: grid; place-items: center; padding: 24px 16px; background: var(--bg); color: var(--ink);
    font: 15px/1.6 Inter, "Helvetica Neue", Helvetica, Arial, sans-serif; }
  main { width: min(100%, 460px); }
  h1 { margin: 0 0 8px; font-size: 26px; font-weight: 500; letter-spacing: -.012em; line-height: 1.2; }
  p { margin: 0 0 28px; color: var(--muted); }
  a { display: inline-block; padding: 10px 22px; border-radius: 980px; background: var(--accent); color: var(--on-accent);
    font-weight: 600; font-size: 14px; text-decoration: none; }
</style>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
<p>${escapeHtml(message)}</p>
<a href="${back}">Go back</a>
</main>
</body>
</html>`;
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}
