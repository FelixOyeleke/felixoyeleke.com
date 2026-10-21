import Link from "next/link";

/** Full-width list used on the Projects and Writing pages. */
export function PageList({
  items,
}: {
  items: { key: string; label?: React.ReactNode; title: string; summary: string; tags: string[]; href?: string }[];
}) {
  return (
    <div className="page-list">
      {items.map((item) => {
        const body = (
          <>
            {item.label}
            <div>
              <h3>
                {item.title}
                {item.href && " →"}
              </h3>
              <p>{item.summary}</p>
              <small>{item.tags.join(" · ")}</small>
            </div>
          </>
        );
        const className = item.label ? "page-list-item" : "page-list-item page-list-item--plain";
        return item.href ? (
          <Link className={className} href={item.href} key={item.key}>
            {body}
          </Link>
        ) : (
          <div className={className} key={item.key}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
