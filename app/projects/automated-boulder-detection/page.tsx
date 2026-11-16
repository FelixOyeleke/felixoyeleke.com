import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, Tldr } from "@/components/Article";
import { site } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd, shareImages } from "@/lib/seo";

const path = "/projects/automated-boulder-detection";
const title = "Automated Boulder Detection on Side-Scan Sonar Mosaics";
const description =
  "Felix Oyeleke's master's research at Memorial University's Marine Institute: detecting seabed boulders in a NOAA side-scan sonar mosaic with YOLO-based deep learning, presented at the Canadian Hydrographic Conference 2024.";

export const metadata: Metadata = {
  alternates: { canonical: path },
  title: "Automated Boulder Detection Using YOLO",
  description,
  openGraph: { type: "article", title, description, url: path, siteName: site.name, images: shareImages },
};

const researchJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${site.url}${path}#research`,
  name: title,
  description,
  url: `${site.url}${path}`,
  genre: "Master's research project",
  keywords: ["side-scan sonar", "object detection", "YOLO", "deep learning", "boulders", "ocean mapping"],
  author: { "@id": `${site.url}/#person` },
  sourceOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Fisheries and Marine Institute of Memorial University of Newfoundland",
  },
  isBasedOn: { "@type": "Dataset", name: "NOAA hydrographic survey H12642", url: "https://www.ngdc.noaa.gov/nos/H12001-H14000/H12642.html" },
};

const facts = [
  { label: "Program", value: "Master of Applied Ocean Technology, Ocean Mapping — Fisheries and Marine Institute of Memorial University" },
  { label: "Supervisors", value: "Dr. Sean Mullan and Paul Elliott" },
  { label: "Data", value: "NOAA side-scan sonar backscatter mosaic from survey H12642 (approaches to New Bedford, Buzzards Bay, Massachusetts)" },
  { label: "Methods", value: "Computer vision and deep learning: YOLO-based object detection and ResNet" },
  { label: "Presented", value: "Poster at the Canadian Hydrographic Conference 2024, St. John’s Convention Centre" },
];

