import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, StatusList, Tldr } from "@/components/Article";
import { brandLogos } from "@/lib/content";
import { JsonLd, stJohnsPropertiesJsonLd } from "@/lib/seo";

const SITE_URL = "https://stjohnsproperties.ca";

export const metadata: Metadata = {
  title: "St. John’s Properties",
  description:
    "St. John’s Properties, founded and built by Felix Oyeleke: a Newfoundland real estate business and MLS®-powered platform with live listing search, neighbourhood market data and buyer tools.",
};

function Screenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="article-figure">
      <a href={SITE_URL} target="_blank" rel="noreferrer">
        <img src={src} width={1440} height={src.includes("market") ? 800 : 754} alt={alt} loading="lazy" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function StJohnsPropertiesPage() {
  return (
    <main className="article">
      <JsonLd data={stJohnsPropertiesJsonLd} />
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        logo={brandLogos.stJohnsProperties}
        eyebrow="Project · Live · 2026"
        title="St. John’s Properties"
        lede="A real estate business and the platform behind it: live MLS® search, neighbourhood market data and tools for buyers, sellers and investors in St. John’s and Newfoundland. I founded it, built it and run it as a REALTOR® with eXp Realty."
        tags={["Next.js", "Python", "PostgreSQL", "PostGIS", "CREA DDF", "Vercel"]}
      />

      <div className="hero-actions article-actions">
        <a className="button-link" href={SITE_URL} target="_blank" rel="noreferrer">
          Visit stjohnsproperties.ca ↗
        </a>
      </div>

      <StatRow
        stats={[
          { label: "Active listings", value: "3,200+", note: "across 28 NL communities, Oct 2026" },
          { label: "Pages in Google", value: "130,000+", note: "indexed, up from about 1,600 in Aug 2026" },
          { label: "Search impressions", value: "~10,000", note: "a day in early Nov 2026, up from about 250 in Aug" },
        ]}
      />

      <Tldr>
        A production property site that turns the CREA MLS® feed into fast search, neighbourhood market statistics and
        practical calculators — plus its own week-by-week history, because the feed only ever shows what’s for sale
        today.
      </Tldr>

      <div className="article-body">
        <h2>My role</h2>
        <dl className="fact-list">
          <div>
            <dt>Role</dt>
            <dd>Founder</dd>
          </div>
          <div>
            <dt style={{ "--lines": 4 } as React.CSSProperties}>Responsible for</dt>
            <dd>Business strategy and positioning</dd>
            <dd>Product design and the market data methodology</dd>
            <dd>Full-stack engineering and the MLS® data pipeline</dd>
            <dd>Compliance with CREA rules, and day-to-day operations</dd>
          </div>
        </dl>

        <h2>The opportunity</h2>
        <p>
          National portals list every home, but they answer local questions poorly: which neighbourhoods fit a budget,
          how two-apartment homes compare, or whether an asking price is high for the area. St. John’s Properties pairs
          live MLS® search with local structure — two-apartment homes, neighbourhood guides, a first-time buyer guide
          and a market page for the St. John’s metro area — so those questions can be answered from current data.
        </p>
        <p>
          It is also the front door to my real estate practice. People who come for the listings and the market data
          can book a consultation or request a home value, so the product and the business grow together.
        </p>

        <h2>What it does</h2>
        <DetailCards
          cards={[
            {
              title: "Listing search",
              body: "Search by address, postcode, MLS® number or a plain description, filter by type, price and bedrooms, or draw an area on the map.",
            },
            {
              title: "Local categories",
              body: "Browse pages for new listings, open houses, two-apartment homes, condos, luxury, rentals, new builds, commercial and sold homes.",
            },
            {
              title: "Market data",
              body: "Median asking price, price per sq ft, new listings and days listed for the metro area, by home type and by neighbourhood.",
            },
            {
              title: "Buyer & seller tools",
              body: "Mortgage payment, closing cost, stress test and home equity calculators, a home-value request form and new-listing alerts.",
            },
          ]}
        />
      </div>

      <Screenshot
        src="/images/projects/st-johns-properties-home.webp"
        alt="St. John’s Properties home page: a search bar for address, postcode or MLS® number with type, price and bedroom filters over an aerial photo of downtown St. John’s."
        caption="Home page search — address, postcode, MLS® number or free-text, with type, price and bedroom filters."
      />

      <div className="article-body">
        <h2>Data pipeline</h2>
        <p>
          Listings come from CREA’s Data Distribution Facility (DDF), which carries NLAR members’ MLS® listings. The
          site renders them as fast, cached pages and links every property back to its REALTOR.ca listing, with the
          listing brokerage credited and CREA’s required notices on every page.
        </p>
        <p>
          The feed has one big limitation: it only describes homes for sale right now. To show trends, the site keeps
          its own record of the market, snapshotting inventory since September 2026 so it can chart new listings,
          homes leaving the market and price reductions week by week.
        </p>

        <h2>Decisions that keep the numbers honest</h2>
        <p>
          The market page is built to be honest about what the numbers mean, which matters more than the chart
          styling:
        </p>
        <ul>
          <li>
            <strong>Asking, not sold:</strong> figures are labelled as asking prices; sold data lives on its own page.
          </li>
          <li>
            <strong>Like-for-like homes:</strong> houses, condos and two-apartment homes only — rentals, land and
            commercial are excluded.
          </li>
          <li>
            <strong>Clean price per sq ft:</strong> only listings with at least 300 sq ft recorded are included.
          </li>
          <li>
            <strong>Real boundaries:</strong> neighbourhoods follow the City of St. John’s published community
            boundaries.
          </li>
          <li>
            <strong>No small-sample rankings:</strong> areas need at least 8 homes to be ranked; smaller samples are
            shown greyed out.
          </li>
        </ul>
      </div>

      <Screenshot
        src="/images/projects/st-johns-properties-market.webp"
        alt="St. John’s real estate market page showing 627 homes for sale in the metro area on October 21, 2026, a $465,000 median asking price, $216 median price per square foot, 110 new listings in 7 days, 363 in 30 days and 24 median days listed."
        caption="Live market page, 21 October 2026 — every figure recalculates as listings change."
      />

      <div className="article-body">
        <h2>Search growth</h2>
        <p>
          Search is where the structure pays off. Every listing, category and neighbourhood page is a specific, local
          answer that search engines can index. Between mid-August and early November 2026, the number of the site’s
          pages indexed by Google grew from about 1,600 to more than 130,000, and daily search impressions rose from
          around 250 to roughly 10,000 — about forty times higher.
        </p>

        <h2>Next: local guides</h2>
        <p>
          The next step is content that answers the questions people search before they are ready to talk to an agent.
          A first batch of ten buyer and seller guides is drafted and awaiting review, including:
        </p>
        <ul>
          <li>Buying a home in St. John’s during winter</li>
          <li>Buying in Newfoundland from another province</li>
          <li>Questions to ask before buying a condo</li>
          <li>What it costs to sell a house in St. John’s</li>
          <li>Paradise vs. Conception Bay South</li>
        </ul>

        <h2>Status</h2>
        <StatusList
          items={[
            { done: true, text: "Live MLS® search across Newfoundland, with category, price‑band and neighbourhood pages." },
            { done: true, text: "Market data page by home type, municipality and St. John’s neighbourhood." },
            { done: true, text: "Mortgage, closing cost, stress test and home equity calculators." },
            { done: true, text: "Own market history recorded weekly since September 2026." },
            { done: false, text: "Week-by-week trend charts, published once four full weeks are recorded." },
          ]}
        />
      </div>

      <CtaPanel
        title="Buying or selling in Newfoundland?"
        body="The site is live — search current listings or check the market before you call."
        href={SITE_URL}
        action="Open St. John’s Properties ↗"
      />
    </main>
  );
}
