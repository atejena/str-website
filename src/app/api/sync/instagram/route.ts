import { NextRequest, NextResponse } from 'next/server'
import { createApiAdminClient } from '@/lib/supabase/admin'

interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

interface InstagramMediaResponse {
  data?: InstagramPost[]
  paging?: {
    cursors: { before: string; after: string }
    next?: string
  }
  error?: {
    message: string
    type: string
    code: number
  }
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

    const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN
    if (!instagramToken) {
      return NextResponse.json({
        success: true,
        message: 'Instagram sync not configured. Set INSTAGRAM_ACCESS_TOKEN env var.',
        synced: 0,
      })
    }

    const supabase = createApiAdminClient()

    // Fetch recent posts from Instagram Graph API
    const igUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${instagramToken}&limit=25`
    const igRes = await fetch(igUrl, { next: { revalidate: 0 } })

    if (!igRes.ok) {
      return NextResponse.json(
        { error: `Instagram API HTTP error: ${igRes.status}` },
        { status: 502 }
      )
    }

    const igData: InstagramMediaResponse = await igRes.json()

    if (igData.error) {
      return NextResponse.json(
        { error: `Instagram API error: ${igData.error.message}`, code: igData.error.code },
        { status: 502 }
      )
    }

    const posts = igData.data || []

    if (posts.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No posts found from Instagram',
        synced: 0,
      })
    }

    // Fetch existing Instagram gallery images to check for duplicates
    const { data: existingImages } = await supabase
      .from('gallery_images')
      .select('id, description')
      .eq('category', 'Instagram')

    const existingDescriptions = new Set(
      (existingImages || [])
        .map((img) => (img.description as string) || '')
        .filter(Boolean)
    )

    let synced = 0
    let skipped = 0

    // Sort by timestamp descending (newest first)
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    for (let i = 0; i < sortedPosts.length; i++) {
      const post = sortedPosts[i]

      // Extract title from first line of caption
      const captionText = post.caption || ''
      const firstLine = captionText.split('\n')[0] || ''
      const title = firstLine.substring(0, 100) || `Instagram Post`

      // Check for duplicate by matching full caption/description
      if (captionText && existingDescriptions.has(captionText)) {
        skipped++
        continue
      }

      // Determine image/video URLs
      const isVideo = post.media_type === 'VIDEO'
      const imageUrl = isVideo ? (post.thumbnail_url || post.media_url) : post.media_url
      const thumbnailUrl = post.thumbnail_url || post.media_url
      const videoUrl = isVideo ? post.media_url : null

      const { error: insertError } = await supabase.from('gallery_images').insert({
        title,
        description: captionText || null,
        image_url: imageUrl,
        thumbnail_url: thumbnailUrl,
        category: 'Instagram',
        media_type: post.media_type,
        video_url: videoUrl,
        alt_text: (captionText || title).substring(0, 200),
        sort_order: i,
        featured: false,
      })

      if (insertError) {
        console.error('Error inserting Instagram post:', insertError)
        skipped++
      } else {
        synced++
      }
    }

    return NextResponse.json({
      success: true,
      postsFetched: posts.length,
      synced,
      skipped,
    })
  } catch (error) {
    console.error('Instagram sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error during Instagram sync' },
      { status: 500 }
    )
  }
}
