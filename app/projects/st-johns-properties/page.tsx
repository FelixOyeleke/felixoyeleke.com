import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards, StatRow, StatusList, Tldr } from "@/components/Article";
import { brandLogos } from "@/lib/content";
import { breadcrumbJsonLd, JsonLd, stJohnsPropertiesJsonLd } from "@/lib/seo";

const SITE_URL = "https://stjohnsproperties.ca";

export const metadata: Metadata = {
  alternates: { canonical: "/projects/st-johns-properties" },
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
      <JsonLd data={breadcrumbJsonLd({ name: "Projects", path: "/projects" }, { name: "St. John’s Properties", path: "/projects/st-johns-properties" })} />
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        logo={brandLogos.stJohnsProperties}
        eyebrow="Project · Live · 2026"
        title="St. John’s Properties"
        lede="A real estate business and the platform behind it: live MLS® search, neighbourhood market data and tools for buyers, sellers and investors in St. John’s and Newfoundland. I founded it, built it and run it as a REALTOR® with eXp Realty."
        tags={["Next.js", "TypeScript", "PostgreSQL", "PostGIS", "CREA DDF", "Vercel"]}
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
        <h2>One property, one permanent page</h2>
        <p>
          A house in St. John’s may be listed, withdrawn and listed again under a new MLS® number. The feed treats each
          of those as a separate listing; a buyer thinks of it as one house. So the platform separates three things:
        </p>
        <ul>
          <li>
            <strong>The property:</strong> the physical home, with a stable identity, a location and a lifecycle.
          </li>
          <li>
            <strong>Listing episodes:</strong> each period it is marketed, with the raw feed record kept alongside the
            version the website shows.
          </li>
          <li>
            <strong>History:</strong> what happened during each episode: discovered, relisted, price reduced or
            increased, details changed (with the before and after), back on market, or removed from the feed.
          </li>
        </ul>
        <p>
          Every property has one permanent URL, and every other URL for it, including old listing links and merged
          duplicates, redirects there before the page renders. Pages, history and the stored snapshot are kept after a
          home leaves the market, so a property page stays useful as a record of the home rather than disappearing with
          the listing.
        </p>

        <h2>Matching the same home across listings</h2>
        <p>
          Recognising the same home is harder than it sounds. A property’s identity comes from its normalized address
          and municipality, after folding the variations the feed actually contains: street suffixes, directions,
          “Saint” and “St”, “Mount” and “Mt”, and every way of writing a unit (“Unit#403”, “#403”, “Apt 403”, “Suite
          403”).
        </p>
        <p>
          New listings are merged into an existing property automatically only on strong evidence: a recorded alias of
          its address, or a property within 30 metres with the same civic number and the same unit. Condo units never
          merge. Weaker evidence (identical long descriptions, similar street names a short distance apart, the same
          address filed under a neighbouring town) goes to a review queue instead. That limit came from testing: the
          first run without it proposed 518 pairs, nearly all of them different parcels, many of them neighbouring lots
          in the same subdivision sharing a builder’s description. I wrote this up in{" "}
          <Link href="/blog/recognising-the-same-house-twice">Recognising the same house twice</Link>.
        </p>
        <p>
          Parcel numbers would make this easier, but the feed fills them on only 11 of about 3,400 records, so parcel
          identifiers have to come from municipal data instead.
        </p>

        <h2>Geography and search</h2>
        <p>
          Locations live in PostgreSQL with PostGIS. Seven site neighbourhoods follow the City of St. John’s official
          community boundaries; areas without a City polygon use defined circles, and every home belongs to exactly one
          neighbourhood, never to a St. John’s one when it sits in another town. Nearby-home search uses PostGIS distance
          queries on a spatial index.
        </p>
        <p>
          The search box also reads plain language. A query such as “two-apartment house under $500k near MUN” is
          parsed into an area, a home type, a price and a bedroom count and sent to the matching page, while addresses,
          MLS® numbers and place names go to keyword search.
        </p>

        <h2>Classifying homes from the data</h2>
        <p>
          Categories such as two-apartment homes, condos and commercial property drive much of the site, and the feed
          does not always state them cleanly. Classification uses the structured fields first and the listing remarks
          second, and it ignores hedged wording: “potential for a basement apartment” does not make a home a
          two-apartment, but “fully developed basement with an in-law suite” does. Every classification records its
          source and evidence so it can be checked.
        </p>

        <h2>Keeping the data reliable</h2>
        <ul>
          <li>Listings sync in batches, with retries for brief database failures and only one sync running at a time.</li>
          <li>Unchanged listings are detected by a content hash and not rewritten.</li>
          <li>
            A home is only marked as gone after a complete, successful sync, and a short drop-out is treated as a blip
            rather than a status change.
          </li>
          <li>
            If the feed is unavailable, search falls back to the last synced inventory and property pages to their
            stored snapshot.
          </li>
          <li>An admin view shows each sync run, database health and a set of data-quality checks.</li>
        </ul>

        <h2>Search architecture</h2>
        <p>
          Many searches are a place and an intent: condos in Mount Pearl, homes under $400K near the Health Sciences
          Centre. The site defines a grid of areas and intents and decides each day, from live inventory, which of those
          pages deserve to exist. A page is published and indexed only when it has at least three homes and is not
          simply a copy of a broader page; thinner pages are kept out of the index, and duplicates point search engines
          to the page they repeat. Against the September 2026 feed this produced about 200 live landing pages, each
          with figures computed from its own listings.
        </p>

        <h2>Search growth</h2>
        <p>
          Search is where the structure pays off. Every listing, category and neighbourhood page is a specific, local
          answer that search engines can index. Between mid-August and early November 2026, the number of the site’s
          pages indexed by Google grew from about 1,600 to more than 130,000, and daily search impressions rose from
          around 250 to roughly 10,000 — about forty times higher.
        </p>

        <h2>Tools for buyers and sellers</h2>
        <ul>
          <li>
            <strong>What can I buy?</strong> Savings and a comfortable monthly payment give the highest price where the
            minimum down payment and the mortgage (with CMHC insurance) fit, then the homes listed under it. It states
            clearly that it is not a pre-approval.
          </li>
          <li>
            <strong>Compare:</strong> up to four saved homes side by side.
          </li>
          <li>
            <strong>Similar homes</strong> weigh building form, second units, neighbourhood and real distance, not just
            the town name.
          </li>
          <li>
            <strong>Accounts</strong> with saved homes, saved searches and new-listing alerts.
          </li>
        </ul>

        <h2>Local guides</h2>
        <p>
          Guides answer the questions people search before they are ready to talk to an agent: buying from away,
          budgeting beyond the asking price, renting rules, newcomers to Canada, selling step by step, and individual
          subdivisions. They are published on{" "}
          <a href={`${SITE_URL}/guides`} target="_blank" rel="noreferrer">
            stjohnsproperties.ca/guides
          </a>
          .
        </p>

        <h2>Related writing</h2>
        <ul>
          <li>
            <Link href="/blog/recognising-the-same-house-twice">Recognising the same house twice: matching listings to properties</Link>
          </li>
          <li>
            <Link href="/blog/asking-prices-are-not-sold-prices">Asking prices are not sold prices</Link>
          </li>
          <li>
            <Link href="/blog/buying-an-older-home-in-newfoundland">Buying an older home in Newfoundland</Link>
          </li>
          <li>
            <Link href="/notes/seo-systems">SEO systems: working notes</Link>
          </li>
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
