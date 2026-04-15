# CLAUDE.md — DarSaif Architecture Website

## What is DarSaif
DarSaif is a premium architecture office website built in Next.js 14 with TypeScript, Sanity CMS, and full bilingual EN/AR support. It is a marketing and portfolio site — no user accounts, no payments, no database beyond Sanity. Its job is to showcase projects, communicate services, and generate client inquiries. Nothing else.

## Who is the Developer
- Managing this project: the client's brother (non-developer) for content, and the client (technical, can edit code/config) for dev work
- Communication style: direct, no flattery, explain reasoning before writing code, say something is wrong if it is
- Preferred working style: break large tasks into clear steps before starting, never assume, always confirm structural changes first

## Core Rules — Never Break These
- Always use TypeScript, never plain JavaScript
- Never change the Sanity schema without explicitly asking first — schema changes can break existing content
- Never remove an existing page or feature to implement a new one without asking
- Never use a library not already in package.json without asking first
- Never hardcode content that should come from Sanity (project data, team data, services)
- Never expose Sanity write tokens or API secrets in client components — server-side only
- RTL (Arabic) layout must be tested every time a layout change is made — don't treat it as an afterthought
- All animations must be tasteful and purposeful — no gratuitous effects, no loading spinners that aren't needed
- Images must always use Next.js <Image> component — never raw <img> tags
- All new components must be mobile-responsive from the start, not patched later

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- CMS: Sanity (content — projects, team, services, about)
- Styling: Tailwind CSS + CSS custom properties for design tokens
- Animation: Framer Motion
- i18n: next-intl (EN primary, AR secondary with RTL support)
- Hosting: Vercel
- Forms: React Hook Form + Resend (email delivery)
- No traditional database — Sanity is the data layer
- No authentication on the frontend — Sanity Studio handles its own auth

## Design Tokens (enforce these everywhere)
```
Colors:
  --color-bg: #0a0a0a          (near-black background)
  --color-surface: #111111     (cards, panels)
  --color-border: #222222      (subtle borders)
  --color-text-primary: #f0f0f0
  --color-text-secondary: #888888
  --color-accent: #c8a96e      (warm gold — derived from logo mark geometry)

Typography:
  --font-heading: 'Cormorant Garamond' (editorial, architectural feel)
  --font-body: 'Inter' (clean, readable)
  --font-arabic: 'Noto Kufi Arabic' (for AR locale)

Spacing scale: use Tailwind defaults
```

## Users & Roles
- **Public visitor:** Views all pages, submits contact form, switches language. No account.
- **Content editor (brother):** Logs into Sanity Studio at /studio. Can add/edit/delete projects, team info, services. Cannot touch code.
- **Developer (you):** Full code access, deploys via Vercel, manages Sanity schema.

## Business Logic — Critical
- The contact form must send an email notification to the office — if this breaks, the site fails its primary job
- Project detail pages must have meaningful fallback states — if a project has no description or missing images, it must still look intentional, not broken
- Language switching must preserve the current page/route — never redirect to home on toggle
- Arabic (RTL) pages must mirror layout correctly — flex-direction, text-align, icon positions all flip
- Never show an empty projects grid — if no projects exist in Sanity, show a designed "coming soon" placeholder state

## Sanity Schema (DO NOT CHANGE without asking)
```
Project:
  - title (string, required)
  - slug (slug, required)
  - type (string: residential | commercial | urban | planning | interior)
  - location (string)
  - year (number)
  - description (block text)
  - coverImage (image, required)
  - gallery (array of images)
  - featured (boolean — controls homepage appearance)
  - titleAr (string — Arabic title)
  - descriptionAr (block text — Arabic description)

TeamMember:
  - name (string)
  - nameAr (string)
  - role (string)
  - roleAr (string)
  - bio (block text)
  - bioAr (block text)
  - photo (image)

Service:
  - title (string)
  - titleAr (string)
  - description (block text)
  - descriptionAr (block text)
  - icon (string — icon name, optional)
```

## File Structure Convention
```
/app
  /[locale]             ← next-intl locale wrapper (en | ar)
    /page.tsx           ← Homepage
    /projects
      /page.tsx         ← Projects listing
      /[slug]/page.tsx  ← Project detail
    /services/page.tsx
    /about/page.tsx
    /team/page.tsx
    /careers/page.tsx
    /contact/page.tsx
  /studio/[[...tool]]/  ← Sanity Studio route

/components
  /ui/                  ← Primitive components (Button, Tag, etc.)
  /layout/              ← Header, Footer, LanguageToggle
  /sections/            ← Page sections (HeroSection, ProjectsSection, etc.)
  /project/             ← ProjectCard, ProjectGallery, ProjectDetail

/sanity
  /schemas/             ← Sanity content schemas
  /lib/                 ← Sanity client, queries, image builder

/messages
  /en.json              ← English strings
  /ar.json              ← Arabic strings

/public
  /fonts/
  /images/              ← Static assets only (logo, og image, etc.)
```

## MCPs & Skills Active for This Project
- Vercel MCP: use for deployment status, environment variable management, domain setup
- No other MCPs needed for this project

## When Starting a New Session
1. Read PROJECT.md for full context
2. Read TASKS.md for current state and what phase we're in
3. Read ERRORS.md for known issues and past decisions — never re-suggest a rejected approach
4. Ask what we're working on today
5. Never assume — confirm before any structural changes

## End of Session Protocol
When the developer says "that's all for today", "goodbye", "done for now", or any variation:
1. Update TASKS.md — mark completed tasks, add new ones discovered
2. Update ERRORS.md — document any issues encountered and decisions made with reasoning
3. Give a brief summary of what was accomplished
4. State clearly what the next task is
5. Say goodbye

Never skip this protocol, even if the session was short.

## Communication Style
- Direct, no flattery
- Explain reasoning before writing code
- If the approach is wrong, say so clearly
- Break large tasks into clear steps before writing a single line
- If something will cause problems later (RTL, SEO, performance), flag it early
