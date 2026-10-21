export const site = {
  name: "Felix Oyeleke",
  url: "https://felixoyeleke.com",
  email: "hi@felixoyeleke.com",
  github: "https://github.com/felixoyeleke",
  githubUser: "felixoyeleke",
  linkedin: "https://linkedin.com/in/felixoyeleke",
  youtube: "https://www.youtube.com/@felixoyeleke",
};

export type Venture = { title: string; line: string; href: string; external?: boolean };

/** Home page "Building" index: everything Felix runs or makes, one line each. */
export const building: Venture[] = [
  {
    title: "St. John’s Properties",
    line: "Live MLS® search, market data and buyer tools for Newfoundland real estate.",
    href: "/projects/st-johns-properties",
  },
  {
    title: "Dolphin Explorer",
    line: "A hydrographic console that turns raw XTF sonar captures into a fast, reviewable waterfall.",
    href: "/projects/dolphin-explorer",
  },
  {
    title: "Sonar Tokenizer",
    line: "Research into streaming side-scan sonar as visual tokens — 32% faster ingest.",
    href: "/writing/visual-tokenization-of-sonar-data",
  },
  {
    title: "YouTube",
    line: "Videos on Newfoundland real estate and life in Canada.",
    href: "https://www.youtube.com/@felixoyeleke",
    external: true,
  },
];

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Dolphin Explorer",
    summary:
      "Open-source hydrographic data exploration and processing software with interactive visualization and analysis tools.",
    tags: ["Python", "3D Visualization", "Geospatial", "Open Source"],
    href: "/projects/dolphin-explorer",
    featured: true,
  },
  {
    title: "Sonar Tokenizer",
    summary:
      "Research prototype that rasterizes XTF side-scan pings into visual tokens for faster streaming, indexing and on-board QA.",
    tags: ["Rust", "Computer Vision", "Compression", "Research"],
    href: "/writing/visual-tokenization-of-sonar-data",
  },
  {
    title: "St. John’s Properties",
    summary:
      "Live MLS®-powered real estate platform for Newfoundland — listing search, neighbourhood market data and buyer tools.",
    tags: ["Next.js", "Python", "PostgreSQL", "PostGIS", "CREA DDF"],
    href: "/projects/st-johns-properties",
    featured: true,
  },
  {
    title: "AI & Automation Tools",
    summary: "A collection of tools and scripts for data processing, AI-assisted workflows and productivity.",
    tags: ["Python", "AI/ML", "Automation", "APIs"],
    featured: true,
  },
];

export type Post = {
  title: string;
  summary: string;
  tags: string[];
  /** ISO month, e.g. "2025-11". Omitted for drafts. */
  date?: string;
  href?: string;
  /** Opening line of the post, shown on the home page. */
  opening?: string;
  thumbnail?: string;
};

export const posts: Post[] = [
  {
    title: "Visual tokenization of sonar data",
    summary:
      "Turning raw XTF side-scan captures into visual tokens so image-native compressors can stream hydrographic surveys faster, with under 0.9% amplitude drift.",
    tags: ["Hydrography", "Compression", "Computer vision"],
    date: "2025-11",
    href: "/writing/visual-tokenization-of-sonar-data",
    opening: "Survey vessels log terabytes of XTF every week. Traditional readers march through each packet linearly…",
    thumbnail: "/images/research/sonar-tiles.svg",
  },
];

export const drafts: Post[] = [
  {
    title: "Building a real-time property data pipeline",
    summary: "How I designed a geospatial data pipeline for property data using PostGIS and automated workflows.",
    tags: ["Data", "PostGIS", "Automation"],
  },
  {
    title: "Lessons from offshore survey projects",
    summary: "Key takeaways from working on marine geophysical projects in challenging environments.",
    tags: ["Projects", "Fieldwork", "Delivery"],
  },
  {
    title: "Small systems, useful leverage",
    summary: "Why the best internal tools often begin with one repeated task and a clear definition of done.",
    tags: ["Systems", "Productivity", "Software"],
  },
];

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-CA", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
