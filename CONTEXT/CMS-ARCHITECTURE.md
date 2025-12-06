# STR Website - CMS Architecture

**Based on:** Lavaca Website CMS (proven, production-ready)
**Type:** Headless CMS with Supabase + Custom Admin Panel
**Version:** 1.0

---

## 1. Overview

STR uses a **hybrid headless CMS** architecture combining:

1. **Database-driven content** (Supabase PostgreSQL) - Dynamic content
2. **Static TypeScript data files** (src/data/) - Structured content (FAQs, pricing tiers)
3. **Markdown files** (src/content/) - Legal pages, policies

### Why This Approach?

| Feature | Benefit |
|---------|---------|
| **No third-party CMS** | Full control, no vendor lock-in |
| **Supabase** | Free tier, real-time, RLS security, edge functions |
| **Custom admin** | Tailored to gym operations |
| **Type-safe** | TypeScript throughout |
| **ISR** | Fast builds + fresh content |

---

## 2. Tech Stack

```
Frontend:        Next.js 14+ (App Router) + TypeScript
Database:        Supabase (PostgreSQL)
Auth:            Supabase Auth
Storage:         Supabase Storage (images, PDFs)
Styling:         Tailwind CSS
Admin UI:        Radix UI components
Markdown:        react-markdown + remark-gfm
Validation:      Zod
Forms:           React Hook Form
```

### Dependencies to Add

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.x",
    "@supabase/ssr": "^0.x",
    "@tanstack/react-query": "^5.x",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-dropdown-menu": "^2.x",
    "@radix-ui/react-tabs": "^1.x",
    "@radix-ui/react-accordion": "^1.x",
    "react-markdown": "^9.x",
    "remark-gfm": "^4.x",
    "dompurify": "^3.x",
    "date-fns": "^3.x"
  }
}
```

---

## 3. Database Schema

### 3.1 Core Content Tables

#### `gym_classes`
Primary content type for fitness classes.

```sql
CREATE TABLE gym_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  instructor_id UUID REFERENCES trainers(id),
  difficulty_level VARCHAR(50) CHECK (difficulty_level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  duration_minutes INTEGER DEFAULT 60,
  max_capacity INTEGER DEFAULT 20,
  calories_burned VARCHAR(50),
  equipment_needed TEXT[],
  benefits TEXT[],
  featured_image VARCHAR(500),
  gallery_images TEXT[],
  price_drop_in DECIMAL(10,2),
  included_in_membership BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_gym_classes_slug ON gym_classes(slug);
CREATE INDEX idx_gym_classes_active ON gym_classes(active);
CREATE INDEX idx_gym_classes_featured ON gym_classes(featured);
```

#### `class_schedule`
Weekly recurring schedule for classes.

```sql
CREATE TABLE class_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES gym_classes(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES trainers(id),
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(100),
  recurring BOOLEAN DEFAULT true,
  effective_from DATE DEFAULT CURRENT_DATE,
  effective_until DATE,
  cancelled BOOLEAN DEFAULT false,
  cancellation_reason VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_class_schedule_day ON class_schedule(day_of_week);
CREATE INDEX idx_class_schedule_class ON class_schedule(class_id);
```

#### `trainers`
Staff and trainer profiles.

```sql
CREATE TABLE trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(100), -- "Head Coach", "Yoga Instructor"
  specialty VARCHAR(255), -- "Strength Training", "HIIT"
  bio TEXT,
  short_bio VARCHAR(500),
  certifications TEXT[],
  experience_years INTEGER,
  photo VARCHAR(500),
  email VARCHAR(255),
  instagram VARCHAR(100),
  quote VARCHAR(500), -- Personal motto
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_trainers_slug ON trainers(slug);
CREATE INDEX idx_trainers_active ON trainers(active);
```

#### `membership_plans`
Pricing tiers and membership options.

```sql
CREATE TABLE membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2),
  setup_fee DECIMAL(10,2) DEFAULT 0,
  contract_months INTEGER DEFAULT 0, -- 0 = no contract
  features JSONB, -- Array of feature objects
  included_classes TEXT[], -- Class slugs
  guest_passes_monthly INTEGER DEFAULT 0,
  personal_training_discount INTEGER DEFAULT 0, -- Percentage
  freeze_days_yearly INTEGER DEFAULT 0,
  highlighted BOOLEAN DEFAULT false, -- "Most Popular"
  cta_text VARCHAR(50) DEFAULT 'Join Now',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Features JSONB structure:
-- [
--   { "text": "Unlimited gym access", "included": true },
--   { "text": "Group classes", "included": true },
--   { "text": "Personal locker", "included": false }
-- ]
```

#### `testimonials`
Member reviews and success stories.

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_name VARCHAR(255) NOT NULL,
  member_since DATE,
  photo VARCHAR(500),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  quote TEXT NOT NULL,
  transformation_type VARCHAR(100), -- "Weight Loss", "Strength Gain", "Lifestyle"
  before_image VARCHAR(500),
  after_image VARCHAR(500),
  timeframe VARCHAR(50), -- "3 months", "1 year"
  results_summary VARCHAR(255), -- "Lost 30 lbs"
  video_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  source VARCHAR(50) DEFAULT 'website', -- "google", "yelp", "website"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_approved ON testimonials(approved);
```

#### `blog_posts`
Blog/news content.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt VARCHAR(500),
  content TEXT NOT NULL, -- Markdown format
  author_id UUID REFERENCES trainers(id),
  author_name VARCHAR(255), -- Fallback if no trainer
  category VARCHAR(100),
  tags TEXT[],
  featured_image VARCHAR(500),
  reading_time_minutes INTEGER,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords TEXT[],
  published BOOLEAN DEFAULT false,
  publish_date TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
```

#### `faqs`
Frequently asked questions.

```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100), -- "Membership", "Classes", "Facilities", "Policies"
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_faqs_category ON faqs(category);
```

#### `gallery_images`
Photo gallery for facility, events, etc.

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description VARCHAR(500),
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  category VARCHAR(100), -- "Facility", "Classes", "Events", "Transformations"
  alt_text VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_gallery_category ON gallery_images(category);
```

