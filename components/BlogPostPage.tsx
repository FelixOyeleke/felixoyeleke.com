import type { ReactNode } from "react";
import Link from "next/link";
import type { BrandLogo } from "@/lib/content";
import { ArticleHeader, CtaPanel, StatRow, Tldr } from "./Article";

type Stat = { label: string; value: string; note: string };

export function BlogPostPage({
  logo,
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
  return (
    <main className="article">
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
