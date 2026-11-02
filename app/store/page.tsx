import type { Metadata } from "next";
import { PageIntro } from "@/components/Section";
import { StoreProducts } from "@/components/StoreProducts";
import { Subscribe } from "@/components/Subscribe";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Store",
  description: "Guides, templates and courses by Felix Oyeleke for moving to Canada, buying a home, research and storytelling.",
};

export default function StorePage() {
  return (
    <main className="inner-page">
      <PageIntro
        eyebrow="Store"
        title={
          <>
            Creator tools{" "}
            <br />
            &amp; resources.
          </>
        }
      >
        <p>
          Guides, templates and courses for moving to Canada, buying a home, researching a story and building useful
          systems around life and work in Atlantic Canada.
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
