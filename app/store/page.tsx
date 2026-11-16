import type { Metadata } from "next";
import { PageIntro } from "@/components/Section";
import { StoreProducts } from "@/components/StoreProducts";
import { Subscribe } from "@/components/Subscribe";
import { visibleProducts as products } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/store" },
  title: "Store",
  description:
    "Guides and toolkits by Felix Oyeleke: moving to and buying a home in Newfoundland, and researching and producing documentary-style stories.",
};

export default function StorePage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Store"
        title="Guides & toolkits."
      >
        <p>
          Practical guides for moving to Canada and buying a home in Newfoundland, and toolkits for researching and
          producing documentary-style stories.
        </p>
      </PageIntro>

      <StoreProducts products={products} />

      <Subscribe
        title={products.some((product) => !product.buyUrl) ? "Get notified when they launch" : "Hear about new releases"}
        text="One email when a new template or toolkit is ready. Unsubscribe anytime."
      />
    </main>
  );
}
