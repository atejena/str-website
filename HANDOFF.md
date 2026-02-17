# STR Website — Handoff & Next Steps

## What's Built & Live

Your website is fully built and deployed. Here's what you have:

**Live Site:** https://str-website-kappa.vercel.app (will become trainwithstr.com once domain is connected)

**Admin Panel:** https://str-website-kappa.vercel.app/admin
- **Login:** admin@str.com / admin123
- From here you can manage everything: classes, trainers, pricing, blog, testimonials, gallery, FAQs, careers, leads, and all site settings

**What's included:**
- 15+ public pages (Home, Classes, Trainers, Pricing, About, Contact, Blog, Gallery, FAQ, Testimonials, Careers, Programming, Terms, Privacy)
- Full admin panel with 10 content management sections
- Google Reviews auto-sync (once API key is set)
- GoHighLevel chat widget integration (once widget ID is entered)
- GoHighLevel form embeds for Get Started and Contact forms
- TrainHeroic whiteboard embed on /programming page
- Bulk photo upload (up to 20 at a time) in gallery admin
- SMS/A2P compliant consent language on all forms
- Dark mode / light mode toggle
- Mobile responsive throughout
- SEO optimized with structured data

---

## What YOU Need To Do

### 1. Content & Photos (Priority: HIGH)
Go to **Admin → Gallery** and upload real gym photos to replace the placeholder stock images.
- Use "Bulk Upload" to upload up to 20 at a time
- Categories: Facility, Training, Classes, Events, Transformations
- These photos appear on the homepage, gallery page, and throughout the site

### 2. Admin Settings (Priority: HIGH)
Go to **Admin → Settings** and fill in / verify:

**Gym Information:**
- [ ] Phone number (currently blank — needed for contact page and A2P compliance)
- [ ] Verify address, email, name are correct

**Business Hours:**
- [ ] Set your actual operating hours for each day

**Social Media Links:**
- [ ] Instagram URL
- [ ] Facebook URL
- [ ] YouTube URL (if applicable)
- [ ] TikTok URL (if applicable)

**Integrations:**
- [ ] **GoHighLevel Widget ID** — paste your GHL chat widget ID so the chat bubble appears on the site
- [ ] **GHL Get Started Form URL** — if you want the Get Started form on the homepage to use a GHL form, paste the embed URL here
- [ ] **GHL Contact Form URL** — same for the contact page form
- [ ] **TrainHeroic Whiteboard URL** — paste your TrainHeroic whiteboard embed URL so daily programming shows on the /programming page
- [ ] **Google Analytics ID** — your GA4 measurement ID (format: G-XXXXXXXXXX) for tracking site visitors

**Terms of Service & Privacy Policy:**
- [ ] Review and update the **Terms of Service** (scroll down in Settings — it's a markdown editor)
- [ ] Review and update the **Privacy Policy** (below Terms in Settings)
- [ ] **IMPORTANT for SMS/A2P compliance:** Add a section about SMS messaging to both documents. Include: what texts you'll send, how to opt out (STOP), message frequency, and that you don't share phone numbers

### 3. Domain Connection (Priority: HIGH)
Your site is currently at a Vercel preview URL. To connect **trainwithstr.com**:
- We'll set this up together — involves updating DNS records at your domain registrar
- Point your domain's A record to Vercel's IP and add a CNAME for www

### 4. Google Places API (for Reviews Sync)
To auto-sync Google Reviews to your site:
- [ ] Provide a Google Places API key (or we can set one up)
- [ ] Your Place ID is already configured: `ChIJUbJkArezw4kRrIcYZFBjQlk`
- Once set, reviews sync automatically via `/api/sync/reviews`

### 5. Instagram Feed (Optional)
Two options for showing Instagram on the gallery page:
- **Option A:** Get an Instagram feed widget embed code from SnapWidget or Elfsight, paste in Settings → Integrations
- **Option B:** Set up Instagram Business API token for auto-sync (more technical)

### 6. Update Admin Password
- [ ] Change the default admin password (admin@str.com / admin123) to something secure
- This is done through Supabase dashboard (we'll walk you through it)

---

## Where Everything Lives

| Service | What It Does | URL |
|---------|-------------|-----|
| **Vercel** | Hosts the website, auto-deploys from GitHub | vercel.com |
| **Supabase** | Database, auth, file storage | supabase.com (project: Team STR) |
| **GitHub** | Source code repository | github.com/atejena/str-website |

### Key URLs
- **Live Site:** https://str-website-kappa.vercel.app
- **Admin Panel:** /admin (login required)
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ugiwltztgeeiijrqccds
- **Google Reviews Sync:** /api/sync/reviews?key=[SYNC_SECRET_KEY]

---

## Ownership Transfer Checklist

When ready to fully hand off:

### GitHub Repository
- [ ] Create Spencer's GitHub account (or use existing)
- [ ] Transfer repository ownership from atejena → Spencer's account
- [ ] Or: Add Spencer as collaborator, then transfer later

### Vercel
- [ ] Create Spencer's Vercel account
- [ ] Transfer project to Spencer's Vercel team
- [ ] Re-link GitHub repo after transfer
- [ ] Set environment variables on new account:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`
  - `GOOGLE_PLACES_API_KEY` (when available)
  - `SYNC_SECRET_KEY`

### Supabase
- [ ] Transfer project ownership to Spencer's Supabase account
- [ ] Or: Add Spencer as team member with Owner role
- [ ] Update admin user password

### Domain (trainwithstr.com)
- [ ] Verify Spencer controls the domain registrar
- [ ] Update DNS to point to Vercel
- [ ] Add domain in Vercel project settings
- [ ] Vercel handles SSL automatically

---

## Tech Stack (for future developers)

- **Framework:** Next.js 16 (React, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel (auto-deploy from GitHub main branch)
- **Auth:** Supabase Auth
- **File Storage:** Supabase Storage (gallery images)
- **Fonts:** Oswald (display) + Inter (body)

Every push to the `main` branch on GitHub automatically deploys to production via Vercel.
