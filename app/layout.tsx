import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/lib/content";
import "./globals.css";

// Use one typeface throughout so headings, cards, and body copy share the same letterforms.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Felix Oyeleke — Technology, GIS, Data", template: "%s — Felix Oyeleke" },
  description: "Felix Oyeleke builds software and geospatial systems.",
  openGraph: { siteName: site.name, type: "website", locale: "en_CA" },
  twitter: { card: "summary", site: site.xHandle, creator: site.xHandle },
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        <div className="page-shell">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
