# STR Gym Website — Mobile & Tablet Visual QA Report

**Site:** https://str-website-kappa.vercel.app  
**Date:** 2025-07-17  
**Tester:** Automated QA (OpenClaw Browser)

---

## Viewports Tested

| Device | Resolution | Status |
|--------|-----------|--------|
| iPhone SE | 375×667 | ✅ Tested |
| iPhone 14 Pro | 393×852 | ✅ Tested |
| iPad Mini | 768×1024 | ✅ Tested |
| iPad Pro | 1024×1366 | ✅ Tested |
| Samsung Galaxy S21 | 360×800 | ✅ Tested |
| Desktop Baseline | 1440×900 | ✅ Tested |

## Pages Tested

| Page | URL | Tested |
|------|-----|--------|
| Homepage | / | ✅ All viewports |
| Classes | /classes | ✅ All viewports |
| Contact | /contact | ✅ Mobile + Tablet |
| Pricing | /pricing | ✅ All viewports |
| Admin Login | /login | ✅ (see routing notes) |
| FAQ | /faq | ✅ Mobile + Tablet |
| About | /about | ✅ Mobile + Tablet |

---

## 🔴 Critical Issues

### 1. Pricing Comparison Table — Columns Hidden on Mobile
- **Page:** /pricing
- **Viewports:** 375×667, 393×852, 360×800 (all phones)
- **Description:** The feature comparison table renders all 4 columns (Feature, Basic, Premium, Elite) but the table is 600px wide in a 333px container. The Premium and Elite columns are clipped/invisible. Only "Feature" and "Basic" columns are visible. There is no horizontal scroll indicator or affordance to view the hidden columns.
- **Impact:** Users on mobile cannot compare plans — they only see the Basic tier features, which undermines the entire purpose of the comparison table.
- **Severity:** 🔴 **CRITICAL**
- **Fix suggestion:** Either make the table horizontally scrollable with a visible scroll indicator, stack the comparison vertically on mobile, or use a tabbed interface.

### 2. Sporadic Auth Redirects on Public Pages
- **Pages:** /about, /faq, /pricing (intermittent)
- **Viewports:** All
- **Description:** Multiple public pages occasionally redirect to `/login` or `/login?redirect=%2Fadmin` during testing. The /about page consistently redirected to the login page after a few seconds. The /faq page also redirected in some cases. This appears to be a client-side auth check that fires after initial page load.
- **Impact:** Users may be unable to access public content. The redirect targets the admin login, which is confusing for regular visitors.
- **Severity:** 🔴 **CRITICAL**
- **Fix suggestion:** Review Next.js middleware or client-side auth guards. Ensure public pages (/, /about, /faq, /pricing, /classes, /contact) are excluded from authentication checks.

### 3. Admin Dashboard Accessible Without Proper Auth
- **Page:** /gallery (and admin routes)
- **Viewports:** All
- **Description:** The admin login form has pre-filled credentials (admin@str.com / ••••••••) visible in the form. During testing, navigating to /gallery loaded the full admin dashboard with all data visible (classes, trainers, blog posts, testimonials, gallery images, FAQs, leads, settings).
- **Impact:** Potential unauthorized access to admin panel. Pre-filled credentials in the login form is a security vulnerability.
- **Severity:** 🔴 **CRITICAL (Security)**
- **Fix suggestion:** Remove auto-filled credentials, ensure admin routes require proper authentication, and ensure /gallery on the public site shows the gallery page, not the admin panel.

---

## 🟠 Major Issues

### 4. About Page — Massive Empty Sections
- **Page:** /about
- **Viewports:** All tested (375×667, 1024×1366)
- **Description:** The About page has enormous empty dark areas between the "Built From Passion" section and the footer. At iPad Pro (1024px), there are at least 3 large empty gaps:
  1. ~400px empty space after the story text
  2. ~500px dark section with no visible content  
  3. An orange/yellow band section with no visible text
  These appear to be sections intended for content (values, stats, CTA?) that either aren't rendering or have missing data.
- **Impact:** Page looks broken and unfinished. Users will likely bounce.
- **Severity:** 🟠 **MAJOR**

### 5. FAQ Page — Large Empty Space Below Accordions
- **Page:** /faq
- **Viewports:** 375×667 (confirmed)
- **Description:** After the FAQ accordion items, there is a large empty dark area (~300px) before the footer. The content appears to end abruptly after only 4 questions with the "Membership" category, despite filter buttons for Classes, Facilities, and Policies.
- **Impact:** Page feels incomplete. The other FAQ categories may not be loading.
- **Severity:** 🟠 **MAJOR**

### 6. Pricing Cards Cramped at iPad Mini (768px)
- **Page:** /pricing
- **Viewports:** 768×1024
- **Description:** The three pricing cards (Basic, Premium, Elite) are forced into a 3-column layout at 768px. Each card is approximately 230px wide, causing:
  - Heavy text wrapping in descriptions
  - "GET STARTED" button text wrapping to 2 lines
  - Feature list text cramped
  - Overall poor readability
- **Impact:** Pricing information is hard to read and compare at this breakpoint.
- **Severity:** 🟠 **MAJOR**
- **Fix suggestion:** Switch to a 1-column stacked layout at 768px, or use 2 columns with a "swipe for more" pattern.

### 7. "Semi-Private Training NOT REALLY" — Test/Debug Text in Production
- **Page:** / (homepage)
- **Viewports:** All
- **Description:** The heading for Semi-Private Training reads "Semi-Private Training NOT REALLY" — the "NOT REALLY" text appears to be debug/test content left in the CMS or code.
- **Impact:** Unprofessional appearance on the most prominent section of the homepage.
- **Severity:** 🟠 **MAJOR**

