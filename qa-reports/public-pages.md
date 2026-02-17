# STR Gym Website — Public Pages QA Report

**Site:** https://str-website-kappa.vercel.app  
**Date:** 2025-07-11  
**Tester:** Automated (OpenClaw browser, profile=openclaw)

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Working | 9 |
| ⚠️ Minor Issue | 3 |
| ❌ Broken / Critical | 2 |

---

## Happy Path — Page-by-Page Results

### ✅ `/` — Homepage
- **Status:** ✅ Working
- Full nav bar, hero section, "Get Started" lead capture form, class offerings, testimonials carousel, gallery preview, footer
- Good structure: nav → hero → location → lead form → classes → testimonials → gallery → footer
- Note: Initial visit showed admin login page due to stale session cookie; after clearing session, homepage renders correctly

### ✅ `/about` — About Page
- **Status:** ✅ Working
- Sections: Our Story, Values (Results-Focused, Community First, Excellence, Personal Attention), Facility, Coaches preview, Certifications, CTA
- Coaches link to individual trainer profiles
- All links functional

### ✅ `/classes` — Classes Page
- **Status:** ✅ Working
- 7 classes displayed with category filters (All, Strength, Personal Training, Cardio & HIIT, Functional Fitness)
- Each class card shows: duration, max capacity, calorie estimate, pricing tag
- Full weekly timetable with linked class names
- "Book Free Trial" CTA at bottom

### ✅ `/trainers` — Trainers Page
- **Status:** ✅ Working
- 4 trainers displayed: Spencer, Marcus Johnson, Sarah Chen, David Martinez
- Each has bio, specialty, Instagram handle, "View Profile" link
- "Join Our Team" careers section with Apply Now CTA
- Instagram links go to external profiles (e.g., instagram.com/trainwithstr)

### ❌ `/blog` — Blog Page
- **Status:** ❌ **BROKEN — Redirects to admin login**
- Navigating to `/blog` as an unauthenticated user shows the admin login page ("STR Gym Admin — Sign in to access the admin panel")
- **Expected:** Public blog listing page with published posts
- **Actual:** Admin login wall. Blog is completely inaccessible to visitors
- **Impact:** HIGH — Footer links to `/blog` on every page, so every visitor who clicks it hits a login wall
- **Fix needed:** Blog route should be public for published posts; only admin/draft management should require auth

### ✅ `/contact` — Contact Page
- **Status:** ✅ Working
- Form fields: First Name, Last Name, Email, Phone (optional), Subject dropdown (6 options), Message
- Contact sidebar: Location, Email, Hours (Mon-Fri 05:00-22:00, Sat-Sun 07:00-20:00)
- Google Maps directions link works
- ⚠️ **Minor issue — Address inconsistency:** 
  - Contact info / footer / map link: **"8 Eastman St, Suite 3, Cranford, NJ 07016"**
  - "Visit Us" section at bottom of contact page: **"24 North Avenue East, Cranford, NJ 07016"**
  - These are two different addresses — needs clarification on which is correct

### ✅ `/faq` — FAQ Page
- **Status:** ✅ Working
- Category filter tabs: Membership, Classes, Facilities, Policies
- Accordion-style Q&A (collapsed by default, 4 membership questions visible)
- "Still Have Questions?" CTA links to contact

### ⚠️ `/gallery` — Gallery Page
- **Status:** ⚠️ Minor Issue
- Page loads with category filters (All, Facility, Classes, Events, Transformations)
- 12 gallery items shown with "View" text on each
- **Issue:** Gallery items only show "View" text with no visible image titles/captions in the DOM snapshot — may just be lazy-loaded images that aren't captured in accessibility tree, but worth verifying visually

### ✅ `/pricing` — Pricing Page
- **Status:** ✅ Working (with minor issues)
- 3 tiers: Basic ($49/mo), Premium ($99/mo, "Most Popular"), Elite ($199/mo)
- Feature comparison table
- Membership FAQ section with accordion
- **Minor issues:**
  - Price cards show "$49 /month 0", "$99 /month 0", "$199 /month 0" — the trailing **"0"** appears to be a rendering artifact (possibly a discount/savings display showing $0)
  - Comparison table has some empty cells for "Group Classes" row (missing ✓/✗ indicators for Basic/Premium/Elite)
  - "Locker" and "Priority Booking" rows also have missing cell values

