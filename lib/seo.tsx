import type { Metadata } from "next";
import type { ReactNode } from "react";
import { site } from "./content";

const socialProfiles = [site.linkedin, site.github, site.youtube, site.instagram, site.x, site.threads, site.realtor];

const memorial = {
  "@type": "CollegeOrUniversity",
  name: "Memorial University of Newfoundland",
  url: "https://www.mun.ca",
};

/** Wide crop of the headshot for link previews (Open Graph and X cards). */
export const shareImages = [{ url: "/images/felix-oyeleke-share.jpg", width: 1200, height: 630, alt: "Felix Oyeleke" }];

/** One sentence used for the site description, the person profile and social cards. */
export const bio =
  "Felix Oyeleke turns strategy into execution, combining business thinking, technical expertise and the ability to build. PMP and MBA candidate at Memorial University.";

/** Default page title, used on the home page and as the fallback for social cards. */
export const siteTitle = `${site.name} | Strategy, Technology & Execution`;

/**
 * Metadata for one indexable page: title, description, canonical URL and matching social cards.
 * Next.js replaces (not merges) `openGraph` and `twitter` from the layout, so the full card is rebuilt here.
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
  absoluteTitle,
}: {
  path: string;
  title: string;
  description: string;
  type?: "website" | "article" | "profile";
  /** Set when the title should not get the " | Felix Oyeleke" suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: site.name,
      type,
      locale: "en_CA",
      url: path,
      title: fullTitle,
      description,
      images: shareImages,
    },
    twitter: {
      card: "summary_large_image",
      site: site.xHandle,
      creator: site.xHandle,
      title: fullTitle,
      description,
      images: shareImages,
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  givenName: "Felix",
  familyName: "Oyeleke",
  url: site.url,
  image: `${site.url}/images/felix-oyeleke.jpg`,
  jobTitle: "Entrepreneur, Technologist and PMP Project Manager",
  description: bio,
  email: `mailto:${site.email}`,
  sameAs: socialProfiles,
  homeLocation: {
    "@type": "Place",
    name: "St. John's, Newfoundland and Labrador, Canada",
  },
  alumniOf: [
    memorial,
    { "@type": "CollegeOrUniversity", name: "Fisheries and Marine Institute of Memorial University of Newfoundland", url: "https://www.mi.mun.ca" },
    { "@type": "CollegeOrUniversity", name: "Federal University of Technology, Akure" },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Project Management Professional (PMP)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Project Management Institute", url: "https://www.pmi.org" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Professional Scrum Master I (PSM I)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Scrum.org", url: "https://www.scrum.org" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "ISO 9001 Internal Auditor",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "SGS" },
    },
    { "@type": "EducationalOccupationalCredential", name: "Category A Hydrographer", credentialCategory: "certification" },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Master of Applied Ocean Technology (Ocean Mapping), with Distinction",
      credentialCategory: "degree",
      recognizedBy: memorial,
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Bachelor of Technology, Marine Science and Technology (Geoscience)",
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Federal University of Technology, Akure" },
    },
    { "@type": "EducationalOccupationalCredential", name: "Licensed REALTOR®", credentialCategory: "license" },
  ],
  knowsAbout: [
    "Strategy and operations",
    "Strategic management",
    "Program management",
    "Project management",
    "Business development",
    "Business transformation",
    "Operations management",
    "Product operations",
    "Innovation management",
    "Stakeholder management",
    "Entrepreneurship",
    "Hydrography",
    "Ocean mapping",
    "Side-scan sonar",
    "Multibeam bathymetry",
    "XTF sonar data",
    "Geospatial software development",
    "GIS",
    "PostGIS",
    "C++",
    "Qt",
    "OpenGL",
    "GPU acceleration",
    "Python",
    "Data engineering",
    "Scientific visualization",
    "Offshore surveying",
    "Offshore wind",
    "Oil and gas operations",
    "Artificial intelligence workflows",
    "Technical SEO",
    "Real estate technology",
  ],
};

/** Credits Felix as the author of a page (articles, notes) for search engines. */
export function articleJsonLd({
  path,
  title,
  description,
  date,
  type = "Article",
}: {
  path: string;
  title: string;
  description: string;
  date?: string;
  type?: "Article" | "TechArticle";
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    ...(date ? { datePublished: date } : {}),
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
    inLanguage: "en-CA",
  };
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  alternateName: "felixoyeleke.com",
  url: site.url,
  description: "The professional website of Felix Oyeleke: technology, strategy and digital transformation, with experience, projects, research and writing.",
  publisher: { "@id": `${site.url}/#person` },
  inLanguage: "en-CA",
};

export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/about#profile`,
  url: `${site.url}/about`,
  name: "About Felix Oyeleke",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: { "@id": `${site.url}/#person` },
};

/** Breadcrumb trail from Home through each `{ name, path }` given, e.g. Projects > Dolphin Explorer. */
export function breadcrumbJsonLd(...trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }): ReactNode {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Dolphin Explorer as software Felix created. */
export const dolphinExplorerJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${site.url}/projects/dolphin-explorer#software`,
  name: "Dolphin Explorer",
  url: "https://dolphinexplorer.dev/",
  applicationCategory: "Marine survey data processing software",
  operatingSystem: "Windows",
  programmingLanguage: ["C++", "Qt"],
  description:
    "A native desktop application for importing, visualizing, processing and exporting marine survey data: XTF, EdgeTech JSF and SEG-Y sonar files, 2D/3D mapping, sidescan waterfall review, sub-bottom interpretation and a node-based processing pipeline.",
  author: { "@id": `${site.url}/#person` },
  creator: { "@id": `${site.url}/#person` },
};

/** St. John's Properties as a business Felix founded. */
export const stJohnsPropertiesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/projects/st-johns-properties#organization`,
  name: "St. John's Properties",
  url: "https://stjohnsproperties.ca",
  description:
    "A Newfoundland real estate business and MLS®-powered platform with live listing search, neighbourhood market data and buyer tools.",
  areaServed: "Newfoundland and Labrador, Canada",
  founder: { "@id": `${site.url}/#person` },
};
