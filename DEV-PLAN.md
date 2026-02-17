# STR Website Development Plan

## Priority Features (from Alex)

### Phase 1: Database + Admin CMS (Foundation)
All content must be manageable from admin panel — no code changes needed.

**Database Tables:**
- site_settings (gym info, hours, social links, contact info)
- gym_classes (Semi-Private Training, Group Training offerings)
- membership_plans (pricing tiers)
- trainers (staff profiles)
- blog_posts (content/articles)
- testimonials (Google/Mindbody reviews)
- gallery_images (photos/videos)
- contact_submissions (form leads)
- faqs
- career_postings (hidden for now)

**Admin Panel (/admin):**
- Auth-gated access
- CRUD for all content types
- Image upload via Supabase Storage
- Settings management (gym info, hours, social links)
- Contact submissions viewer
- Blog editor with markdown preview

### Phase 2: Front Page (Complete Redesign)
1. **Hero:** Logo + Slogan
2. **Find Us:** Contact info section
3. **Get Started:** Embedded form (Jotform-style or custom)
4. **Our Offerings:** Semi-Private Training / Group Training cards
5. **Mini Banner:** Contact info + location
6. **Google Maps:** Embedded map
7. **Scrolling Reviews:** Google/Mindbody review carousel
8. **Photos/Videos:** Gallery section
9. **Footer:** Full contact info, links, social

### Phase 3: Content Pages
1. **Programming Page** — TrainHeroic whiteboard display
2. **Pricing Page** — Membership tiers from DB
3. **Blog Page** — Posts from DB, categories, search
4. **Career Page** — Hidden/unlisted, shows job postings

### Phase 4: Integrations
1. **TrainHeroic API** — Whiteboard function (cast programming)
2. **GoHighLevel** — Messenger bot for lead capture
3. **Google Reviews** — Pull and display reviews
4. **Mindbody Reviews** — Pull and display reviews

## Testing Strategy

### Happy Path Tests
- [ ] Admin: Create/edit/delete each content type
- [ ] Admin: Upload images, manage gallery
- [ ] Admin: Update site settings, see changes on frontend
- [ ] Frontend: All sections render with DB content
- [ ] Frontend: Contact form submits successfully
- [ ] Frontend: Mobile responsive on all pages
- [ ] Frontend: Dark/light mode works
- [ ] Blog: Create post in admin → appears on blog page
- [ ] Pricing: Update plans in admin → reflects on pricing page

### Unhappy Path Tests
- [ ] Admin: Auth required (redirect if not logged in)
- [ ] Admin: Form validation (required fields, invalid data)
- [ ] Admin: Delete confirmation (prevent accidental deletion)
- [ ] Admin: Image upload fails gracefully (size limits, wrong format)
- [ ] Frontend: Empty states (no classes, no blog posts, etc.)
- [ ] Frontend: Contact form validation (invalid email, empty fields)
- [ ] Frontend: 404 page for invalid routes
- [ ] Frontend: Handles missing DB connection gracefully
- [ ] Blog: Unpublished posts not visible on frontend
- [ ] Career: Page not linked in navigation

## Development Order
1. ✅ Supabase local instance running
2. Database migrations (all tables + RLS policies + seed data)
3. Supabase client setup (lib/supabase.ts)
4. Admin auth + layout
5. Admin CRUD pages (all content types)
6. Front page redesign with DB content
7. Pricing page
8. Blog page
9. Programming page (TrainHeroic)
10. Career page
11. Integration research (TrainHeroic API, GoHighLevel)
12. Testing all flows
