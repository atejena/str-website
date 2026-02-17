# DB Migration — Group 2: Blog, Testimonials, FAQ, Gallery

**Date:** 2025-07-11
**Status:** ✅ Complete — build passes

## Summary

Converted 5 pages from hardcoded static data imports to server-side Supabase queries. Each page was split into a **server component** (data fetching) and a **client component** (interactive UI with framer-motion/useState).

## Changes Made

### Pattern Applied (all pages)
1. Removed `'use client'` from `page.tsx` → made it an async server component
2. Replaced static data imports (`@/data/*`) with `createServerSupabaseClient()` queries
3. Added a `map*()` function to convert snake_case DB columns → camelCase TypeScript types
4. Created a `*Client.tsx` file containing all original UI (framer-motion, useState, etc.)
5. Server component passes fetched data as props to the client component
6. Empty/null data handled gracefully with `(rawData || []).map(...)` pattern

### Files Modified

| Page | Server Component | Client Component |
|------|-----------------|-----------------|
| `/blog` | `src/app/blog/page.tsx` | `src/app/blog/BlogPageClient.tsx` (new) |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | `src/app/blog/[slug]/BlogPostClient.tsx` (new) |
| `/testimonials` | `src/app/testimonials/page.tsx` | `src/app/testimonials/TestimonialsPageClient.tsx` (new) |
| `/faq` | `src/app/faq/page.tsx` | `src/app/faq/FaqPageClient.tsx` (new) |
| `/gallery` | `src/app/gallery/page.tsx` | `src/app/gallery/GalleryPageClient.tsx` (new) |

### Supabase Queries

| Page | Query |
|------|-------|
| `/blog` | `from('blog_posts').select('*').eq('published', true).order('publish_date', { ascending: false })` |
| `/blog/[slug]` | `from('blog_posts').select('*').eq('slug', slug).eq('published', true).single()` + related posts query |
| `/testimonials` | `from('testimonials').select('*').eq('approved', true).order('created_at', { ascending: false })` |
| `/faq` | `from('faqs').select('*').eq('active', true).order('sort_order')` |
| `/gallery` | `from('gallery_images').select('*').order('sort_order')` |

### Column Mapping (snake_case → camelCase)

Each page has a dedicated mapping function. Key mappings:
- `blog_posts`: `author_name`, `featured_image`, `publish_date`, `reading_time_minutes`, `meta_title`, `meta_description`, `meta_keywords`, `author_id`, `created_at`, `updated_at`
- `testimonials`: `member_name`, `member_since`, `transformation_type`, `before_image`, `after_image`, `results_summary`, `video_url`, `created_at`
- `faqs`: `sort_order`, `created_at`, `updated_at`
- `gallery_images`: `image_url`, `thumbnail_url`, `alt_text`, `sort_order`, `created_at`

### What Was Preserved
- All UI/styling identical (no visual changes)
- All animation variants (framer-motion containerVariants, itemVariants)
- Category filtering logic (FAQ tabs, Gallery category filter)
- Lightbox functionality (Gallery)
- Related posts logic (Blog post detail)
- Featured post highlighting (Blog list, Testimonials)

### Blog Post Detail (`/blog/[slug]`) — Special Notes
- Changed from `use(params)` (client-side) to `await params` (server-side)
- Related posts fetched server-side: queries up to 10 published posts excluding current, then filters by shared tags client-side and takes top 3
- Uses `notFound()` when post not found (same behavior as before)

## Build Verification

```
✓ Compiled successfully in 2.7s
✓ Generating static pages (16/16)
All routes render as ƒ (Dynamic) — correctly server-rendered on demand
```

## Data Files Still Present

The static data files (`src/data/blog.ts`, `src/data/testimonials.ts`, `src/data/faqs.ts`, `src/data/gallery.ts`) are still in the codebase. They are no longer imported by any of the converted pages, but may still be referenced by other components or admin seeding scripts. They can be safely removed once confirmed unused elsewhere.
