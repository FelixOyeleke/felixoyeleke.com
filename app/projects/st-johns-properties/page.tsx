import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, StatusList, Tldr } from "@/components/Article";

const SITE_URL = "https://stjohnsproperties.ca";

export const metadata: Metadata = {
  title: "St. John’s Properties",
  description:
    "St. John’s Properties: an MLS®-powered real estate platform for Newfoundland with live listing search, a neighbourhood-level market data page and buyer tools.",
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
      <Link className="back-link" href="/projects">
        ← All projects
      </Link>

      <ArticleHeader
        eyebrow="Project · Live · 2026"
        title="St. John’s Properties"
        lede="An MLS®-powered real estate platform for St. John’s and Newfoundland: live listing search, a neighbourhood-level market data page, and tools for buyers, sellers and investors — designed, built and run by me as a REALTOR® with eXp Realty."
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
          { label: "Market data", value: "Live", note: "updated as MLS® listings change" },
          { label: "Buyer tools", value: "4", note: "mortgage, closing cost, stress test, equity" },
        ]}
      />

      <Tldr>
        A production property site that turns the CREA MLS® feed into fast search, neighbourhood market statistics and
        practical calculators — plus its own week-by-week history, because the feed only ever shows what’s for sale
        today.
      </Tldr>

      <div className="article-body">
        <h2>Overview</h2>
        <p>
          St. John’s Properties is a Newfoundland-focused real estate site for buyers, sellers, renters and investors.
          It pairs live MLS® search with local structure — two-apartment homes, neighbourhood guides, a first-time
          buyer guide and a market page for the St. John’s metro area — so local questions can be answered from
          current data rather than a national portal.
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
        alt="St. John’s Properties home page: a search bar for address, postcode or MLS® number with type, price and bedroom filters over an aerial photo of downtown St. John’s."
        caption="Figure 1. Home page search — address, postcode, MLS® number or free-text, with type, price and bedroom filters."
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

        <h2>Market statistics, done carefully</h2>
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
            <strong>Real boundaries:</strong> neighbourhoods follow the City of St. John’s published community
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
        alt="St. John’s real estate market page showing 627 homes for sale in the metro area on October 21, 2026, a $465,000 median asking price, $216 median price per square foot, 110 new listings in 7 days, 363 in 30 days and 24 median days listed."
        caption="Figure 2. Live market page, 21 October 2026 — every figure recalculates as listings change."
      />

      <div className="article-body">
        <h2>Status</h2>
        <StatusList
          items={[
            { done: true, text: "Live MLS® search across Newfoundland, with category, price-band and neighbourhood pages." },
            { done: true, text: "Market data page by home type, municipality and St. John’s neighbourhood." },
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
        action="Open St. John’s Properties ↗"
      />
    </main>
  );
}
