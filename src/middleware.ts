import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

// Pages that can be toggled (must match the page_visibility keys)
const TOGGLEABLE_PAGES = [
  '/classes',
  '/trainers',
  '/pricing',
  '/programming',
  '/about',
  '/contact',
  '/blog',
  '/gallery',
  '/testimonials',
  '/faq',
  '/careers',
] as const

export async function middleware(request: NextRequest) {
  // First, update the Supabase session
  const response = await updateSession(request)
  
  // Get the pathname
  const { pathname } = request.nextUrl
  
  // Skip processing for non-toggleable pages
  const matchedPage = TOGGLEABLE_PAGES.find(page => pathname === page || pathname.startsWith(`${page}/`))
  if (!matchedPage) {
    return response
  }
  
  // Create a Supabase client to check page visibility
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll() {},
      },
    }
  )
  
  // Fetch page visibility settings
  const { data: pageVisibilityRow } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'page_visibility')
    .single()
  
  const pageVisibility = (pageVisibilityRow?.value as Record<string, boolean>) || {}
  
  // Extract the page key from the path (e.g., '/classes' -> 'classes')
  const pageKey = matchedPage.slice(1) // Remove leading slash
  
  // If page is disabled, redirect to homepage
  if (pageVisibility[pageKey] === false) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
