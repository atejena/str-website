# Auto-Sync Infrastructure — QA Report

**Date:** 2025-07-26
**Build:** ✅ Passes (`npm run build`)

---

## What Was Built

### 1. Supabase Admin Client for API Routes
**File:** `src/lib/supabase/admin.ts`
- Cookie-free Supabase client using service role key
- Used by all sync API routes (can't use the cookie-based `createAdminClient` in API route handlers)

### 2. Google Reviews Auto-Sync (`/api/sync/reviews`)
**File:** `src/app/api/sync/reviews/route.ts`

**How it works:**
- `GET /api/sync/reviews?key=SYNC_SECRET_KEY`
- Protected by `SYNC_SECRET_KEY` env var
- Fetches `google_place_id` from `site_settings` table, falls back to hardcoded `ChIJUbJkArezw4kRrIcYZFBjQlk` (STR Fitness, Cranford NJ)
- Calls Google Places API (legacy) with fields: name, rating, reviews, user_ratings_total
- For each review:
  - Checks for duplicates by matching `member_name` (author_name) + first 50 chars of `quote` (text)
  - If duplicate found: updates rating/quote/photo
  - If new: inserts with `source='google'`, `approved=true`, `featured=true` for 5-star reviews
- Returns JSON with sync stats (fetched, synced, skipped counts + place info)

**Required env vars:**
- `SYNC_SECRET_KEY` — auth for sync endpoints
- `GOOGLE_PLACES_API_KEY` — Google API key with Places API enabled

### 3. Instagram Posts Auto-Sync (`/api/sync/instagram`)
**File:** `src/app/api/sync/instagram/route.ts`

**How it works:**
- `GET /api/sync/instagram?key=SYNC_SECRET_KEY`
- If `INSTAGRAM_ACCESS_TOKEN` not set, returns 200 with "not configured" message (graceful)
- Fetches up to 25 recent posts from Instagram Graph API
- For each post:
  - Extracts title from first line of caption (truncated to 100 chars)
  - Checks for duplicates by matching full caption/description
  - Maps media_type correctly (IMAGE/VIDEO/CAROUSEL_ALBUM)
  - For VIDEO type: uses thumbnail_url as image_url, media_url as video_url
  - Category is set to `'Instagram'`
  - Sort order based on timestamp (newest first)

**Required env vars:**
- `SYNC_SECRET_KEY` — auth
- `INSTAGRAM_ACCESS_TOKEN` — (optional) Instagram Graph API long-lived token

### 4. Master Sync Endpoint (`/api/sync`)
**File:** `src/app/api/sync/route.ts`
- `GET /api/sync?key=SYNC_SECRET_KEY`
- Triggers both reviews and Instagram syncs in parallel via `Promise.allSettled`
- Returns combined results from both syncs
- Handles partial failures gracefully

### 5. Admin Settings Updates
**File:** `src/app/admin/settings/page.tsx`

**Added:**
- **Instagram Handle** field in Social Media Links section (e.g., "trainwithstr")
- Updated **Google Place ID** description to mention reviews auto-sync
- **Auto-Sync Controls** card with:
  - Sync Secret Key input (for browser-based testing — not saved to DB)
  - "Sync Google Reviews" button
  - "Sync Instagram Posts" button
  - "Sync All" button
  - Real-time sync result display (JSON output)

### 6. Gallery Page Instagram Section
**Files:** `src/app/gallery/page.tsx`, `src/app/gallery/GalleryPageClient.tsx`

**Added:**
- `'Instagram'` added to `GalleryCategory` type
- Instagram posts appear in a featured section at top of gallery (when on "All" filter)
  - Instagram icon + "FOLLOW US ON INSTAGRAM" heading
  - Links to @handle profile
  - Grid of up to 8 latest Instagram posts
  - Click to open in lightbox like other gallery images
- Instagram also appears as a filter tab alongside Facility, Classes, Events, Transformations

---

## Env Vars Needed on Vercel

| Variable | Required | Description |
|----------|----------|-------------|
| `SYNC_SECRET_KEY` | Yes | Secret key to protect sync endpoints |
| `GOOGLE_PLACES_API_KEY` | Yes | Google API key with Places API enabled |
| `INSTAGRAM_ACCESS_TOKEN` | No | Instagram Graph API long-lived access token |

---

## Usage

### Manual Sync (curl)
```bash
# Sync all
curl "https://yoursite.com/api/sync?key=YOUR_SYNC_SECRET_KEY"

# Just Google Reviews
curl "https://yoursite.com/api/sync/reviews?key=YOUR_SYNC_SECRET_KEY"

# Just Instagram
curl "https://yoursite.com/api/sync/instagram?key=YOUR_SYNC_SECRET_KEY"
```

### Automated Sync
Set up a cron job (Vercel cron, GitHub Actions, or external) to hit `/api/sync?key=KEY` periodically (e.g., daily).

### From Admin Panel
Go to Settings → Auto-Sync section, paste your sync key, and click the sync buttons.

---

## What Was NOT Tested
- Live Google API calls (requires API key at runtime)
- Live Instagram API calls (requires access token)
- Vercel deployment with env vars
- Cron/scheduled sync
- Database upsert behavior with real data
