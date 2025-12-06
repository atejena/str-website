# STR (Strength Through Resilience) - Website Requirements

**Project Type:** Gym/Fitness Website
**Framework:** Next.js 15+ (App Router) - USE LATEST
**Package Manager:** Bun 1.1+ - USE LATEST
**Theme:** Industrial Premium (Dark Mode Default)

---

## 1. Project Overview

STR (Strength Through Resilience) is a performance-focused gym requiring a premium, high-contrast website that embodies the "Iron Fortress" aesthetic. The site should feel heavy yet fast, combining raw grit with polished execution.

---

## 2. Tech Stack

> **Full CMS architecture documented in:** `CONTEXT/CMS-ARCHITECTURE.md`

### Core
- **Framework:** Next.js 15+ with App Router (always use latest)
- **Runtime:** Bun 1.1+ (always use latest)
- **React:** 19+ (ships with Next.js 15)
- **Language:** TypeScript 5.3+ (strict mode)
- **Styling:** Tailwind CSS 3.4+ (configured with design system tokens)

### CMS & Database
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (images, documents)
- **Admin Panel:** Custom-built with Radix UI components

### Libraries
- **Fonts:** `next/font` for Oswald & Inter (Google Fonts)
- **Animations:** Framer Motion (subtle, performance-focused)
- **Forms:** React Hook Form + Zod (validation)
- **Icons:** Lucide React
- **Image Optimization:** Next.js Image component
- **SEO:** Next.js Metadata API
- **Data Fetching:** @tanstack/react-query
- **Markdown:** react-markdown + remark-gfm
- **UI Components:** Radix UI primitives

---

## 3. Pages & Sections

### 3.1 Home Page (`/`)
- **Hero Section**
  - Full-viewport background image/video with 60-80% black overlay
  - H1: Gym tagline (uppercase, 72px desktop / 42px mobile)
  - Primary CTA button: "Join Now" or "Start Training"
  - Secondary CTA: "View Classes"

- **Value Proposition Section**
  - 3-4 feature cards (Iron Gray background)
  - Icons + short descriptions
  - Topics: Equipment, Coaching, Community, Results

- **Classes Preview**
  - Featured class cards (3-4)
  - Link to full classes page

- **Testimonials Carousel**
  - Member quotes with photos
  - Star ratings or results metrics

- **CTA Banner**
  - Full-width gold accent section
  - Compelling copy + signup button

### 3.2 About Page (`/about`)
- Gym story/history section
- Mission & values
- Facility photos with triangle masks
- Team/ownership intro
- Achievements/certifications

### 3.3 Classes Page (`/classes`)
- Class category filters
- Class cards with:
  - Class name
  - Duration
  - Intensity level
  - Brief description
  - Schedule preview
- Full class schedule/timetable

### 3.4 Trainers Page (`/trainers`)
- Trainer profile cards
  - Professional photo
  - Name & specialty
  - Certifications
  - Bio excerpt
- Individual trainer detail pages (optional)

### 3.5 Pricing/Membership Page (`/pricing`)
- Pricing tier cards (3 recommended)
  - Highlighted "popular" option with gold accent
  - Feature list per tier
  - Price display
  - CTA button per tier
- Membership comparison table
- FAQ accordion for pricing questions

### 3.6 Gallery Page (`/gallery`)
- Masonry or grid layout
- Image lightbox functionality
- Categories: Facility, Classes, Events, Transformations
- Lazy loading for performance

### 3.7 Blog Page (`/blog`)
- Blog post listing with pagination
- Featured/pinned post section
- Categories/tags filtering
- Individual post pages with:
  - Reading time
  - Author info
  - Social sharing
  - Related posts

### 3.8 Testimonials Page (`/testimonials`)
- Member success stories
- Before/after transformations (with consent)
- Video testimonials (if available)
- Sortable by transformation type

