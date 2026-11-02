import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="404 · Off the chart"
        title={
          <>
            No soundings{" "}
            <br />
            at this location.
          </>
        }
      >
        <p>
          The page you’re looking for has moved or never existed. The site was recently rebuilt, so older links may
          point somewhere new.
        </p>
        <div className="hero-actions">
          <Link className="button-link" href="/">
            Back to home
          </Link>
          <Link className="section-link" href="/projects">
            Browse projects <span aria-hidden="true">›</span>
          </Link>
        </div>
      </PageIntro>
    </main>
  );
}
