import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostPage } from "@/components/BlogPostPage";
import { DetailCards } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";
import { shareImages } from "@/lib/seo";

const title = "Recognising the same house twice";
const description =
  "How the St. John's Properties platform matches MLS® listings to permanent property records: address normalization, deterministic IDs, strong and weak evidence, a review queue, and why the first unrestricted run proposed 518 wrong merges.";

export const metadata: Metadata = {
  alternates: { canonical: "/blog/recognising-the-same-house-twice" },
  title: "Recognising the Same House Twice: Entity Resolution for Property Data",
  description,
  openGraph: { type: "article", images: shareImages, title: "Recognising the Same House Twice", description },
};

export default function SameHouseTwicePost() {
  return (
    <BlogPostPage
      slug="recognising-the-same-house-twice"
      logo={brandLogos.stJohnsProperties}
      eyebrow="Data infrastructure · Property data"
      date="2026-11"
      title={title}
      lede="A listing feed tells you what is for sale today. To keep a permanent record of each home (its history, its price changes, its past listings), you first have to decide when two listings are the same house. That turns out to be the hardest part."
      tags={["Data engineering", "Entity resolution", "PostGIS", "Real estate"]}
      stats={[
        { label: "Feed records", value: "~3,400", note: "listings across Newfoundland" },
        { label: "With a parcel number", value: "11", note: "so addresses have to do the work" },
        { label: "First unrestricted run", value: "518", note: "proposed merges, nearly all wrong" },
      ]}
      tldr="Give each property a deterministic ID from its normalized address, merge new listings automatically only on strong evidence (a known alias, or the same civic number and unit within 30 metres), send weaker evidence to a person, and make every merge permanent so it is never undone by the next sync."
      cta={{
        title: "Working on messy property or location data?",
        body: "I’m happy to talk through matching rules, PostGIS and data quality.",
        href: `mailto:${site.email}?subject=Property%20data`,
        action: "Get in touch",
      }}
    >
      <p>
        <Link href="/projects/st-johns-properties">St. John’s Properties</Link> gives every home in its database one
        permanent page, however many times it is listed. Listings come from CREA’s Data Distribution Facility, which
        describes each listing on its own. This post is about the step in between: deciding which listings belong to the
        same physical property.
      </p>

      <h2>Why listings are not properties</h2>
      <p>
        A house can be listed, withdrawn and relisted with a new MLS® number. A condo building has many units at one
        street address. A new subdivision has lots that share a builder’s description word for word. If every listing
        became its own property, a relisted house would lose its history; if similar listings were merged too eagerly,
        neighbouring homes would share one.
      </p>
      <p>
        So the platform keeps three layers apart: the <strong>property</strong> (the physical home), its{" "}
        <strong>listing episodes</strong> (each period it is marketed) and its <strong>history</strong> (relisted, price
        reduced, details changed, removed from the feed). Entity resolution decides which property each new listing
        attaches to.
      </p>

      <h2>Step one: normalize the address</h2>
      <p>
        The same address arrives written in many ways. Before anything is compared, it is normalized: street suffixes
        and directions are folded to one form (“West” and “W”), “Saint” and “St”, “Mount” and “Mt” are made consistent,
        and every way of writing a unit (“Unit#403”, “#403”, “Apt 403”, “Suite 403”) becomes the same token.
      </p>
      <p>
        The property’s ID is then a deterministic UUID of the normalized address and municipality. Deterministic means
        the same address always produces the same ID, on any run, without a lookup, so a relisting at an unchanged
        address lands on the same property automatically.
      </p>

      <h2>Step two: merge only on strong evidence</h2>
      <p>
        Addresses still change between listings: a typo is fixed, a unit is added, a street is spelled differently. When
        a listing’s ID has not been seen before, it is folded into an existing property automatically only when the
        evidence is strong:
      </p>
      <DetailCards
        cards={[
          { title: "A known alias", body: "The address is a spelling the property has been seen under before. The first claim to an alias wins." },
          {
            title: "Same place, same door",
            body: "An existing property within 30 metres with the same civic number and the same unit designator.",
          },
          { title: "Never condo units", body: "Units in the same building share an address and a location; they are never merged automatically." },
          { title: "Merges are permanent", body: "A merged ID always resolves to the surviving property, so the next sync cannot re-create the duplicate." },
        ]}
      />

      <h2>Step three: send weak evidence to a person</h2>
      <p>Some pairs look alike but are not certain. These go to a review queue instead of being merged:</p>
      <ul>
        <li>Identical long descriptions (120+ characters) shared by exactly two properties within 2 km with the same civic number and lot or unit designators.</li>
        <li>The same civic number and designators on a similar street name, 30 to 150 metres apart.</li>
        <li>The same address filed under a neighbouring municipality within 2 km.</li>
      </ul>
      <p>
        A reviewer can merge the pair, which keeps the older property and moves every listing, history event and alias
        onto it, or mark them as different properties, which records the decision so that pair is never proposed again.
      </p>

      <h2>The 518 wrong merges</h2>
      <p>
        The limits in that list were not in the first version. The first live run without them proposed 518 pairs, and
        nearly all of them were different parcels. Builders reuse one description across a whole subdivision, so
        identical text is weak evidence on new construction; and “Lot 2” and “Lot 3” on the same street are neighbours,
        not the same home. The current rules add the civic-number, designator and distance conditions, and exclude shared
        subdivision remarks and neighbouring lots.
      </p>
      <p>
        The lesson I take from it: a matching rule that looks reasonable on a few examples can be badly wrong at the
        scale of a whole feed. Run it against everything, read a sample of what it proposes, and only then let it merge
        anything.
      </p>

      <h2>Why not just use parcel numbers?</h2>
      <p>
        A parcel or property ID from the land registry would make most of this unnecessary. In practice the feed fills
        its parcel-number field on 11 of about 3,400 records, mostly with free text. Reliable parcel identifiers have to
        come from a municipal dataset, and the platform keeps a place for them on each property alias for when they do.
      </p>

      <h2>What it makes possible</h2>
      <ul>
        <li>One permanent URL per home; old listing links and merged IDs redirect to it.</li>
        <li>A listing history that survives relisting: when it was first seen, every price change, and when it left the market.</li>
        <li>Pages that stay useful after a sale, as a record of the home rather than a dead link.</li>
      </ul>

      <h2>Related</h2>
      <ul>
        <li>
          <Link href="/projects/st-johns-properties">St. John’s Properties</Link>: the full case study, including
          geography, sync and search architecture.
        </li>
        <li>
          <Link href="/blog/asking-prices-are-not-sold-prices">Asking prices are not sold prices</Link>
        </li>
        <li>
          <Link href="/notes/seo-systems">SEO systems: working notes</Link>
        </li>
      </ul>
    </BlogPostPage>
  );
}
