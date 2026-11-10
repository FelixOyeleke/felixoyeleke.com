import type { Metadata } from "next";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards } from "@/components/Article";
import { brandLogos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Buying an Older Home in Newfoundland",
  description:
    "A practical starting point for evaluating older homes in Newfoundland: moisture, insulation, heating, foundations, roofs and the questions to ask early.",
  openGraph: { type: "article", title: "Buying an Older Home in Newfoundland" },
};

export default function OlderHomePost() {
  return (
    <BlogPostPage
      slug="buying-an-older-home-in-newfoundland"
      logo={brandLogos.stJohnsProperties}
      eyebrow="Home buying · Newfoundland field guide"
      date="2026-08"
      title="Buying an older home in Newfoundland"
      lede="Older homes can have character, good locations and hidden work in equal measure. These are the systems I would want to understand before getting emotionally attached to a house."
      tags={["Home buying", "Newfoundland", "Practical guide"]}
      stats={[
        { label: "First question", value: "Moisture", note: "where water enters and leaves" },
        { label: "Big system", value: "Heating", note: "comfort, cost and reliability" },
        { label: "Best next step", value: "Inspection", note: "independent eyes before commitment" },
      ]}
      tldr="An older home is not automatically a bad home. The useful question is whether its condition, maintenance history and likely near-term work fit your budget and tolerance for projects."
      cta={{
        title: "Start with the neighbourhood",
        body: "Search current homes and compare neighbourhood context before booking a showing.",
        href: "https://stjohnsproperties.ca",
        action: "Browse listings ↗",
      }}
    >
      <h2>Character is not a building system</h2>
      <p>
        Original trim, mature trees and a good street can make an older home feel immediately right. Those qualities
        matter, but they do not tell you how the building handles water, heat, air movement or snow. I start with the
        systems because they are where expensive surprises tend to hide.
      </p>
      <DetailCards
        cards={[
          { title: "Water", body: "Look for grading, gutters, basement dampness, roof details and the path water takes after a storm." },
          { title: "Heat", body: "Understand the heating source, age, service history, distribution and likely replacement cost." },
          { title: "Envelope", body: "Ask how the roof, windows, siding, insulation and air sealing work together through winter." },
          { title: "Structure", body: "Pay attention to foundation movement, floor slope, posts, beams and signs of long-term moisture." },
        ]}
      />

      <h2>Moisture first</h2>
      <p>
        In a wet, windy and freeze-thaw climate, water management deserves more attention than cosmetic finishes. Look
        outside before you look at paint: where does roof water land, does the ground slope away, and are downspouts
        sending water toward the foundation?
      </p>
      <p>
        Inside, a musty smell, fresh paint in one basement corner or stored items lifted off the floor can be clues worth
        asking about. None of them proves a defect on its own, but each deserves a clear answer and, when appropriate, a
        specialist’s inspection.
      </p>

      <h2>Heating and winter comfort</h2>
      <p>
        Ask what heats the house, how old the equipment is, when it was last serviced and how evenly the rooms stay
        comfortable. A newer appliance does not solve every distribution or insulation problem, and a well-maintained
        older system may still need a realistic replacement plan.
      </p>
      <ul>
        <li><strong>Get the records:</strong> fuel use, service invoices and installation dates tell a better story than a listing description.</li>
        <li><strong>Check the cold rooms:</strong> additions, upper floors and rooms over garages often behave differently.</li>
        <li><strong>Budget the next replacement:</strong> every major system eventually becomes your responsibility.</li>
      </ul>

      <h2>Ask for a plan, not perfection</h2>
      <p>
        Most older homes have a list. The goal is to separate urgent work from maintenance and from improvements you can
        choose later. An independent home inspection, insurance conversation and realistic repair budget are more useful
        than trying to find a house with nothing left to do.
      </p>
      <p>
        This is general information, not a substitute for advice from a qualified inspector, contractor, insurer,
        mortgage professional or lawyer about a specific property.
      </p>
    </BlogPostPage>
  );
}
