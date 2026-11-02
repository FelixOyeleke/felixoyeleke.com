import type { ReactNode } from "react";

/** Content section used on inner pages. */
export function PageSection({
  id,
  title,
  lede,
  children,
}: {
  id?: string;
  title?: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="page-section" id={id}>
      {title && <h2>{title}</h2>}
      {lede && <p className="section-lede">{lede}</p>}
      {children}
    </section>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
