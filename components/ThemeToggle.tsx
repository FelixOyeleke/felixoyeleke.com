"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "felix-theme";

// Runs before hydration (see app/layout.tsx) so the saved theme applies without a flash.
export const themeScript = `try{if(localStorage.getItem("${STORAGE_KEY}")==="light")document.documentElement.classList.add("light")}catch(e){}`;

export function ThemeToggle({ className = "theme-toggle" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setLight(root.classList.contains("light"));
    sync();
    // Keep the header and footer toggles in step with each other.
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {}
  }

  return (
    <button
      className={className}
      type="button"
      onClick={toggle}
      aria-pressed={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
    >
      <span aria-hidden="true">{light ? "☾" : "☀"}</span>
    </button>
  );
}
