import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { BlogCard } from "@/components/BlogCard";
import { CardGo, Icon } from "@/components/Icon";
import { Subscribe } from "@/components/Subscribe";
import { NoteCard } from "@/components/NoteCard";
import { building, noteTopics, publishedPosts } from "@/lib/content";

function TileLink({ href, external, className, children }: { href: string; external?: boolean; className: string; children: React.ReactNode }) {
  return external ? (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  const published = publishedPosts;

  return (
    <main id="top" className="hub">
      <section className="hub-intro" aria-labelledby="hero-title">
        <img className="hub-photo" src="/images/felix.webp" width={112} height={112} alt="Felix Oyeleke" />
        <h1 id="hero-title">
          Felix builds businesses, leads projects, and turns ideas into practical technology and real estate solutions.
        </h1>
        <p>
          With a background in international offshore operations, technology, and project management, my work has
          evolved from technical delivery into business leadership and entrepreneurship. I currently lead St. John’s
          Properties, pursue independent technology ventures, and am completing an MBA at Memorial University. I’m also
          a PMP-certified professional with experience across Canada, Europe, and West Africa.
        </p>
        <p className="hub-actions">
          <Link className="button-link button-link--square" href="/about#contact">
            Work with me
          </Link>
          <Link className="section-link" href="/about">
            More about me <span aria-hidden="true">›</span>
          </Link>
        </p>
      </section>

      <section className="hub-section hub-building" aria-labelledby="building-title">
        <div className="hub-section-heading">
          <h2 className="hub-label" id="building-title">
            Building
          </h2>
          <p>Products, tools and systems I’m actively making.</p>
        </div>
        <div className="hub-grid">
          {building.map((item) => (
            <TileLink key={item.title} className="hub-tile" href={item.href} external={item.external}>
              <span className="hub-tile-head">
                {item.logo ? (
                  <BrandMark logo={item.logo} />
                ) : (
                  <span className="tile-icon">
                    <Icon name={item.icon} size={28} />
                  </span>
                )}
                <CardGo external={item.external} />
              </span>
              <span className="hub-tile-kicker">{item.label}</span>
              <span className="hub-title">{item.title}</span>
              <span className="hub-line">{item.line}</span>
              {item.external && <span className="sr-only"> (opens in a new tab)</span>}
            </TileLink>
          ))}
        </div>
      </section>

      {published.length > 0 && (
        <section className="hub-section hub-blog" aria-labelledby="blog-title">
          <div className="hub-section-heading">
            <h2 className="hub-label" id="blog-title">
              Blog
            </h2>
            <p>Notes from the work behind the work.</p>
          </div>
          <div className="hub-list">
            {published.slice(0, 3).map((post) => (
              <BlogCard post={post} key={post.title} />
            ))}
          </div>
          <Link className="section-link hub-more" href="/blog">
            All posts <span aria-hidden="true">›</span>
          </Link>
        </section>
      )}

      <section className="hub-section hub-notes" aria-labelledby="notes-title">
        <div className="hub-section-heading">
          <h2 className="hub-label" id="notes-title">
            Notes
          </h2>
          <p>Technical experiments and systems I am documenting as I build.</p>
        </div>
        <div className="hub-notes-grid">
          {noteTopics.map((topic) => (
            <NoteCard topic={topic} key={topic.slug} />
          ))}
        </div>
        <Link className="section-link hub-more" href="/notes">
          All notes <span aria-hidden="true">›</span>
        </Link>
      </section>

      <Subscribe
        title="Stay in the loop"
        text="An occasional email when I publish a new post, guide or project. Unsubscribe anytime."
      />
    </main>
  );
}
