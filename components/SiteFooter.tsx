import { site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <div className="footer-links">
        <a href={`mailto:${site.email}`}>Email</a>
        <a href={site.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={site.youtube} target="_blank" rel="noreferrer">
          YouTube
        </a>
        <ThemeToggle className="footer-theme-toggle theme-toggle" />
      </div>
    </footer>
  );
}
