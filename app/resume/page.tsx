import type { Metadata } from "next";
import { DetailCards } from "@/components/Article";
import { PageIntro, PageSection } from "@/components/Section";
import { site } from "@/lib/content";

const background = [
  {
    label: "Experience",
    value: [
      "More than six years of international offshore work in oil and gas, offshore wind and geospatial operations",
      "Survey and project delivery across Canada, the North Sea and West Africa",
    ],
  },
  {
    label: "Building now",
    value: [
      "Dolphin Explorer — hydrographic sonar software in C++, Qt and OpenGL",
      "St. John's Properties — MLS®-powered real estate platform (Next.js, Python, PostGIS)",
    ],
  },
  {
    label: "Credentials",
    value: ["Project Management Professional (PMP)", "Category A Hydrographer", "Licensed REALTOR®"],
  },
  {
    label: "Education",
    value: [
      "MBA Candidate — Memorial University",
      "Master of Applied Ocean Technology (Ocean Mapping), Distinction — Memorial University",
      "Bachelor of Technology, Marine Science & Technology — Federal University of Technology, Akure",
    ],
  },
];

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Felix Oyeleke's resume: PMP project manager, Category A Hydrographer and MBA candidate with offshore survey experience across Canada, the North Sea and West Africa, now building geospatial software.",
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
            <p>Hydrographic &amp; geospatial software · project management (PMP) · offshore operations</p>
          </div>
          <a className="button-link" href={`mailto:${site.email}?subject=Resume%20request`}>
            Request PDF
          </a>
        </div>
      </PageSection>
      <PageSection title="Background">
        <dl className="fact-list">
          {background.map((fact) => (
            <div key={fact.label}>
              <dt style={{ "--lines": fact.value.length } as React.CSSProperties}>{fact.label}</dt>
              {fact.value.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          ))}
        </dl>
      </PageSection>
      <PageSection title="Capabilities">
        <DetailCards
          cards={[
            {
              title: "Hydrographic software",
              body: "Side-scan sonar, multibeam and XTF processing, with GPU-accelerated visualization in C++, Qt and OpenGL.",
            },
            {
              title: "Offshore operations",
              body: "Survey work in oil and gas, offshore wind and geospatial operations, from acquisition through QA to delivery.",
            },
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
