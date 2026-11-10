import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/lib/content";
import { bio, JsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Use one typeface throughout so headings, cards, and body copy share the same letterforms.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Felix Oyeleke | Strategy, Technology & Execution",
    template: "%s | Felix Oyeleke",
  },
  description: bio,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "personal website",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_CA",
    title: "Felix Oyeleke | Strategy, Technology & Execution",
    description: bio,
    images: [{ url: "/images/felix.webp", alt: "Felix Oyeleke" }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.xHandle,
    creator: site.xHandle,
    title: "Felix Oyeleke | Strategy, Technology & Execution",
    description: bio,
    images: ["/images/felix.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export const viewport: Viewport = { themeColor: "#fbfbfb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} light`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <SiteHeader />
        <div className="page-shell">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
