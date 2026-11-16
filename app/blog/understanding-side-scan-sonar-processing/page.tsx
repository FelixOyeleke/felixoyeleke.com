import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";
import { shareImages } from "@/lib/seo";

const title = "Understanding side-scan sonar processing";
const description =
  "What happens between a raw side-scan sonar ping and an image you can interpret: bottom tracking, slant-range correction, TVG, angle and gain normalisation, navigation and layback, and reading target height from shadows.";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/understanding-side-scan-sonar-processing" },
  title: "Understanding Side-Scan Sonar Processing",
  description,
  openGraph: { type: "article", images: shareImages, title: "Understanding Side-Scan Sonar Processing", description },
};

export default function SideScanProcessingPost() {
  return (
    <BlogPostPage
      slug="understanding-side-scan-sonar-processing"
      logo={brandLogos.dolphinExplorer}
      eyebrow="Marine technology · Explainer"
      date="2026-11"
      title={title}
      lede="A raw side-scan record is not yet a picture of the seabed. It is a set of echo amplitudes against time, shaped by geometry, spreading loss and the towfish’s motion. Processing is the order of corrections that turns it into something an interpreter can trust."
      tags={["Side-scan sonar", "Hydrography", "Signal processing"]}
      stats={[
        { label: "Raw record", value: "Time", note: "amplitude against two-way travel time" },
        { label: "First correction", value: "Seabed", note: "everything else depends on altitude" },
        { label: "Main hazard", value: "Over-processing", note: "an image can look clean and be wrong" },
      ]}
      tldr="Find the seabed first, because altitude drives every geometric and radiometric correction after it. Then convert slant range to ground range, compensate for spreading, absorption and grazing angle, fix the navigation, and only then enhance the image for interpretation."
      cta={{
        title: "Processing side-scan data?",
        body: "I’d be glad to compare notes on correction order, QC and tools.",
        href: `mailto:${site.email}?subject=Side-scan%20processing`,
        action: "Get in touch",
      }}
    >
      <p>
        I have processed and interpreted side-scan sonar for survey projects and now build the processing chain in{" "}
        <Link href="/projects/dolphin-explorer">Dolphin Explorer</Link>. This is the sequence I use, why each step comes
        where it does, and what each one can get wrong. Where I describe specific behaviour, it is how Dolphin Explorer
        implements it.
      </p>

      <h2>What a ping actually records</h2>
      <p>
        A side-scan sonar sends a fan-shaped pulse to each side of the towfish or vessel, port and starboard, and records
        the strength of the returning echo against time. Early samples come from the water column directly below the
        sensor, where there is no seabed yet. The first strong return is the seabed under the sensor; after that, each
        sample comes from seabed further out to the side.
      </p>
      <p>
        Two properties of that record shape everything that follows. Distance is measured along the slant from the
        sensor, not across the seabed, so near-range features are squashed. And the echo gets weaker with distance and
        changes with the angle at which the sound meets the seabed, so raw amplitude is not a direct measure of what the
        seabed is made of.
      </p>

      <h2>Bottom tracking comes first</h2>
      <p>
        Almost every correction needs the sensor’s height above the seabed, its altitude. Navigation files sometimes
        carry an altitude, but it can be badly wrong, so the dependable source is the record itself: the first seabed
        return in each ping.
      </p>
      <p>
        A good bottom tracker is stricter than “the first loud sample”. Dolphin Explorer’s searches after a blanking zone
        for the first sample that crosses a threshold <em>and</em> is followed by a sustained return, so a lone spike,
        multipath or scatter in the water column is rejected. Each pick gets a confidence based on how far the return
        stands above the water just ahead of it, and low-confidence picks are flagged for review. Along the line, picks
        that jump away from their neighbours are rejected, and short gaps are bridged by interpolation.
      </p>
      <p>
        Two rules matter in practice. One seabed per line: the waterfall view, the processing graph and the
        missing-altitude estimate all use the same detector and the same corrected seabed, so a ping gets the same
        answer wherever it is processed. And manual picks are never overwritten: once an interpreter has corrected the
        seabed, automatic detection works around those corrections.
      </p>

      <h2>Slant range to ground range</h2>
      <p>
        With altitude known, each sample can be placed on the seabed. If <em>h</em> is the altitude and <em>r</em> the
        slant range to a sample, the across-track ground range is <em>√(r² − h²)</em>. Samples before the seabed (the
        water column) have no ground position and are masked rather than stretched into the image. This is what removes
        the dark band down the centre of a raw waterfall and makes near-range features their true shape.
      </p>
      <p>
        If the bottom track is wrong, slant-range correction is wrong in a way that looks plausible: features near
        nadir are pushed or pulled and the centre of the mosaic tears. That is why the seabed is checked before anything
        else.
      </p>

      <h2>Radiometric corrections</h2>
      <p>
        Radiometric corrections make amplitude comparable across the swath and along the line, so that a brighter patch
        means a harder or rougher seabed rather than a closer one.
      </p>
      <DetailCards
        cards={[
          {
            title: "Time-varied gain (TVG)",
            body: "Compensates for spherical spreading and absorption as sound travels out and back. Dolphin Explorer’s default spreading term is 20 dB per decade of range, with an optional absorption term in dB per metre.",
          },
          {
            title: "Angle-range correction (ARC)",
            body: "Seabed backscatter depends on grazing angle. ARC uses the altitude to work out that angle for each seabed sample and flattens the response across the swath. The water column has no grazing angle and is left alone.",
          },
          {
            title: "Automatic gain control (AGC)",
            body: "Evens out brightness along the line. In variable mode it uses a window of neighbouring pings, so it adapts as the seabed changes along the line.",
          },
          {
            title: "Empirical gain normalisation (EGN)",
            body: "Learns the average response of the line itself by altitude and range, and divides it out. Because it depends on geometry, it works on runs of pings with similar altitude.",
          },
        ]}
      />
      <p>
        In Dolphin Explorer, TVG and ARC are level-preserving: each correction curve is referenced to its own mean in
        decibels, so applying one does not brighten or darken the whole line, only reshape it. That makes it easier to
        switch corrections on and off and see what each one did.
      </p>

      <h2>Navigation and layback</h2>
      <p>
        A side-scan image is only as good as its positions. Raw GPS fixes are noisy, so the track is smoothed, with gaps
        respected rather than bridged blindly. For a towed sensor there is also layback: the towfish is some distance
        behind the antenna, so each ping’s position is moved back along the recorded heading (or the course over ground
        when there is no heading). Get layback wrong and the same boulder appears in two places on adjacent lines.
      </p>

      <h2>Enhancement is for the interpreter, not the record</h2>
      <p>
        After the corrections come steps that make the image easier to read: speckle filtering with a local median,
        percentile contrast stretching, histogram equalization, adaptive contrast (CLAHE) and destriping. These help the
        eye but change the amplitudes, so they belong at the end of the chain, and the corrected but unenhanced data
        should stay available. Dolphin Explorer applies them in its processing graph without modifying the original
        survey file.
      </p>

      <h2>Reading height from a shadow</h2>
      <p>
        Shadows are where side-scan earns its keep. An object standing on the seabed blocks the sound, leaving an
        acoustic shadow behind it, and the shadow’s length gives its height by similar triangles. If the sensor is at
        altitude <em>h</em> and the shadow runs from ground range <em>r₁</em> to <em>r₂</em>, the object’s height is
        approximately <em>h × (r₂ − r₁) / r₂</em>.
      </p>
      <p>
        For example, with the sensor 10 m above the seabed and a shadow from 40 m to 44 m out, the object is about
        10 × 4 / 44 ≈ 0.9 m high. The same geometry is why Dolphin Explorer’s boulder detector weights the shadow most
        heavily: on many seabeds a boulder’s face barely shows, but its shadow does. I wrote more about detecting
        boulders automatically in my <Link href="/projects/automated-boulder-detection">boulder detection research</Link>.
      </p>

      <h2>What to check before trusting the image</h2>
      <ul>
        <li>
          <strong>The seabed line:</strong> does it follow the first return on every line, especially over slopes and
          where the altitude changes quickly?
        </li>
        <li>
          <strong>The centre of the mosaic:</strong> tearing or doubling along nadir usually means a bottom-tracking or
          altitude problem.
        </li>
        <li>
          <strong>Adjacent lines:</strong> features that do not line up between overlapping lines point to navigation
          or layback errors.
        </li>
        <li>
          <strong>Brightness across the swath:</strong> a bright stripe at a fixed range on every ping is a gain or
          angle problem, not geology.
        </li>
        <li>
          <strong>What enhancement did:</strong> compare the enhanced image with the corrected one before calling a
          contact.
        </li>
      </ul>

      <h2>Further reading</h2>
      <ul>
        <li>
          Blondel, P. (2009). <em>The Handbook of Sidescan Sonar</em>. Springer Praxis.
        </li>
        <li>
          <Link href="/projects/dolphin-explorer">Dolphin Explorer</Link>: the software these steps are implemented in.
        </li>
        <li>
          <Link href="/blog/from-survey-vessel-to-useful-map">From survey vessel to useful map</Link>: the wider chain
          from capture to delivery.
        </li>
        <li>
          <Link href="/research">Research</Link>: my research on sonar and seabed detection.
        </li>
      </ul>
    </BlogPostPage>
  );
}
