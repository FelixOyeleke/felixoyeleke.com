import type { Metadata } from "next";
import { DetailCards } from "@/components/Article";
import { PageIntro, PageSection } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and capabilities for Felix Oyeleke.",
};

export default function ResumePage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Resume"
        title={
          <>
            Technical context{" "}
            <br />
            with a delivery mindset.
          </>
        }
      >
        <p>A concise overview of the experience, tools and capabilities I bring to technical teams.</p>
      </PageIntro>
      <PageSection>
        <div className="resume-panel">
          <div>
            <h2>{site.name}</h2>
            <p>Geospatial systems · data engineering · project delivery</p>
          </div>
          <a className="button-link" href={`mailto:${site.email}?subject=Resume%20request`}>
            Request PDF
          </a>
        </div>
      </PageSection>
      <PageSection title="Capabilities">
        <DetailCards
          cards={[
            {
              title: "Geospatial systems",
              body: "GIS analysis, hydrographic data, PostGIS, spatial workflows and 3D visualization.",
            },
            { title: "Data & automation", body: "Python, APIs, data pipelines, repeatable workflows and AI-assisted tooling." },
            {
              title: "Project delivery",
              body: "Scope, quality, risk, technical coordination and clear stakeholder communication.",
            },
            {
              title: "Product thinking",
              body: "Simple interfaces, useful documentation and systems that fit how people work.",
            },
          ]}
        />
      </PageSection>
    </main>
  );
}
