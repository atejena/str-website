# STR Gym Website — Cross-Page UX & Navigation QA Report

**Site:** https://str-website-kappa.vercel.app  
**Tested:** 2026-02-16  
**Tester:** Automated QA (OpenClaw Browser)

---

## Summary

| Category | Pass | Warn | Fail |
|----------|------|------|------|
| Navigation | 5 | 1 | 1 |
| Cross-Page Consistency | 4 | 3 | 0 |
| Link Integrity | 5 | 2 | 3 |
| SEO & Meta | 1 | 0 | 1 |
| Performance | 2 | 1 | 1 |
| Accessibility | 3 | 1 | 1 |

**Critical Issues Found: 7**

---

## 1. Navigation Tests

### Header Navigation
| Link | Destination | Status |
|------|-------------|--------|
| Classes | `/classes` | ✅ Loads correctly — shows all class cards + weekly timetable |
| Trainers | `/trainers` | ✅ Loads correctly — shows 4 trainer profiles |
| Pricing | `/pricing` | ✅ Loads correctly — shows 3 pricing tiers |
| About | `/about` | ✅ Loads correctly — shows story, values, facility, coaches |
| Contact | `/contact` | ✅ Loads correctly — shows contact form + info |
| Join Now (CTA) | `/contact` | ✅ Links to contact page |

**Header nav links: Classes, Trainers, Pricing, About, Contact, Join Now**

### Footer Navigation
| Link | Destination | Status |
|------|-------------|--------|
| About | `/about` | ✅ Works |
| Classes | `/classes` | ✅ Works |
| Pricing | `/pricing` | ✅ Works |
| Blog | `/blog` | ✅ Works |
| Contact | `/contact` | ✅ Works |
| Privacy Policy | `/privacy` | ✅ Works |
| Terms of Service | `/terms` | ✅ Works |
| Google Maps link | External | ✅ Opens in new tab with `rel="noopener noreferrer"` |
| Email link | `mailto:spencer@trainwithstr.com` | ✅ Works |

⚠️ **Footer has "Blog" link but header does NOT** — inconsistent navigation between header and footer.  
⚠️ **Header has "Trainers" link but footer does NOT** — inconsistent navigation between header and footer.

### Logo Click (Home Navigation)
✅ **Working correctly** — clicking STR logo from any inner page navigates to homepage (`/`).

### Back Button
✅ **Working correctly** — browser back button navigates properly between pages (SPA with proper history).

### Breadcrumbs
⚠️ **No breadcrumbs present on any page** — not critical for a small site but would improve UX on deeper pages (individual class/trainer pages).

---

## 2. Cross-Page Consistency

### Header/Footer Presence
✅ **Header present on every page** — consistent navigation bar with logo, nav links, dark mode toggle, and "Join Now" CTA.  
✅ **Footer present on every page** — consistent footer with logo, navigation, contact info, and legal links.

### Font Consistency
✅ **Consistent** — uppercase headings with same font family throughout all pages. Body text is consistent.

