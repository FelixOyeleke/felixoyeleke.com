import Link from "next/link";
import type { ReactNode } from "react";
import { isFree, products } from "@/lib/content";
import { DetailCards } from "./Article";
import { ProductCover } from "./ProductCover";
import { ProductTile } from "./ProductTile";
import { Subscribe } from "./Subscribe";

/** Small print for the immigration guides, pointing to the official IRCC page for current rules. */
export function ImmigrationNote({ officialUrl }: { officialUrl: string }) {
  return (
    <>
      Immigration rules in Canada change often. This guide explains the process in plain language; it is general
      information, not legal or immigration advice. Always confirm current requirements on the official{" "}
      <a href={officialUrl} rel="noreferrer">
        IRCC website
      </a>
      , and for advice on your own case, speak with a licensed immigration consultant (RCIC) or lawyer.
    </>
  );
}

/**
 * Product page for a guide in the store: a cover on the left, title, price and buy button on the right,
 * then what's inside and other products.
 */
export function GuidePage({
  href,
  lede,
  tags,
  audience,
  chapters,
  note,
}: {
  /** The product's `href` in lib/content.ts; title, price and buy link come from there. */
  href: string;
  lede: string;
  tags: string[];
  audience: ReactNode[];
  chapters: { title: string; body: string }[];
  /** Small print under the chapters: what the guide is not, and where to check current rules. */
  note: ReactNode;
}) {
  const product = products.find((item) => item.href === href)!;
  // Other products of the same kind (the other guides) first, then the rest
  const related = products
    .filter((item) => item !== product)
    .sort((a, b) => Number(b.kind === product.kind) - Number(a.kind === product.kind))
    .slice(0, 3);

  return (
    <main className="product-page">
      <Link className="back-link" href="/store">
        ‹ Store
      </Link>

      <div className="product-hero">
        <div className="product-stage">
          <ProductCover product={product} foot={`${chapters.length} chapters`} />
        </div>

        <div className="product-info">
          <p className="eyebrow">{product.buyUrl ? product.kind : `${product.kind} · Coming soon`}</p>
          <h1>{product.title}</h1>
          <p className="info-price">{product.price ?? "Price coming soon"}</p>

          <div className="product-buy">
            {product.buyUrl ? (
              <a className="button-link button-block" href={product.buyUrl} rel="noopener">
                {isFree(product) ? "Get the free guide" : "Buy the guide"}
              </a>
            ) : (
              <>
                <span className="button-link button-block button-link--soon">Coming soon</span>
                <a className="section-link" href="#notify">
                  Get notified when it’s ready <span aria-hidden="true">›</span>
                </a>
              </>
            )}
          </div>

          <p className="info-lede">{lede}</p>

          <h2>Who it’s for</h2>
          <ul className="info-list">
            {audience.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <ul className="tag-list">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="product-section" aria-labelledby="inside-title">
        <h2 id="inside-title">What’s inside</h2>
        <DetailCards cards={chapters} />
        <p className="fine-print">{note}</p>
      </section>

      {related.length > 0 && (
        <section className="product-section" aria-labelledby="related-title">
          <h2 id="related-title">You may also like</h2>
          <div className="tile-grid">
            {related.map((item) => (
              <ProductTile product={item} key={item.title} />
            ))}
          </div>
        </section>
      )}

      <Subscribe
        id="notify"
        title={product.buyUrl ? "Hear about updates" : "Get notified when it’s ready"}
        text={`One email when the ${product.title} guide ${product.buyUrl ? "is updated" : "launches"}. Unsubscribe anytime.`}
      />
    </main>
  );
}
