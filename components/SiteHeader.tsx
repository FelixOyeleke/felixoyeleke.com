"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, site } from "@/lib/content";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    // The mobile menu covers the page, so stop the page scrolling underneath it.
    document.documentElement.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${open ? " menu-open" : ""}`}>
      <div className="site-header-inner">
        <Link className="wordmark" href="/">
          <Logo />
          {site.name}
        </Link>
        <nav className="main-nav" id="primary-nav" aria-label="Primary navigation">
          {nav.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : undefined}
                aria-current={pathname === item.href ? "page" : undefined}
                style={{ "--i": index } as CSSProperties}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-icon" aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