### 3.9 FAQ Page (`/faq`)
- Accordion-style Q&A
- Categorized sections:
  - Membership
  - Classes
  - Facilities
  - Policies
- Search functionality (optional)

### 3.10 Contact Page (`/contact`)
- Contact form with fields:
  - Name (required)
  - Email (required)
  - Phone (optional)
  - Subject/Inquiry Type dropdown
  - Message (required)
- Form validation with success/error states
- Gym location with embedded map
- Business hours
- Direct contact info (phone, email)
- Social media links

---

## 4. Global Components

### 4.1 Navigation (Sticky Header)
- Logo (left)
- Navigation links (center)
- CTA button (right) - "Join Now"
- Mobile: Hamburger menu (white icon)
- Background: STR Black at 95% opacity + backdrop blur

### 4.2 Footer
- Logo + tagline
- Navigation links (columns)
- Contact information
- Social media icons
- Newsletter signup (optional - not in initial scope)
- Copyright + legal links

### 4.3 Reusable Components
- Button (Primary/Secondary variants)
- Card (with optional gold top accent)
- Section wrapper with consistent padding
- Form inputs with floating labels
- Accordion
- Modal/Lightbox
- Image with overlay
- Triangle decorative elements

---

## 5. Forms & Validation

### Contact Form Requirements
- Client-side validation (Zod schema)
- Server action for form submission
- Success/error toast notifications
- Honeypot field for spam prevention
- Rate limiting consideration

### Form States
- Default: Iron Gray background, #444 border
- Active/Focus: Gold border, Focus Blue outline
- Success: Green indicator + icon
- Error: Red text + icon (not color alone)

---

## 6. Performance Requirements

- **Lighthouse Score:** Target 90+ on all metrics
- **Core Web Vitals:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **Image Optimization:** WebP/AVIF formats, lazy loading
- **Font Loading:** Display swap for web fonts
- **Code Splitting:** Automatic with Next.js App Router

---

## 7. SEO Optimization Strategy

This section provides a comprehensive SEO strategy for STR, covering technical implementation, local SEO (critical for gyms), content strategy, and ongoing optimization.

---

### 7.1 Technical SEO Foundation

#### URL Structure
- **Clean, semantic URLs:** `/classes/hiit-training` not `/classes?id=123`
- **Lowercase with hyphens:** Consistent URL formatting
- **Trailing slash consistency:** Pick one pattern and stick to it
- **Max depth:** Keep URLs to 3-4 levels maximum

```
✓ /classes/strength-training
✓ /trainers/john-smith
✓ /blog/workout-tips/beginner-guide
✗ /page.php?category=classes&id=5&ref=nav
```

#### Crawlability & Indexing
- **robots.txt Configuration:**
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Sitemap: https://www.strfitness.com/sitemap.xml
```

- **XML Sitemap Requirements:**
  - Auto-generated on build (use `next-sitemap` package)
  - Include all public pages with `<lastmod>` dates
  - Priority weighting: Home (1.0), Services (0.8), Blog (0.6)
  - Submit to Google Search Console

- **Canonical URLs:**
  - Self-referencing canonicals on all pages
  - Handle www vs non-www (pick one, redirect other)
  - Handle trailing slashes consistently

#### Site Speed Optimization (SEO Impact)
- **Target:** < 3 second load time on 3G connections
- **Critical CSS:** Inline above-the-fold styles
- **Resource hints:** Preconnect to Google Fonts, analytics domains
- **Lazy loading:** Images below the fold, non-critical JS
- **Compression:** Gzip/Brotli enabled

```html
<!-- Resource hints in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

#### Mobile-First Indexing
- **Responsive design:** All content accessible on mobile
- **No mobile-only content hiding:** Google indexes mobile version
- **Touch-friendly:** 44px minimum tap targets
- **Viewport meta tag:** Properly configured
- **No intrusive interstitials:** Avoid full-screen popups on mobile

---

