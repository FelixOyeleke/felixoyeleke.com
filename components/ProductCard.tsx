import Link from "next/link";
import { isFree, type Product } from "@/lib/content";
import { Icon } from "./Icon";

/** One product in the store grid or a "You may also like" row. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-head">
        <span className="tile-icon">
          <Icon name={product.icon} size={26} />
        </span>
        <span className="product-kind">{product.kind}</span>
      </div>
      <h2>{product.href ? <Link href={product.href}>{product.title}</Link> : product.title}</h2>
      <p>{product.summary}</p>
      {product.href && (
        <Link className="section-link product-more" href={product.href} aria-hidden="true" tabIndex={-1}>
          See what’s inside <span>›</span>
        </Link>
      )}
      <div className="product-foot">
        {product.price && <span className="product-price">{product.price}</span>}
        {product.buyUrl ? (
          <a className="button-link" href={product.buyUrl} rel="noopener">
            {isFree(product) ? "Get it free" : "Buy"} <span className="sr-only">{product.title}</span>
          </a>
        ) : (
          <span className="button-link button-link--soon">Coming soon</span>
        )}
      </div>
    </article>
  );
}