### 3.2 Contact & Leads Tables

#### `contact_submissions`
Contact form submissions.

```sql
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(100),
  message TEXT NOT NULL,
  source_page VARCHAR(255),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  read BOOLEAN DEFAULT false,
  responded BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_contact_read ON contact_submissions(read);
```

#### `membership_inquiries`
Membership interest submissions.

```sql
CREATE TABLE membership_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  interested_plan VARCHAR(100),
  fitness_goals TEXT,
  preferred_contact VARCHAR(50), -- "email", "phone", "text"
  preferred_time VARCHAR(100),
  referral_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new', -- "new", "contacted", "toured", "converted", "lost"
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3.3 Configuration Tables

#### `site_settings`
Global site configuration.

```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description VARCHAR(255),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Default settings
INSERT INTO site_settings (key, value, description) VALUES
('gym_info', '{
  "name": "STR - Strength Through Resilience",
  "tagline": "Build Your Iron Fortress",
  "phone": "(555) 123-4567",
  "email": "info@strfitness.com",
  "address": {
    "street": "123 Iron Street, Suite 100",
    "city": "Your City",
    "state": "NJ",
    "zip": "07000"
  }
}', 'Basic gym information'),
('business_hours', '{
  "monday": { "open": "05:00", "close": "22:00" },
  "tuesday": { "open": "05:00", "close": "22:00" },
  "wednesday": { "open": "05:00", "close": "22:00" },
  "thursday": { "open": "05:00", "close": "22:00" },
  "friday": { "open": "05:00", "close": "22:00" },
  "saturday": { "open": "07:00", "close": "20:00" },
  "sunday": { "open": "07:00", "close": "20:00" }
}', 'Operating hours'),
('social_links', '{
  "facebook": "https://facebook.com/strfitness",
  "instagram": "https://instagram.com/strfitness",
  "youtube": "https://youtube.com/@strfitness",
  "tiktok": ""
}', 'Social media links');
```

#### `user_roles`
Admin user permissions.

```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. TypeScript Types

