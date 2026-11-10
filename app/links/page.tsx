import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { CardGo, Icon, type IconName } from "@/components/Icon";
import { brandLogos, site, type BrandLogo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Everything Felix Oyeleke runs and writes in one place: St. John’s Properties, guides for moving to Canada, the blog, projects and social profiles.",
  alternates: { canonical: "/links" },
};

type LinkRow = { title: string; line: string; href: string; external?: boolean; icon?: IconName; logo?: BrandLogo };

const groups: { title: string; rows: LinkRow[] }[] = [
  {
    title: "Real estate in Newfoundland",
    rows: [
      {
        title: "St. John’s Properties",
        line: "Search homes for sale, sold prices and market data.",
        href: "https://stjohnsproperties.ca",
        external: true,
        logo: brandLogos.stJohnsProperties,
      },
      {
        title: "REALTOR.ca profile",
        line: "My listings and agent profile.",
        href: site.realtor,
        external: true,
        icon: "home",
      },
      {
        title: "YouTube",
        line: "Newfoundland real estate and life in Canada.",
        href: site.youtube,
        external: true,
        logo: brandLogos.youtube,
      },
    ],
  },
  {
    title: "Guides and writing",
    rows: [
      {
        title: "Guides",
        line: "Studying in Canada, permanent residence and buying your first home.",
        href: "/store",
        icon: "passport",
      },
      {
        title: "Blog",
        line: "Notes from the work behind the work.",
        href: "/blog",
        icon: "list",
      },
    ],
  },
  {
    title: "My work",
    rows: [
      {
        title: "Projects",
        line: "Software, real estate and media I’ve built.",
        href: "/projects",
        icon: "tiles",
      },
      {
        title: "Resume",
        line: "Experience, credentials and capabilities.",
        href: "/resume",
        icon: "check",
      },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: site.linkedin },
  { label: "Instagram", href: site.instagram },
  { label: "X", href: site.x },
  { label: "Threads", href: site.threads },
  { label: "GitHub", href: site.github },
];

function Row({ row }: { row: LinkRow }) {
  const body = (
    <>
      {row.logo ? (
        <BrandMark logo={row.logo} />
      ) : (
        <span className="tile-icon">
          <Icon name={row.icon ?? "chevron"} size={22} />
        </span>
      )}
      <span className="links-text">
        <span className="links-title">{row.title}</span>
        <span className="links-line">{row.line}</span>
      </span>
      <CardGo external={row.external} />
      {row.external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  return row.external ? (
    <a className="links-row" href={row.href} target="_blank" rel="noreferrer">
      {body}
    </a>
  ) : (
    <Link className="links-row" href={row.href}>
      {body}
    </Link>
  );
}

export default function LinksPage() {
  return (
    <main className="links-page">
      <header className="links-head">
        <img className="hub-photo links-photo" src="/images/felix-oyeleke-blazer-224.webp" width={96} height={96} alt="Felix Oyeleke" />
        <h1>Felix Oyeleke</h1>
        <p>Strategy, technology and execution. Real estate in St. John’s, Newfoundland.</p>
        <div className="links-actions">
          <Link className="button-link" href="/about#contact">
            Work with me
          </Link>
          <a className="button-link links-secondary" href={`mailto:${site.email}`}>
            Email
          </a>
        </div>
      </header>

      {groups.map((group) => (
        <section className="links-group" key={group.title}>
          <h2 className="links-label">{group.title}</h2>
          <div className="links-list">
            {group.rows.map((row) => (
              <Row row={row} key={row.title} />
            ))}
          </div>
        </section>
      ))}

      <nav className="links-social" aria-label="Social profiles">
        {socials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
            {social.label}
          </a>
        ))}
      </nav>

      <p className="links-home">
        <Link className="section-link" href="/">
          felixoyeleke.com <span aria-hidden="true">›</span>
        </Link>
      </p>
    </main>
  );
}