### 7.2 Local SEO (Critical for Gym Business)

#### Google Business Profile Optimization
- **Business Name:** "STR - Strength Through Resilience" (exact match)
- **Primary Category:** "Gym" or "Fitness Center"
- **Secondary Categories:** Add relevant ones:
  - Personal Trainer
  - Weight Training Center
  - Fitness Class Provider
- **Business Description:** 750 characters max, include keywords naturally
- **Services:** List all services with descriptions
- **Attributes:** Check all relevant (wheelchair accessible, parking, etc.)
- **Photos:** Upload 10+ high-quality images:
  - Exterior (helps Google verify location)
  - Interior/facility
  - Equipment
  - Team/staff
  - Classes in action
- **Posts:** Weekly updates (promotions, events, tips)
- **Q&A:** Pre-populate with common questions
- **Reviews:** Actively request and respond to all reviews

#### NAP Consistency (Name, Address, Phone)
- **Exact match** across all platforms:
  - Website footer
  - Google Business Profile
  - Facebook, Instagram
  - Yelp, Yellow Pages
  - Fitness directories (ClassPass, Mindbody, etc.)

```
STR - Strength Through Resilience
123 Iron Street, Suite 100
[City], [State] [ZIP]
(555) 123-4567
```

#### Local Keywords Strategy
Target location-specific search terms:

| Primary Keywords | Search Intent |
|-----------------|---------------|
| gym in [city] | Discovery |
| fitness center [neighborhood] | Discovery |
| best gym near me | Discovery |
| personal trainer [city] | Service |
| HIIT classes [city] | Service |
| 24 hour gym [city] | Feature |
| gym membership [city] | Transactional |

#### Local Content Strategy
- **Location page:** Dedicated page with:
  - Embedded Google Map
  - Driving directions from major landmarks
  - Parking information
  - Public transit access
  - Neighborhood description
- **Local event content:** Community involvement, local partnerships
- **Area-specific blog posts:** "Best Running Routes in [City]"

#### Local Business Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "name": "STR - Strength Through Resilience",
  "image": "https://www.strfitness.com/images/gym-exterior.jpg",
  "url": "https://www.strfitness.com",
  "telephone": "+1-555-123-4567",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Iron Street, Suite 100",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "05:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "07:00",
      "closes": "20:00"
    }
  ],
  "amenityFeature": [
    {"@type": "LocationFeatureSpecification", "name": "Free Weights"},
    {"@type": "LocationFeatureSpecification", "name": "Personal Training"},
    {"@type": "LocationFeatureSpecification", "name": "Group Classes"},
    {"@type": "LocationFeatureSpecification", "name": "Locker Rooms"},
    {"@type": "LocationFeatureSpecification", "name": "Parking"}
  ],
  "sameAs": [
    "https://www.facebook.com/strfitness",
    "https://www.instagram.com/strfitness",
    "https://www.youtube.com/@strfitness"
  ]
}
```

---

### 7.3 On-Page SEO

#### Title Tag Strategy
- **Format:** `Primary Keyword | Secondary Keyword - Brand`
- **Length:** 50-60 characters
- **Unique:** Every page needs a unique title

| Page | Title Tag Example |
|------|-------------------|
| Home | `STR Gym [City] \| Premium Fitness & Personal Training` |
| About | `About STR \| Our Story & Mission - Strength Through Resilience` |
| Classes | `Fitness Classes [City] \| HIIT, Strength & More - STR Gym` |
| Trainers | `Personal Trainers [City] \| Certified Coaches - STR Gym` |
| Pricing | `Gym Membership Pricing \| Plans Starting at $XX - STR` |
| Contact | `Contact STR Gym [City] \| Location & Hours` |
| Blog | `Fitness Tips & Workout Guides \| STR Blog` |

#### Meta Description Strategy
- **Length:** 150-160 characters
- **Include:** Primary keyword, value proposition, CTA
- **Unique:** Every page needs a unique description

```
Home: "Transform your body at STR Gym in [City]. Premium equipment,
expert trainers, and results-driven programs. Start your free trial today."

