import type { MetadataRoute } from "next";
import { posts, projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/writing", "/resume", "/contact"];
  const detail = [...projects, ...posts].flatMap((item) => (item.href ? [item.href] : []));
  return [...new Set([...pages, ...detail])].map((path) => ({ url: `${site.url}${path}` }));
}
