-- Migration: Add page_visibility setting to site_settings
-- Description: Adds a new setting to control which public pages are visible/enabled
-- Date: 2026-02-22

-- Insert default page_visibility setting (all pages enabled by default)
INSERT INTO site_settings (key, value, updated_at)
VALUES (
  'page_visibility',
  '{
    "classes": true,
    "trainers": true,
    "pricing": true,
    "programming": true,
    "about": true,
    "contact": true,
    "blog": true,
    "gallery": true,
    "testimonials": true,
    "faq": true,
    "careers": true
  }'::jsonb,
  now()
)
ON CONFLICT (key) DO NOTHING;
