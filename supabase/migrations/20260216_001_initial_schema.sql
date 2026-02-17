-- STR Website Initial Schema
-- All content is managed via admin panel

-- ============================================
-- TRAINERS
-- ============================================
CREATE TABLE trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(100),
  specialty VARCHAR(255),
  bio TEXT,
  short_bio VARCHAR(500),
  certifications TEXT[],
  experience_years INTEGER,
  photo VARCHAR(500),
  email VARCHAR(255),
  instagram VARCHAR(100),
  quote VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_trainers_slug ON trainers(slug);
CREATE INDEX idx_trainers_active ON trainers(active);

-- ============================================
-- GYM CLASSES
-- ============================================
CREATE TABLE gym_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  instructor_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gym_classes_slug ON gym_classes(slug);
CREATE INDEX idx_gym_classes_active ON gym_classes(active);
CREATE INDEX idx_gym_classes_featured ON gym_classes(featured);

-- ============================================
-- CLASS SCHEDULE
-- ============================================
CREATE TABLE class_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES gym_classes(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
  day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(100),
  recurring BOOLEAN DEFAULT true,
  effective_from DATE DEFAULT CURRENT_DATE,
  effective_until DATE,
  cancelled BOOLEAN DEFAULT false,
  cancellation_reason VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_class_schedule_day ON class_schedule(day_of_week);
CREATE INDEX idx_class_schedule_class ON class_schedule(class_id);

-- ============================================
-- MEMBERSHIP PLANS
-- ============================================
CREATE TABLE membership_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2),
  setup_fee DECIMAL(10,2) DEFAULT 0,
  contract_months INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  included_classes TEXT[],
  guest_passes_monthly INTEGER DEFAULT 0,
  personal_training_discount INTEGER DEFAULT 0,
  freeze_days_yearly INTEGER DEFAULT 0,
  highlighted BOOLEAN DEFAULT false,
  cta_text VARCHAR(50) DEFAULT 'Join Now',
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS / REVIEWS
-- ============================================
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_name VARCHAR(255) NOT NULL,
  member_since DATE,
  photo VARCHAR(500),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  quote TEXT NOT NULL,
  transformation_type VARCHAR(100),
  before_image VARCHAR(500),
  after_image VARCHAR(500),
  timeframe VARCHAR(50),
  results_summary VARCHAR(255),
  video_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT true,
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_approved ON testimonials(approved);

-- ============================================
-- BLOG POSTS
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt VARCHAR(500),
  content TEXT NOT NULL,
  author_id UUID REFERENCES trainers(id) ON DELETE SET NULL,
  author_name VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[],
  featured_image VARCHAR(500),
  reading_time_minutes INTEGER,
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  published BOOLEAN DEFAULT false,
  publish_date TIMESTAMPTZ,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- ============================================
-- FAQs
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faqs_category ON faqs(category);

-- ============================================
-- GALLERY
-- ============================================
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description VARCHAR(500),
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  category VARCHAR(100),
  alt_text VARCHAR(255),
  media_type VARCHAR(20) DEFAULT 'image',
  video_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_images(category);

-- ============================================
-- CONTACT SUBMISSIONS
-- ============================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(100),
  message TEXT NOT NULL,
  source_page VARCHAR(255),
  read BOOLEAN DEFAULT false,
  responded BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_read ON contact_submissions(read);

-- ============================================
-- CAREER POSTINGS
-- ============================================
CREATE TABLE career_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(100),
  employment_type VARCHAR(50) DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  salary_range VARCHAR(100),
  location VARCHAR(255) DEFAULT 'Cranford, NJ',
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SITE SETTINGS (Key-Value Config)
-- ============================================
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description VARCHAR(255),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADMIN USER ROLES
-- ============================================
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trainers_updated_at BEFORE UPDATE ON trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER gym_classes_updated_at BEFORE UPDATE ON gym_classes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER career_postings_updated_at BEFORE UPDATE ON career_postings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Public read access for frontend
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gym_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies (frontend reads)
CREATE POLICY "Public read active trainers" ON trainers FOR SELECT USING (active = true);
CREATE POLICY "Public read active classes" ON gym_classes FOR SELECT USING (active = true);
CREATE POLICY "Public read schedule" ON class_schedule FOR SELECT USING (true);
CREATE POLICY "Public read active plans" ON membership_plans FOR SELECT USING (active = true);
CREATE POLICY "Public read approved testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read active faqs" ON faqs FOR SELECT USING (active = true);
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public read active careers" ON career_postings FOR SELECT USING (active = true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Public INSERT for contact form
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users with admin role)
-- Using auth.uid() check against user_roles table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for all tables
CREATE POLICY "Admin full access trainers" ON trainers FOR ALL USING (is_admin());
CREATE POLICY "Admin full access classes" ON gym_classes FOR ALL USING (is_admin());
CREATE POLICY "Admin full access schedule" ON class_schedule FOR ALL USING (is_admin());
CREATE POLICY "Admin full access plans" ON membership_plans FOR ALL USING (is_admin());
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (is_admin());
CREATE POLICY "Admin full access posts" ON blog_posts FOR ALL USING (is_admin());
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL USING (is_admin());
CREATE POLICY "Admin full access gallery" ON gallery_images FOR ALL USING (is_admin());
CREATE POLICY "Admin full access careers" ON career_postings FOR ALL USING (is_admin());
CREATE POLICY "Admin full access settings" ON site_settings FOR ALL USING (is_admin());
CREATE POLICY "Admin full access contacts" ON contact_submissions FOR ALL USING (is_admin());
CREATE POLICY "Admin read roles" ON user_roles FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admin upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND is_admin());
CREATE POLICY "Admin update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND is_admin());
CREATE POLICY "Admin delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND is_admin());
