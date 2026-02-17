-- Add admin role for the properly created admin user
-- User was created via Auth API signup
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE email = 'admin@str.com'
ON CONFLICT DO NOTHING;

-- Confirm email if not already confirmed
UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'admin@str.com' AND email_confirmed_at IS NULL;
