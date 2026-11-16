import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, Tldr } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";
import { breadcrumbJsonLd, dolphinExplorerJsonLd, JsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/dolphin-explorer" },
  title: "Dolphin Explorer: Marine Survey Data Software",
  description:
    "Dolphin Explorer, built by Felix Oyeleke: native C++/Qt software for XTF, JSF and SEG-Y sonar data, with 2D/3D mapping, sidescan waterfall review, sub-bottom interpretation and a node-based processing pipeline.",
};

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="article-figure">
      <img src={src} width={1600} height={870} alt={alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const formats = [
  { label: "XTF", value: ["Sidescan, sub-bottom and magnetometer data (XTF Rev. 40). A mixed file can produce several layers."] },
  { label: "EdgeTech JSF", value: ["Sidescan and sub-bottom data (message type 80). Compressed JSF samples are not decoded yet."] },
  { label: "SEG-Y", value: ["Sub-bottom profiles, treated as single-channel data."] },
  { label: "Rasters", value: ["GeoTIFF (including tiled, compressed and BigTIFF) and PNG/JPEG with world files, through GDAL."] },
  { label: "Parsed data", value: ["Dolphin’s own .dlpd artifact store, which can be reopened without re-reading the raw survey."] },
];

export default function DolphinExplorerPage() {
  return (
    <main className="article">
      <JsonLd data={dolphinExplorerJsonLd} />
      <JsonLd data={breadcrumbJsonLd({ name: "Projects", path: "/projects" }, { name: "Dolphin Explorer", path: "/projects/dolphin-explorer" })} />
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        logo={brandLogos.dolphinExplorer}
        eyebrow="Project · In development · 2024–present"
        title="Dolphin Explorer"
        lede="A native desktop application for importing, organizing, visualizing, processing and exporting marine survey data. I designed and built it, and lead its development. It is built so that large sonar files are usable before the whole survey has been decoded."
        tags={["C++20", "Qt 6", "OpenGL", "GDAL", "Side-scan sonar", "Sub-bottom profiler"]}
      />

      <div className="hero-actions article-actions">
        <a className="button-link" href="https://dolphinexplorer.dev/" target="_blank" rel="noreferrer">
          Visit dolphinexplorer.dev ↗
        </a>
      </div>

      <StatRow
        stats={[
          { label: "Survey formats", value: "XTF · JSF · SEG-Y", note: "plus GeoTIFF and world-file rasters" },
          { label: "Automated tests", value: "101 / 101", note: "passing in the November 2026 QC run" },
          { label: "Status", value: "Active", note: "under development, not yet a stable release" },
        ]}
      />

      <Tldr>
        Dolphin Explorer reads sidescan, sub-bottom and magnetometer files, shows them on a 2D/3D map before they are fully decoded,
        and lets a surveyor correct, interpret and export them through a visual processing graph. It is written in C++20
        with Qt 6, OpenGL, GDAL and PROJ.
      </Tldr>

      <Figure
        src="/images/projects/dolphin-explorer-survey-map.webp"
        alt="Dolphin Explorer main window: two georeferenced sidescan sonar strips on a 2D map, with boulder contacts and seabed feature lines listed in the file explorer and radiometric correction settings in the right panel."
        caption="Two sidescan lines georeferenced on the map, with boulder contacts and seabed features from the survey."
      />

      <div className="article-body">
        <h2>Why I built it</h2>
        <p>
          Survey files are large, and the first questions about them are simple: where is the data, is it usable, and
          what is on the seabed. I built Dolphin Explorer around those questions after years of processing and
          interpreting geophysical data offshore. Opening a dataset should show its extent and coverage straight away,
          with the detail decoded as you look at it.
        </p>

        <h2>Supported data</h2>
        <dl className="fact-list">
          {formats.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              {fact.value.map((line) => (
                <dd key={line}>{line}</dd>
              ))}
            </div>
          ))}
        </dl>

        <h2>How data moves through it</h2>
        <p>
          Every format is split into three stages (probe, index and decode) so that opening a file never means decoding
          all of it:
        </p>
        <ul>
          <li>
            <strong>Probe and classify.</strong> The file is inspected before import and its modalities (sidescan,
            sub-bottom, magnetometer) become one or more project layers.
          </li>
          <li>
            <strong>Index and extents.</strong> An index and the spatial extent are built first, so the survey appears
            on the map quickly.
          </li>
          <li>
            <strong>Visible first.</strong> Samples are decoded for what is on screen; the rest is refined in the
            background into a durable parsed artifact.
          </li>
          <li>
            <strong>Bounded work.</strong> Heavy import and decode jobs run two at a time by default, and long jobs can
            be cancelled with progress shown.
          </li>
        </ul>
        <p>
          A project is a small JSON manifest (<code>.dlp</code>) plus a parsed-data store (<code>.dlpd</code>).
          Processing publishes its results atomically and never modifies the original XTF or JSF files.
        </p>

        <h2>Sidescan waterfall review</h2>
        <p>
          The waterfall view is where most interpretation happens. It has palette and radiometric controls and a full
          set of corrections: time-varying gain, angle-range correction, automatic gain control, slant-range correction,
          empirical gain and beam-pattern normalisation, destriping and adaptive contrast (CLAHE). Contacts can be
          created, measured and captured as snapshots for reporting.
        </p>
      </div>

      <Figure
        src="/images/projects/dolphin-explorer-waterfall-review.webp"
        alt="Dolphin Explorer sidescan waterfall window showing port and starboard channels of a sonar line, with contacts marked and radiometry and enhancement settings in side panels."
        caption="Waterfall review of one sidescan line, with gain and enhancement corrections applied per line or to all lines."
      />

      <div className="article-body">
        <h2>Sub-bottom profiles in 3D</h2>
        <p>
          Sub-bottom profiler data from XTF, JSF or SEG-Y can be viewed as a profile or draped in the 3D scene along
          the vessel track, with gain, contrast, palette and seabed-pick controls. The 3D map renders survey tracks,
          sonar coverage, contacts and georeferenced rasters with sun shadows, ambient occlusion and anti-aliasing, and
          offers a progressive GPU path-traced render for figures.
        </p>
      </div>

      <Figure
        src="/images/projects/dolphin-explorer-sub-bottom-3d.webp"
        alt="Dolphin Explorer 3D view of a sub-bottom profiler line draped as a vertical curtain under a sky gradient, with gain and navigation settings in the side panel."
        caption="A sub-bottom profiler line shown as a curtain in the 3D scene."
      />

      <div className="article-body">
        <h2>The processing pipeline</h2>
        <p>
          Processing is a directed acyclic graph that the user builds visually. The engine validates the graph, runs
          nodes in topological order, tracks which results are out of date and saves the whole graph as JSON. Nodes are
          grouped by role:
        </p>
        <DetailCards
          cards={[
            { title: "Inputs", body: "Sidescan, sub-bottom and multibeam inputs." },
            {
              title: "Correction",
              body: "Slant-range correction, TVG, bottom detection, navigation smoothing, layback, geocorrection, ARC and band-pass filtering.",
            },
            { title: "Filter and enhance", body: "Range clipping, decimation, speckle filtering, gain normalisation, contrast enhancement and histogram equalization." },
            { title: "Analysis and output", body: "Acoustic-shadow detection, branch merging, and GeoTIFF and CSV export." },
          ]}
        />
      </div>

      <figure className="article-figure">
        <video autoPlay muted loop playsInline preload="metadata" width={1120} height={810} aria-label="Building a processing graph in Dolphin Explorer by connecting a sidescan input node to a TVG correction node">
          <source src="/videos/dolphin-explorer-node-graph.mp4" type="video/mp4" />
        </video>
        <figcaption>Connecting nodes in the processing graph: a sidescan input feeding a time-varying gain correction.</figcaption>
      </figure>

      <div className="article-body">
        <h2>Automated object detection</h2>
        <p>
          The waterfall has an automated object detector, and its first detector finds boulders. It is rule-based and
          built on the physics of a sidescan record: a boulder shows above all as a compact acoustic shadow behind the
          face that faces the sonar. The detector finds compact shadows against the local seabed level and then
          measures the face in front of each, working on cells about a quarter the size of the smallest boulder wanted,
          so speckle averages out while a boulder still spans several cells.
        </p>
        <p>
          Alongside it, a project can train its own RetinaNet boulder model from a labelled COCO or YOLO dataset. That
          model is still being evaluated, so the rule-based detector remains the default. The problem connects to my{" "}
          <Link href="/projects/automated-boulder-detection">master’s research on boulder detection</Link>.
        </p>

        <h2>Read-only access for AI assistants</h2>
        <p>
          The build includes a Model Context Protocol (MCP) server that gives AI assistants such as Claude read-only
          access to survey data: it can probe raw files, summarize projects and inspect decoded pings, traces and
          contacts. It never modifies projects or survey files, and values a file does not record come back as empty,
          never as invented zeros.
        </p>

        <h2>Engineering decisions</h2>
        <ul>
          <li>
            <strong>Strict layering.</strong> Code flows one way, from the data model through I/O, geodesy, rendering and
            the processing engine to the application and the interface. The readers and the pipeline never depend on the
            UI, which keeps them testable on their own.
          </li>
          <li>
            <strong>Parsed data is durable.</strong> Decoded survey data is a project asset, not a disposable cache,
            because some processed work is expensive or impossible to reproduce exactly.
          </li>
          <li>
            <strong>No placeholder buttons.</strong> Unfinished features stay hidden or disabled rather than shipping as
            controls that do nothing.
          </li>
          <li>
            <strong>Tested against real data.</strong> The test suite covers the XTF, JSF and SEG-Y readers, project
            storage, the processing graph, navigation and georeferencing, waterfall and sub-bottom algorithms and OpenGL
            smoke checks, using real vendor files as fixtures.
          </li>
        </ul>

        <h2>Current limits and what is next</h2>
        <ul>
          <li>Windows with MSVC is the primary tested platform; packages are configured for Windows, macOS and Linux.</li>
          <li>Multibeam integration is in progress: the processing graph has a multibeam input, and full multibeam import is the next major format.</li>
          <li>Compressed JSF samples are not supported yet, and SEG-Y is read as single-channel sub-bottom data.</li>
        </ul>

        <h2>Related</h2>
        <ul>
          <li>
            <Link href="/blog/understanding-side-scan-sonar-processing">Understanding side-scan sonar processing</Link>
          </li>
          <li>
            <Link href="/research">Research on sonar and seabed detection</Link>
          </li>
          <li>
            <Link href="/notes/workstation-setup">The workstation I use to build and profile Dolphin Explorer</Link>
          </li>
          <li>
            <Link href="/projects/automated-boulder-detection">Automated boulder detection in side-scan sonar</Link>
          </li>
          <li>
            <Link href="/blog/from-survey-vessel-to-useful-map">From survey vessel to useful map</Link>
          </li>
          <li>
            <Link href="/blog/demo-to-production-tool">The difference between a demo and a production tool</Link>
          </li>
        </ul>
      </div>

      <CtaPanel
        title="Working with sonar data?"
        body="I’d be glad to hear how you process and review your surveys, and what Dolphin Explorer should handle next."
        href={`mailto:${site.email}?subject=Dolphin%20Explorer`}
        action="Get in touch"
      />
    </main>
  );
}
