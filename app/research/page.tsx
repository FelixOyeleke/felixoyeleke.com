import type { Metadata } from "next";
import Link from "next/link";
import { PageList } from "@/components/Lists";
import { PageIntro, PageSection } from "@/components/Section";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/research" },
  title: "Research",
  description:
    "Research by Felix Oyeleke: automated boulder detection in side-scan sonar with deep learning, machine learning for coastal flood risk, conference presentations, and technical experiments in sonar processing.",
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${site.url}/research#page`,
  url: `${site.url}/research`,
  name: "Research by Felix Oyeleke",
  isPartOf: { "@id": `${site.url}/#website` },
  about: ["Side-scan sonar", "Object detection", "Ocean mapping", "Machine learning", "GIS"],
  author: { "@id": `${site.url}/#person` },
};

export default function ResearchPage() {
  return (
    <main className="inner-page">
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd({ name: "Research", path: "/research" })} />
      <PageIntro
        eyebrow="Research"
        title={
          <>
            Research and{" "}
            <br />
            technical experiments.
          </>
        }
      >
        <p>
          Academic research, conference work and the experiments behind my software, mostly on sonar, the seabed and
          applying machine learning to survey data.
        </p>
      </PageIntro>

      <PageSection title="Academic research">
        <div className="projects-list">
          <PageList
            items={[
              {
                key: "boulders",
                label: "2024",
                title: "Automated boulder detection on side-scan sonar mosaics",
                summary:
                  "Master’s capstone at Memorial University’s Marine Institute: training a YOLO-based deep-learning detector on boulders in a NOAA side-scan backscatter mosaic. Supervised by Dr. Sean Mullan and Paul Elliott.",
                tags: ["Computer vision", "YOLO", "Side-scan sonar"],
                href: "/projects/automated-boulder-detection",
              },
              {
                key: "coastal",
                label: "2015–2016",
                title: "Machine learning for coastal flood risk and shoreline change",
                summary:
                  "Research at the Department of Marine Science & Technology, Federal University of Technology Akure: Python machine-learning models built from satellite imagery and elevation models, with inundation and risk maps produced in ArcGIS and QGIS.",
                tags: ["Machine learning", "Remote sensing", "GIS"],
              },
            ]}
          />
        </div>
      </PageSection>

      <PageSection title="Conference presentations">
        <div className="prose">
          <ul>
            <li>
              <strong>Canadian Hydrographic Conference 2024</strong>, St. John’s Convention Centre. Poster: “Automated
              Boulder Detection on Side-Scan Mosaics using YOLO-based Deep Learning Model”.{" "}
              <Link href="/projects/automated-boulder-detection">Read the research summary</Link>.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="Applied research in software">
        <div className="prose">
          <p>
            Much of my current research happens inside{" "}
            <Link href="/projects/dolphin-explorer">Dolphin Explorer</Link>, the marine survey software I build:
          </p>
          <ul>
            <li>
              <strong>Shadow-based boulder detection.</strong> A rule-based detector that models a boulder by its
              acoustic shadow and measures the face in front of it, working at a cell size tied to the smallest boulder
              wanted so speckle averages out.
            </li>
            <li>
              <strong>Trainable detection.</strong> Project-local RetinaNet models trained from labelled datasets in
              YOLO or COCO format, currently being evaluated against the rule-based detector.
            </li>
            <li>
              <strong>Bottom tracking.</strong> A single seabed detector shared by the waterfall, the processing graph and
              slant-range correction, with a confidence score on every pick for quality control.
            </li>
          </ul>
        </div>
      </PageSection>

      <PageSection title="Technical writing and experiments">
        <div className="projects-list">
          <PageList
            items={[
              {
                key: "sss-processing",
                label: "Explainer",
                title: "Understanding side-scan sonar processing",
                summary:
                  "Bottom tracking, slant-range correction, TVG, angle and gain normalisation, navigation and layback, and reading target height from shadows.",
                tags: ["Side-scan sonar", "Signal processing"],
                href: "/blog/understanding-side-scan-sonar-processing",
              },
              {
                key: "tokenization",
                label: "Experiment",
                title: "Visual tokenization of sonar data",
                summary: "A prototype that turns XTF side-scan captures into visual tokens so image-native compressors can stream survey data.",
                tags: ["Compression", "Computer vision"],
                href: "/blog/visual-tokenization-of-sonar-data",
              },
              {
                key: "workstation",
                label: "Note",
                title: "The workstation behind the work",
                summary: "The hardware I use to build, profile and visualize scientific and geospatial software, and how I measure performance.",
                tags: ["GPU", "Profiling"],
                href: "/notes/workstation-setup",
              },
            ]}
          />
        </div>
      </PageSection>

      <PageSection title="Research interests">
        <div className="prose">
          <ul>
            <li>Automated detection and classification of seabed objects in side-scan and sub-bottom data.</li>
            <li>Processing, quality control and evidence trails for marine survey data.</li>
            <li>Machine learning that supports, rather than replaces, the interpreter’s review.</li>
            <li>Geospatial data infrastructure, from survey data to property and location data.</li>
          </ul>
          <p>
            For research collaboration or to discuss any of this work, <Link href="/about#contact">get in touch</Link>.
          </p>
        </div>
      </PageSection>
    </main>
  );
}
