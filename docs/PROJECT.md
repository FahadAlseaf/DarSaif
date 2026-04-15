# PROJECT.md — DarSaif Architecture Office Website

## One Line Description
A bilingual (English-primary, Arabic) portfolio and marketing website for DarSaif, an architecture office based in Buraydah, Qassim, Saudi Arabia.

## Problem
DarSaif is a new office with real completed work but no digital presence. Potential clients have no way to discover the office, evaluate their capabilities, or initiate contact. In architecture, your website IS your first impression — a bad or missing one costs clients before a conversation starts.

## Solution
A premium, minimal, bilingual website that leads with visual impact, presents the project portfolio in an editorial/unique way (not a generic grid), clearly communicates services and team credibility, and makes contacting the office as frictionless as possible.

## Primary User
Arabic and English-speaking clients — individuals, developers, or government entities — in Saudi Arabia looking to hire an architecture office for residential, commercial, urban, or planning projects.

## Trust & Differentiation
- Unique project browsing experience (editorial hover-reveal list, not a generic thumbnail grid)
- Each project page shows real details: name, location, type, year, description, full photo gallery
- Clean bilingual support with no degraded experience in either language
- Professional typographic and spatial design language that signals high-end taste
- Based in Qassim — serves the region but with a national-quality presence

## Core Flow
1. Visitor lands on homepage → full-viewport hero with strong visual + DarSaif name
2. Scroll reveals a teaser of featured projects with hover-image-reveal interaction
3. "View All Projects" leads to the Projects page — editorial numbered/listed layout
4. Clicking a project opens the project detail page: hero image, metadata (type, location, year), description, scrollable photo gallery
5. Services page describes what the office offers (architecture, planning, urban, interiors, etc.)
6. About page: office philosophy, founding story, location
7. Team page: currently just the founder — expandable later
8. Careers page: simple "we're growing" message + application form or email link
9. Contact page: contact form + WhatsApp button + location/map embed
10. Language toggle (EN/AR) available in header on all pages

## Business Model
No transactions. The website's only job is to generate leads (client inquiries) and establish credibility.

## Platforms
- Web (desktop-first, fully responsive for mobile)
- No native app needed

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- CMS: Sanity (for projects, team, services — manageable without touching code)
- Styling: Tailwind CSS + custom CSS variables for design tokens
- Animation: Framer Motion (for scroll reveals, hover effects, page transitions)
- i18n: next-intl (bilingual EN/AR with RTL support for Arabic)
- Hosting: Vercel (free tier to start)
- Forms: React Hook Form + email via Resend (free tier)
- No database needed — all content lives in Sanity
- No auth needed on frontend — Sanity Studio has its own auth

## MVP Features
1. Homepage with hero, featured projects section, and brief services overview
2. Projects listing page — editorial hover-reveal interaction
3. Individual project detail page (hero, metadata, description, photo gallery)
4. Services page
5. About page
6. Team page (single member for now)
7. Contact page with form + WhatsApp button
8. Careers page (static, no dynamic job listings needed in v1)
9. Bilingual EN/AR with RTL layout support
10. Sanity CMS connected — content fully editable without code
11. Deployed to Vercel

## Out of Scope for v1
1. Blog or news section
2. Instagram / social feed integration
3. Online client portal or project tracking
4. Dynamic job listings (Careers is static in v1)
5. Video hosting (no video backgrounds — images only in v1)
6. E-commerce or any payment flow

## Key Decisions & Reasoning
- **Next.js over plain React:** Needed for SEO (architecture firms must rank on Google), image optimization, and easy Vercel deployment.
- **Sanity CMS:** Best balance between developer control and non-technical editor experience. Your brother can add/edit projects from a browser dashboard without touching code.
- **No generic project grid:** The AZAZ grid is fine but common. DarSaif will use an editorial list layout with hover image reveals — more distinctive, more memorable.
- **Framer Motion for animations:** Architecture websites live and die by motion quality. Framer Motion is the right tool; don't use CSS transitions for complex interactions.
- **next-intl for i18n:** Handles RTL, routing, and translation files cleanly in Next.js App Router.
- **Resend for email:** Free tier, clean API, works perfectly with React Hook Form. No backend server needed.

## Open Questions
- Exact number of projects to be added at launch (placeholder structure built now, real content added later)
- Final domain name (to be registered and connected to Vercel)
- Whether a WhatsApp Business number is ready for the contact button
- Logo file format needed: SVG preferred for web — confirm availability
