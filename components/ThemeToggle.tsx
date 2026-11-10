"use client";

import { useEffect, useState } from "react";
import { THEME_COLOR_ID, THEME_COLORS, THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";

function syncThemeColor(light: boolean) {
  document.getElementById(THEME_COLOR_ID)?.setAttribute("content", light ? THEME_COLORS.light : THEME_COLORS.dark);
}

export function ThemeToggle({ className = "theme-toggle" }: { className?: string }) {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const isLight = root.classList.contains("light");
      setLight(isLight);
      syncThemeColor(isLight);
    };
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
      {light ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      )}
    </button>
  );
}
