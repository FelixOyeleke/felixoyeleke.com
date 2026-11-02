import { SubscribeForm } from "./SubscribeForm";

/** Mailing-list signup section that closes the Blog and Store pages and product pages. */
export function Subscribe({ id, title, text }: { id?: string; title: string; text: string }) {
  return (
    <section className="subscribe" id={id} aria-labelledby="subscribe-title">
      <div>
        <h2 id="subscribe-title">{title}</h2>
        <p>{text}</p>
      </div>
      <SubscribeForm />
    </section>
  );
}
