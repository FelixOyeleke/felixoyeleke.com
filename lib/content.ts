export const site = {
  name: "Felix Oyeleke",
  url: "https://www.felixoyeleke.com",
  email: "hi@felixoyeleke.com",
  github: "https://github.com/felixoyeleke",
  githubUser: "felixoyeleke",
  linkedin: "https://linkedin.com/in/felixoyeleke",
  youtube: "https://www.youtube.com/@felixoyeleke",
  x: "https://x.com/felixoyeleke10",
  xHandle: "@felixoyeleke10",
  threads: "https://www.threads.com/@felixoyeleke",
  instagram: "https://www.instagram.com/felixoyeleke",
  realtor: "https://www.realtor.ca/agent/2255501/felix-oyeleke-33-pippy-place-suite-304-st-johns-newfoundland-labrador-a1b3x2",
};

/** A project's real logo, shown in its own colours. `fill`: it has its own background, so it fills its box. */
export type BrandLogo = { src: string; fill?: boolean };

export const brandLogos = {
  stJohnsProperties: { src: "/images/logos/st-johns-properties.svg" },
  dolphinExplorer: { src: "/images/logos/dolphin-explorer.webp", fill: true },
  altairStudio: { src: "/images/logos/altair-studio-black-to-light.png" },
  youtube: { src: "/images/logos/youtube.svg" },
} satisfies Record<string, BrandLogo>;

export type Venture = {
  title: string;
  label: string;
  line: string;
  href: string;
  external?: boolean;
  icon: "home" | "sonar" | "tiles" | "play" | "image";
  /** Shown instead of `icon` when set. */
  logo?: BrandLogo;
};

/** Home page "Building" index: everything Felix runs or makes, one line each. */
export const building: Venture[] = [
  {
    title: "St. John’s Properties",
    label: "Real estate",
    line: "Live MLS® search, market data and buyer tools for Newfoundland real estate.",
    href: "/projects/st-johns-properties",
    icon: "home",
    logo: brandLogos.stJohnsProperties,
  },
  {
    title: "Dolphin Explorer",
    label: "Hydrography",
    line: "A hydrographic console that turns raw XTF sonar captures into a fast, reviewable waterfall.",
    href: "/projects/dolphin-explorer",
    icon: "sonar",
    logo: brandLogos.dolphinExplorer,
  },
  {
    title: "Altair Studio",
    label: "Real estate photography",
    line: "Real estate photography, videography and drone shots for properties and listings.",
    href: "/projects/altair-studio",
    icon: "image",
    logo: brandLogos.altairStudio,
  },
  {
    title: "YouTube",
    label: "Video",
    line: "Videos on Newfoundland real estate and life in Canada.",
    href: "https://www.youtube.com/@felixoyeleke",
    external: true,
    icon: "play",
    logo: brandLogos.youtube,
  },
];

export type NoteTopic = {
  slug: string;
  label: string;
  title: string;
  line: string;
  icon: "chip" | "search" | "neuron";
  /** ISO month of the last meaningful revision, e.g. "2026-11". */
  updated: string;
};

export const noteTopics: NoteTopic[] = [
  {
    slug: "workstation-setup",
    icon: "chip",
    updated: "2026-11",
    label: "Hardware",
    title: "Current workstation setup",
    line: "The hardware I use to build, profile, and visualize scientific and geospatial software.",
  },
  {
    slug: "seo-systems",
    icon: "search",
    updated: "2026-11",
    label: "Distribution",
    title: "SEO systems",
    line: "Technical SEO, structured content, and the small details that help useful work get found.",
  },
  {
    slug: "ai-workflows",
    icon: "neuron",
    updated: "2026-11",
    label: "Automation",
    title: "AI workflows",
    line: "Practical experiments with AI tools, agents, and automation for research and production.",
  },
];

export type NoteWriting = NoteTopic & {
  lede: string;
  tldr: string;
  tags: string[];
  specs?: { label: string; value: string; note: string }[];
  /** Product shots with transparent backgrounds, shown on a neutral panel under the specs. */
  gallery?: { src: string; alt: string; caption: string }[];
  sections: { heading: string; body: string; bullets?: string[] }[];
};

