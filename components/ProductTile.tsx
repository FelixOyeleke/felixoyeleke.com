import Link from "next/link";
import type { Product } from "@/lib/content";
import { ProductCover } from "./ProductCover";

/** Catalogue tile: the cover in a square, then just the name and price. Opens the product's page. */
export function ProductTile({ product }: { product: Product }) {
  const body = (
    <>
      <span className="product-stage tile-stage">
        <ProductCover product={product} />
        {!product.buyUrl && <span className="tile-badge">Coming soon</span>}
      </span>
      <span className="tile-name">{product.title}</span>
      {product.price && <span className="tile-price">{product.price}</span>}
    </>
  );

  if (product.href) {
    return (
      <Link className="product-tile" href={product.href}>
        {body}
      </Link>
    );
  }
  if (product.buyUrl) {
    return (
      <a className="product-tile" href={product.buyUrl} rel="noopener">
        {body}
      </a>
    );
  }
  return <div className="product-tile">{body}</div>;
}
