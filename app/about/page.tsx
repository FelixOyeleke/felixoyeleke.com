import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, PageSection } from "@/components/Section";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Felix Oyeleke — an entrepreneur, project management professional, and MBA candidate building businesses across technology and real estate.",
};

const facts = [
  { label: "Based in", value: "St. John's, Newfoundland and Labrador, Canada" },
  {
    label: "Education",
    value: "MBA Candidate — Memorial University · Master of Applied Ocean Technology (Ocean Mapping), Distinction — Memorial University · Bachelor of Technology, Marine Science & Technology — Federal University of Technology, Akure",
  },
  { label: "Professional credentials", value: "Project Management Professional (PMP) · Category A Hydrographer · Licensed REALTOR® — eXp Realty, Newfoundland and Labrador" },
];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="About"
        title={
          <>
            Building businesses,
            <br />
            leading projects.
          </>
        }
      >
        <p>Building businesses, leading projects, and turning ideas into results.</p>
      </PageIntro>

      <PageSection>
        <div className="prose">
          <p>
            I&apos;m Felix Oyeleke, an entrepreneur, project management professional, and MBA candidate at Memorial
            University.
          </p>
          <p>
            My career began in oil and gas, offshore wind farms, and geospatial operations, where I gained more than
            six years of international experience across Canada, the North Sea, and West Africa.
          </p>
          <p>
            That experience shaped how I approach business and leadership. I learned the importance of sound decisions,
            managing risk, coordinating people and resources, and delivering results in demanding environments.
          </p>
          <p>
            Today, my work spans real estate, technology, and business development. I founded St. John&apos;s Properties,
            a real estate platform serving Newfoundland and Labrador, and I&apos;m developing DolphinExplorer, specialized
            software for hydrographic and geophysical data processing.
          </p>
          <p>
            I&apos;m particularly interested in building businesses that use technology to improve established industries,
            creating practical AI applications, and finding opportunities where good execution can make a meaningful
            difference.
          </p>
          <p>
            Alongside these ventures, I&apos;m pursuing an MBA at Memorial University to strengthen my knowledge of
            strategy, finance, organizational leadership, and business growth.
          </p>
        </div>
        <dl className="fact-list">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="page-section-link">
          <Link className="section-link" href="/resume">
            View resume <span aria-hidden="true">›</span>
          </Link>
        </p>
      </PageSection>

      <PageSection id="contact" title="Let&apos;s connect" lede="I&apos;m interested in conversations about business, technology, real estate, and opportunities to build something useful.">
        <div className="prose">
          <p>
            If you&apos;re working on an interesting project or exploring a potential collaboration, I&apos;d be glad to hear
            from you.
          </p>
        </div>
        <div className="contact-block">
          <ContactForm />
          <p className="contact-alt">
            Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </PageSection>
    </main>
  );
}