export const noteWritings: NoteWriting[] = [
  {
    ...noteTopics[0],
    lede: "A documented view of the workstation I use to build and profile DolphinExplorer, a C++ application for processing and visualizing hydrographic and marine geophysical survey data.",
    tldr: "This setup combines an NVIDIA GeForce RTX 5070 Ti, AMD Ryzen 9 5900X, 64 GB of system RAM, and an ASUS TUF Gaming X570-Pro WiFi board inside a Fractal Design case.",
    tags: ["Workstation", "C++", "Qt", "OpenGL", "DolphinExplorer"],
    specs: [
      { label: "Graphics", value: "RTX 5070 Ti", note: "NVIDIA GeForce · 16 GB VRAM" },
      { label: "Processor", value: "5900X", note: "AMD Ryzen 9 · 12 cores" },
      { label: "Memory", value: "64 GB", note: "System RAM" },
    ],
    gallery: [
      { src: "/images/notes/workstation-gpu.webp", alt: "NVIDIA GeForce RTX 5070 Ti graphics card", caption: "GeForce RTX 5070 Ti" },
      { src: "/images/notes/workstation-case.webp", alt: "Fractal Design PC case with mesh front panel", caption: "Fractal Design case" },
    ],
    sections: [
      { heading: "My development setup", body: "My development machine uses an NVIDIA GeForce RTX 5070 Ti with 16 GB of dedicated VRAM, an AMD Ryzen 9 5900X, 64 GB of system RAM, and an ASUS TUF Gaming X570-Pro WiFi motherboard. In the captured Task Manager reading, the GPU is using 4.2 GB of dedicated memory at 3% utilization and 40°C. DirectX reports Feature Level 12.2 and the driver version is 32.0.16.1742.", bullets: ["Dedicated GPU memory: 16 GB", "Shared GPU memory: 47.9 GB", "Total available GPU memory: 63.9 GB", "Shared memory is system RAM available to the GPU, not additional dedicated VRAM."] },
      { heading: "What DolphinExplorer processes", body: "DolphinExplorer is the application I use to work with sidescan sonar (SSS), multibeam echosounder (MBES) bathymetry, sub-bottom profiler (SBP), and marine magnetometer data. The files are large, the samples are dense, and the useful view is often interactive. That combination makes file size, memory usage, rendering speed, and input latency practical engineering constraints rather than abstract benchmarks." },
      { heading: "C++ and Qt architecture", body: "I use C++ and Qt to keep the desktop application responsive while data is loaded, decoded, transformed, and displayed. The interface, data models, processing stages, and rendering layers need clear boundaries so a change in one part does not make the rest of the application harder to profile or reason about." },
      { heading: "OpenGL and GPU acceleration", body: "The main GPU work is interactive visualization, including sidescan sonar waterfall displays and repeated image transforms. I move work to the GPU when the workload is parallel enough to benefit and when CPU-to-GPU transfer and synchronization do not cost more than the computation saves.", bullets: ["Render sonar and geospatial data interactively with OpenGL.", "Keep large buffers in GPU-friendly representations where possible.", "Compare GPU and optimized CPU paths on the same dataset before keeping the added complexity."] },
      { heading: "Memory management and XTF processing", body: "The application reads XTF files, handles sonar samples, and prepares data for visualization. My focus is reducing unnecessary copies and avoiding full-file work on the interaction path. Reusing buffers, staging predictable chunks, and processing only what the current view needs are more useful than simply adding more parallel work." },
      { heading: "How I measure improvements", body: "I record the bottleneck, the change I tested, the measurement used, and the limits of the result. Frame time, memory growth, upload cost, processing throughput, and input-to-pixel latency tell me whether an optimization improves the actual workflow on this machine." },
      { heading: "Machine learning experiments", body: "I am also investigating where GPU inference could support automated interpretation of survey data. The important questions are how inference fits into the existing pipeline, how results are shown to a survey user, and how to preserve enough evidence that an automated suggestion can be reviewed." },
      { heading: "What is documented", body: "I separate completed implementations from experimental and planned features. Each note aims to record the problem, relevant code, design decisions, measurements, limitations, and lessons learned so the result is useful to developers working with scientific visualization, geospatial software, and computationally demanding applications." },
    ],
  },
  {
    ...noteTopics[1],
    lede: "Working notes on technical SEO, useful content structure, and the evidence I use to decide whether a page is becoming easier to find.",
    tldr: "SEO is a system of clear pages, explicit relationships, and feedback from real search behavior. The goal is to make useful work understandable to both people and crawlers.",
    tags: ["SEO", "Content", "Web systems"],
    sections: [
      { heading: "Start with a useful page", body: "Search visibility follows usefulness more reliably than it follows a checklist. Each page should answer one clear question, name its audience, and make the next action obvious. I write the page around the task first, then add the metadata that helps the page describe itself." },
      { heading: "Make structure explicit", body: "Titles, headings, descriptions, canonical URLs, structured data, and a clean sitemap reduce ambiguity. They are small signals, but together they tell search engines what a page is, how it relates to the rest of the site, and which URL should represent it.", bullets: ["Give every important page a specific title and description.", "Use headings to expose the actual information hierarchy.", "Keep internal links descriptive and connected to the user’s next question."] },
      { heading: "Connect the library", body: "A site becomes easier to explore when related pages point to one another. Project pages can lead to technical notes, notes can lead to relevant projects, and guides can answer the practical question that brought someone to the site. Internal linking is information architecture expressed as navigation." },
      { heading: "Watch the evidence", body: "I look at impressions, clicks, queries, indexing status, page speed, and the questions people actually use. A page that gets impressions but few clicks may need a clearer title. A page with clicks but poor engagement may be answering the wrong question. The next change should follow that evidence." },
    ],
  },
  {
    ...noteTopics[2],
    lede: "A practical log of using AI for research and production: constrain the task, keep the source material visible, and review the result before it ships.",
    tldr: "AI works best in small, bounded steps where the input, expected output, and review rule are clear. The workflow is the product; the model is one component inside it.",
    tags: ["AI", "Automation", "Workflows"],
    sections: [
      { heading: "Give the model bounded work", body: "The most dependable tasks are transformations with a clear shape: extract fields, compare documents, draft alternatives, classify a small set, or turn notes into a first outline. Open-ended prompts make it harder to tell whether the result is complete or merely plausible." },
      { heading: "Keep the source material close", body: "Good AI workflows make the relevant source easy to inspect. I prefer a small context window assembled from the actual project files over a broad prompt that asks the model to guess. The source, assumptions, and output should stay connected so a person can check the result quickly.", bullets: ["Pass only the context needed for the current decision.", "Preserve links, filenames, dates, and quoted evidence where they matter.", "Separate generated suggestions from confirmed project facts."] },
      { heading: "Add review gates", body: "A useful workflow says where a person must review, what they are checking, and what happens when the output is wrong. High-impact decisions, public claims, and irreversible actions need a clear human checkpoint. Automation should remove repetition, not remove responsibility." },
      { heading: "Ship small workflows", body: "I get better results by automating one repeated step and observing it in use before connecting five more. A small workflow is easier to debug, measure, and replace. Once it earns trust, it can become a reusable tool instead of a clever prompt someone has to remember." },
    ],
  },
];