Classes: "Join HIIT, strength training, yoga & more at STR [City].
Beginner to advanced classes led by certified trainers. View our schedule."
```

#### Heading Hierarchy
- **One H1 per page:** Include primary keyword
- **H2s:** Major section headings
- **H3s:** Subsections within H2s
- **Never skip levels:** H1 → H2 → H3 (not H1 → H3)

```html
<h1>Personal Training in [City]</h1>
  <h2>Our Training Programs</h2>
    <h3>One-on-One Training</h3>
    <h3>Small Group Training</h3>
  <h2>Meet Our Trainers</h2>
  <h2>Pricing & Packages</h2>
```

#### Internal Linking Strategy
- **Contextual links:** Link to related pages within content
- **Navigation:** Clear hierarchy in main nav
- **Breadcrumbs:** Implement on all subpages
- **Footer links:** Include important pages
- **Anchor text:** Descriptive, keyword-relevant (not "click here")

```
Breadcrumb Example:
Home > Classes > HIIT Training
```

---

### 7.4 Structured Data / Schema Markup

Implement JSON-LD for all applicable schema types:

#### Required Schema Types

| Page | Schema Type | Purpose |
|------|-------------|---------|
| All Pages | `Organization` | Brand info in knowledge panel |
| All Pages | `WebSite` | Sitelinks search box |
| Home | `LocalBusiness` / `HealthClub` | Local pack eligibility |
| Classes | `Course` or `Event` | Rich results for classes |
| Trainers | `Person` | Trainer profiles |
| Pricing | `Offer` | Price display in search |
| Blog | `Article` / `BlogPosting` | Rich results, authorship |
| FAQ | `FAQPage` | FAQ rich results |
| Testimonials | `Review` | Review snippets |

#### FAQ Page Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are your gym hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're open Monday-Friday 5am-10pm, Saturday-Sunday 7am-8pm."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer personal training?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we have certified personal trainers available for one-on-one and small group sessions."
      }
    }
  ]
}
```

#### Blog Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Best Exercises for Building Core Strength",
  "image": "https://www.strfitness.com/blog/core-exercises.jpg",
  "author": {
    "@type": "Person",
    "name": "Coach John Smith",
    "url": "https://www.strfitness.com/trainers/john-smith"
  },
  "publisher": {
    "@type": "Organization",
    "name": "STR - Strength Through Resilience",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.strfitness.com/logo.png"
    }
  },
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-05",
  "description": "Learn the most effective core exercises to build strength and stability.",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.strfitness.com/blog/core-exercises"
  }
}
```

---

### 7.5 Image SEO

#### File Optimization
- **Format:** WebP with JPEG fallback (Next.js Image handles this)
- **Compression:** Target < 100KB for hero images, < 50KB for thumbnails
- **Dimensions:** Serve appropriately sized images (use `srcset`)
- **Lazy loading:** All images below the fold

#### File Naming Convention
```
✓ str-gym-weight-room.webp
✓ personal-trainer-john-smith.webp
✓ hiit-class-action-shot.webp
✗ IMG_4521.jpg
✗ photo-1.png
```

#### Alt Text Guidelines
- **Descriptive:** Describe what's in the image
- **Keyword-relevant:** Include keywords naturally (don't stuff)
- **Contextual:** Consider the page context
- **Length:** 125 characters max

```html
<!-- Good alt text examples -->
<img alt="STR gym weight room with free weights and squat racks" />
<img alt="Personal trainer demonstrating deadlift form to client" />
<img alt="Group HIIT class at STR fitness center" />

