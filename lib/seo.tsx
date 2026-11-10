import type { ReactNode } from "react";
import { site } from "./content";

const socialProfiles = [site.linkedin, site.github, site.youtube, site.x, site.threads];

const memorial = {
  "@type": "CollegeOrUniversity",
  name: "Memorial University of Newfoundland",
  url: "https://www.mun.ca",
};

/** One sentence used for the site description, the person profile and social cards. */
export const bio =
  "Felix Oyeleke builds hydrographic and geospatial software, leads projects as a PMP, and runs ventures in technology and real estate from St. John's, Canada.";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  givenName: "Felix",
  familyName: "Oyeleke",
  url: site.url,
  image: `${site.url}/images/felix.webp`,
  jobTitle: "Entrepreneur, Geospatial Software Builder and PMP Project Manager",
  description: bio,
  email: `mailto:${site.email}`,
  sameAs: socialProfiles,
  homeLocation: {
    "@type": "Place",
    name: "St. John's, Newfoundland and Labrador, Canada",
  },
  alumniOf: [
    memorial,
    { "@type": "CollegeOrUniversity", name: "Federal University of Technology, Akure" },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Project Management Professional (PMP)",
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: "Project Management Institute", url: "https://www.pmi.org" },
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
      name: "Bachelor of Technology, Marine Science and Technology",
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: "Federal University of Technology, Akure" },
    },
    { "@type": "EducationalOccupationalCredential", name: "Licensed REALTOR®", credentialCategory: "license" },
  ],
  knowsAbout: [
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
    "Project management",
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
  url: site.url,
  description: "The personal website of Felix Oyeleke: hydrographic and geospatial software, project management, writing and notes.",
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
  applicationCategory: "Hydrographic data processing software",
  description:
    "A hydrographic console that parses XTF side-scan sonar data, renders a GPU waterfall view and is gaining a desktop GUI built with C++, Qt and OpenGL.",
  author: { "@id": `${site.url}/#person` },
  creator: { "@id": `${site.url}/#person` },
};