export const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Notes" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

export const productCategories = ["Guides", "Digital assets", "Courses"] as const;
export type ProductCategory = (typeof productCategories)[number];

export type Product = {
  title: string;
  summary: string;
  kind: string;
  category: ProductCategory;
  price?: string;
  icon: "play" | "map" | "image" | "cap" | "passport" | "home";
  href?: string;
  buyUrl?: string;
};

export const isFree = (product: Product) => product.price?.toLowerCase() === "free";

export const products: Product[] = [
  { title: "Creator Systems Mastery", summary: "A practical toolkit for planning, researching and producing YouTube videos — so you can ship documentary-style stories consistently without burning out.", kind: "Course + templates", category: "Courses", price: "$149", icon: "play" },
  { title: "Field Research & Story Planning Hub", summary: "Notion and spreadsheet templates for tracking sources, locations, interviews and b-roll for documentary-style projects.", kind: "Template pack", category: "Digital assets", price: "$79", icon: "map" },
  { title: "Wallpapers", summary: "High-resolution wallpapers for desktop and phone.", kind: "Wallpaper pack", category: "Digital assets", icon: "image" },
  { title: "Study in Canada", summary: "A step-by-step guide for international students: choosing a program, getting your study permit, and settling in once you land.", kind: "Guide", category: "Guides", price: "$25", icon: "cap", href: "/store/study-in-canada" },
  { title: "Canada PR", summary: "A step-by-step guide to becoming a permanent resident: finding your pathway, building your Express Entry profile, and applying once you’re invited.", kind: "Guide", category: "Guides", icon: "passport", href: "/store/canada-pr" },
  { title: "First-Time Home Buyer", summary: "Buying your first home in Newfoundland and Labrador, step by step: getting pre-approved, saving for the down payment, making an offer, and closing.", kind: "Guide", category: "Guides", price: "Free", icon: "home", href: "/store/first-time-home-buyer" },
];

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  external?: boolean;
  featured?: boolean;
  logo?: BrandLogo;
};

