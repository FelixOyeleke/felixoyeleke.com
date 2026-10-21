import type { ReactNode } from "react";

export function ArticleHeader({
  eyebrow,
  title,
  lede,
  tags,
}: {
  eyebrow: ReactNode;
  title: string;
  lede: string;
  tags: string[];
}) {
  return (
    <header className="article-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="article-lede">{lede}</p>
      <ul className="tag-list">
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </header>
  );
}

export function StatRow({ stats }: { stats: { label: string; value: string; note: string }[] }) {
  return (
    <dl className="stat-row">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>
            <strong>{stat.value}</strong>
            {stat.note}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Tldr({ children }: { children: ReactNode }) {
  return (
    <p className="tldr">
      <strong>TL;DR</strong> — {children}
    </p>
  );
}

export function StatusList({ items }: { items: { done: boolean; text: string }[] }) {
  return (
    <ul className="status-list">
      {items.map((item) => (
        <li key={item.text}>
          <span className={`status ${item.done ? "status-done" : "status-progress"}`}>
            {item.done ? "Done" : "In progress"}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function DetailCards({ cards }: { cards: { title: string; body: ReactNode }[] }) {
  return (
    <div className="detail-grid">
      {cards.map((card) => (
        <article className="detail-card" key={card.title}>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </article>
      ))}
    </div>
  );
}

export function CtaPanel({ title, body, href, action }: { title: string; body: string; href: string; action: string }) {
  return (
    <div className="resume-panel cta-panel">
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <a className="button-link" href={href}>
        {action}
      </a>
    </div>
  );
}
