import type { Product } from "@/lib/content";
import { PageSection } from "./Section";
import { ProductTile } from "./ProductTile";

/** The store groups its few products by who they are for, rather than filtering a large catalogue. */
const groups: { title: string; includes: (product: Product) => boolean }[] = [
  { title: "Moving to and buying in Newfoundland", includes: (product) => product.category === "Guides" },
  { title: "Creator toolkits", includes: (product) => product.category !== "Guides" },
];

export function StoreProducts({ products }: { products: Product[] }) {
  return (
    <>
      {groups.map((group) => {
        const items = products.filter(group.includes);
        if (items.length === 0) return null;
        return (
          <PageSection title={group.title} key={group.title}>
            <div className="tile-grid">
              {items.map((product) => (
                <ProductTile product={product} key={product.title} />
              ))}
            </div>
          </PageSection>
        );
      })}
    </>
  );
}
