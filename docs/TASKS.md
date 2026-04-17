# TASKS.md — DarSaif Architecture Website

## Current Status
Phase 5 — In Progress. Phases 1–4 complete. Phase 1 Vercel tasks confirmed done by user.

## Phases Overview
- Phase 1: Foundation & Setup
- Phase 2: Core Pages (Homepage, Projects, Project Detail)
- Phase 3: Supporting Pages (Services, About, Team, Careers, Contact)
- Phase 4: Bilingual / RTL & CMS Polish
- Phase 5: Polish, SEO & Launch

---

## Phase 1: Foundation & Setup
**Goal:** Project scaffolded, CMS connected, routing works, deploys to Vercel

- [x] Initialize Next.js 14 project with TypeScript and App Router
- [x] Install and configure Tailwind CSS with custom design tokens (CSS variables from CLAUDE.md)
- [x] Install and configure next-intl for EN/AR bilingual routing (`/en/...` and `/ar/...`)
- [x] Set up locale-aware layout with RTL support (`dir="rtl"` for Arabic)
- [x] Install Framer Motion
- [x] Initialize Sanity project and connect to Next.js (code complete — cloud project init pending)
- [x] Define full Sanity schema: Project, TeamMember, Service (per CLAUDE.md spec)
- [x] Set up Sanity Studio at `/studio` route
- [x] Create Sanity client and reusable query functions in `/sanity/lib/`
- [x] Set up global font imports: Cormorant Garamond, Inter, Noto Kufi Arabic
- [x] Build Header component: logo, nav links, language toggle
- [x] Build Footer component: office name, location, contact info, nav links
- [x] Create `/messages/en.json` and `/messages/ar.json` with initial string keys
- [x] Run `npx sanity init` to create Sanity cloud project and get projectId — add to `.env.local`
- [x] Set up Vercel project, connect GitHub repo, add Sanity environment variables
- [x] Deploy skeleton to Vercel and confirm routing works in both languages — live at darsaif.vercel.app
- [x] Set up `/public/images/` with logo SVG (light version for dark background) and wire into Header

---

## Phase 2: Core Pages — Homepage, Projects, Project Detail
**Goal:** The most important pages are live, visually complete, and content-driven from Sanity

### Homepage
- [x] Hero section: full-viewport, DarSaif logo/name, strong background image or bold typography, subtle scroll indicator
- [x] Featured projects section: editorial hover-reveal interaction — numbered list of featured project titles, hovering reveals a large project image on one side. Framer Motion handles image reveal.
- [x] Brief services teaser: 3-4 service categories with one-line descriptions, link to Services page
- [x] "Contact Us" CTA section at the bottom of homepage
- [x] Homepage pulls featured projects from Sanity (featured: true)

### Projects Listing Page
- [x] Editorial layout: vertically stacked numbered list (01, 02, 03...) of project names
- [x] Each row shows: project number, name, type, location
- [x] On hover (desktop): large image appears on the side via Framer Motion
- [x] On tap (mobile): image preview appears below the row (graceful fallback from hover)
- [x] Clicking/tapping a row navigates to project detail page
- [x] Filter bar: filter by project type (All / Residential / Commercial / Urban / Planning)
- [x] All projects pulled from Sanity, sorted by year descending
- [x] Designed empty state if no projects exist yet in Sanity

### Project Detail Page
- [x] Full-viewport hero image (cover image from Sanity)
- [x] Metadata bar: Project Name, Type, Location, Year — clean typographic layout
- [x] Description section: block text rendered from Sanity
- [x] Photo gallery: horizontal scroll or masonry grid of all gallery images
- [x] "Back to Projects" navigation link
- [x] Next/Previous project navigation
- [x] Page fully bilingual — title, description, metadata labels all switch with locale

---

## Phase 3: Supporting Pages
**Goal:** All remaining pages are live and content-complete

### Services Page
- [x] List all service categories with title, description, and optional visual
- [x] Content pulled from Sanity Service schema
- [x] Clean layout — typographic, not icon-heavy

### About Page
- [x] Office story and philosophy (static content, editable via Sanity or hardcoded is fine)
- [x] Founded year, location, mission statement
- [x] Single strong image of the office or founder

### Team Page
- [x] Single team member card for now (founder): photo, name, role, bio
- [x] Designed to extend gracefully — adding new members later should just be a Sanity entry
- [x] Content pulled from Sanity TeamMember schema

### Careers Page
- [x] Static page — "We're growing" message + brief description of office culture
- [x] Simple CTA: email link or mailto button to send application
- [x] No dynamic job listings in v1

### Contact Page
- [x] Contact form: Name, Email, Phone (optional), Project Type (dropdown), Message
- [x] Form submission sends email to office via Resend
- [x] WhatsApp button: floating or inline, links to WhatsApp Business number
- [x] Office location section: address text + Google Maps embed
- [x] Success state after form submission
- [x] Error state if email fails to send

---

## Phase 4: Bilingual / RTL & CMS Polish
**Goal:** Arabic experience is complete and correct, CMS is ready for real content

- [x] Complete all `/messages/ar.json` translations for every string on every page
- [x] Audit every page layout in Arabic/RTL — fix any broken flex directions, text alignment, icon mirroring
- [x] Test language toggle on every page — confirm route preservation (no redirect to home)
- [x] Set up Sanity content for all Arabic fields (titleAr, descriptionAr, etc.)
- [x] Add 3-5 placeholder projects in Sanity with lorem ipsum content and placeholder images to test all layouts
- [x] Walk brother through Sanity Studio — confirm he can add/edit a project without help
- [x] Write a simple "How to add a project" guide for the brother (1 page, simple steps)

---

## Phase 5: Polish, SEO & Launch
**Goal:** Ready for real users, performs well, looks right on all devices

- [x] Full mobile responsiveness audit — every page on iOS Safari and Android Chrome
- [x] Add Next.js Metadata API: page titles, descriptions, og:image for every route
- [x] Create og:image (social share image) with DarSaif branding
- [x] Add structured data (JSON-LD) for LocalBusiness schema — helps Google understand location/industry
- [x] Performance audit: fixed missing `images.remotePatterns` for cdn.sanity.io in next.config.mjs (would have broken all images at launch); no static images over 200kb; all Sanity images use CDN transforms + Next.js Image; @vercel/analytics installed and wired into locale layout
- [x] Confirm all Framer Motion animations are disabled for `prefers-reduced-motion` users — all 4 components (HeroSection, Header, ProjectsList, FeaturedProjectsList) already implemented useReducedMotion() correctly
- [x] Test contact form end-to-end: submit → email received in office inbox
- [ ] Test WhatsApp button on mobile
- [x] 404 page: branded, links back to homepage
- [ ] Connect real domain to Vercel once registered
- [ ] Replace all placeholder project content with real photos and data from brother
- [ ] Final review with brother — his sign-off before launch

---

## Discovered — Hero Visual Polish (completed this session)
- [x] Wire real logo PNG into Header and Footer (mix-blend-mode → transparent PNG)
- [x] Hero section redesigned: background slideshow of all projects (crossfade, 5s interval), Logo_y full logo (Arabic + Latin) centered, individual backdrop-filter blur(4px) behind logo only
- [x] Header always solid black (removed backdrop-blur)

