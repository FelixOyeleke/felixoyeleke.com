import { site } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="footer-links">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.x} target="_blank" rel="noreferrer">
            X
          </a>
          <a href={site.threads} target="_blank" rel="noreferrer">
            Threads
          </a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={site.youtube} target="_blank" rel="noreferrer">
            YouTube
          </a>
          <ThemeToggle className="footer-theme-toggle theme-toggle" />
        </div>
      </div>
    </footer>
  );
}