### Color Scheme
✅ **Consistent branding** — dark theme (#1a1a1a background), orange/gold accent (#E5A33E approximately), white text. Applied consistently across all pages.

### Spacing/Padding
⚠️ **Minor issue on Trainers page** — there is a **very large empty gap** (~300-400px) between the trainer cards section and the CTA sections ("Join Our Team" / "Train With the Best"). This creates an awkward dead space when scrolling.

### Button Styles
✅ **Mostly consistent** — all CTA buttons use the orange/gold color with uppercase text and arrow icons. "Get Started" buttons on pricing page alternate between filled (Premium) and outlined (Basic, Elite) styles appropriately to highlight the "Most Popular" plan.

---

## 3. Link Integrity

### Homepage Links — All Links Tested

#### ❌ BROKEN LINKS (404):
1. **`/classes/group-training`** — linked from "Our Offerings" section → homepage card "Group Training" → **returns 404**
2. **`/classes/private-personal-training`** — linked from "Our Offerings" section → homepage card "Private Personal Training" → **returns 404**

> These two class slugs on the homepage do NOT match the actual class pages. The classes page uses `/classes/personal-training` and doesn't have a separate "group-training" page.

#### ✅ Working Internal Links:
- `/classes/semi-private-training` — works
- `/classes/strength-conditioning` — works  
- `/classes/hiit` — works
- `/classes/functional-training` — works
- `#get-started` — scrolls to form section ✅
- `/gallery` — works
- `/contact` — works
- All footer links — work

#### External Links:
- ✅ Google Maps (`maps.google.com`) — opens in new tab with `target="_blank"` and `rel="noopener noreferrer"`
- ✅ `mailto:spencer@trainwithstr.com` — works correctly

#### ❌ Instagram Links (Trainers Page):
All 4 Instagram links have **double `@` issue**:
- Display text shows `@@trainwithstr` instead of `@trainwithstr`
- URL is `https://instagram.com/@trainwithstr` — the `@` in the URL is invalid; Instagram URLs should be `https://instagram.com/trainwithstr`
- Same issue for `@@marcus_lifts`, `@@sarah_trains`, `@@david_moves`
- Links DO open in new tab with proper `rel` attributes ✅

### "Get Started" CTA
✅ **Homepage hero "Get Started" button** → scrolls to `#get-started` contact form on the same page.  
✅ **Pricing page "Get Started" buttons** → link to `/contact` page.

### Empty/Placeholder Links:
❌ **Contact page "Phone" section** — `tel:` link has NO phone number (empty `href="tel:"`). Clicking it does nothing useful.

---

## 4. SEO & Meta Basics

### Page Titles
❌ **CRITICAL: Every single page has the SAME title:**
```
STR - Strength Through Resilience | Premium Gym in Cranford, NJ
```

| Page | Title | Issue |
|------|-------|-------|
| Homepage (`/`) | STR - Strength Through Resilience \| Premium Gym in Cranford, NJ | OK for home |
| Classes (`/classes`) | Same | ❌ Should be unique |
| Trainers (`/trainers`) | Same | ❌ Should be unique |
| Pricing (`/pricing`) | Same | ❌ Should be unique |
| About (`/about`) | Same | ❌ Should be unique |
| Contact (`/contact`) | Same | ❌ Should be unique |
| Blog (`/blog`) | Same | ❌ Should be unique |
| Gallery (`/gallery`) | Same | ❌ Should be unique |
| FAQ (`/faq`) | Same | ❌ Should be unique |
| Privacy (`/privacy`) | Same | ❌ Should be unique |
| Terms (`/terms`) | Same | ❌ Should be unique |

**Recommendation:** Each page should have a unique, descriptive title, e.g.:
- Classes: "Classes & Training | STR Gym Cranford, NJ"
- Pricing: "Membership Pricing | STR Gym"
- etc.

### Headings Hierarchy
✅ **Proper hierarchy on all pages** — each page has exactly one `<h1>`, followed by `<h2>`, `<h3>`, `<h4>` in correct order.

| Page | H1 |
|------|-----|
| Home | Strength Through Resilience |
| Classes | CLASSES & TRAINING |
| Trainers | YOUR COACHES |
| Pricing | INVEST IN YOUR STRENGTH |
| About | STRENGTH THROUGH RESILIENCE |
| Contact | CONTACT US |
| Blog | FITNESS INSIGHTS |
| Gallery | INSIDE STR |
| FAQ | FREQUENTLY ASKED QUESTIONS |
| Privacy | PRIVACY POLICY |
| Terms | TERMS OF SERVICE |

---

## 5. Performance Observations

### Page Load Speed
✅ **All pages load quickly** — no noticeable delay on any page. Server-side rendering (Next.js) provides fast initial loads.

### Images
⚠️ **Gallery images on homepage** — some gallery thumbnails appear as very dark rectangles (possibly loading issue or very dark images that are hard to distinguish in dark theme).

### Layout Shifts (CLS)
✅ **No noticeable layout shifts** observed during page loads.

### Console Errors
❌ **`site.webmanifest` returns 404** — console error on every page:
```
Failed to load resource: the server responded with a status of 404 ()
Manifest fetch from https://str-website-kappa.vercel.app/site.webmanifest failed
```

---

## 6. Accessibility Quick Check

### Skip to Content
✅ **"Skip to main content" link present** on every page — links to `#main-content`.

### Focus Visibility
✅ **Focus states appear present** — tab navigation shows visible focus indicators on links.

### Image Alt Text
✅ **All images have alt text** — checked homepage (12 images, 0 missing alt), gallery (12 images, all with descriptive alt), trainers (all trainer images have alt).

### Form Labels
✅ **Homepage form** — all visible inputs have associated labels (Name, Email, Phone, Fitness Goals).  
✅ **Contact page form** — all inputs have labels (First Name, Last Name, Email, Phone, Subject, Message).  
⚠️ **Contact page Subject dropdown** — has a label but the `<select>` uses a generic `combobox` role without clear ARIA labeling.

### Color Contrast
✅ **Generally good** — white text on dark background provides strong contrast. Orange accent text on dark background is also readable.

---

## 7. Content Issues Found

### ❌ CRITICAL: "NOT REALLY" Text in Production
The homepage "Our Offerings" section contains a heading:
> **"Semi-Private Training NOT REALLY"**

The text "NOT REALLY" is clearly a developer/debug note left in the production build. This is visible to all users.

### ❌ Exposed Developer Message on Contact Page
The contact page map section shows:
> **"Google Maps Embed"**  
> **"Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable"**

This developer placeholder text is visible to end users and looks unprofessional.

### ⚠️ Pricing Page — "$0" Display
All three pricing cards show a "0" value below the actual price ($49, $99, $199). This appears to be an empty strikethrough/comparison price field displaying "0" instead of being hidden.

### ⚠️ "Follow Us" Sections Are Empty
- Footer "Follow Us" section says "Coming soon" with location "Cranford, NJ"
- Contact page "Follow Us" section is completely empty — no social media links
- Not broken, but looks unfinished

### ⚠️ Phone Number Missing
- Contact page shows "Phone" heading but no actual phone number
- The `tel:` link has an empty href

### ⚠️ 404 Page — No Custom Design
Visiting any non-existent URL shows the generic Next.js 404:
> "404 — This page could not be found."

No navigation or branding on the 404 page — users have no way to navigate back except browser back button.

### ⚠️ Homepage Map (Visit Us Section)
The homepage "Visit Us" section has a Google Maps iframe embedded that works (unlike the contact page map). However, the homepage map seems to load the Google Maps embed directly rather than through an API key.

---

## 8. All Pages Status Check

| Page | URL | HTTP Status | Has Header | Has Footer | H1 Present |
|------|-----|-------------|------------|------------|-------------|
| Home | `/` | 200 | ✅ | ✅ | ✅ |
| Classes | `/classes` | 200 | ✅ | ✅ | ✅ |
| Trainers | `/trainers` | 200 | ✅ | ✅ | ✅ |
| Pricing | `/pricing` | 200 | ✅ | ✅ | ✅ |
| About | `/about` | 200 | ✅ | ✅ | ✅ |
| Contact | `/contact` | 200 | ✅ | ✅ | ✅ |
| Blog | `/blog` | 200 | ✅ | ✅ | ✅ |
| Gallery | `/gallery` | 200 | ✅ | ✅ | ✅ |
| FAQ | `/faq` | 200 | ✅ | ✅ | ✅ |
| Privacy | `/privacy` | 200 | ✅ | ✅ | ✅ |
| Terms | `/terms` | 200 | ✅ | ✅ | ✅ |
| Blog Article 1 | `/blog/5-compound-exercises...` | 200 | ✅ | ✅ | ✅ |
| Blog Article 2 | `/blog/pre-workout-nutrition...` | 200 | ✅ | ✅ | ✅ |
| Blog Article 3 | `/blog/member-spotlight...` | 200 | ✅ | ✅ | ✅ |
| Blog Article 4 | `/blog/recovery-101...` | 200 | ✅ | ✅ | ✅ |
| Trainer: Spencer | `/trainers/spencer` | 200 | ✅ | ✅ | ✅ |
| Trainer: Marcus | `/trainers/marcus-johnson` | 200 | ✅ | ✅ | ✅ |
| Trainer: Sarah | `/trainers/sarah-chen` | 200 | ✅ | ✅ | ✅ |
| Trainer: David | `/trainers/david-martinez` | 200 | ✅ | ✅ | ✅ |
| Class: Strength | `/classes/strength-conditioning` | 200 | ✅ | ✅ | ✅ |
| Class: Personal | `/classes/personal-training` | 200 | ✅ | ✅ | ✅ |
| Class: Semi-Private | `/classes/semi-private-training` | 200 | ✅ | ✅ | ✅ |
| Class: HIIT | `/classes/hiit` | 200 | ✅ | ✅ | ✅ |
| Class: Functional | `/classes/functional-training` | 200 | ✅ | ✅ | ✅ |
| Class: Small Group | `/classes/small-group` | 200 | ✅ | ✅ | ✅ |
| Class: Hyrox | `/classes/hyrox-deka` | 200 | ✅ | ✅ | ✅ |
| **Group Training** | `/classes/group-training` | **404** | ❌ | ❌ | ❌ |
| **Private Personal** | `/classes/private-personal-training` | **404** | ❌ | ❌ | ❌ |

---

## Priority Fix List

### 🔴 Critical (Fix Immediately)
1. **Remove "NOT REALLY" from Semi-Private Training heading** on homepage
2. **Fix broken links**: `/classes/group-training` and `/classes/private-personal-training` — either create these pages or update the homepage links to use correct slugs (`/classes/small-group` and `/classes/personal-training`)
3. **Hide Google Maps API key placeholder text** on contact page — show nothing or a static map image instead
4. **Fix Instagram URLs** — remove extra `@` from both display text and URLs on trainers page

### 🟡 Important (Fix Soon)  
5. **Add unique page titles** for SEO — every page currently shares the same `<title>` tag
6. **Add phone number** or remove "Phone" section from contact page
7. **Fix "$0" display** on pricing cards — hide the comparison price field if no value
8. **Add `site.webmanifest`** file or remove the reference to stop 404 console errors
9. **Fix trainers page spacing** — large empty gap between trainer cards and CTA sections

### 🟢 Nice to Have
10. **Add "Trainers" to footer nav** and **"Blog" to header nav** for consistency
11. **Create custom 404 page** with navigation and branding
12. **Add social media links** to "Follow Us" sections or remove the sections
13. **Add breadcrumbs** to inner pages (class details, trainer profiles, blog articles)
14. **Consider newsletter signup** — currently shows "Newsletter signup coming soon" on blog page
