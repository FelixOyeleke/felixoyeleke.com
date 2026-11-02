import type { BrandLogo } from "@/lib/content";

/** A project's real logo in its own colours, in an app-icon style box. `large` is for page headers. */
export function BrandMark({ logo, large }: { logo: BrandLogo; large?: boolean }) {
  const className = ["tile-icon", "tile-icon--logo", logo.fill && "tile-icon--fill", large && "tile-icon--lg"]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={className}>
      <img src={logo.src} width={32} height={32} alt="" />
    </span>
  );
}
