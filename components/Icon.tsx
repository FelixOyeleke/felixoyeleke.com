/** Small monochrome line icons, drawn on a 24px grid and coloured by currentColor. */
const paths = {
  home: "M3.5 11 12 4l8.5 7M5.5 9.5v10h13v-10M10 19.5v-5.5h4v5.5",
  sonar: "M2.5 12h2.5l2-5 3 10 3-13 3 13 2-7 1.5 2h2",
  tiles: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  play: "M4.5 5.5h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2ZM10 9.3v5.4l4.6-2.7Z",
  map: "M9 4.5 3.5 6.5v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2ZM9 4.5v13M15 6.5v13",
  image: "M5.5 4.5h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2ZM3.5 15.5l4.5-4.5 4 4 2.5-2.5 6 6M15.5 9.5h.01",
  cap: "M2.5 9.5 12 5l9.5 4.5L12 14 2.5 9.5ZM6.5 11.5v4c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4M21.5 9.5V15",
  passport:
    "M6.5 3.5h11a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9.5 17h5",
  chevron: "M10 6.5 15.5 12 10 17.5",
  "chevron-down": "M7 10l5 5 5-5",
  check: "M5.5 12.5 10 17l8.5-9.5",
  grid: "M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z",
  list: "M4.5 6.5h15M4.5 12h15M4.5 17.5h15",
  external: "M8 16 16 8M9.5 8H16v6.5",
  chip: "M7.5 6.5h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM10 10h4v4h-4ZM10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.2 15.2l5.3 5.3",
  neuron: "M6.25 12a2.75 2.75 0 1 0 5.5 0a2.75 2.75 0 1 0 -5.5 0ZM7.1 10C6.2 8.7 5 7.7 3.5 7.3M5.3 8.4 4.7 5.5M7.1 14C6.2 15.3 5 16.3 3.5 16.7M5.3 15.6 4.7 18.5M9.5 9.3C9.9 7.6 9.5 5.8 8.4 4.5M9.7 6.7 11.4 5.1M11.75 12h4.5M16.25 12c1.3 0 2.3-1.5 4-2.5M16.25 12c1.3 0 2.3 1.5 4 2.5M16.25 12h4.25",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

/** The round arrow button that sits in the corner of every linked card. */
export function CardGo({ external }: { external?: boolean }) {
  return (
    <span className="card-go" aria-hidden="true">
      <Icon name={external ? "external" : "chevron"} size={18} />
    </span>
  );
}
