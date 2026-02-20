ALTER TABLE membership_plans ADD COLUMN IF NOT EXISTS price_interval text DEFAULT 'month';