### `src/types/database.ts`

```typescript
// Auto-generated types from Supabase, plus custom types

export interface GymClass {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  instructor_id: string | null
  difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  duration_minutes: number
  max_capacity: number
  calories_burned: string | null
  equipment_needed: string[] | null
  benefits: string[] | null
  featured_image: string | null
  gallery_images: string[] | null
  price_drop_in: number | null
  included_in_membership: boolean
  featured: boolean
  active: boolean
  sort_order: number
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  // Joined data
  instructor?: Trainer
  schedule?: ClassScheduleItem[]
}

export interface ClassScheduleItem {
  id: string
  class_id: string
  instructor_id: string | null
  day_of_week: number // 0-6, Sunday = 0
  start_time: string // HH:MM:SS
  end_time: string
  room: string | null
  recurring: boolean
  effective_from: string
  effective_until: string | null
  cancelled: boolean
  cancellation_reason: string | null
  // Joined data
  gym_class?: GymClass
  instructor?: Trainer
}

export interface Trainer {
  id: string
  name: string
  slug: string
  title: string | null
  specialty: string | null
  bio: string | null
  short_bio: string | null
  certifications: string[] | null
  experience_years: number | null
  photo: string | null
  email: string | null
  instagram: string | null
  quote: string | null
  featured: boolean
  active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface MembershipPlan {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  price_monthly: number
  price_annual: number | null
  setup_fee: number
  contract_months: number
  features: MembershipFeature[]
  included_classes: string[] | null
  guest_passes_monthly: number
  personal_training_discount: number
  freeze_days_yearly: number
  highlighted: boolean
  cta_text: string
  active: boolean
  sort_order: number
  created_at: string
}

export interface MembershipFeature {
  text: string
  included: boolean
}

export interface Testimonial {
  id: string
  member_name: string
  member_since: string | null
  photo: string | null
  rating: number
  quote: string
  transformation_type: string | null
  before_image: string | null
  after_image: string | null
  timeframe: string | null
  results_summary: string | null
  video_url: string | null
  featured: boolean
  approved: boolean
  source: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author_id: string | null
  author_name: string | null
  category: string | null
  tags: string[] | null
  featured_image: string | null
  reading_time_minutes: number | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string[] | null
  published: boolean
  publish_date: string | null
  featured: boolean
  created_at: string
  updated_at: string
  // Joined data
  author?: Trainer
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string | null
  sort_order: number
  active: boolean
  created_at: string
}

export interface GalleryImage {
  id: string
  title: string | null
  description: string | null
  image_url: string
  thumbnail_url: string | null
  category: string | null
  alt_text: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  source_page: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  read: boolean
  responded: boolean
  notes: string | null
  created_at: string
}

export interface SiteSettings {
  id: string
  key: string
  value: Record<string, unknown>
  description: string | null
  updated_at: string
}

// Utility types
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
export const DIFFICULTY_LEVELS: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']

export type FAQCategory = 'Membership' | 'Classes' | 'Facilities' | 'Policies'
export const FAQ_CATEGORIES: FAQCategory[] = ['Membership', 'Classes', 'Facilities', 'Policies']

export type GalleryCategory = 'Facility' | 'Classes' | 'Events' | 'Transformations'
export const GALLERY_CATEGORIES: GalleryCategory[] = ['Facility', 'Classes', 'Events', 'Transformations']
```

---

## 5. Service Layer

### `src/services/classService.ts`

