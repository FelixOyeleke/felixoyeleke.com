/** The checkerboard mark. Drawn in currentColor so it follows the theme. */
export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg className="logo" viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x=".5" y=".5" width="23" height="23" fill="none" stroke="currentColor" />
      <path d="M0 0h12v12H0zM12 12h12v12H12z" fill="currentColor" />
    </svg>
  );
}
