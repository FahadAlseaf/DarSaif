/**
 * Dar Saif logo mark — the Najdi crescent stroke followed by two tiles.
 *
 * Traced from the original artwork, so it stays crisp at any size and
 * inherits the surrounding text colour (works on both the sand and the
 * night palettes). Standalone files live at public/images/logo-mark.{svg,png}.
 *
 * The mark is direction-agnostic: it renders identically in Arabic and
 * English, tiles always to the right of the crescent. Only its position in
 * the header lockup swaps sides, which the flex row handles on its own.
 */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1020 216"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {/* crescent stroke */}
      <path d="M0 0C15 7.7 30.2 16.2 45 23C59.8 29.8 73 35.2 89 41C105 46.8 123.8 53 141 58C158.2 63 176.2 67.3 192 71C207.8 74.7 216 76.7 236 80C256 83.3 279.8 87.7 312 91C344.2 94.3 390 97 429 100L387 205C352.3 201.3 315.8 198.5 283 194C250.2 189.5 215.7 183.3 190 178C164.3 172.7 143.2 166.3 129 162C114.8 157.7 113.7 158.8 105 152C96.3 145.2 86.2 132.2 77 121C67.8 109.8 58.8 97.7 50 85C41.2 72.3 32.3 59.2 24 45C15.7 30.8 8 15 0 0Z" />
      {/* inner tile */}
      <path d="M512 103 L698 99 L653 214 L470 212 Z" />
      {/* outer tile */}
      <path d="M798 94 L1019 78 L971 201 L752 214 Z" />
    </svg>
  );
}
