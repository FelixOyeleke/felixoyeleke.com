import { publishedPosts, site } from "@/lib/content";

export const dynamic = "force-static";

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = publishedPosts
    .map((post) => {
      const url = `${site.url}${post.href}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escape(post.summary)}</description>
      <pubDate>${new Date(`${post.date}-01T00:00:00Z`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Blog</title>
    <link>${site.url}/blog</link>
    <description>Notes on data systems, offshore projects, geospatial tools and technical work.</description>
    <language>en-ca</language>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
