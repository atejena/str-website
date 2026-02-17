import { NextRequest, NextResponse } from 'next/server'

/**
 * Master sync endpoint — triggers both Google Reviews and Instagram syncs.
 * GET /api/sync?key=SECRET_SYNC_KEY
 */
export async function GET(request: NextRequest) {
  try {
    const syncKey = request.nextUrl.searchParams.get('key')
    const expectedKey = process.env.SYNC_SECRET_KEY

    if (!expectedKey) {
      return NextResponse.json(
        { error: 'SYNC_SECRET_KEY not configured on server' },
        { status: 500 }
      )
    }

    if (syncKey !== expectedKey) {
      return NextResponse.json(
        { error: 'Invalid sync key' },
        { status: 401 }
      )
    }

    const baseUrl = request.nextUrl.origin

    // Run both syncs in parallel
    const [reviewsRes, instagramRes] = await Promise.allSettled([
      fetch(`${baseUrl}/api/sync/reviews?key=${encodeURIComponent(syncKey)}`, {
        next: { revalidate: 0 },
      }),
      fetch(`${baseUrl}/api/sync/instagram?key=${encodeURIComponent(syncKey)}`, {
        next: { revalidate: 0 },
      }),
    ])

    // Parse results
    const reviewsResult =
      reviewsRes.status === 'fulfilled' && reviewsRes.value.ok
        ? await reviewsRes.value.json()
        : {
            error:
              reviewsRes.status === 'rejected'
                ? reviewsRes.reason?.message
                : `HTTP ${reviewsRes.status === 'fulfilled' ? reviewsRes.value.status : 'unknown'}`,
          }

    const instagramResult =
      instagramRes.status === 'fulfilled' && instagramRes.value.ok
        ? await instagramRes.value.json()
        : {
            error:
              instagramRes.status === 'rejected'
                ? instagramRes.reason?.message
                : `HTTP ${instagramRes.status === 'fulfilled' ? instagramRes.value.status : 'unknown'}`,
          }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      reviews: reviewsResult,
      instagram: instagramResult,
    })
  } catch (error) {
    console.error('Master sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error during sync' },
      { status: 500 }
    )
  }
}
