import type { Metadata } from "next";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards } from "@/components/Article";
import { brandLogos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Asking Prices Are Not Sold Prices",
  description:
    "How to read a local real estate market page without confusing asking prices, inventory, days listed and actual sale outcomes.",
  openGraph: { type: "article", title: "Asking Prices Are Not Sold Prices" },
};

export default function AskingPricesPost() {
  return (
    <BlogPostPage
      slug="asking-prices-are-not-sold-prices"
      logo={brandLogos.stJohnsProperties}
      eyebrow="Real estate data · Market notes"
      date="2026-09"
      title="Asking prices are not sold prices"
      lede="A market page can look precise while still answering the wrong question. Here is how I separate what a listing feed can show from what only a completed transaction can prove."
      tags={["Real estate", "Market data", "Newfoundland"]}
      stats={[
        { label: "Feed shows", value: "For sale", note: "the market visible today" },
        { label: "Useful signal", value: "Trend", note: "when the sample is large enough" },
        { label: "Still unknown", value: "Final price", note: "until a sale is recorded" },
      ]}
      tldr="Listing data is useful for understanding supply, competition and asking-price movement. It should be labelled honestly and never presented as a substitute for sold-price data."
      cta={{
        title: "Check the live market",
        body: "Browse current Newfoundland listings and market context on St. John’s Properties.",
        href: "https://stjohnsproperties.ca",
        action: "Open St. John’s Properties ↗",
      }}
    >
      <h2>Start with the question</h2>
      <p>
        “What is the market doing?” can mean several different things: what homes are available, what sellers are
        asking, how quickly listings are moving, or what buyers are actually paying. A responsible market page makes
        that distinction visible before showing a chart.
      </p>
      <DetailCards
        cards={[
          { title: "Inventory", body: "How many relevant homes are listed right now, and where are they concentrated?" },
          { title: "Asking price", body: "What sellers are requesting, which can change before a home sells or is withdrawn." },
          { title: "Days listed", body: "How long visible listings have been active, with care around relists and stale records." },
          { title: "Sold price", body: "The final transaction outcome, which requires a separate source and a different dataset." },
        ]}
      />

      <h2>What listing data does well</h2>
      <p>
        A live listing feed is good at showing the shape of the current market. It can reveal how much choice buyers
        have, which price bands are crowded, where new inventory is appearing and which homes have been sitting longer
        than expected.
      </p>
      <ul>
        <li><strong>Supply:</strong> the count of active homes by type, price band and area.</li>
        <li><strong>Movement:</strong> new listings, price changes and homes leaving the visible market.</li>
        <li><strong>Context:</strong> neighbourhood-level differences that disappear in a single regional average.</li>
      </ul>

      <h2>Where the boundary is</h2>
      <p>
        A listing that disappears is not automatically a sold home. It may have expired, been withdrawn, been relisted,
        or gone conditional. That is why I label market figures as asking figures and keep sold data as a separate
        question rather than blending the two.
      </p>
      <p>
        The same care applies to price per square foot. It can be a useful comparison within a similar set of homes, but
        it should not be treated as a valuation model. The quality of the underlying floor-area data and the mix of homes
        in the sample matter more than the precision of the displayed number.
      </p>

      <h2>Small samples need a warning</h2>
      <p>
        A neighbourhood with three active listings can produce a very dramatic median. That does not make the number
        meaningless; it makes the confidence narrower. I prefer to show the sample size, set a minimum threshold for
        rankings and let small groups remain visible without presenting them as definitive.
      </p>
      <p>
        Good market design is mostly labelling: say what the number measures, say how current it is, and say what it
        cannot tell you.
      </p>
    </BlogPostPage>
  );
}
