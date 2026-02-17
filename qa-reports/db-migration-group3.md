# DB Migration Group 3: Pricing, Contact, About + Homepage Sections

## Date: 2025-07-12
## Status: ✅ Complete — Build passes

---

## Pages Converted

### 1. `/pricing` (src/app/pricing/page.tsx)
- **Before:** `'use client'` component importing from `@/data/pricing` and `@/data/faqs`
- **After:** Server component fetching from Supabase, passing data to `PricingPageClient.tsx`
- **Data sources:**
  - `membership_plans` table → filtered by `active=true`, ordered by `sort_order`
  - `faqs` table → filtered by `category='Membership'`, `active=true`, ordered by `sort_order`
- **Field mapping:** snake_case DB columns → camelCase TypeScript types (e.g., `price_monthly` → `priceMonthly`, `setup_fee` → `setupFee`, `sort_order` → `sortOrder`)
- **Files created:** `src/app/pricing/PricingPageClient.tsx`
- **Files modified:** `src/app/pricing/page.tsx`

### 2. `/contact` (src/app/contact/page.tsx)
- **Before:** `'use client'` component importing from `@/data/settings`
- **After:** Server component fetching from Supabase, passing settings to `ContactPageClient.tsx`
- **Data sources:**
  - `site_settings` table → all rows, key-value pairs assembled into settings object
- **Settings keys used:** `gym_info` (name, email, phone, address), `business_hours`, `social_links`
- **Graceful handling:** All fields default safely if missing (empty strings, empty arrays, conditional rendering)
- **Files created:** `src/app/contact/ContactPageClient.tsx`
- **Files modified:** `src/app/contact/page.tsx`

### 3. `/about` (src/app/about/page.tsx)
- **Before:** `'use client'` component importing from `@/data/trainers` and `@/data/settings`
- **After:** Server component fetching from Supabase, passing trainers to `AboutPageClient.tsx`
- **Data sources:**
  - `trainers` table → filtered by `active=true`, ordered by `sort_order`
- **Note:** The about page previously imported `siteSettings` but didn't actually use it in the template (only `trainers` was used). Removed the unused import.
- **Field mapping:** `short_bio` → `shortBio`, `experience_years` → `experienceYears`, `sort_order` → `sortOrder`, etc.
- **Files created:** `src/app/about/AboutPageClient.tsx`
- **Files modified:** `src/app/about/page.tsx`

### 4. Legacy Homepage Sections (ClassesPreview & TestimonialsCarousel)
- **Note:** These components are exported from `src/components/sections/index.ts` but NOT currently used on any page (the homepage uses `TestimonialsScrolling`, `OurOfferings`, etc. instead). Converted anyway for completeness.

#### ClassesPreview
- **Before:** `'use client'` component importing `getFeaturedClasses` from `@/data/classes`
- **After:** Server component fetching from `classes` table, rendering `ClassesPreviewClient.tsx`
- **Data sources:** `classes` table → filtered by `active=true`, `featured=true`, ordered by `sort_order`, limited to 4
- **Files created:** `src/components/sections/ClassesPreviewClient.tsx`
- **Files modified:** `src/components/sections/ClassesPreview.tsx`

#### TestimonialsCarousel
- **Before:** `'use client'` component importing `getFeaturedTestimonials` from `@/data/testimonials`
- **After:** Server component fetching from `testimonials` table, rendering `TestimonialsCarouselClient.tsx`
- **Data sources:** `testimonials` table → filtered by `approved=true`, `featured=true`, ordered by `created_at` desc
- **Files created:** `src/components/sections/TestimonialsCarouselClient.tsx`
- **Files modified:** `src/components/sections/TestimonialsCarousel.tsx`

---

## Architecture Pattern Used

For each page with client interactivity (framer-motion, useState, useForm):

1. **Server component** (`page.tsx`) — removed `'use client'`, fetches data via `createServerSupabaseClient()`
2. **Client component** (`*PageClient.tsx` or `*Client.tsx`) — receives data as props, contains all interactive UI
3. **Snake-to-camel mapping** — explicit field mapping from DB column names to TypeScript interface fields

---

## Updated Exports

`src/components/sections/index.ts` updated to export new client components:
- `ClassesPreviewClient`
- `TestimonialsCarouselClient`

---

## Null/Empty Data Handling

- All DB results default to empty arrays: `(data || []).map(...)`
- String fields default to `''`, numbers to `0`, booleans to `false`
- Conditional rendering for optional sections (social links, business hours, phone)
- Contact page shows fallback text when phone/email not available

---

## Build Verification

```
✓ Compiled successfully
✓ TypeScript check passed
✓ All 16 static pages generated
✓ All dynamic routes render correctly
```

---

## Data Files Still Referenced

The following `@/data/*` files are no longer imported by the converted pages but may still be used elsewhere:
- `@/data/pricing` — check if used by other pages/components
- `@/data/faqs` — still used by `/faq` page (separate migration)
- `@/data/settings` — check Header/Footer components
- `@/data/trainers` — still used by `/trainers` and `/trainers/[slug]` pages
- `@/data/classes` — still used by `/classes` and `/classes/[slug]` pages
- `@/data/testimonials` — still used by `/testimonials` page

These data files should NOT be deleted until all consumers are migrated.
