import type { MetadataRoute } from "next";
import { noteWritings, posts, products, projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/blog", "/notes", "/store", "/resume"];
  const detail = [...projects, ...posts, ...products].flatMap((item) =>
    item.href?.startsWith("/") ? [item.href] : [],
  );
  const notes = noteWritings.map((note) => `/notes/${note.slug}`);
  return [...new Set([...pages, ...detail, ...notes])].map((path) => ({
    url: `${site.url}${path}`,
    ...(path === "" ? { images: [`${site.url}/images/felix.webp`] } : {}),
  }));
}