```typescript
import { supabase } from '@/integrations/supabase/client'
import type { GymClass, ClassScheduleItem } from '@/types/database'

export async function getActiveClasses(): Promise<GymClass[]> {
  const { data, error } = await supabase
    .from('gym_classes')
    .select(`
      *,
      instructor:trainers(id, name, slug, photo, specialty)
    `)
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getClassBySlug(slug: string): Promise<GymClass | null> {
  const { data, error } = await supabase
    .from('gym_classes')
    .select(`
      *,
      instructor:trainers(*),
      schedule:class_schedule(*)
    `)
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getFeaturedClasses(limit = 4): Promise<GymClass[]> {
  const { data, error } = await supabase
    .from('gym_classes')
    .select(`
      *,
      instructor:trainers(id, name, slug, photo)
    `)
    .eq('active', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getWeeklySchedule(): Promise<ClassScheduleItem[]> {
  const { data, error } = await supabase
    .from('class_schedule')
    .select(`
      *,
      gym_class:gym_classes(id, name, slug, difficulty_level, duration_minutes),
      instructor:trainers(id, name, slug, photo)
    `)
    .eq('cancelled', false)
    .eq('recurring', true)
    .order('day_of_week', { ascending: true })
    .order('start_time', { ascending: true })

  if (error) throw error
  return data || []
}
```

### `src/services/membershipService.ts`

```typescript
import { supabase } from '@/integrations/supabase/client'
import type { MembershipPlan } from '@/types/database'

export async function getActivePlans(): Promise<MembershipPlan[]> {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getPlanBySlug(slug: string): Promise<MembershipPlan | null> {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
```

### `src/services/trainerService.ts`

```typescript
import { supabase } from '@/integrations/supabase/client'
import type { Trainer } from '@/types/database'

export async function getActiveTrainers(): Promise<Trainer[]> {
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getTrainerBySlug(slug: string): Promise<Trainer | null> {
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getFeaturedTrainers(limit = 4): Promise<Trainer[]> {
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data || []
}
```

### `src/services/blogService.ts`

```typescript
import { supabase } from '@/integrations/supabase/client'
import type { BlogPost } from '@/types/database'

export async function getPublishedPosts(
  limit?: number,
  offset = 0
): Promise<{ posts: BlogPost[]; count: number }> {
  let query = supabase
    .from('blog_posts')
    .select('*, author:trainers(id, name, slug, photo)', { count: 'exact' })
    .eq('published', true)
    .lte('publish_date', new Date().toISOString())
    .order('publish_date', { ascending: false })

  if (limit) {
    query = query.range(offset, offset + limit - 1)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { posts: data || [], count: count || 0 }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, author:trainers(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*, author:trainers(id, name, slug, photo)')
    .eq('published', true)
    .eq('category', category)
    .lte('publish_date', new Date().toISOString())
    .order('publish_date', { ascending: false })

  if (error) throw error
  return data || []
}
```

---

## 6. Static Data Files

### `src/data/gymContent.ts`

```typescript
// Static content that rarely changes

export const GYM_AMENITIES = [
  { name: 'Free Weights Area', icon: 'Dumbbell' },
  { name: 'Cardio Equipment', icon: 'Heart' },
  { name: 'Functional Training Zone', icon: 'Activity' },
  { name: 'Locker Rooms & Showers', icon: 'Lock' },
  { name: 'Sauna', icon: 'Flame' },
  { name: 'Free Parking', icon: 'Car' },
  { name: 'Free WiFi', icon: 'Wifi' },
  { name: 'Towel Service', icon: 'Shirt' },
] as const

export const CLASS_CATEGORIES = [
  { value: 'strength', label: 'Strength Training', color: 'str-gold' },
  { value: 'cardio', label: 'Cardio & HIIT', color: 'error' },
  { value: 'flexibility', label: 'Yoga & Flexibility', color: 'success' },
  { value: 'functional', label: 'Functional Fitness', color: 'focus-blue' },
] as const

export const TRAINER_SPECIALTIES = [
  'Strength & Conditioning',
  'HIIT & Cardio',
  'Olympic Weightlifting',
  'Powerlifting',
  'Yoga & Mobility',
  'Boxing & Kickboxing',
  'CrossFit',
  'Nutrition Coaching',
  'Sports Performance',
  'Senior Fitness',
] as const

export const TRANSFORMATION_TYPES = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Increase',
  'Athletic Performance',
  'Lifestyle Change',
  'Post-Injury Recovery',
] as const

export const BLOG_CATEGORIES = [
  'Workout Tips',
  'Nutrition',
  'Member Spotlights',
  'Gym News',
  'Recovery & Wellness',
  'Motivation',
] as const

// Process/how it works steps
export const MEMBERSHIP_PROCESS = [
  {
    step: 1,
    title: 'Book a Tour',
    description: 'Schedule a free facility tour and consultation with our team.',
    icon: 'Calendar',
  },
  {
    step: 2,
    title: 'Choose Your Plan',
    description: 'Select the membership tier that fits your goals and lifestyle.',
    icon: 'CheckCircle',
  },
  {
    step: 3,
    title: 'Get Your Assessment',
    description: 'Complete a fitness assessment to establish your baseline.',
    icon: 'ClipboardCheck',
  },
  {
    step: 4,
    title: 'Start Training',
    description: 'Begin your journey with a personalized onboarding session.',
    icon: 'Rocket',
  },
] as const

// Default opening hours (can be overridden by site_settings)
export const DEFAULT_HOURS = {
  monday: { open: '05:00', close: '22:00' },
  tuesday: { open: '05:00', close: '22:00' },
  wednesday: { open: '05:00', close: '22:00' },
  thursday: { open: '05:00', close: '22:00' },
  friday: { open: '05:00', close: '22:00' },
  saturday: { open: '07:00', close: '20:00' },
  sunday: { open: '07:00', close: '20:00' },
} as const
```

