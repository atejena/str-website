-- STR Website Seed Data
-- Realistic content for development

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, description) VALUES
('gym_info', '{
  "name": "STR - Strength Through Resilience",
  "tagline": "Strength Through Resilience",
  "phone": "",
  "email": "spencer@trainwithstr.com",
  "address": {
    "street": "8 Eastman St, Suite 3",
    "city": "Cranford",
    "state": "NJ",
    "zip": "07016"
  }
}', 'Basic gym information'),
('business_hours', '{
  "monday": { "open": "05:00", "close": "21:00" },
  "tuesday": { "open": "05:00", "close": "21:00" },
  "wednesday": { "open": "05:00", "close": "21:00" },
  "thursday": { "open": "05:00", "close": "21:00" },
  "friday": { "open": "05:00", "close": "21:00" },
  "saturday": { "open": "07:00", "close": "14:00" },
  "sunday": { "open": "07:00", "close": "14:00" }
}', 'Operating hours'),
('social_links', '{
  "facebook": "",
  "instagram": "",
  "youtube": "",
  "tiktok": ""
}', 'Social media links'),
('integrations', '{
  "trainheroic_whiteboard_url": "",
  "gohighlevel_widget_id": "",
  "google_analytics_id": "",
  "google_maps_embed_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.5!2d-74.306!3d40.656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM5JzIxLjYiTiA3NMKwMTgnMjEuNiJX!5e0!3m2!1sen!2sus!4v1"
}', 'Third-party integration settings'),
('jotform', '{
  "enabled": false,
  "form_id": "",
  "embed_url": ""
}', 'Jotform or signup form settings');

-- ============================================
-- TRAINERS
-- ============================================
INSERT INTO trainers (name, slug, title, specialty, bio, short_bio, certifications, experience_years, featured, active, sort_order) VALUES
('Spencer', 'spencer', 'Owner / Head Coach', 'Strength & Conditioning', 
 'Spencer founded STR with a simple mission: build a gym where serious training meets a supportive community. With years of experience in strength and conditioning, Spencer designs programming that delivers real results — whether you''re a competitive athlete or just getting started.',
 'Founder of STR. Builds programming that delivers real results.',
 ARRAY['CSCS', 'USAW-L1'], 8, true, true, 1);

-- ============================================
-- GYM CLASSES (Offerings)
-- ============================================
INSERT INTO gym_classes (name, slug, description, short_description, difficulty_level, duration_minutes, featured, active, sort_order) VALUES
('Semi-Private Training', 'semi-private-training',
 'Train in small groups of 2-6 with personalized attention. Every session is coached, every rep is accounted for. You get the energy of a group with the precision of personal training. Programming is structured in training blocks so you''re always progressing — not just sweating.',
 'Small group training with personalized coaching. The best of both worlds.',
 'All Levels', 60, true, true, 1),
('Group Training', 'group-training',
 'High-energy group sessions designed to push your limits. Our group classes combine strength, conditioning, and functional movements in a motivating team environment. Every class is coached and scalable — from beginners to advanced athletes.',
 'High-energy coached sessions. Strength, conditioning, and community.',
 'All Levels', 60, true, true, 2),
('Strength & Conditioning', 'strength-conditioning',
 'Structured strength programs designed around progressive overload. Whether you''re chasing a PR or building a foundation, our S&C programming follows proven periodization principles. Squat, bench, deadlift, and beyond.',
 'Progressive strength programs built on proven principles.',
 'All Levels', 60, false, true, 3),
('Private Personal Training', 'private-personal-training',
 'One-on-one coaching tailored entirely to your goals. Your trainer builds a custom program, tracks your progress, and adjusts in real-time. This is the fastest path to results.',
 '1-on-1 coaching with a custom program built for your goals.',
 'All Levels', 60, false, true, 4),
('HIIT Style', 'hiit',
 'Fast-paced, high-intensity interval training that torches calories and builds endurance. These sessions alternate between max effort and recovery, keeping your heart rate elevated and your metabolism firing long after the workout ends.',
 'High-intensity intervals that build endurance and burn fat.',
 'Intermediate', 45, false, true, 5),
('Functional Training', 'functional-training',
 'Move better in everyday life. Functional training focuses on compound movements that translate to real-world strength — carrying groceries, playing with your kids, performing at your sport. No machines, just purposeful movement.',
 'Real-world strength through purposeful compound movements.',
 'All Levels', 60, false, true, 6),
('Hyrox / Deka Conditioning', 'hyrox-deka-conditioning',
 'Competition-specific training for Hyrox and Deka events. We train the exact stations — SkiErg, sled push/pull, burpee broad jumps, rowing, farmers carry, wall balls, and running. Whether you''re prepping for your first race or chasing a podium, this is where you get ready.',
 'Race-specific prep for Hyrox and Deka competitors.',
 'Advanced', 60, false, true, 7);

