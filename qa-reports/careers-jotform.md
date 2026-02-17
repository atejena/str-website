# QA Report: Careers Page + Jotform Toggle

**Date:** 2025-07-13  
**Build:** ✅ Passes (`npm run build` — no errors, no type issues)

---

## Task 1: Public Careers Page (`/careers`)

### Files Created
- `src/app/careers/page.tsx` — Server component, fetches active career postings + social links from Supabase
- `src/app/careers/CareersPageClient.tsx` — Client component with full UI (Framer Motion animations)
- `src/app/careers/layout.tsx` — Metadata: title "Careers", description about joining STR team

### Features
- **Hero section:** "JOIN OUR TEAM" heading with gold accent, subtitle about building strength through resilience
- **Job postings grid:** 2-column card layout showing title, department, employment type, location, salary range, description, requirements, benefits
- **Apply button:** Links to `mailto:spencer@trainwithstr.com?subject=Application: {title}`
- **Empty state:** Friendly message with briefcase icon, "No Open Positions" heading, email link to spencer@trainwithstr.com
- **Style:** Dark theme, str-gold accents, font-display headings, motion animations — matches existing site patterns
- **Hidden page:** NOT added to Header or Footer navigation. Accessible only by direct URL `/careers`

### Database
- Uses `career_postings` table (columns: id, title, slug, department, employment_type, description, requirements, benefits, salary_range, location, active, created_at, updated_at)
- Fetches where `active = true`, ordered by `created_at` descending
- Currently 0 postings in DB — empty state will render

---

## Task 2: Jotform Toggle for Get Started Form

### Files Modified
- `src/app/page.tsx` — Added fetch for `jotform` site_settings, passes as prop to `<GetStartedForm jotform={jotform} />`
- `src/components/sections/GetStartedForm.tsx` — Added `JotformSettings` interface, `jotform` optional prop, conditional rendering

### How It Works
1. Homepage server component fetches `site_settings` where `key = 'jotform'`
2. Passes `{ enabled, form_id, embed_url }` to `GetStartedForm` as prop
3. If `jotform.enabled === true` AND `jotform.embed_url` is non-empty: renders Jotform iframe
4. Otherwise: renders existing custom contact form unchanged

### Jotform Iframe
- Full-width, min-height 500px, no border
- Wrapped in styled container matching existing card style
- `allowFullScreen` enabled for best Jotform UX

### Toggle Control
- Entirely via admin settings (`site_settings` table, key `jotform`)
- Current value: `{"enabled": false, "form_id": "", "embed_url": ""}` — custom form renders
- To activate: set `enabled: true` and provide `embed_url` via admin panel

---

## Not Tested (Manual Verification Needed)
- Jotform iframe with actual Jotform URL (no URL configured yet)
- Career postings card rendering with real data (no active postings in DB yet)
- Mobile responsiveness of careers page (grid collapses to single column via Tailwind)
