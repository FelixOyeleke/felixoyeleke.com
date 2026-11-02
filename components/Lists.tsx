import Link from "next/link";
import type { BrandLogo } from "@/lib/content";
import { BrandMark } from "./BrandMark";
import { CardGo } from "./Icon";

/** Full-width list used on the Projects and Blog pages. */
export function PageList({
  items,
}: {
  items: {
    key: string;
    label?: React.ReactNode;
    logo?: BrandLogo;
    title: string;
    summary: string;
    tags: string[];
    href?: string;
    external?: boolean;
  }[];
}) {
  return (
    <div className="page-list">
      {items.map((item) => {
        const body = (
          <>
            {item.label && <span className="page-list-label">{item.label}</span>}
            {item.logo && <BrandMark logo={item.logo} />}
            <div className="page-list-body">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="tag-list tag-list--small">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            {item.href && <CardGo external={item.external} />}
          </>
        );
        return item.href && item.external ? (
          <a className="page-list-item" href={item.href} key={item.key} target="_blank" rel="noreferrer">
            {body}
          </a>
        ) : item.href ? (
          <Link className="page-list-item" href={item.href} key={item.key}>
            {body}
          </Link>
        ) : (
          <div className="page-list-item" key={item.key}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
