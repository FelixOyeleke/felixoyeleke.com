import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, StatusList, Tldr } from "@/components/Article";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Visual Tokenization of Sonar Data",
  description:
    "Translating XTF side-scan sonar captures into visual tokens so image-native compressors can stream hydrographic surveys faster, with under 0.9% amplitude drift.",
  openGraph: {
    type: "article",
    title: "Visual Tokenization of Sonar Data",
    description:
      "Streaming hydrographic surveys through image-native compressors: 32% faster ingest on 60 GB of Atlantic survey data.",
  },
};

// The SVG figures carry their own "Figure N" captions, so no <figcaption> here.
function Figure({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="article-figure">
      <img src={src} width={960} height={360} alt={alt} />
    </figure>
  );
}

export default function SonarTokenizationPost() {
  return (
    <main className="article">
      <Link className="back-link" href="/writing">
        ← All writing
      </Link>

      <article>
        <ArticleHeader
          eyebrow={
            <>
              Hydrographic R&amp;D · Field log 01 · <time dateTime="2025-11">November 2025</time>
            </>
          }
          title="Visual tokenization of sonar data"
          lede="Translating high-frequency XTF captures into visual tokens so image-first compressors can stream hydrographic data faster, cheaper, and with enough fidelity for downstream seabed classification."
          tags={["XTF", "Side-scan sonar", "Compression", "Computer vision"]}
        />

        <StatRow
          stats={[
            { label: "Ingest speed-up", value: "32%", note: "vs. baseline CARIS parser" },
            { label: "Packet coverage", value: "60 GB", note: "2023–24 Atlantic survey sets" },
            { label: "Amplitude drift", value: "< 0.9%", note: "after token round-trip" },
          ]}
        />

        <Tldr>
          Tokenize sonar pings into raster tiles so image-native codecs can stream and index surveys with minimal
          amplitude drift. Early results: 32% faster ingest on 60 GB, enough to run QA and hazard calls on board.
        </Tldr>

        <div className="article-body">
          <h2>Abstract</h2>
          <p>
            I present a visual tokenization pipeline that converts hydrographic XTF packets into rasterized frames,
            enabling image-native compressors to index sonar surveys with deterministic fidelity. By aligning sonar
            amplitudes with lightweight descriptors, the method preserves geophysical detail while unlocking
            GPU-friendly streaming for downstream analytics.
          </p>
          <p>
            The current prototype reduces ingest latency enough to run hazard detection aboard survey vessels, laying
            groundwork for future work on cross-domain tokenizers for marine sensing.
          </p>
          <DetailCards
            cards={[
              {
                title: "Visual rasterization",
                body: "Maps raw side-scan channels into calibrated grayscale frames — 512×512 per ping — without losing amplitude context.",
              },
              {
                title: "Token descriptors",
                body: "Deterministic histogram + Sobel tile signatures that work with compressors and CLIP-like encoders alike.",
              },
              {
                title: "Streaming QA",
                body: "Real-time reconstruction checks flag amplitude drift above 0.9% before data leaves the vessel.",
              },
              {
                title: "Gain-aware metadata",
                body: "Gain and slant-range normalization travel with each frame, so tokens can be decoded back to source values.",
              },
            ]}
          />

          <h2>The field problem</h2>
          <p>
            Survey vessels log terabytes of XTF every week. Traditional readers march through each packet linearly, so
            analytics crews wait for data to “land” before QA, mosaicking or ML-based hazard calls can begin. I want a
            tokenizer that behaves more like an image workflow: streaming-friendly, chunkable, and compatible with
            modern compressors.
          </p>
          <ul>
            <li>
              <strong>Raw inputs:</strong> dual-channel side-scan pings (512 samples each) plus metadata blocks for
              gain, slant range, layback and GPS fixes.
            </li>
            <li>
              <strong>Constraints:</strong> runs on a laptop GPU offshore, keeps packets deterministic, and avoids
              rewriting the downstream toolchain.
            </li>
            <li>
              <strong>Opportunity:</strong> visual compressors already know how to tokenize textures. If each ping
              becomes a grayscale micro-frame, delta encoding and dedupe come for free.
            </li>
          </ul>
        </div>

        <Figure
          src="/images/research/sonar-token-flow.svg"
          alt="Four-stage pipeline: raw XTF side-scan packets go to a raster builder that renders 512×512 frames, then into 16×16 visual tokens with histogram and edge descriptors, producing a token stream, preview raster and QA metrics."
        />

        <div className="article-body">
          <h2>How the tokenizer works</h2>
          <p>
            Every ping is normalized, rendered into a 512×512 grayscale raster, then sliced into 16×16 tiles. Each tile
            receives a deterministic ID derived from a histogram signature plus Sobel edges, so compressors and ML
            models see exactly the same ordering.
          </p>
          <ol>
            <li>Decode packet headers, align channels and cache navigation metadata.</li>
            <li>Render amplitude rasters and apply adaptive contrast curves for shallow-water noise.</li>
            <li>Slice tiles, build descriptors and emit chunks that existing compressors already understand.</li>
            <li>Rebuild rasters from tokens and compare against the source packets before releasing to storage.</li>
          </ol>
        </div>

        <Figure
          src="/images/research/sonar-tiles.svg"
          alt="A rendered 512×512 sonar raster divided into a 16×16 tile map; each tile gets a histogram signature and Sobel edge map that combine into a deterministic token ID."
        />

        <div className="article-body">
          <h2>Data &amp; evaluation</h2>
          <p>
            The study spans four Atlantic Canada survey campaigns (15–180 m depth) captured on Klein 3900 side-scan
            systems. Each sortie fuses GPS, INS and layback data so reconstructed rasters can be compared against CARIS
            mosaics at centimetre-level accuracy.
          </p>
        </div>

        <StatRow
          stats={[
            { label: "Samples processed", value: "1.2B+", note: "amplitude pairs across dual channels" },
            { label: "Token payload", value: "~2.8×", note: "compression vs. raw packets, lossless" },
            { label: "QA window", value: "3.6 s", note: "from acquisition to token-level alert" },
          ]}
        />

        <Figure
          src="/images/research/sonar-spectrum.svg"
          alt="Amplitude profile across channels from 0 to −40 dB over 50–350 m range, with dataset notes: four survey campaigns, 15–180 m depth, per-ping gain curves, fused GPS/layback/INS, 1.2 billion samples."
        />

        <div className="article-body">
          <h2>Experiment log</h2>
          <StatusList
            items={[
              { done: true, text: "Rust-backed tokenizer streams 512-sample pings at 140 MB/s sustained." },
              {
                done: true,
                text: "Replay tests on 60 GB of Atlantic survey data confirm 32% faster ingest than the baseline parser.",
              },
              { done: false, text: "Adaptive tiling heuristics for shallow-water noise and sharp thermoclines." },
              {
                done: false,
                text: "Benchmark harness comparing CARIS HIPS/SIPS classification against token-based reconstructions.",
              },
            ]}
          />

          <h2>Near-term milestones</h2>
          <ol>
            <li>Wrap the tokenizer in a headless service between acquisition laptops and cloud buckets.</li>
            <li>Attach a lightweight anomaly detector that flags cables, wrecks or debris directly from the token stream.</li>
            <li>Publish a whitepaper and demo reel on cost savings for mixed multibeam and side-scan campaigns.</li>
          </ol>
        </div>
      </article>

      <CtaPanel
        title="Looking for collaborators"
        body="Especially teams with messy edge cases — deep-water drop-offs, heavy vegetation, cable routes, or thermoclines that confuse standard gain curves."
        href={`mailto:${site.email}?subject=Sonar%20tokenization`}
        action="Share a dataset"
      />
    </main>
  );
}