export default function BoulderDetectionPage() {
  return (
    <main className="article">
      <JsonLd data={researchJsonLd} />
      <JsonLd data={breadcrumbJsonLd({ name: "Projects", path: "/projects" }, { name: "Automated Boulder Detection", path })} />
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        eyebrow="Research · Master’s capstone · 2024"
        title={title}
        lede="My master’s capstone asked whether a deep-learning object detector could find boulders in a side-scan sonar mosaic, the job an interpreter otherwise does by eye, one contact at a time."
        tags={["Computer vision", "YOLO", "Side-scan sonar", "Ocean mapping"]}
      />

      <Tldr>
        I trained a YOLO-based object detector on boulders picked from a NOAA side-scan backscatter mosaic, as the capstone
        of my Master of Applied Ocean Technology in Ocean Mapping, and presented the work as a poster at the Canadian
        Hydrographic Conference 2024 in St. John’s.
      </Tldr>

      <div className="article-body">
        <dl className="fact-list">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <h2>Background</h2>
        <p>
          Boulders are one of the seabed features that surveys are routinely asked to map. They matter for routing
          cables, siting offshore wind foundations and anchoring, and for describing seabed habitat. On side-scan sonar
          a boulder is small: a bright return from the face toward the sonar and a dark acoustic shadow behind it, a
          few pixels across in a mosaic that may cover many square kilometres.
        </p>
        <p>
          Picking them is usually manual. An interpreter scans the mosaic or the individual lines and marks each
          contact. It is slow over large areas, and the result can vary from one interpreter to another. That makes
          boulder picking a natural candidate for object detection, which is built to find many small instances of the
          same kind of thing in an image.
        </p>

        <h2>Data</h2>
        <p>
          The work used a side-scan sonar backscatter mosaic from NOAA hydrographic survey H12642, in the approaches to
          New Bedford in Buzzards Bay, Massachusetts. Jordan Pierce provided the NOAA training dataset and guidance on
          using it. Boulder samples were picked and labelled on the mosaic to build the training data, with help from
          Anne Joseph in picking the many samples needed.
        </p>

        <h2>Method</h2>
        <p>
          The core of the method is a YOLO (“You Only Look Once”) object detector, which predicts bounding boxes and
          confidence scores for every object in an image in a single pass. That suits sonar mosaics: they are large,
          the targets are small and numerous, and a detector that is fast at inference can be run over a whole survey
          area. ResNet, a residual convolutional network widely used for image recognition, was also part of the
          computer-vision work.
        </p>

        <h2>Presentation</h2>
        <p>
          I presented the project as a poster at the Canadian Hydrographic Conference 2024 at the St. John’s
          Convention Centre, under the title “Automated Boulder Detection on Side-Scan Mosaics using YOLO-based Deep
          Learning Model”.
        </p>

        <h2>Where it applies</h2>
        <p>
          Automated detection is most useful as a first pass that an interpreter then reviews: on large offshore wind
          and cable-route surveys, in pre-construction seabed clearance planning, and for repeat surveys where the same
          area is interpreted more than once. The aim is not to remove the interpreter but to give them a consistent
          starting set of contacts to confirm, reject or add to.
        </p>
        <p>
          That is close to the work I later did on offshore wind surveys, where I built side-scan mosaics and ran
          anomaly and UXO reviews for client reports.
        </p>

        <h2>From research to software</h2>
        <p>
          Boulder detection carried on into <Link href="/projects/dolphin-explorer">Dolphin Explorer</Link>, the survey
          software I build. Its waterfall has a rule-based boulder detector that models the acoustic shadow directly,
          and a project can train its own RetinaNet model from a labelled dataset in YOLO or COCO format, so a dataset
          labelled the same way can be used to train it.
        </p>

        <h2>Acknowledgements</h2>
        <p>
          Thanks to my supervisors, Dr. Sean Mullan and Paul Elliott; to Jordan Pierce for his guidance and for
          providing the NOAA training dataset; and to Anne Joseph for her help picking boulder samples.
        </p>

        <h2>References</h2>
        <ul>
          <li>
            NOAA National Centers for Environmental Information.{" "}
            <a href="https://www.ngdc.noaa.gov/nos/H12001-H14000/H12642.html" target="_blank" rel="noreferrer">
              Hydrographic survey H12642: Buzzards Bay and Nantucket Sound, approaches to New Bedford
            </a>
            .
          </li>
          <li>
            Redmon, J., Divvala, S., Girshick, R. and Farhadi, A. (2016).{" "}
            <a href="https://arxiv.org/abs/1506.02640" target="_blank" rel="noreferrer">
              You Only Look Once: Unified, Real-Time Object Detection
            </a>
            . CVPR 2016.
          </li>
          <li>
            He, K., Zhang, X., Ren, S. and Sun, J. (2016).{" "}
            <a href="https://arxiv.org/abs/1512.03385" target="_blank" rel="noreferrer">
              Deep Residual Learning for Image Recognition
            </a>
            . CVPR 2016.
          </li>
        </ul>

        <h2>Related</h2>
        <ul>
          <li>
            <Link href="/research">All research</Link>
          </li>
          <li>
            <Link href="/blog/understanding-side-scan-sonar-processing">Understanding side-scan sonar processing</Link>
          </li>
          <li>
            <Link href="/projects/dolphin-explorer">Dolphin Explorer: marine survey data software</Link>
          </li>
          <li>
            <Link href="/blog/visual-tokenization-of-sonar-data">Visual tokenization of sonar data</Link>
          </li>
          <li>
            <Link href="/blog/from-survey-vessel-to-useful-map">From survey vessel to useful map</Link>
          </li>
          <li>
            <Link href="/about">About me and my education</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
