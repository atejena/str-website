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

  return <GalleryPageClient galleryImages={galleryImages} />;
}
