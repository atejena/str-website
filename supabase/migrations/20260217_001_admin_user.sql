-- Enable pgcrypto if not already
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- Create admin user (admin@str.com / admin123)
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at, confirmation_token,
  raw_app_meta_data, raw_user_meta_data, is_super_admin
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'b49e3b45-56a0-485d-99d6-4a1366acccb7',
  'authenticated', 'authenticated',
  'admin@str.com',
  extensions.crypt('admin123', extensions.gen_salt('bf')),
  NOW(), NOW(), NOW(), '',
  '{"provider":"email","providers":["email"]}',
  '{}', false
) ON CONFLICT (id) DO NOTHING;

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  'b49e3b45-56a0-485d-99d6-4a1366acccb7',
  'b49e3b45-56a0-485d-99d6-4a1366acccb7',
  '{"sub":"b49e3b45-56a0-485d-99d6-4a1366acccb7","email":"admin@str.com"}',
  'email', 'b49e3b45-56a0-485d-99d6-4a1366acccb7',
  NOW(), NOW(), NOW()
) ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role) VALUES
('b49e3b45-56a0-485d-99d6-4a1366acccb7', 'admin')
ON CONFLICT DO NOTHING;
