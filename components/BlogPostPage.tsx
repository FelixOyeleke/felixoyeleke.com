import type { ReactNode } from "react";
import Link from "next/link";
import { site, type BrandLogo } from "@/lib/content";
import { JsonLd, personJsonLd } from "@/lib/seo";
import { ArticleHeader, CtaPanel, StatRow, Tldr } from "./Article";

type Stat = { label: string; value: string; note: string };

export function BlogPostPage({
  logo,
  slug,
  eyebrow,
  date,
  title,
  lede,
  tags,
  stats,
  tldr,
  children,
  cta,
}: {
  logo?: BrandLogo;
  slug: string;
  eyebrow: string;
  date: string;
  title: string;
  lede: string;
  tags: string[];
  stats: Stat[];
  tldr: ReactNode;
  children: ReactNode;
  cta: { title: string; body: string; href: string; action: string };
}) {
  const articleUrl = `${site.url}/blog/${slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    headline: title,
    description: lede,
    url: articleUrl,
    datePublished: `${date}-01`,
    dateModified: `${date}-01`,
    author: { "@id": personJsonLd["@id"] },
    publisher: { "@id": personJsonLd["@id"] },
    mainEntityOfPage: articleUrl,
    inLanguage: "en-CA",
  };

  return (
    <main className="article">
      <JsonLd data={articleJsonLd} />
      <Link className="back-link" href="/blog">
        ‹ All posts
      </Link>

      <article>
        <ArticleHeader
          logo={logo}
          eyebrow={
            <>
              {eyebrow} · <time dateTime={date}>{new Date(`${date}-01T00:00:00Z`).toLocaleDateString("en-CA", { month: "long", year: "numeric", timeZone: "UTC" })}</time>
            </>
          }
          title={title}
          lede={lede}
          tags={tags}
        />
        <StatRow stats={stats} />
        <Tldr>{tldr}</Tldr>
        <div className="article-body">{children}</div>
      </article>

      <CtaPanel {...cta} />
    </main>
  );
}
