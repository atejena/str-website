# Programming Page & GoHighLevel Widget — QA Report

**Date:** 2025-07-10
**Build Status:** ✅ Pass (compiled + all 17 pages generated successfully)

---

## Task 1: Programming Page (`/programming`)

### Files Created
- `src/app/programming/layout.tsx` — Metadata (title: "Programming", description about daily workouts)
- `src/app/programming/page.tsx` — Server component; fetches `trainheroic_whiteboard_url` from `site_settings.integrations`
- `src/app/programming/ProgrammingPageClient.tsx` — Client component with Header/Footer, hero section, iframe or placeholder

### Behavior
- **URL exists:** Renders a full-width iframe (`min-height: 80vh`) in a rounded card with subtle border
- **URL missing/empty:** Shows a styled placeholder with Dumbbell icon, "Coming Soon" heading, and "Programming will be available soon. Check back or ask your coach!" message
- Hero: "TODAY'S PROGRAMMING" with gold accent, subtitle "Check what's on the whiteboard"
- Matches dark theme (motion animations, str-gold accents, font-display headings)

### Data Flow
`site_settings` → key `integrations` → `value.trainheroic_whiteboard_url` → server-fetched → passed as prop to client component

---

## Task 2: GoHighLevel Chat Widget

### Files Created
- `src/components/GoHighLevelWidget.tsx` — Client component; injects GHL chat widget script via `useEffect` + `document.createElement`

### Files Modified
- `src/app/layout.tsx` — Made async; fetches `gohighlevel_widget_id` from `site_settings.integrations`; conditionally renders `<GoHighLevelWidget>` at the bottom of `<body>`

### Behavior
- **Widget ID configured:** Script injected on every page (loader.js with data-widget-id and data-resources-url attributes)
- **No widget ID:** Component renders nothing
- Deduplication: checks for existing script with same widget ID before injecting
- Cleanup: removes script on unmount

### Data Flow
`site_settings` → key `integrations` → `value.gohighlevel_widget_id` → server-fetched in root layout → passed as prop to client component

---

## What Was Tested
- ✅ `npm run build` — compiles, TypeScript passes, all 17 routes generated
- ✅ `/programming` route appears in build output
- ✅ No type errors or lint warnings

## What Was NOT Tested
- ⚠️ Live browser walkthrough (no dev server running)
- ⚠️ Actual TrainHeroic iframe rendering (depends on real URL in DB)
- ⚠️ GHL widget script loading (depends on real widget ID in DB)
- ⚠️ Mobile responsiveness (visual check not performed)
