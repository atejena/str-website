# DB Migration Group 1: Classes + Trainers

**Date:** 2025-07-12
**Status:** ✅ Complete — Build passes, no errors

## Summary

Converted 4 pages from hardcoded static data imports (`@/data/classes`, `@/data/trainers`) to server-side Supabase queries using the existing `createServerSupabaseClient()` pattern from `@/lib/supabase/server`.

## Architecture Pattern

Each page was split into:
1. **Server component** (`page.tsx`) — fetches data from Supabase, maps snake_case DB columns to camelCase TypeScript types
2. **Client component** (`*Client.tsx`) — receives typed props, renders the existing UI with framer-motion animations, useState, etc.

### Snake_case → CamelCase Mapping

DB columns use snake_case (e.g., `short_description`, `difficulty_level`, `duration_minutes`). TypeScript interfaces use camelCase. Each server page includes mapper functions (`mapDbClass`, `mapDbTrainer`, `mapDbSchedule`) that convert DB rows to the existing TypeScript types (`GymClass`, `Trainer`, `ClassScheduleItem`).

## Files Changed

### `/classes` (src/app/classes/)
| File | Action | Description |
|------|--------|-------------|
| `page.tsx` | **Rewritten** | Removed `'use client'`, now a server component that fetches from `gym_classes` and `class_schedule` tables |
| `ClassesPageClient.tsx` | **Created** | Client component with all existing UI (filters, grid, schedule table, animations) |

**Supabase queries:**
- `gym_classes`: `select('*').eq('active', true).order('sort_order')`
- `class_schedule`: `select('*').eq('cancelled', false)`

### `/classes/[slug]` (src/app/classes/[slug]/)
| File | Action | Description |
|------|--------|-------------|
| `page.tsx` | **Rewritten** | Server component fetching class by slug, its schedule, instructor, and related classes |
| `ClassDetailClient.tsx` | **Created** | Client component with class detail UI (hero, stats, benefits, equipment, schedule sidebar, instructor card, related classes) |

**Supabase queries:**
- `gym_classes`: `select('*').eq('slug', slug).single()`
- `class_schedule`: `select('*').eq('class_id', id).eq('cancelled', false)`
- `trainers`: fetches by `instructor_id` if set, falls back to first active trainer
- `gym_classes` (related): `select('*').eq('category', ...).eq('active', true).neq('id', ...).limit(3)`

### `/trainers` (src/app/trainers/)
| File | Action | Description |
|------|--------|-------------|
| `page.tsx` | **Rewritten** | Server component fetching active trainers |
| `TrainersPageClient.tsx` | **Created** | Client component with trainer grid UI (cards, animations, Instagram links) |

**Supabase queries:**
- `trainers`: `select('*').eq('active', true).order('sort_order')`

### `/trainers/[slug]` (src/app/trainers/[slug]/)
| File | Action | Description |
|------|--------|-------------|
| `page.tsx` | **Rewritten** | Server component fetching trainer by slug, their classes, and other trainers |
| `TrainerDetailClient.tsx` | **Created** | Client component with trainer detail UI (hero, quote, bio, certifications, experience, classes sidebar, other trainers) |

**Supabase queries:**
- `trainers`: `select('*').eq('slug', slug).single()`
- `gym_classes`: `select('*').eq('instructor_id', id).eq('active', true).limit(5)` (falls back to first 3 active classes if none assigned)
- `trainers` (others): `select('*').neq('id', ...).eq('active', true).order('sort_order').limit(3)`

## Files NOT Changed (preserved as reference)

- `src/data/classes.ts` — static data file retained, no longer imported by any page
- `src/data/trainers.ts` — static data file retained, no longer imported by any page

## Null/Empty Handling

- All DB queries use `?? []` or `?? ''` defaults for nullable fields
- `notFound()` called when class/trainer slug doesn't match any DB row
- Empty schedule displays "Contact us for scheduling options"
- Empty trainer classes displays "Contact us for available sessions"
- Missing instructor falls back to first active trainer in DB
- No assigned classes for a trainer falls back to first 3 active classes

## DB Tables Used

| Table | Used By |
|-------|---------|
| `gym_classes` | `/classes`, `/classes/[slug]`, `/trainers/[slug]` |
| `class_schedule` | `/classes`, `/classes/[slug]` |
| `trainers` | `/classes/[slug]`, `/trainers`, `/trainers/[slug]` |

## Build Verification

```
✓ Compiled successfully
✓ TypeScript — no errors
✓ Static pages generated (16/16)
✓ All routes render as dynamic (ƒ) server-rendered pages
```

## UI Changes

**None.** All existing styling, animations, layout, and components are preserved exactly as they were. Only the data source changed from static imports to Supabase queries.
