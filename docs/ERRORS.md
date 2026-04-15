# ERRORS.md — DarSaif Architecture Website

## How to Use This File
- Log every error or bug encountered and how it was resolved
- Log every significant decision made and why
- This file prevents Claude from repeating mistakes and re-suggesting rejected approaches
- Updated at the end of every session as part of the end-of-session protocol

---

## Errors & Fixes

### 2026-04-11 — create-next-app rejected capital-letter directory name
**Problem/Decision:** `npx create-next-app@14 .` inside `L:/Projects/DarSaif` failed because npm disallows capital letters in package names derived from the directory name.
**Cause/Reason:** npm naming restriction: package names must be lowercase.
**Fix/Outcome:** Scaffolded into a temp directory `dar-saif-temp`, copied all files to `DarSaif/`, then deleted the temp directory. Set `"name": "dar-saif"` in `package.json`.
**Rejected:** Renaming the working directory (would break user's file structure).

### 2026-04-11 — Sanity v5 incompatible with React 18 / Next.js 14
**Problem/Decision:** Installing `next-sanity` (latest, v12) pulled in `sanity@5` which requires `react/compiler-runtime` — a React 19 feature. Build failed with "Package path ./compiler-runtime is not exported from package react".
**Cause/Reason:** Sanity v5 and its `@portabletext/editor` dependency require React 19. The project uses Next.js 14 which ships React 18.
**Fix/Outcome:** Pinned to `next-sanity@9` + `sanity@3` + `@sanity/vision@3` — the React 18-compatible versions. Build passes.
**Rejected:** Upgrading to Next.js 15 + React 19 (CLAUDE.md specifies Next.js 14; too early to change the spec without client confirmation).

### 2026-04-11 — Sanity v3 requires styled-components peer dependency
**Problem/Decision:** After fixing the React 19 issue, build still failed: `Module not found: Can't resolve 'styled-components'` from `@sanity/ui`.
**Cause/Reason:** `@sanity/ui` (used by Sanity Studio v3) requires `styled-components` as a peer dependency that is not automatically installed.
**Fix/Outcome:** Installed `styled-components`. Build passes cleanly.
**Rejected:** webpack alias workarounds (fragile, harder to maintain).

### 2026-04-11 — @sanity/image-url type import path not resolvable
**Problem/Decision:** `SanityImageSource` is not exported at the `@sanity/image-url` package root — the root uses `export = builder` (CommonJS), which only exposes the builder function.
**Cause/Reason:** `@sanity/image-url@1.2.0` uses a CommonJS `export =` at the root. Named type imports from the root fail. The type lives at `lib/types/types.d.ts`.
**Fix/Outcome:** Import from the JS subpath (no `.d.ts` extension): `import type { SanityImageSource } from "@sanity/image-url/lib/types/types"`. With `moduleResolution: "bundler"` TypeScript resolves this to the `.d.ts` automatically. Typecheck passes.
**Rejected:** Importing from root `@sanity/image-url` (doesn't export the type). Importing with explicit `.d.ts` extension (TypeScript doesn't resolve explicit `.d.ts` paths).

---

## Decisions Made

### 2026-04-11 — Initial Architecture Decisions
**Decision:** Use Next.js 14 App Router over Pages Router
**Reason:** App Router is the current standard, better for server components, better Sanity integration, Vercel-native.
**Rejected alternatives:** Pages Router (outdated), plain Vite React (no SSR/SEO)

### 2026-04-11 — Sanity over other CMS options
**Decision:** Use Sanity CMS
**Reason:** Clean visual Studio UI the brother can use without code, strong Next.js integration, generous free tier, schema is fully code-controlled.
**Rejected alternatives:** Contentful (more expensive), WordPress headless (overkill and complex), hardcoded content (unmanageable long-term)

### 2026-04-11 — Editorial hover-reveal project list over thumbnail grid
**Decision:** Projects page uses a numbered list with hover-image-reveal, not a thumbnail grid
**Reason:** Grid (like AZAZ) is common and generic. Hover-reveal list is distinctive, more editorial, and scales better when you have many projects.
**Rejected alternatives:** AZAZ-style 3-column grid

### 2026-04-11 — No video in v1
**Decision:** No video backgrounds or embeds in v1
**Reason:** Client does not have video assets ready. Placeholder videos look worse than strong photography. Add in v2 when real footage is available.

### 2026-04-11 — Resend for email over other providers
**Decision:** Use Resend for contact form email delivery
**Reason:** Simple API, free tier sufficient, works cleanly with Next.js server actions, no backend server needed.
**Rejected alternatives:** Nodemailer (requires own SMTP), EmailJS (client-side, leaks credentials)

### 2026-04-11 — Pin Sanity to v3 (next-sanity@9) for React 18 compatibility
**Decision:** Use sanity@3 / next-sanity@9 / @sanity/vision@3 instead of latest
**Reason:** Sanity v5 requires React 19. Upgrading React/Next.js version is a spec change that needs client sign-off.
**Rejected alternatives:** Next.js 15 + React 19 upgrade (premature without client confirmation)

### 2026-04-11 — next-intl middleware excludes static files and _next paths
**Decision:** Middleware matcher excludes `_next`, `_vercel`, and files with extensions
**Reason:** Standard next-intl pattern — prevents locale middleware from running on static assets, images, and Next.js internals.

### 2026-04-11 — SanityProject.slug typed as string, not { current: string }
**Decision:** `SanityProject.slug` is `string` (not `{ current: string }`)
**Reason:** The GROQ `projectFields` projection uses `"slug": slug.current` which returns a plain string. The original type was wrong and caused a TS error in `getAdjacentProjects`. The GROQ filter `slug.current == $slug` is still correct — it references the raw Sanity document field, not the projected field.
**Rejected:** Keeping slug as `{ current: string }` (breaks since GROQ flattens it to string).

### 2026-04-11 — Mobile hover fallback: first tap expands inline preview, second tap navigates
**Decision:** On touch devices, tapping a project row on the listing page expands an inline image preview below the row; a second tap on the same row navigates to the detail page.
**Reason:** Mobile has no hover, so the image reveal needs a deliberate user gesture. One-tap-navigate loses the preview entirely. Two-tap pattern: first confirms interest, second commits.
**Implementation:** `isTouchDevice` detected on mount via `window.matchMedia('(hover: none)')`. `e.preventDefault()` only called on first tap.

### 2026-04-11 — PortableText available via next-sanity, no separate install needed
**Decision:** Import `PortableText` from `next-sanity`, types from `@portabletext/types`
**Reason:** `next-sanity@9` bundles `@portabletext/react` as a dependency. No additional package install required.

### 2026-04-11 — Services teaser and CTA sections return null when Sanity has no content
**Decision:** `FeaturedProjectsSection`, `ServicesTeaserSection` return null if their Sanity query returns 0 results.
**Reason:** The homepage must never look broken in early/empty state. Hiding sections until real content exists is cleaner than showing empty states on the homepage.
**Rejected:** Showing a placeholder/skeleton when no content exists (looks unfinished to real visitors).

### 2026-04-11 — Gallery uses CSS-only horizontal scroll (snap-x snap-mandatory), no JS
**Decision:** Project detail gallery is a pure CSS horizontal scroll with snap points.
**Reason:** No JS needed for basic gallery scrolling. CSS snap gives smooth UX on both desktop and mobile with zero bundle cost. A lightbox can be added in Phase 5 if needed.
**Rejected:** JS carousel libraries (unnecessary dependency for v1).

### 2026-04-11 — Header had no mobile navigation
**Problem/Decision:** The entire `<nav>` was `hidden md:flex` with no replacement on mobile — users on mobile had zero way to navigate between pages.
**Cause/Reason:** Desktop-first build omitted the mobile menu; no hamburger or overlay was ever implemented.
**Fix/Outcome:** Added hamburger button (visible below `md` breakpoint), full-screen overlay nav with `AnimatePresence` fade + stagger using established animation patterns, body scroll lock via `useEffect`, and `menu`/`close` keys to both message files.
**Rejected:** Slide-in drawer (new animation direction not established in the project); keeping a collapsed icon-only bar (too small for touch targets).

### 2026-04-11 — ContactForm select ignores bg-transparent on iOS Safari
**Problem/Decision:** `<select bg-transparent>` shows iOS system chrome (white/gray background) regardless of CSS on iOS Safari.
**Cause/Reason:** iOS Safari applies its own styling to native `<select>` elements and ignores `background` overrides unless `appearance-none` is set.
**Fix/Outcome:** Added `appearance-none` to suppress system styling, wrapped the select in a `relative` div, and added a custom `▾` chevron using `end-0` (CSS logical property — flips correctly in RTL).
**Rejected:** Replacing `<select>` with a custom JS dropdown (unnecessary complexity for v1).

### 2026-04-11 — Filter bar buttons had insufficient tap target height
**Problem/Decision:** Project filter buttons had only `pb-1` (~20px total height) — well below the 44px touch minimum.
**Cause/Reason:** Tab-underline alignment trick required `pb-1` for the border offset, but no top padding was added.
**Fix/Outcome:** Added `pt-3` to bring tap area to ~40px. Bottom padding and the negative margin (`-mb-[calc(1rem+2px)]`) left unchanged — the alignment formula only depends on container padding and button border width, not button top padding.
**Rejected:** Changing `pb-1` (would break the tab-underline alignment without recalculating the negative margin).

### 2026-04-11 — Metadata API: title template + per-page og:image
**Decision:** Use Next.js title template (`"%s — DarSaif"`) in the locale layout so child pages return only their own name. Project detail pages use their Sanity cover image as og:image (1200×630). All other pages reference `/images/og-image.png` (static, to be created in Task 3). `metadataBase` set from `NEXT_PUBLIC_SITE_URL` env var.
**Reason:** Template eliminates duplicated ` — DarSaif` suffix across 8 pages. Per-project og:image makes social shares for individual project links visually meaningful.
**Rejected:** Single static og:image for all pages (loses the per-project visual distinction); hardcoding site URL (breaks dev/staging environments).

### 2026-04-15 — og:image implemented via next/og ImageResponse, not static PNG
**Problem/Decision:** TASKS.md and the prior metadata decision described the default og:image as a static `/images/og-image.png` to be created. The actual implementation used `app/[locale]/opengraph-image.tsx` with `next/og` `ImageResponse`.
**Cause/Reason:** `ImageResponse` is the correct Next.js 14 convention — it is auto-discovered by the framework, generates the image on-demand at the right path, and allows code-controlled branding (dark bg, gold accent bar, Cormorant Garamond font, DarSaif name, location line) without requiring a separate design tool.
**Fix/Outcome:** Task accepted as complete. No static PNG needed. The `opengraph-image.tsx` file at the locale segment level serves as the default og:image for all non-project pages. Edge runtime. 1200×630.
**Rejected:** Creating a static PNG manually (requires external design tool, cannot be updated via code, weaker than dynamic generation).

### 2026-04-15 — JSON-LD LocalBusiness structured data added to locale layout
**Decision:** Added `<script type="application/ld+json">` directly in the `<body>` of `app/[locale]/layout.tsx`. Schema type is `LocalBusiness` with name, description, URL from `NEXT_PUBLIC_SITE_URL`, PostalAddress (Buraydah / Al Qassim / SA), and areaServed (Saudi Arabia).
**Reason:** Placing it in the locale layout ensures it renders on every page in both EN and AR. Server component — no client JS needed. `NEXT_PUBLIC_SITE_URL` reuses the same env var already used for `metadataBase`, keeping configuration DRY.
**Rejected:** Placing JSON-LD only on the homepage (misses direct deep-link pages); using `next/script` Strategy (unnecessary for a `<body>`-level inline tag in a server component).
