---
name: fahad-dev-flow
description: >
  Fahad's mid-session guardrails. Applies during implementation, debugging,
  and before marking anything complete. Does not replace session start/end
  prompts — those are handled separately.
---

# Fahad's Dev Flow — Mid-Session Guardrails

---

## Before Implementing Any Task

Before touching code, answer these out loud:

1. Is this task in the current phase of TASKS.md?
2. Does this touch anything flagged as out of scope in PROJECT.md? If yes — stop and confirm with the user.
3. Does this require a Sanity schema change? If yes — describe the change and wait for explicit confirmation. Never touch the schema without approval.
4. Does this require a new package not already in package.json? If yes — ask before installing.
5. Have you checked ERRORS.md for any past decisions or rejected approaches that affect this task?

If all clear, proceed. Otherwise, flag and wait.

---

## Implementation Rules

- **TypeScript only** — never plain JavaScript, no `any`, use `unknown` and narrow properly
- **No hardcoded content** — anything that should come from Sanity must come from Sanity (project data, team data, services)
- **No hardcoded strings** — all UI strings go through `/messages/en.json` and `/messages/ar.json`
- **No secrets in client components** — Sanity write tokens and API keys are server-side only
- **Always use Next.js `<Image>`** — never raw `<img>` tags
- **Components under 150 lines** — split if larger
- **RTL must be tested on every layout change** — not an afterthought, test Arabic immediately after building any layout
- **Animations must be purposeful** — no gratuitous effects, always add `prefers-reduced-motion` support
- **Mobile responsive from the start** — never build desktop-only and patch later
- **Design tokens from CLAUDE.md** — never introduce new colors, fonts, or spacing outside the defined token system

---

## Debugging Protocol

When you hit any bug, test failure, or unexpected behavior — **do not touch code yet**.

1. **Reproduce** — confirm you can reliably reproduce the issue
2. **Isolate** — identify the smallest possible scope (which file, which component, which query)
3. **Hypothesize** — state 2–3 possible root causes before touching anything
4. **Check ERRORS.md** — has this been seen before? Is there a rejected fix to avoid?
5. **Fix the root cause** — not the symptom, no workarounds that mask the real issue
6. **Verify** — run verification commands and show output before calling it fixed

---

## Verification Before Completion

**You cannot say a task is done without running these first and showing the actual output.**

```bash
pnpm lint
pnpm typecheck
pnpm build
```

- Zero lint errors. Zero type errors. Build must succeed.
- Do not say "this should be fine" — run the commands and show the actual output.
- Evidence before assertions. Always.

---

## What Requires User Confirmation — Stop and Ask

- Any Sanity schema change (new field, new type, renamed field, removed field)
- Any new package dependency
- Deleting or renaming files referenced in CLAUDE.md's file structure
- Any feature listed as out of scope in PROJECT.md
- Changes to the contact form or Resend email flow
- Any new animation pattern not already established in the project
- Structural layout changes that affect RTL behavior