export const projects: Project[] = [
  { title: "Dolphin Explorer", summary: "Open-source hydrographic data exploration and processing software with interactive visualization and analysis tools.", tags: ["Python", "3D Visualization", "Geospatial", "Open Source"], href: "/projects/dolphin-explorer", featured: true, logo: brandLogos.dolphinExplorer },
  { title: "Altair Studio", summary: "Real estate photography and videography, including drone shots that help properties stand out online.", tags: ["Real Estate", "Photography", "Videography", "Drone"], href: "/projects/altair-studio", logo: brandLogos.altairStudio },
  { title: "St. John’s Properties", summary: "Live MLS®-powered real estate platform for Newfoundland — listing search, neighbourhood market data and buyer tools.", tags: ["Next.js", "Python", "PostgreSQL", "PostGIS", "CREA DDF"], href: "/projects/st-johns-properties", featured: true, logo: brandLogos.stJohnsProperties },
  { title: "AI & Automation Tools", summary: "A collection of tools and scripts for data processing, AI-assisted workflows and productivity.", tags: ["Python", "AI/ML", "Automation", "APIs"], featured: true },
];
export type Post = {
  title: string;
  summary: string;
  tags: string[];
  logo?: BrandLogo;
  /** ISO month, e.g. "2025-11". Omitted for drafts. */
  date?: string;
  href?: string;
  /** Opening line of the post, shown on the home page. */
  opening?: string;
  /** Square image for compact cards. */
  thumbnail?: string;
};

export const posts: Post[] = [
  {
    title: "From survey vessel to useful map",
    summary:
      "What happens between a sonar ping recorded offshore and a map that someone can trust: capture, navigation, QA, processing and delivery.",
    tags: ["Hydrography", "GIS", "Fieldwork"],
    logo: brandLogos.dolphinExplorer,
    date: "2026-10",
    href: "/blog/from-survey-vessel-to-useful-map",
    opening: "A useful map is the final frame of a much longer chain of decisions made offshore…",
    thumbnail: "/images/research/sonar-token-flow.svg",
  },
  {
    title: "Asking prices are not sold prices",
    summary:
      "How to read a local real estate market page without confusing asking prices, inventory, days listed and actual sale outcomes.",
    tags: ["Real estate", "Market data", "Newfoundland"],
    logo: brandLogos.stJohnsProperties,
    date: "2026-09",
    href: "/blog/asking-prices-are-not-sold-prices",
    opening: "A market page can look precise while still answering the wrong question…",
    thumbnail: "/images/projects/st-johns-properties-market.webp",
  },
  {
    title: "Buying an older home in Newfoundland",
    summary:
      "A practical starting point for evaluating older homes: moisture, insulation, heating, foundations, roofs and the questions to ask early.",
    tags: ["Home buying", "Newfoundland", "Practical guide"],
    logo: brandLogos.stJohnsProperties,
    date: "2026-08",
    href: "/blog/buying-an-older-home-in-newfoundland",
    opening: "Older homes can have character, good locations and hidden work in equal measure…",
    thumbnail: "/images/projects/st-johns-properties-home.webp",
  },
  {
    title: "The difference between a demo and a production tool",
    summary:
      "The practical gap between software that works once and software people can rely on every day: failure states, observability, documentation and ownership.",
    tags: ["Software", "Delivery", "Systems"],
    logo: brandLogos.dolphinExplorer,
    date: "2026-07",
    href: "/blog/demo-to-production-tool",
    opening: "A demo proves that something is possible. A production tool proves that people can depend on it…",
    thumbnail: "/images/research/sonar-tiles-thumb.svg",
  },
  {
    title: "Visual tokenization of sonar data",
    summary:
      "Turning raw XTF side-scan captures into visual tokens so image-native compressors can stream hydrographic surveys faster, with under 0.9% amplitude drift.",
    tags: ["Hydrography", "Compression", "Computer vision"],
    logo: brandLogos.dolphinExplorer,
    date: "2025-11",
    href: "/blog/visual-tokenization-of-sonar-data",
    opening: "Survey vessels log terabytes of XTF every week. Traditional readers march through each packet linearly…",
    thumbnail: "/images/research/sonar-tiles-thumb.svg",
  },
];

/** Posts that have a page, newest first. */
export const publishedPosts = posts
  .filter((post) => post.href && post.date)
  .sort((a, b) => b.date!.localeCompare(a.date!));

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




