import type { ProjectGlyph as GlyphName, SanityProject } from "@/sanity/lib/queries";

/**
 * Najdi pictogram system — one small mark per project, shown in the homepage
 * feed (big.dk-style). Editors pick a glyph in Sanity; when unset, one is
 * derived from the project type so the feed never renders without a mark.
 */

const PATHS: Record<GlyphName, JSX.Element> = {
  arch: (
    <path d="M3 23 L3 12 Q13 2 23 12 L23 23 Z" fill="none" strokeWidth="2.2" />
  ),
  door: (
    <>
      <rect x="5" y="3" width="16" height="20" fill="none" strokeWidth="2.2" />
      <line x1="13" y1="3" x2="13" y2="23" strokeWidth="2.2" />
      <line x1="5" y1="9" x2="21" y2="9" strokeWidth="1.4" />
      <line x1="5" y1="16" x2="21" y2="16" strokeWidth="1.4" />
    </>
  ),
  zigzag: (
    <path d="M2 17 L8 9 L13 17 L18 9 L24 17" fill="none" strokeWidth="2.4" />
  ),
  crenellation: (
    <path
      d="M3 23 L3 12 L7 12 L7 7 L11 12 L15 7 L19 12 L23 12 L23 23 Z"
      fill="none"
      strokeWidth="2"
    />
  ),
  dome: (
    <>
      <path d="M4 22 Q4 8 13 5 Q22 8 22 22 Z" fill="none" strokeWidth="2.2" />
      <line x1="13" y1="5" x2="13" y2="1.5" strokeWidth="2.2" />
    </>
  ),
  triangles: (
    <>
      <path d="M13 4 L23 22 L3 22 Z" fill="none" strokeWidth="2.2" />
      <path d="M13 12 L18 22 L8 22 Z" fill="none" strokeWidth="1.4" />
    </>
  ),
};

/** Fallback glyph per project type, for documents created before the glyph field existed. */
const TYPE_FALLBACK: Record<SanityProject["type"], GlyphName> = {
  residential: "arch",
  commercial: "zigzag",
  urban: "crenellation",
  planning: "triangles",
  interior: "door",
};

export function glyphFor(project: Pick<SanityProject, "glyph" | "type">): GlyphName {
  return project.glyph ?? TYPE_FALLBACK[project.type] ?? "arch";
}

export default function ProjectGlyphMark({
  name,
  className,
}: {
  name: GlyphName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 26 26"
      className={className}
      stroke="currentColor"
      fill="none"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
