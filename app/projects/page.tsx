import type { Metadata } from "next";
import { PageList } from "@/components/Lists";
import { PageIntro, PageSection } from "@/components/Section";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software, geospatial and automation projects by Felix Oyeleke.",
};

export default function ProjectsPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Projects"
        title={
          <>
            Tools that make
            <br />
            complex work clearer.
          </>
        }
      >
        <p>A selection of software and data products built around geospatial analysis, automation and useful interfaces.</p>
      </PageIntro>
      <PageSection title="Selected work">
        <PageList
          items={projects.filter((project) => project.href).map((project) => ({
            key: project.title,
            title: project.title,
            summary: project.summary,
            tags: project.tags,
            href: project.href,
          }))}
        />
      </PageSection>
      <PageSection title="How I build">
        <div className="prose">
          <p>
            I start with the job the user needs to get done, then work backwards through the data, constraints and
            interfaces that make that job possible. The result is usually smaller and more direct than the original
            idea.
          </p>
        </div>
      </PageSection>
    </main>
  );
}
