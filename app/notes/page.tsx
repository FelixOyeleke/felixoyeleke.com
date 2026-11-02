import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageSection } from "@/components/Section";
import { NoteCard } from "@/components/NoteCard";
import { noteTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "Technical notes from Felix Oyeleke on GPU optimization, SEO systems, and practical AI workflows.",
};

export default function NotesPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Notes"
        title={
          <>
            Experiments, systems
            <br />
            and useful details.
          </>
        }
      >
        <p>
          Working notes on what I am building: performance experiments, search visibility, and practical AI
          workflows. Each one stays focused on the system and what changed. Longer stories live in the{" "}
          <Link href="/blog">blog</Link>.
        </p>
      </PageIntro>

      <PageSection title="All notes">
        <div className="hub-notes-grid">
          {noteTopics.map((topic) => (
            <NoteCard topic={topic} key={topic.slug} />
          ))}
        </div>
      </PageSection>
    </main>
  );
}
