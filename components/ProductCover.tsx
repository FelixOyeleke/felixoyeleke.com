import type { Product } from "@/lib/content";
import { Icon } from "./Icon";

/**
 * A product's cover, drawn rather than photographed: always dark, like a printed book.
 * Sized in container units, so it scales with whatever `.product-stage` it sits in.
 */
export function ProductCover({ product, foot }: { product: Product; foot?: string }) {
  return (
    <span className="cover" aria-hidden="true">
      <span className="cover-top">{product.kind}</span>
      <span className="cover-title">{product.title}</span>
      <span className="cover-mark">
        <Icon name={product.icon} size={240} />
      </span>
      {foot && <span className="cover-foot">{foot}</span>}
    </span>
  );
}