### 8. Gallery Images Not Loading
- **Page:** / (homepage), /gallery
- **Viewports:** All
- **Description:** The gallery section on the homepage shows 8 empty placeholder boxes with captions (Strength Training, Group Class, Personal Training, etc.) but no actual images load. The boxes appear as dark gray rectangles.
- **Impact:** Missing visual content makes the gym look unlaunched/empty.
- **Severity:** 🟠 **MAJOR**

---

## 🟡 Minor Issues

### 9. Footer Navigation Links Too Small for Touch
- **Page:** All pages
- **Viewports:** 375×667, 393×852, 360×800
- **Description:** Footer links (About, Classes, Pricing, Blog, Contact) measure only 17px in height — well below the 44×44px minimum touch target. Similarly:
  - Email links: 26px tall
  - Privacy Policy / Terms of Service: 20px tall
  - Logo link: 40×40px (close but under 44px minimum)
- **Impact:** Footer links are difficult to tap accurately on mobile devices, especially for users with larger fingers or accessibility needs.
- **Severity:** 🟡 **MINOR**
- **Fix suggestion:** Add padding to footer links to increase touch target to at least 44px height.

### 10. Contact Page — Missing Phone Number
- **Page:** /contact
- **Viewports:** All
- **Description:** The contact info section shows a "Phone" heading with an icon but no phone number is displayed beneath it. Email and location are properly shown.
- **Impact:** Users looking for a phone number get a blank field.
- **Severity:** 🟡 **MINOR**

### 11. Contact Page — Google Maps Placeholder
- **Page:** /contact
- **Viewports:** All
- **Description:** The map section displays "Google Maps Embed — Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable" instead of an actual map.
- **Impact:** No map shown to users. The technical error message is visible to the public.
- **Severity:** 🟡 **MINOR**
- **Fix suggestion:** Either add the Google Maps API key or hide the map section until configured.

### 12. Homepage "Visit Us" Section — Empty Map Area
- **Page:** /
- **Viewports:** All
- **Description:** The "Visit Us" section has a large dark empty area where a map embed is presumably intended. No map or placeholder content is visible.
- **Impact:** Wasted vertical space with no content.
- **Severity:** 🟡 **MINOR**

### 13. /login Route Shows Different Pages Based on Context
- **Page:** /login
- **Viewports:** All
- **Description:** Direct navigation to /login shows the Trainers/Coaches page (Spencer, Marcus Johnson, Sarah Chen, David Martinez) rather than a login form. However, /login?redirect=%2Fadmin shows the admin login panel. The routing behavior is inconsistent.
- **Impact:** Confusing for users and developers.
- **Severity:** 🟡 **MINOR**

---

## 🔵 Cosmetic Issues

### 14. About Page Hero — Low Text Contrast
- **Page:** /about
- **Viewports:** All
- **Description:** The hero section subtitle text ("Founded on the belief that true training is built on consistency, community, and resilience") overlaps with a busy background image. The text is somewhat readable but contrast could be improved.
- **Severity:** 🔵 **COSMETIC**

### 15. Homepage Hero — Scroll Indicator Animation
- **Page:** /
- **Viewports:** Mobile
- **Description:** The scroll indicator (circle with down arrow) between the hero and "Find Us" section works but sits in a large empty space. The gap between the hero CTA and the "Find Us" heading feels excessive on mobile.
- **Severity:** 🔵 **COSMETIC**

---

## ✅ What Works Well

1. **Hamburger menu on mobile** — Navigation collapses properly to a hamburger icon on all phone viewports (375px, 393px, 360px). The "Open menu" button is present and accessible.

2. **Full nav on tablet/desktop** — At 768px+, the navigation shows full links with a "Join Now" CTA button.

3. **Contact form** — Fully usable at all viewport sizes. Form fields stack properly, inputs are appropriately sized, labels are visible.

4. **Pricing cards on mobile** — The 3 pricing cards stack vertically on phone viewports, each getting full width. Pricing information is readable.

5. **Classes page grid** — Adapts from 1-column on phones to 2-column on iPad Mini, with proper card sizing.

6. **No horizontal scrolling on page level** — No horizontal overflow detected on any page at the document level (confirmed via JS evaluation).

7. **Dark theme consistency** — The dark theme is consistent across all pages and viewports.

8. **Testimonials section** — Reviews display well as a horizontal carousel/slider on desktop and stack properly on mobile.

9. **Schedule table on mobile** — The class schedule table on /classes is readable on mobile, with proper column sizing for Day, Time, Class, and Duration.

10. **Footer layout** — Adapts from multi-column on desktop/tablet to stacked single-column on mobile.

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 3 |
| 🟠 Major | 5 |
| 🟡 Minor | 5 |
| 🔵 Cosmetic | 2 |
| **Total Issues** | **15** |

### Priority Fix Order:
1. **Auth redirect bug** — Public pages redirecting to /login (Critical, affects all users)
2. **Admin security** — Pre-filled credentials and accessible dashboard (Critical, security)
3. **Pricing table on mobile** — Columns hidden without scroll (Critical, affects conversion)
4. **"NOT REALLY" debug text** — Remove from production (Major, visible to all visitors)
5. **About page empty sections** — Fill or remove blank areas (Major, page looks broken)
6. **Gallery images** — Ensure images load or add proper placeholders (Major)
7. **FAQ empty space** — Load all categories or remove empty area (Major)
8. **Touch targets** — Increase footer link padding (Minor, accessibility)
9. **Google Maps API key** — Add key or hide section (Minor)
10. **Phone number** — Add to contact page (Minor)
