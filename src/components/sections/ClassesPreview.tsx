import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ClassesPreviewClient } from './ClassesPreviewClient';
import type { GymClass } from '@/types';

export async function ClassesPreview() {
  const supabase = await createServerSupabaseClient();

  const { data: classesData } = await supabase
    .from('classes')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .order('sort_order')
    .limit(4);

  // Map snake_case DB columns to camelCase types
  const featuredClasses: GymClass[] = (classesData || []).map((c: Record<string, unknown>) => ({
    id: c.id as string,
    name: (c.name as string) || '',
    slug: (c.slug as string) || '',
    description: (c.description as string) || '',
    shortDescription: (c.short_description as string) || '',
    instructorId: c.instructor_id as string | undefined,
    category: (c.category as GymClass['category']) || 'Strength',
    difficultyLevel: (c.difficulty_level as GymClass['difficultyLevel']) || 'All Levels',
    durationMinutes: (c.duration_minutes as number) || 60,
    maxCapacity: (c.max_capacity as number) || 12,
    caloriesBurned: c.calories_burned as number | undefined,
    equipmentNeeded: (c.equipment_needed as string[]) || [],
    benefits: (c.benefits as string[]) || [],
    featuredImage: (c.featured_image as string) || '',
    galleryImages: (c.gallery_images as string[]) || [],
    priceDropIn: c.price_drop_in as number | undefined,
    includedInMembership: (c.included_in_membership as boolean) || false,
    featured: (c.featured as boolean) || false,
    active: (c.active as boolean) || true,
    sortOrder: (c.sort_order as number) || 0,
    metaTitle: c.meta_title as string | undefined,
    metaDescription: c.meta_description as string | undefined,
    createdAt: (c.created_at as string) || '',
    updatedAt: (c.updated_at as string) || '',
  }));

  return <ClassesPreviewClient featuredClasses={featuredClasses} />;
}
