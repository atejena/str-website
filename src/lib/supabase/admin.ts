import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase admin client for use in API routes (no cookies needed).
 * Tries service role key first, falls back to publishable key.
 */
export function createApiAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase URL or key environment variables')
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
