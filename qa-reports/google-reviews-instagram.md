# Google Reviews & Instagram Feed - QA Report

## Date: 2025-07-16

## Task 1: Google Reviews Integration

### What was done
- **Admin Settings** (`src/app/admin/settings/page.tsx`): Added `google_place_id` field under Integrations section with helper text linking to Google's Place ID Finder.
- **TestimonialsScrolling** (`src/components/sections/TestimonialsScrolling.tsx`): Added optional `googlePlaceId` prop. When set, renders two CTA buttons below the scrolling reviews:
  - **"Leave a Review"** → links to `https://search.google.com/local/writereview?placeid={ID}`
  - **"See All Reviews on Google"** → links to `https://search.google.com/local/reviews?placeid={ID}`
- **Homepage** (`src/app/page.tsx`): Fetches `google_place_id` from `site_settings` and passes it to `TestimonialsScrolling`.

### Behavior
- If `google_place_id` is not configured (empty/null), the Google review buttons are hidden — the testimonials section works exactly as before.
- If configured, gold-styled CTA buttons appear centered below the scrolling carousel.
- Existing testimonials admin management is fully preserved.

---

## Task 2: Instagram Feed in Gallery

### What was done

#### Admin Settings
- Added `instagram_feed_embed` textarea field under Integrations in admin settings for pasting embed widget code (SnapWidget, Elfsight, etc.).

#### Gallery Page (`src/app/gallery/page.tsx` + `GalleryPageClient.tsx`)
- Server-side: Fetches `social_instagram` URL and `instagram_feed_embed` code from `site_settings`.
- Client-side: Added an **Instagram Feed section** at the TOP of the gallery page (before category filter and gallery grid):
  - If `instagram_feed_embed` is set → renders the embed HTML via `dangerouslySetInnerHTML`.
  - If only `social_instagram` URL is set → renders a styled Instagram gradient CTA button with the handle extracted from the URL.
  - If neither is set → section is hidden entirely.
- Existing Supabase gallery images remain below the Instagram section, fully functional.

#### Homepage GalleryPreview (`src/components/sections/GalleryPreview.tsx`)
- Added optional `instagramUrl` prop.
- When set, renders a "Follow Us on Instagram" button with Instagram icon alongside the existing "View Full Gallery" button.
- Homepage server component fetches `social_instagram` and passes it down.

### Behavior
- **No Instagram configured**: Gallery page and homepage gallery preview look exactly as before.
- **Instagram URL only**: Shows a "Follow @handle" gradient button on gallery page + "Follow Us on Instagram" button on homepage preview.
- **Embed code configured**: Renders the third-party Instagram feed widget on the gallery page.

---

## Files Modified
| File | Changes |
|------|---------|
| `src/app/admin/settings/page.tsx` | Added `google_place_id` input + `instagram_feed_embed` textarea |
| `src/components/sections/TestimonialsScrolling.tsx` | Added `googlePlaceId` prop + Google review CTA buttons |
| `src/app/page.tsx` | Fetch `google_place_id` + `social_instagram`, pass to components |
| `src/components/sections/GalleryPreview.tsx` | Added `instagramUrl` prop + Instagram CTA button |
| `src/app/gallery/page.tsx` | Fetch Instagram settings server-side, pass to client |
| `src/app/gallery/GalleryPageClient.tsx` | Added Instagram feed section at top of gallery |

## Build Status
✅ `npm run build` passes with no errors.

## Settings Keys Used
| Key | Type | Purpose |
|-----|------|---------|
| `google_place_id` | string | Google Place ID for review links |
| `social_instagram` | string (URL) | Instagram profile URL (existing) |
| `instagram_feed_embed` | string (HTML) | Third-party Instagram feed embed code |

## Testing Notes
- Google review links require a valid Place ID to work properly — admin should configure this.
- Instagram embed code is rendered via `dangerouslySetInnerHTML` — this is admin-only input, not user-facing, so XSS risk is acceptable (admin is trusted).
- All new features degrade gracefully when settings are not configured.
