import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, PageSection } from "@/components/Section";
import { credentials, education, site } from "@/lib/content";
import { bio, JsonLd, pageMetadata, profilePageJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "About Felix Oyeleke: from sales in Nigeria to offshore geophysics, ocean mapping research at Memorial University, marine survey software and a Newfoundland real estate business. Now an MBA candidate in St. John's.",
  type: "profile",
});

const facts = [
  { label: "Based in", value: ["St. John's, Newfoundland and Labrador, Canada"] },
  { label: "Education", value: education.map((item) => `${item.degree} — ${item.school}`) },
  { label: "Credentials", value: credentials.map((item) => item.name) },
  {
    label: "Volunteering",
    value: [
      "Habitat for Humanity Newfoundland and Labrador — build-site and ReStore volunteer (2026–)",
      "Development Knowledge Facilitator, Lagos State SDGs (2017–2018)",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="inner-page">
      <JsonLd data={profilePageJsonLd} />
      <PageIntro
        eyebrow="About"
        title={
          <>
            Strategy, technology{" "}
            <br />
            and the ability to build.
          </>
        }
      >
        <p>{bio}</p>
      </PageIntro>

      <PageSection>
        <div className="prose">
          <p>
            I&apos;m Felix Oyeleke, and I live in St. John&apos;s, Newfoundland and Labrador. This is the longer version
            of how I got here: sales, geoscience, offshore survey work, ocean mapping research, software and business.
          </p>

          <h3>Sales and geoscience</h3>
          <p>
            My first job was in sales. I joined Goodness and Mercy Food in Nigeria as a sales representative in 2008 and
            became sales manager in 2012, responsible for ₦15–30 million in monthly revenue and the supplier
            relationships behind it.
          </p>
          <p>
            I studied Marine Science and Technology (Geoscience) at the Federal University of Technology Akure. From 2015
            to 2016 I worked in the department as a machine-learning and GIS researcher, building Python models for
            coastal flood risk and shoreline change from satellite imagery and elevation data, and producing inundation
            and risk maps in ArcGIS and QGIS.
          </p>

          <h3>Offshore survey</h3>
          <p>
            In 2017 I worked as a product, depot and jetty officer with Nigeria&apos;s Department of Petroleum Resources,
            keeping inspection records, EIA documentation and compliance reports. The same year I joined Brone Offshore
            Survey as a graduate geoscience intern. Over five years there I worked as a geophysicist and survey engineer,
            then as project manager and QC geophysicist, responsible for quality control, risk and client communication
            on survey projects. I also served as party chief on a bathymetric survey for Samsung Heavy Industries in
            Lagos.
          </p>
          <p>
            From 2022 to 2023 I was geophysical project manager at Pisces Offshore, running geophysical and hydrographic
            projects from planning to delivery: teams, equipment and schedules, budgets and tenders, change control and
            risk registers.
          </p>

          <h3>Ocean mapping in Canada</h3>
          <p>
            In Canada I studied for a Master of Applied Ocean Technology in Ocean Mapping at Memorial University&apos;s
            Marine Institute. My capstone research used deep learning to{" "}
            <Link href="/projects/automated-boulder-detection">detect boulders in side-scan sonar mosaics</Link>, and I
            presented it as a poster at the Canadian Hydrographic Conference 2024 in St. John&apos;s. My other research
            and technical experiments are on the <Link href="/research">research</Link> page.
          </p>
          <p>
            From late 2024 to the end of 2025 I worked as a geophysicist at XOCEAN, delivering surveys from uncrewed
            surface vessels for energy and offshore wind clients: side-scan sonar, magnetometer, sub-bottom profiler and
            UXO work. That included seabed and UXO interpretation for four Equinor offshore wind areas in the North Sea,
            where I built side-scan mosaics, ran anomaly reviews and standardized how QC evidence was recorded. In
            2025 I also worked part-time at the Marine Institute, processing and delivering hydrographic data to the
            Canadian Hydrographic Service and the IHO Data Centre for Digital Bathymetry with partners CIDCO and BCIT.
          </p>

          <h3>Software</h3>
          <p>
            Since 2024 I have been building <Link href="/projects/dolphin-explorer">Dolphin Explorer</Link>, desktop
            software in C++ and Qt for importing, viewing, processing and interpreting sidescan, sub-bottom and
            magnetometer data. It grew out of the survey and research work above. I document the engineering in my <Link href="/notes">notes</Link> and write about the wider
            questions on the <Link href="/blog">blog</Link>.
          </p>

          <h3>Business</h3>
          <p>
            I&apos;m a licensed REALTOR® with eXp Realty in Newfoundland and Labrador, and I founded{" "}
            <Link href="/projects/st-johns-properties">St. John&apos;s Properties</Link>, a real estate business built on
            its own property data platform. I also run <Link href="/projects/altair-studio">Altair Studio</Link> for
            real estate photography and video, a{" "}
            <a href={site.youtube} target="_blank" rel="noreferrer">
              YouTube channel
            </a>{" "}
            and a small <Link href="/store">store</Link> of practical guides.
          </p>

          <h3>Now</h3>
          <p>
            In 2026 I started an MBA at Memorial University, with a School of Graduate Studies scholarship. I hold the
            PMP and the Professional Scrum Master I, and I&apos;m an ISO 9001 internal auditor. What interests me most
            now is where technology, data and management meet: how organizations use data to make decisions, how new
            tools get adopted, and how projects are run well.
          </p>
        </div>

        <dl className="fact-list">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt style={{ "--lines": fact.value.length } as React.CSSProperties}>{fact.label}</dt>
              {fact.value.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          ))}
        </dl>
        <p className="page-section-link">
          <a className="section-link" href={site.linkedin} target="_blank" rel="noreferrer">
            Full career history on LinkedIn <span aria-hidden="true">↗</span>
          </a>
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
