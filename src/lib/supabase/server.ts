import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
const SUPABASE_SECRET = process.env.SUPABASE_SECRET_KEY || ''

export async function createServerSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    // Return a mock client that returns empty data during build
    // Uses a proxy to handle any chain of method calls
    const emptyResult = { data: [], error: null }
    const singleResult = { data: null, error: null }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chainable: any = new Proxy({}, {
      get(_target, prop) {
        if (prop === 'data') return []
        if (prop === 'error') return null
        if (prop === 'then') return undefined // not a promise
        if (prop === 'single') return () => singleResult
        return () => chainable
      }
    })
    return {
      from: () => ({
        select: () => chainable,
        insert: () => ({ ...singleResult, select: () => ({ single: () => singleResult }) }),
        update: () => ({ ...singleResult, eq: () => singleResult }),
        delete: () => ({ ...singleResult, eq: () => singleResult }),
        upsert: () => emptyResult,
      }),
      auth: { getUser: async () => ({ data: { user: null }, error: null }), signInWithPassword: async () => ({ data: null, error: { message: 'Not configured' } }), signOut: async () => ({}) },
      storage: { from: () => ({ upload: async () => singleResult, getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
      rpc: async () => emptyResult,
    } as unknown as ReturnType<typeof createServerClient>
  }

  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Server component - can't set cookies
          }
        },
      },
    }
  )
}

export async function createAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SECRET) {
    return createServerSupabaseClient()
  }

  // Use @supabase/supabase-js createClient with the secret key
  // This bypasses RLS when using the service role / secret key
  const { createClient } = await import('@supabase/supabase-js')

  return createClient(
    SUPABASE_URL,
    SUPABASE_SECRET,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
