import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true });

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Static-HTML URLs from the previous builds of the site
      permanent("/index.html", "/"),
      ...["about", "projects", "blog", "store", "resume"].map((page) => permanent(`/${page}.html`, `/${page}`)),
      // Contact was merged into the About page
      permanent("/contact", "/about#contact"),
      permanent("/contact.html", "/about#contact"),
      permanent("/experience", "/about"),
      permanent("/experience.html", "/about"),
      permanent("/dolphin-explorer.html", "/projects/dolphin-explorer"),
      permanent("/blog/visual-tokenization-of-sonar-data.html", "/blog/visual-tokenization-of-sonar-data"),
      permanent("/blog/:slug(.+)\\.html", "/blog"),
      // The blog lived at /writing before it was renamed
      permanent("/writing.html", "/blog"),
      permanent("/writing", "/blog"),
      permanent("/writing/:slug*", "/blog/:slug*"),
      permanent("/guide.html", "/"),
      permanent("/links.html", "/"),
      permanent("/success.html", "/about#contact"),
      permanent("/privacy.html", "/"),
      permanent("/cookies.html", "/"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
