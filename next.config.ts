import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({ source, destination, permanent: true });

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Static-HTML URLs from the previous builds of the site
      permanent("/index.html", "/"),
      ...["about", "projects", "writing", "resume", "contact"].map((page) =>
        permanent(`/${page}.html`, `/${page}`),
      ),
      permanent("/experience", "/about"),
      permanent("/experience.html", "/about"),
      permanent("/dolphin-explorer.html", "/projects/dolphin-explorer"),
      permanent("/blog/visual-tokenization-of-sonar-data.html", "/writing/visual-tokenization-of-sonar-data"),
      permanent("/blog.html", "/writing"),
      permanent("/blog/:slug*", "/writing"),
      permanent("/guide.html", "/"),
      permanent("/links.html", "/"),
      permanent("/store.html", "/projects"),
      permanent("/success.html", "/contact"),
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
