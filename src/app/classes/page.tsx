import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { GymClass, ClassScheduleItem } from '@/types';
import ClassesPageClient from './ClassesPageClient';

// Helper to map snake_case DB rows to camelCase GymClass type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbClass(row: any): GymClass {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    shortDescription: row.short_description ?? '',
    instructorId: row.instructor_id,
    category: row.category,
    difficultyLevel: row.difficulty_level,
    durationMinutes: row.duration_minutes,
    maxCapacity: row.max_capacity,
    caloriesBurned: row.calories_burned,
    equipmentNeeded: row.equipment_needed ?? [],
    benefits: row.benefits ?? [],
    featuredImage: row.featured_image ?? '',
    galleryImages: row.gallery_images ?? [],
    priceDropIn: row.price_drop_in,
    includedInMembership: row.included_in_membership ?? false,
    featured: row.featured ?? false,
    active: row.active ?? true,
    sortOrder: row.sort_order ?? 0,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbSchedule(row: any): ClassScheduleItem {
  return {
    id: row.id,
    classId: row.class_id,
    instructorId: row.instructor_id,
    dayOfWeek: row.day_of_week,
    startTime: row.start_time,
    endTime: row.end_time,
    room: row.room,
    recurring: row.recurring ?? true,
    effectiveFrom: row.effective_from,
    effectiveUntil: row.effective_until,
    cancelled: row.cancelled ?? false,
    cancellationReason: row.cancellation_reason,
  };
}

export default async function ClassesPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch active classes
  const { data: classRows } = await supabase
    .from('gym_classes')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  // Fetch class schedule
  const { data: scheduleRows } = await supabase
    .from('class_schedule')
    .select('*')
    .eq('cancelled', false);

  const allClasses: GymClass[] = (classRows ?? []).map(mapDbClass);
  const classSchedule: ClassScheduleItem[] = (scheduleRows ?? []).map(mapDbSchedule);

  return <ClassesPageClient allClasses={allClasses} classSchedule={classSchedule} />;
}
