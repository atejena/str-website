import { NextRequest, NextResponse } from 'next/server'
import { createApiAdminClient } from '@/lib/supabase/admin'

const DEFAULT_PLACE_ID = 'ChIJUbJkArezw4kRrIcYZFBjQlk'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  profile_photo_url?: string
  time: number
  relative_time_description?: string
}

interface GooglePlaceDetailsResponse {
  result?: {
    name?: string
    rating?: number
    user_ratings_total?: number
    reviews?: GoogleReview[]
  }
  status: string
  error_message?: string
}

export async function GET(request: NextRequest) {
  try {
    // Auth check
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

    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY
    if (!googleApiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_PLACES_API_KEY not configured' },
        { status: 500 }
      )
    }

    const supabase = createApiAdminClient()

    // Try to get place ID from site_settings (stored in integrations key), fall back to default
    let placeId = DEFAULT_PLACE_ID
    try {
      const { data: integrationsSetting } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'integrations')
        .single()

      const integrationsValue = integrationsSetting?.value as Record<string, string> | null
      if (integrationsValue?.google_place_id?.trim()) {
        placeId = integrationsValue.google_place_id.trim()
      }
    } catch {
      // Use default place ID
    }

    // Fetch reviews from Google Places API
    const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,reviews,user_ratings_total&key=${googleApiKey}`
    const googleRes = await fetch(googleUrl, { next: { revalidate: 0 } })

    if (!googleRes.ok) {
      return NextResponse.json(
        { error: `Google API HTTP error: ${googleRes.status}` },
        { status: 502 }
      )
    }

    const googleData: GooglePlaceDetailsResponse = await googleRes.json()

    if (googleData.status !== 'OK') {
      return NextResponse.json(
        { error: `Google API error: ${googleData.status}`, message: googleData.error_message },
        { status: 502 }
      )
    }

    const reviews = googleData.result?.reviews || []

    if (reviews.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No reviews found from Google',
        placeName: googleData.result?.name,
        overallRating: googleData.result?.rating,
        totalReviews: googleData.result?.user_ratings_total,
        synced: 0,
        skipped: 0,
      })
    }

    // Fetch existing Google testimonials to check for duplicates
    const { data: existingTestimonials } = await supabase
      .from('testimonials')
      .select('id, member_name, quote')
      .eq('source', 'google')

    const existing = existingTestimonials || []

    let synced = 0
    let skipped = 0

    for (const review of reviews) {
      if (!review.text || !review.author_name) {
        skipped++
        continue
      }

      // Check for duplicate by matching author name + first 50 chars of quote text
      const quoteSubstring = review.text.substring(0, 50)
      const isDuplicate = existing.some(
        (t) =>
          t.member_name === review.author_name &&
          t.quote &&
          (t.quote as string).substring(0, 50) === quoteSubstring
      )

      if (isDuplicate) {
        // Update existing review (rating/photo might have changed)
        const match = existing.find(
          (t) =>
            t.member_name === review.author_name &&
            t.quote &&
            (t.quote as string).substring(0, 50) === quoteSubstring
        )

        if (match) {
          await supabase
            .from('testimonials')
            .update({
              rating: review.rating,
              quote: review.text,
              photo: review.profile_photo_url || null,
              updated_at: new Date().toISOString(),
            })
            .eq('id', match.id)
        }

        skipped++
        continue
      }

      // Insert new review
      const { error: insertError } = await supabase.from('testimonials').insert({
        member_name: review.author_name,
        rating: review.rating,
        quote: review.text,
        source: 'google',
        approved: true,
        photo: review.profile_photo_url || null,
        featured: review.rating >= 5,
      })

      if (insertError) {
        console.error('Error inserting review:', insertError)
        skipped++
      } else {
        synced++
      }
    }

    return NextResponse.json({
      success: true,
      placeName: googleData.result?.name,
      overallRating: googleData.result?.rating,
      totalReviews: googleData.result?.user_ratings_total,
      reviewsFetched: reviews.length,
      synced,
      skipped,
    })
  } catch (error) {
    console.error('Review sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error during review sync' },
      { status: 500 }
    )
  }
}
