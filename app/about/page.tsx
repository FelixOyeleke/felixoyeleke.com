import type { Metadata } from "next";
import Link from "next/link";
import { DetailCards } from "@/components/Article";
import { PageIntro, PageSection } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description: "About Felix Oyeleke, a technology professional working across GIS, data and project delivery.",
};

export default function AboutPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="About"
        title={
          <>
            Building useful systems
            <br />
            for real-world work.
          </>
        }
      >
        <p>I’m a technology professional focused on the spaces where data, software and field operations meet.</p>
      </PageIntro>
      <PageSection title="Profile">
        <div className="prose">
          <p>
            I have 6+ years of experience in hydrographic surveying, geospatial data, marine geophysics and technical
            project management across Canada, the North Sea and West Africa.
          </p>
          <p>
            My work is grounded in understanding the full system: the data that comes in from the field, the tools
            that make it useful, and the people who need a clear answer at the end.
          </p>
          <p>
            I’m currently an MBA candidate at Memorial University. Outside work, I build open-source tools, web
            platforms and automation systems that make repetitive work easier to understand and easier to do.
          </p>
        </div>
        <DetailCards
          cards={[
            { title: "Location", body: "St. John’s, Newfoundland and Labrador, Canada" },
            {
              title: "Education",
              body: (
                <>
                  MBA Candidate, MUN
                  <br />
                  M.A. Ocean Technology (Distinction)
                  <br />
                  B.Tech Marine Science &amp; Technology
                </>
              ),
            },
            {
              title: "Certifications",
              body: (
                <>
                  PMP® · PSM · SVOP
                  <br />
                  Hydrography (Cat-A) · WHMIS
                </>
              ),
            },
            {
              title: "Interests",
              body: (
                <>
                  Geospatial · Automation · AI
                  <br />
                  Open Source · Productivity
                </>
              ),
            },
          ]}
        />
        <p className="page-section-link">
          <Link className="section-link" href="/resume">
            View resume <span aria-hidden="true">→</span>
          </Link>
        </p>
      </PageSection>
    </main>
  );
}
