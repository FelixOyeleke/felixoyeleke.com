// Shared by the server layout and the client theme toggle, so it must not live in a "use client" file:
// server code only gets a placeholder for values exported from client modules.

const STORAGE_KEY = "felix-theme";

/** Page background per theme; the phone browser bar (theme-color) follows it. */
export const THEME_COLORS = { light: "#fbfbfb", dark: "#0a0a0a" };

export { STORAGE_KEY as THEME_STORAGE_KEY };

/** Id of the theme-color tag the script owns. Next.js renders its own light default for no-JS visitors;
 *  editing that one before hydration makes React add a duplicate, so the script adds its own instead. */
export const THEME_COLOR_ID = "theme-color-live";

// Runs before hydration (see app/layout.tsx) so a saved dark theme applies without a flash.
// Light is the default class rendered by the root layout. The script also puts its own theme-color
// tag first in <head>; browsers use the first one, so the phone browser bar matches the theme.
export const themeScript = `try{var d=localStorage.getItem("${STORAGE_KEY}")==="dark";if(d)document.documentElement.classList.remove("light");var m=document.createElement("meta");m.name="theme-color";m.id="${THEME_COLOR_ID}";m.content=d?"${THEME_COLORS.dark}":"${THEME_COLORS.light}";document.head.prepend(m)}catch(e){}`;