<!-- Bad alt text -->
<img alt="gym" />
<img alt="best gym city fitness workout training weights" />
<img alt="" /> <!-- Only OK for decorative images -->
```

---

### 7.6 Content SEO Strategy

#### Content Pillars for Gym SEO
1. **Workout & Exercise Guides** (evergreen traffic)
2. **Nutrition & Recovery** (high search volume)
3. **Transformation Stories** (social proof + keywords)
4. **Local Fitness Content** (local SEO)
5. **Gym Announcements** (freshness signals)

#### Blog Content Calendar (Recommended Topics)

| Topic Type | Example Titles | Target Keywords |
|------------|----------------|-----------------|
| How-To | "How to Start Strength Training: Beginner's Guide" | strength training for beginners |
| Listicle | "10 Best Exercises for Building Muscle" | exercises for building muscle |
| Local | "Best Outdoor Workout Spots in [City]" | outdoor workout [city] |
| Seasonal | "Summer Body Workout Plan" | summer workout plan |
| FAQ | "What to Expect at Your First Gym Visit" | first time at gym |

#### Content Optimization Checklist
- [ ] Target keyword in first 100 words
- [ ] Keyword in H1 and at least one H2
- [ ] 2-3 internal links to related content
- [ ] 1-2 external links to authoritative sources
- [ ] Image with optimized alt text
- [ ] Meta title and description optimized
- [ ] Schema markup implemented
- [ ] Minimum 800 words for blog posts
- [ ] Clear CTA (join gym, book class, contact)

---

### 7.7 Next.js SEO Implementation

#### Metadata API (App Router)

```typescript
// src/app/layout.tsx - Global metadata
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.strfitness.com'),
  title: {
    default: 'STR Gym | Strength Through Resilience',
    template: '%s | STR Gym'
  },
  description: 'Premium fitness facility in [City]. Personal training, group classes, and state-of-the-art equipment.',
  keywords: ['gym', 'fitness', 'personal training', '[city] gym'],
  authors: [{ name: 'STR Fitness' }],
  creator: 'STR - Strength Through Resilience',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.strfitness.com',
    siteName: 'STR Gym',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'STR Gym - Strength Through Resilience'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@strfitness',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}
```

```typescript
// src/app/classes/page.tsx - Page-specific metadata
export const metadata: Metadata = {
  title: 'Fitness Classes',
  description: 'Join HIIT, strength, yoga and more at STR. Classes for all fitness levels.',
  openGraph: {
    title: 'Fitness Classes at STR Gym',
    description: 'Join HIIT, strength, yoga and more at STR.',
    images: ['/images/classes-og.jpg'],
  },
}
```

#### Dynamic Metadata (Blog Posts)

```typescript
// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.featuredImage],
    },
  }
}
```

#### Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.strfitness.com'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/classes`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/trainers`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.6 },
  ]

  // Dynamic blog posts
  const posts = await getAllPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
```