---

## 7. Admin Panel Structure

### Admin Routes

```
src/app/admin/
├── layout.tsx              # Admin layout with sidebar
├── page.tsx                # Dashboard overview
├── classes/
│   └── page.tsx            # Classes manager
├── schedule/
│   └── page.tsx            # Schedule manager
├── trainers/
│   └── page.tsx            # Trainers manager
├── membership/
│   └── page.tsx            # Plans manager
├── testimonials/
│   └── page.tsx            # Testimonials manager
├── blog/
│   └── page.tsx            # Blog posts manager
├── gallery/
│   └── page.tsx            # Gallery manager
├── faqs/
│   └── page.tsx            # FAQs manager
├── leads/
│   └── page.tsx            # Contact/inquiry manager
└── settings/
    └── page.tsx            # Site settings
```

### Admin Components

```
src/components/admin/
├── AdminSidebar.tsx        # Navigation sidebar
├── AdminHeader.tsx         # Top header with user menu
├── DashboardStats.tsx      # Overview statistics
├── ClassesEditor.tsx       # CRUD for classes
├── ScheduleEditor.tsx      # Calendar/schedule management
├── TrainersEditor.tsx      # CRUD for trainers
├── MembershipEditor.tsx    # CRUD for plans
├── TestimonialsEditor.tsx  # CRUD for testimonials
├── BlogPostEditor.tsx      # Rich text blog editor
├── GalleryManager.tsx      # Image upload/organization
├── FAQsEditor.tsx          # CRUD for FAQs
├── LeadsManager.tsx        # Contact submissions list
├── SettingsEditor.tsx      # Site configuration
├── ImageUploader.tsx       # Supabase storage upload
├── RichTextEditor.tsx      # Markdown/WYSIWYG editor
└── DataTable.tsx           # Reusable data table
```

---

## 8. Content Rendering Patterns

### Server-Side Data Fetching (Page Level)

```typescript
// src/app/classes/page.tsx
import { getActiveClasses } from '@/services/classService'
import { ClassGrid } from '@/components/sections/ClassGrid'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function ClassesPage() {
  const classes = await getActiveClasses()

  return (
    <main>
      <h1>Our Classes</h1>
      <ClassGrid classes={classes} />
    </main>
  )
}
```

### Dynamic Routes with generateStaticParams

```typescript
// src/app/classes/[slug]/page.tsx
import { getActiveClasses, getClassBySlug } from '@/services/classService'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const classes = await getActiveClasses()
  return classes.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const gymClass = await getClassBySlug(params.slug)
  if (!gymClass) return {}

  return {
    title: gymClass.meta_title || gymClass.name,
    description: gymClass.meta_description || gymClass.short_description,
  }
}

export default async function ClassDetailPage({ params }: { params: { slug: string } }) {
  const gymClass = await getClassBySlug(params.slug)

  if (!gymClass) {
    notFound()
  }

  return (
    <main>
      {/* Class detail content */}
    </main>
  )
}
```

