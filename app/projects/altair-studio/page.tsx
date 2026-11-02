import type { Metadata } from "next";
import Link from "next/link";
import { ArticleHeader, CtaPanel, DetailCards } from "@/components/Article";
import { brandLogos, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Altair Studio",
  description: "Real estate photography, videography and drone shots for properties and listings.",
};

export default function AltairStudioPage() {
  return (
    <main className="article">
      <Link className="back-link" href="/projects">
        ‹ All projects
      </Link>

      <ArticleHeader
        logo={brandLogos.altairStudio}
        eyebrow="Project · Real estate media"
        title="Altair Studio"
        lede="Real estate photography and videography that helps properties look their best online, with drone shots for a stronger sense of place."
        tags={["Real Estate", "Photography", "Videography", "Drone"]}
      />

      <div className="article-body">
        <h2>What we make</h2>
        <p>
          Altair Studio creates polished visual media for real estate listings, agents and property teams. The work is
          built to give buyers a clear sense of the home, its layout and its setting before they book a showing.
        </p>
        <DetailCards
          cards={[
            { title: "Listing photography", body: "Bright, accurate interiors and exteriors that present a property clearly across listing platforms." },
            { title: "Property videography", body: "Short walkthroughs and listing films that give buyers a natural feeling for the space and flow of a home." },
            { title: "Drone shots", body: "Aerial perspectives that show the lot, surroundings, access and neighbourhood context." },
          ]}
        />
      </div>

      <CtaPanel
        title="Need media for a listing?"
        body="Get in touch to discuss photography, video or drone coverage for your next property shoot."
        href={`mailto:${site.email}?subject=Altair%20Studio%20project`}
        action="Start a conversation"
      />
    </main>
  );
}