-- ============================================
-- TESTIMONIALS (Sample Reviews)
-- ============================================
INSERT INTO testimonials (member_name, rating, quote, source, featured, approved) VALUES
('Mike R.', 5, 'Best gym I''ve ever been to. Spencer actually cares about your progress and the programming is next level. I''ve gotten stronger in 3 months here than I did in 2 years at a big box gym.', 'google', true, true),
('Sarah K.', 5, 'The semi-private training is perfect. You get real coaching without the price tag of 1-on-1. The community here is incredible — everyone pushes each other.', 'google', true, true),
('James T.', 5, 'I was nervous to join a "real" gym but STR made it so welcoming. The coaches scale everything for your level. I''m down 25 lbs and actually enjoy working out now.', 'google', true, true),
('Lisa M.', 5, 'The programming is smart and structured. You can tell a lot of thought goes into it. Not just random WODs — actual progressive training that gets results.', 'mindbody', false, true),
('Chris D.', 5, 'Hands down the best coaching in Cranford. The facility is clean, well-equipped, and the vibe is unmatched. Worth every penny.', 'google', false, true),
('Amanda B.', 5, 'I trained at three other gyms before finding STR. The difference is night and day. Real programming, real coaching, real results.', 'mindbody', false, true);

-- ============================================
-- FAQs
-- ============================================
INSERT INTO faqs (question, answer, category, sort_order, active) VALUES
('What should I expect on my first visit?', 'We''ll start with a quick tour and chat about your goals. Then you''ll jump into a coached session — everything is scaled to your level, so don''t worry about experience. Just show up ready to work.', 'Getting Started', 1, true),
('Do I need to be in shape to start?', 'Absolutely not. Our coaches scale every workout to your current fitness level. Whether you''re brand new or a seasoned athlete, the programming meets you where you are.', 'Getting Started', 2, true),
('What''s the difference between semi-private and group training?', 'Semi-private is smaller (2-6 people) with more individualized coaching and programming. Group training is larger with a set workout for everyone, scaled as needed. Both are fully coached.', 'Training', 3, true),
('Is there parking available?', 'Yes, there''s free parking available at the facility on Eastman Street.', 'Facilities', 4, true),
('Do you offer a free trial?', 'Yes! Contact us to schedule your free introductory session. Come see what STR is all about.', 'Getting Started', 5, true),
('What are your hours?', 'We''re open Monday through Friday 5am–9pm, and Saturday–Sunday 7am–2pm. Check our schedule for specific class times.', 'General', 6, true),
('What should I bring?', 'Comfortable workout clothes, athletic shoes, a water bottle, and a towel. We have everything else you''ll need.', 'Getting Started', 7, true),
('Can I freeze or cancel my membership?', 'Yes, we offer flexible membership options. Contact us directly for details on freezing or canceling.', 'Membership', 8, true);

-- ============================================
-- SAMPLE BLOG POST
-- ============================================
INSERT INTO blog_posts (title, slug, excerpt, content, author_name, category, tags, reading_time_minutes, published, publish_date, featured) VALUES
('Why Strength Training Matters More Than You Think', 'why-strength-training-matters',
 'Strength training isn''t just about building muscle — it''s about building a body that performs, recovers, and lasts.',
 '# Why Strength Training Matters More Than You Think

Strength training isn''t just about building muscle or hitting PRs (though that''s fun too). It''s about building a body that **performs, recovers, and lasts**.

## The Benefits Go Beyond the Gym

### 1. Bone Density
Resistance training is one of the most effective ways to maintain and build bone density as you age. This isn''t just for older adults — building that foundation now pays dividends for decades.

### 2. Metabolic Health
Muscle is metabolically active tissue. The more you have, the more calories you burn at rest. Strength training improves insulin sensitivity, blood sugar regulation, and overall metabolic health.

### 3. Mental Resilience
There''s something about pushing through a heavy set that builds mental toughness. The discipline, focus, and grit you develop under the bar carries over into every area of life.

### 4. Injury Prevention
Strong muscles, tendons, and ligaments protect your joints. A well-structured strength program addresses imbalances and builds the structural integrity your body needs.

## How to Start

You don''t need to figure it out alone. At STR, every session is coached. We meet you where you are and build from there.

**Ready to get started?** [Contact us](/contact) to schedule your free intro session.',
 'Spencer', 'Training', ARRAY['strength', 'fitness', 'health'], 4, true, NOW(), true);

-- ============================================
-- GALLERY IMAGES (Placeholder)
-- ============================================
INSERT INTO gallery_images (title, description, image_url, thumbnail_url, category, alt_text, media_type, featured, sort_order) VALUES
('Strength Training', 'Member performing barbell squats', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', 'Training', 'Gym member doing squats', 'image', true, 1),
('Group Class', 'High-energy group training session', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400', 'Classes', 'Group fitness class', 'image', true, 2),
('Personal Training', 'One-on-one coaching session', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400', 'Training', 'Personal training session', 'image', false, 3),
('Gym Facility', 'Main training floor with equipment', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400', 'Facility', 'Gym interior', 'image', false, 4),
('Deadlifts', 'Member performing deadlift', 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=800', 'https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?w=400', 'Training', 'Deadlift exercise', 'image', false, 5),
('Conditioning', 'HIIT style conditioning workout', 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800', 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400', 'Classes', 'HIIT workout', 'image', false, 6),
('Equipment', 'Barbells and plates ready for training', 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800', 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400', 'Facility', 'Gym equipment', 'image', false, 7),
('Community', 'Members training together', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800', 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400', 'Classes', 'Group training', 'image', false, 8);
