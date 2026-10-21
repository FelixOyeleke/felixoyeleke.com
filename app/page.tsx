import Link from "next/link";
import { building, formatMonth, posts } from "@/lib/content";

function RowLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return external ? (
    <a className="hub-row" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link className="hub-row" href={href}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  const published = posts.filter((post) => post.href);

  return (
    <main id="top" className="hub">
      <section className="hub-intro" aria-labelledby="hero-title">
        <img className="hub-photo" src="/images/felix.webp" width={88} height={88} alt="Felix Oyeleke" />
        <h1 id="hero-title">
          I’m Felix — I build software and geospatial systems, and help people buy homes in Newfoundland.
        </h1>
        <p>
          I spent 6+ years in offshore geophysics and hydrographic survey across Canada, the North Sea and West Africa,
          on projects for Shell, ExxonMobil and Chevron. Now I build tools for data-heavy work and run St. John’s
          Properties as a REALTOR® with eXp Realty. PMP, MBA candidate at Memorial University.
        </p>
        <p className="hub-actions">
          <Link href="/contact">
            Work with me <span aria-hidden="true">→</span>
          </Link>
          <Link href="/about">
            More about me <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>

      <section className="hub-section" aria-labelledby="building-title">
        <h2 className="hub-label" id="building-title">
          Building
        </h2>
        <div className="hub-list">
          {building.map((item) => (
            <RowLink key={item.title} href={item.href} external={item.external}>
              <span className="hub-title">
                {item.title} <span aria-hidden="true">{item.external ? "↗" : "→"}</span>
              </span>
              <span className="hub-line">{item.line}</span>
            </RowLink>
          ))}
        </div>
      </section>

      {published.length > 0 && (
        <section className="hub-section" aria-labelledby="writing-title">
          <h2 className="hub-label" id="writing-title">
            Writing
          </h2>
          <div className="hub-list">
            {published.slice(0, 3).map((post) => (
              <Link className="hub-row hub-post" href={post.href!} key={post.title}>
                {post.thumbnail && <img src={post.thumbnail} width={56} height={56} alt="" loading="lazy" />}
                <span>
                  <span className="hub-title">
                    {post.title} <span aria-hidden="true">→</span>
                  </span>
                  <span className="hub-line">{post.opening ?? post.summary}</span>
                  {post.date && <time dateTime={post.date}>{formatMonth(post.date)}</time>}
                </span>
              </Link>
            ))}
          </div>
          <Link className="hub-more" href="/writing">
            All writing <span aria-hidden="true">→</span>
          </Link>
        </section>
      )}
    </main>
  );
}
