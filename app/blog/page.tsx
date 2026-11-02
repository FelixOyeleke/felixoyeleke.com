import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { PageIntro, PageSection } from "@/components/Section";
import { Subscribe } from "@/components/Subscribe";
import { publishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts by Felix Oyeleke on data, software and project delivery.",
};

export default function BlogPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Blog"
        title={
          <>
            Notes on the work{" "}
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

      <PageSection title="All posts">
        <div className="hub-list blog-card-list">
          {publishedPosts.map((post, index) => (
            <BlogCard post={post} key={post.title} loading={index === 0 ? "eager" : "lazy"} />
          ))}
        </div>
      </PageSection>

      <Subscribe
        title="Get new posts by email"
        text="An occasional email when something new is published. Unsubscribe anytime."
      />
    </main>
  );
}
