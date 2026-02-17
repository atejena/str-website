-- Clean up bad admin user created via raw SQL
DELETE FROM user_roles WHERE user_id = 'b49e3b45-56a0-485d-99d6-4a1366acccb7';
DELETE FROM auth.identities WHERE user_id = 'b49e3b45-56a0-485d-99d6-4a1366acccb7';
DELETE FROM auth.users WHERE id = 'b49e3b45-56a0-485d-99d6-4a1366acccb7';
