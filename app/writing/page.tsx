import type { Metadata } from "next";
import { PageList } from "@/components/Lists";
import { PageIntro, PageSection } from "@/components/Section";
import { formatMonth, posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing by Felix Oyeleke on data, software and project delivery.",
};

export default function WritingPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Writing"
        title={
          <>
            Notes on the work
            <br />
            behind the work.
          </>
        }
      >
        <p>
          Short essays on data systems, offshore projects, geospatial tools and the habits that make technical work
          better.
        </p>
      </PageIntro>
      <PageSection title="Latest">
        <PageList
          items={posts.map((post) => ({
            key: post.title,
            label: <time dateTime={post.date}>{post.date ? formatMonth(post.date) : ""}</time>,
            title: post.title,
            summary: post.summary,
            tags: post.tags,
            href: post.href,
          }))}
        />
      </PageSection>
    </main>
  );
}
