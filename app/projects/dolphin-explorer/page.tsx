import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, StatusList, Tldr } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dolphin Explorer",
  description:
    "Dolphin Explorer: a field-ready hydrographic console that parses XTF side-scan data, renders a GPU waterfall and is gaining a desktop GUI.",
};

function Video({ src, label, caption }: { src: string; label: string; caption: string }) {
  return (
    <figure className="article-figure">
      <video autoPlay muted loop playsInline preload="metadata" width={960} height={360} aria-label={label}>
        <source src={src} type="video/mp4" />
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function DolphinExplorerPage() {
  return (
    <main className="article">
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        logo={brandLogos.dolphinExplorer}
        eyebrow="Project · Build log · 2025"
        title="Dolphin Explorer"
        lede="A field-ready hydrographic console that ingests raw XTF captures, renders a responsive waterfall view, and is gaining a desktop GUI so survey teams can review data on board in minutes."
        tags={["Hydrography", "XTF", "Desktop", "Visualization"]}
      />

      <div className="hero-actions article-actions">
        <a className="button-link" href="https://dolphinexplorer.dev/" target="_blank" rel="noreferrer">
          Visit dolphinexplorer.dev ↗
        </a>
      </div>

      <StatRow
        stats={[
          { label: "XTF parser", value: "Shipping", note: "Klein 3900 archives validated" },
          { label: "Waterfall view", value: "Beta", note: "60 GB stress test passed" },
          { label: "GUI workspace", value: "In build", note: "PySide6 + C++/GPU modules" },
        ]}
      />

      <Tldr>
        A deterministic XTF parser and GPU waterfall now ship. The GUI is moving into PySide6, with C++ modules keeping
        frames on the GPU. Next up: a headless CLI so crews can batch-parse data minutes after capture.
      </Tldr>

      <div className="article-body">
        <h2>Mission</h2>
        <p>
          Dolphin Explorer gives small hydrographic teams the kind of tooling usually reserved for enterprise survey
          suites. Owning the entire parsing stack means deterministic playback, faster QA loops, and a path to on-board
          anomaly detection.
        </p>
        <DetailCards
          cards={[
            {
              title: "Parser core",
              body: "Deterministic decoding of XTF packets, including gain curves, layback and motion data. Streams 140 MB/s sustained.",
            },
            {
              title: "Waterfall visualizer",
              body: "GPU-friendly renderer with amplitude and gradient modes, cursor readouts and ping scrubbing for rapid QA.",
            },
            { title: "GUI workspace", body: "Dockable panes, timeline playback and annotation tools, built on a PySide6/Qt shell." },
            {
              title: "Native bridge",
              body: "A C++ layer shares memory with the parser core so the UI never blocks on large buffers.",
            },
          ]}
        />

        <h2>Waterfall view</h2>
        <p>
          High-density waterfalls render with configurable palettes — amplitude, gradient and adaptive gain. Parsed
          packets stay in GPU memory, so scrubbing through 60 GB archives feels instant. Cursor sampling exposes depth,
          slant range and ping IDs without leaving the viewer.
        </p>
        <ul>
          <li>Packet-to-pixel pipeline built in Rust and wgpu.</li>
          <li>Telemetry overlay renders layback, GPS and INS drift per ping.</li>
          <li>Export path saves annotated frames as GeoTIFF previews.</li>
        </ul>
      </div>

      <Video
        src="/videos/dolphinexplorer_waterfall.mp4"
        label="Dolphin Explorer waterfall view scrolling through side-scan sonar data"
        caption="Figure 1. Waterfall module streaming parsed XTF packets with amplitude overlays."
      />

      <div className="article-body">
        <h2>Performance pass</h2>
        <p>
          The desktop client uses PySide6 so UI iterations stay fast, but the hot paths now live in native C++ modules
          exposed through Qt-friendly hooks. Those modules stream buffers straight from the parser into GPU textures,
          removing the copy overhead that used to block the event loop.
        </p>
        <StatusList
          items={[
            { done: true, text: "48% faster repaint cycle after moving interpolation to C++." },
            { done: true, text: "GPU shaders bring palette swaps under 10 ms, even on mid-tier cards." },
            { done: false, text: "Unified profiler overlay comparing CPU and GPU workloads in real time." },
          ]}
        />

        <h2>GUI workspace</h2>
        <p>
          The next milestone is a PySide6 shell backed by the same core: a map window, waterfall panel and telemetry
          console side by side, so operators can cross-reference anomalies instantly.
        </p>
      </div>

      <Video
        src="/videos/GUI_Workspace.mp4"
        label="Dolphin Explorer GUI workspace with dockable panes"
        caption="Figure 2. GUI workspace in development, with dockable panes and annotation tools."
      />

      <div className="article-body">
        <h2>Build status</h2>
        <StatusList
          items={[
            { done: true, text: "XTF parser normalizes dual channels, navigation and gain metadata." },
            { done: true, text: "Waterfall renderer streams archives with amplitude and gradient palettes." },
            { done: true, text: "PySide shell calls C++/GPU modules for raster and palette work." },
            { done: false, text: "OpenGL viewport for panning and zooming." },
            { done: false, text: "Cursor measurements, annotation overlays and snapshot export for reports." },
          ]}
        />

        <h2>Roadmap</h2>
        <ol>
          <li>Release a command-line build so teams can batch-parse XTF before the GUI ships.</li>
          <li>Ship the desktop workspace with synchronized map and waterfall panes.</li>
          <li>Add anomaly-detection hooks so partners can plug in their own models.</li>
        </ol>
      </div>

      <CtaPanel
        title="Want early access?"
        body="I’m onboarding a small group of survey partners to validate Dolphin Explorer on real projects."
        href={`mailto:${site.email}?subject=Dolphin%20Explorer%20early%20access`}
        action="Join early access"
      />
    </main>
  );
}
