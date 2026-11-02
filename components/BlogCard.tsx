import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatMonth } from "@/lib/content";
import { CardGo } from "./Icon";

export function BlogCard({ post, loading = "lazy" }: { post: Post; loading?: "eager" | "lazy" }) {
  return (
    <Link className="hub-tile blog-card" href={post.href!}>
      <img
        src={post.thumbnail ?? "/images/research/sonar-tiles-thumb.svg"}
        width={72}
        height={72}
        alt=""
        loading={loading}
      />
      <span className="blog-card-body">
        <span className="blog-card-title">
          {post.title} <time dateTime={post.date}>{post.date && `· ${formatMonth(post.date)}`}</time>
        </span>
        <span className="blog-card-summary">{post.opening ?? post.summary}</span>
      </span>
      <CardGo />
    </Link>
  );
}
