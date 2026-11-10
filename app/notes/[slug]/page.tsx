import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader, DetailCards, StatRow, Tldr } from "@/components/Article";
import { formatMonth, noteWritings } from "@/lib/content";
import { articleJsonLd, JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return noteWritings.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = noteWritings.find((item) => item.slug === slug);
  return note
    ? { title: note.title, description: note.lede }
    : { title: "Note" };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = noteWritings.find((item) => item.slug === slug);
  if (!note) notFound();

  return (
    <main className="article">
      <JsonLd
        data={articleJsonLd({
          path: `/notes/${note.slug}`,
          title: note.title,
          description: note.lede,
          date: `${note.updated}-01`,
          type: "TechArticle",
        })}
      />
      <Link className="back-link" href="/notes">
        ‹ All notes
      </Link>

      <ArticleHeader eyebrow={`Notes · ${note.label} · Updated ${formatMonth(note.updated)}`} title={note.title} lede={note.lede} tags={note.tags} />
      <Tldr>{note.tldr}</Tldr>

      {note.specs && <StatRow stats={note.specs} />}

      {note.gallery && (
        <div className="note-gallery">
          {note.gallery.map((item) => (
            <figure key={item.src}>
              <span className="note-gallery-stage">
                <img src={item.src} width={800} height={800} alt={item.alt} loading="lazy" />
              </span>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="article-body">
        {note.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
            {section.bullets && (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <DetailCards
        cards={[
          { title: "More notes", body: <Link href="/notes">Browse the other working notes.</Link> },
          { title: "Longer essays", body: <Link href="/blog">Read the blog for longer project stories.</Link> },
        ]}
      />
    </main>
  );
}
