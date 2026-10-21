import type { ReactNode } from "react";

/** Content section used on inner pages. */
export function PageSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="page-section">
      {title && <h2>{title}</h2>}
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
