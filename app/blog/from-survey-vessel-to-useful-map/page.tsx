import type { Metadata } from "next";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "From Survey Vessel to Useful Map",
  description:
    "What happens between a sonar ping recorded offshore and a map that someone can trust: capture, navigation, QA, processing and delivery.",
  openGraph: { type: "article", title: "From Survey Vessel to Useful Map" },
};

export default function FromSurveyVesselPost() {
  return (
    <BlogPostPage
      slug="from-survey-vessel-to-useful-map"
      logo={brandLogos.dolphinExplorer}
      eyebrow="Hydrographic field notes"
      date="2026-10"
      title="From survey vessel to useful map"
      lede="A useful map is the final frame of a much longer chain of decisions made offshore. This is the workflow I keep coming back to when I think about better hydrographic tools."
      tags={["Hydrography", "GIS", "Fieldwork"]}
      stats={[
        { label: "Starting point", value: "Raw XTF", note: "side-scan pings plus navigation" },
        { label: "Critical handoff", value: "QA", note: "before processing becomes expensive" },
        { label: "Final user", value: "A decision", note: "a route, hazard call or report" },
      ]}
      tldr="The best survey workflow keeps the chain visible: capture clean data, preserve navigation context, QA early, process deliberately, and deliver a map with enough evidence that someone else can understand it."
      cta={{
        title: "Building better field tools",
        body: "If your survey workflow has a slow or uncertain handoff, I’d like to understand where it breaks.",
        href: `mailto:${site.email}?subject=Hydrographic%20workflow`,
        action: "Start a conversation",
      }}
    >
      <h2>The chain matters</h2>
      <p>
        A map is easy to inspect after the fact. The hard work is preserving enough context along the way that the map
        remains useful when conditions, equipment or assumptions change. Every shortcut in the chain becomes a question
        for the person making the final call.
      </p>
      <DetailCards
        cards={[
          { title: "Capture", body: "Record the signal and the conditions around it, including sensor settings, timing and navigation quality." },
          { title: "Context", body: "Keep position, motion, layback and calibration metadata attached to the data instead of in a separate notebook." },
          { title: "QA", body: "Surface gaps, noise and drift while the crew can still revisit the line or change the plan." },
          { title: "Delivery", body: "Give the next person a map, the source evidence and a clear explanation of what the map can support." },
        ]}
      />

      <h2>Capture more than the signal</h2>
      <p>
        The ping is only one part of a survey record. A later analyst also needs to know when it was captured, where the
        vessel was, how the sensor was configured and whether the navigation solution was stable. A fast reader that
        drops that context can make a clean-looking image harder to trust.
      </p>
      <p>
        That is why parser work matters. Deterministic decoding gives every downstream tool the same starting point,
        whether the user is reviewing a single line on board or rebuilding a complete mosaic later.
      </p>

      <h2>QA while the decision is still reversible</h2>
      <p>
        The most valuable QA result is often a small warning delivered early: a navigation gap, a noisy channel, a gain
        change or an unexpected seam. If the warning arrives after a full processing run, the cost of acting on it is
        much higher.
      </p>
      <ul>
        <li><strong>Show the raw and processed view together:</strong> users should not have to guess what changed.</li>
        <li><strong>Keep measurements close:</strong> cursor values, ping IDs and navigation quality belong beside the image.</li>
        <li><strong>Make uncertainty visible:</strong> a greyed-out or flagged region is more useful than false precision.</li>
      </ul>

      <h2>Deliver evidence with the map</h2>
      <p>
        A useful delivery answers three questions: what is here, how do we know, and what should happen next? The map is
        the centre of that answer, but the supporting metadata and processing notes are what make it portable between a
        survey crew, an analyst and a client.
      </p>
      <p>
        The tools I’m building around Dolphin Explorer follow that principle: keep the display fast, keep the parser
        deterministic, and leave a trail that another person can inspect without reconstructing the entire field day.
      </p>
    </BlogPostPage>
  );
}