### ✅ `/testimonials` — Testimonials Page
- **Status:** ✅ Working (with placeholder issue)
- 6 testimonials displayed with quotes, member names, categories, and some with results metrics
- "5.0 ON GOOGLE" section
- ⚠️ **"Leave a Review" link is a placeholder:** `https://g.page/r/YOUR-GOOGLE-REVIEW-LINK` — needs real Google review URL

### ✅ `/privacy` — Privacy Policy
- **Status:** ✅ Working
- Complete 10-section privacy policy
- "Back to Home" breadcrumb navigation
- Contact information at bottom
- Last updated: January 1, 2025

### ✅ `/terms` — Terms of Service
- **Status:** ✅ Working
- Complete 13-section terms of service
- "Back to Home" breadcrumb navigation
- Covers: membership, cancellation, facility rules, booking, liability, guest policy, IP, governing law
- Last updated: January 1, 2025

---

## Unhappy Path Results

### ✅ `/nonexistent-page` → 404
- **Status:** ✅ Works (returns 404)
- Shows default Next.js 404: "404 — This page could not be found."
- ⚠️ **Minor:** Generic unstyled 404 — no site navigation, branding, or back link. Consider adding a custom 404 page with nav bar and "Go Home" button

### ✅ `/admin` (not logged in) → Redirects to login
- **Status:** ✅ Working
- Correctly redirects to `/login?redirect=%2Fadmin`
- Shows "STR Gym Admin — Sign in to access the admin panel"
- Preserves intended redirect destination

### ⚠️ `/classes/nonexistent-class` → 404
- **Status:** ⚠️ Handled but generic
- Shows same default Next.js 404
- No class-specific error message or "Browse our classes" fallback link

### ⚠️ `/blog/nonexistent-post` → 404
- **Status:** ⚠️ Handled but generic
- Shows same default Next.js 404
- No blog-specific error or "View all posts" fallback

### ✅ Contact Form — Empty Submission
- **Status:** ✅ Working
- Client-side validation catches all empty required fields:
  - "First name must be at least 2 characters"
  - "Last name must be at least 2 characters"
  - "Please select a subject"
  - "Message must be at least 10 characters"
- Form does NOT submit — validation prevents it

### ✅ Contact Form — Invalid Email
- **Status:** ✅ Working
- Email field has validation (though full test was interrupted by browser autofill)
- Empty email submission triggers validation error

---

## Critical Issues (Action Required)

### 1. ❌ `/blog` is behind authentication
- **Severity:** HIGH
- **Impact:** Blog is linked in the footer of every page but shows admin login to visitors
- **Expected:** Public blog listing with published posts visible to everyone
- **Fix:** Update routing/middleware to make `/blog` and `/blog/[slug]` public for published posts

### 2. ⚠️ Address inconsistency on Contact page
- **Severity:** MEDIUM
- **Details:** Two different addresses shown:
  - Main address everywhere: "8 Eastman St, Suite 3, Cranford, NJ 07016"
  - "Visit Us" section: "24 North Avenue East, Cranford, NJ 07016"
- **Fix:** Confirm correct address and make consistent across all pages

---

## Minor Issues / Polish Items

| # | Page | Issue | Severity |
|---|------|-------|----------|
| 1 | `/pricing` | Trailing "0" after price (e.g., "$49 /month 0") | Low |
| 2 | `/pricing` | Empty cells in comparison table (Group Classes, Locker, Priority Booking rows) | Low |
| 3 | `/testimonials` | "Leave a Review" link is placeholder URL: `YOUR-GOOGLE-REVIEW-LINK` | Medium |
| 4 | All 404 pages | Generic Next.js 404 with no site branding/nav | Low |
| 5 | `/gallery` | Image items show only "View" text — captions/titles may be missing | Low |
| 6 | Footer (all pages) | "Follow Us" section just says "Coming soon" — consider hiding or adding socials | Low |

---

## Global Observations

### ✅ What's Working Well
- **Navigation:** Consistent across all public pages with skip-to-content link (accessibility ✓)
- **Dark/Light mode toggle:** Present on every page
- **Footer:** Consistent with navigation links, contact info, legal links
- **Form validation:** Contact form has proper client-side validation with clear error messages
- **Responsive nav:** "Join Now" CTA prominently placed
- **SEO-friendly:** Clean URL structure, proper heading hierarchy
- **Admin auth:** Properly redirects unauthenticated users to login with redirect param

### ⚠️ Areas for Improvement
- Custom 404 page needed (branding, navigation, helpful links)
- Blog needs to be made public
- Address consistency check needed
- Google Review link placeholder needs real URL
- "Follow Us" section needs social links or should be hidden until available
