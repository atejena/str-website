import { createServerSupabaseClient } from '@/lib/supabase/server';
import GalleryPageClient from './GalleryPageClient';
import type { GalleryImage } from '@/types/database';

// Map snake_case DB columns to camelCase GalleryImage fields
function mapGalleryImage(row: Record<string, unknown>): GalleryImage {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string | undefined,
    imageUrl: (row.image_url as string) || '',
    thumbnailUrl: row.thumbnail_url as string | undefined,
    category: row.category as GalleryImage['category'],
    altText: (row.alt_text as string) || (row.title as string) || '',
    featured: row.featured as boolean,
    sortOrder: (row.sort_order as number) || 0,
    createdAt: row.created_at as string,
  };
}

export default async function GalleryPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rawImages } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order');

  const galleryImages: GalleryImage[] = (rawImages || []).map(mapGalleryImage);

  // Fetch Instagram URL
  const { data: instagramSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'social_instagram')
    .single();

  const instagramUrl = (instagramSetting?.value as string) || '';

  // Fetch Instagram embed code
  const { data: embedSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'instagram_feed_embed')
    .single();

  const instagramFeedEmbed = (embedSetting?.value as string) || '';

  // Fetch Instagram handle
  const { data: handleSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'instagram_handle')
    .single();

  const instagramHandle = (handleSetting?.value as string) || '';

  return (
    <GalleryPageClient
      galleryImages={galleryImages}
      instagramUrl={instagramUrl || undefined}
      instagramFeedEmbed={instagramFeedEmbed || undefined}
      instagramHandle={instagramHandle || undefined}
    />
  );
}