### Markdown Content Rendering

```typescript
// src/components/MarkdownContent.tsx
'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const sanitizedContent = DOMPurify.sanitize(content)

  return (
    <div className={`prose prose-invert prose-gold max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  )
}
```

---

## 9. Supabase Setup

### Client Initialization

```typescript
// src/integrations/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### Server Client (for Server Components)

```typescript
// src/integrations/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE gym_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Public read access" ON gym_classes
  FOR SELECT USING (active = true);

CREATE POLICY "Public read access" ON trainers
  FOR SELECT USING (active = true);

CREATE POLICY "Public read access" ON membership_plans
  FOR SELECT USING (active = true);

CREATE POLICY "Public read access" ON testimonials
  FOR SELECT USING (approved = true);

CREATE POLICY "Public read access" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access" ON faqs
  FOR SELECT USING (active = true);

CREATE POLICY "Public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON site_settings
  FOR SELECT USING (true);

-- Admin full access (requires authenticated user with admin role)
CREATE POLICY "Admin full access" ON gym_classes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Repeat for other tables...

-- Public insert for contact form
CREATE POLICY "Public insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Only admins can read contact submissions
CREATE POLICY "Admin read" ON contact_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'editor')
    )
  );
```

---

## 10. Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Site URL (for metadata)
NEXT_PUBLIC_SITE_URL=https://www.strfitness.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Revalidation secret (for on-demand ISR)
REVALIDATION_SECRET=your-secret-key
```

---

## 11. Content Workflow

### Adding a New Class

1. **Admin Panel** → Classes → "Add Class"
2. **Fill form:** Name, description, instructor, difficulty, images
3. **Set schedule:** Add recurring time slots
4. **SEO fields:** Meta title, description
5. **Save:** Writes to `gym_classes` table
6. **Display:** Next.js ISR revalidates within 60 seconds

### Publishing a Blog Post

1. **Admin Panel** → Blog → "New Post"
2. **Write content:** Markdown editor with preview
3. **Set metadata:** Title, excerpt, category, tags
4. **Upload image:** Featured image to Supabase Storage
5. **Schedule:** Set publish date or publish immediately
6. **Save:** Published posts appear on `/blog`

### Managing Testimonials

1. **Admin Panel** → Testimonials
2. **Add new:** Member name, quote, rating
3. **Transformation:** Optional before/after images
4. **Approve:** Toggle approval status
5. **Feature:** Mark for homepage display

---

## 12. File Structure Summary

```
str-website/
├── CONTEXT/
│   ├── REQUIREMENTS.md
│   ├── DESIGN-SYSTEM.md
│   └── CMS-ARCHITECTURE.md     # This file
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/           # Public routes group
│   │   │   ├── page.tsx        # Home
│   │   │   ├── about/
│   │   │   ├── classes/
│   │   │   ├── trainers/
│   │   │   ├── pricing/
│   │   │   ├── gallery/
│   │   │   ├── blog/
│   │   │   ├── testimonials/
│   │   │   ├── faq/
│   │   │   └── contact/
│   │   ├── admin/              # Protected admin routes
│   │   ├── auth/               # Auth pages
│   │   ├── api/                # API routes
│   │   ├── layout.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Header, Footer, Nav
│   │   ├── sections/           # Page sections
│   │   └── admin/              # Admin components
│   ├── content/                # Static markdown
│   ├── data/                   # Static TypeScript data
│   ├── hooks/                  # Custom React hooks
│   ├── integrations/
│   │   └── supabase/           # Supabase client
│   ├── lib/                    # Utilities
│   ├── services/               # Data service layer
│   ├── styles/
│   │   └── globals.css
│   └── types/                  # TypeScript types
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seed.sql                # Initial data
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

*Document Version: 1.0*
*Last Updated: December 2024*