#### robots.txt

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://www.strfitness.com/sitemap.xml',
  }
}
```

---

### 7.8 Review & Reputation Management

#### Review Generation Strategy
- **Post-visit emails:** Send review request 24-48 hours after first visit
- **In-gym signage:** QR code to Google review page
- **Staff training:** Encourage asking satisfied members for reviews
- **Response protocol:** Respond to ALL reviews within 24-48 hours

#### Review Response Templates

**Positive Review:**
```
Thank you for the amazing review, [Name]! We're thrilled you're enjoying
your training at STR. Keep crushing those goals! 💪 - The STR Team
```

**Negative Review:**
```
Hi [Name], thank you for your feedback. We're sorry to hear about your
experience. Please reach out to us at [email] so we can make this right.
Your satisfaction is our priority. - [Manager Name], STR
```

---

### 7.9 Analytics & Monitoring

#### Required Tracking Setup
- **Google Analytics 4:** Conversion tracking for form submissions
- **Google Search Console:** Monitor search performance, indexing
- **Google Business Profile Insights:** Track local discovery

#### Key SEO Metrics to Monitor

| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic | GA4 | ↑ Month over month |
| Keyword rankings | Search Console | Top 10 for target terms |
| Local pack visibility | Search Console | Appear in 3-pack |
| Click-through rate | Search Console | > 3% average |
| Core Web Vitals | PageSpeed Insights | All "Good" |
| Backlinks | Search Console | Quality over quantity |
| Review rating | Google Business | 4.5+ stars |
| Review count | Google Business | ↑ Month over month |

#### Monthly SEO Audit Checklist
- [ ] Check Search Console for crawl errors
- [ ] Review keyword rankings for target terms
- [ ] Analyze top-performing content
- [ ] Check for broken links (404s)
- [ ] Verify structured data with Rich Results Test
- [ ] Monitor Core Web Vitals scores
- [ ] Review and respond to new reviews
- [ ] Update Google Business Profile (if needed)

---

### 7.10 Link Building Strategy

#### Local Link Opportunities
- **Local business directories:** Chamber of Commerce, local business associations
- **Fitness directories:** ClassPass, Mindbody, Gympass profiles
- **Local press:** Sponsor local events, pitch to local news
- **Partnerships:** Cross-promote with local health food stores, supplement shops, sports teams
- **Community involvement:** Charity events, school programs

#### Content-Based Link Building
- **Guest posting:** Contribute to fitness blogs
- **Expert roundups:** Participate in "expert tips" articles
- **Infographics:** Create shareable fitness infographics
- **Local guides:** Create "Ultimate Guide to Fitness in [City]"

---

## 8. Accessibility Requirements (WCAG 2.1 AA)

- Focus states on all interactive elements (Focus Blue)
- 44x44px minimum touch targets
- Color + icon for state indication
- Proper heading hierarchy (h1-h6)
- ARIA labels where needed
- Keyboard navigation support
- Skip to main content link
- Reduced motion preference support

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 640px | Phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | 1024px - 1280px | Laptops |
| Wide | > 1280px | Desktops |

**Max Container Width:** 1280px

---

## 10. Project Structure (Recommended)

```
str-website/
├── CONTEXT/                    # Documentation
│   ├── REQUIREMENTS.md
│   └── DESIGN-SYSTEM.md
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── about/
│   │   ├── classes/
│   │   ├── trainers/
│   │   ├── pricing/
│   │   ├── gallery/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   ├── faq/
│   │   └── contact/
│   ├── components/
│   │   ├── ui/                # Base components
│   │   ├── layout/            # Header, Footer, Nav
│   │   └── sections/          # Page sections
│   ├── lib/
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── bun.lockb
```

---

## 11. Content Requirements (To Be Provided)

- [ ] Logo files (SVG preferred)
- [ ] Hero images/videos
- [ ] Trainer photos and bios
- [ ] Class descriptions and schedules
- [ ] Pricing information
- [ ] Testimonials and member photos
- [ ] Facility/gallery photos
- [ ] Blog content (if launching with blog)
- [ ] FAQ content
- [ ] Legal pages (Privacy Policy, Terms)

---

## 12. Deployment Considerations

- **Hosting:** Vercel (recommended for Next.js)
- **Domain:** To be configured
- **Environment Variables:** Contact form endpoint, analytics IDs
- **Analytics:** Google Analytics 4 or Plausible
- **Error Tracking:** Sentry (optional)

---

## 13. Future Enhancements (Out of Initial Scope)

- Online class booking system
- Membership payment integration (Stripe)
- Member portal/dashboard
- Newsletter integration (Mailchimp/ConvertKit)
- Live class streaming integration
- Mobile app companion

---

*Document Version: 1.2*
*Last Updated: December 2024*

**Changelog:**
- v1.2: Added CMS & Database to tech stack, linked to CMS-ARCHITECTURE.md
- v1.1: Added comprehensive SEO optimization strategy (Section 7)
- v1.0: Initial requirements document
