import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { GymClass, ClassScheduleItem, Trainer } from '@/types';
import ClassDetailClient from './ClassDetailClient';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbTrainer(row: any): Trainer {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    title: row.title,
    specialty: row.specialty,
    bio: row.bio,
    shortBio: row.short_bio ?? '',
    certifications: row.certifications ?? [],
    experienceYears: row.experience_years ?? 0,
    photo: row.photo,
    email: row.email,
    instagram: row.instagram,
    quote: row.quote,
    featured: row.featured ?? false,
    active: row.active ?? true,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

interface ClassDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  // Fetch the specific class
  const { data: classRow } = await supabase
    .from('gym_classes')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!classRow) {
    notFound();
  }

  const gymClass = mapDbClass(classRow);

  // Fetch schedule for this class
  const { data: scheduleRows } = await supabase
    .from('class_schedule')
    .select('*')
    .eq('class_id', gymClass.id)
    .eq('cancelled', false);

  const classSchedule: ClassScheduleItem[] = (scheduleRows ?? []).map(mapDbSchedule);

  // Fetch instructor if instructor_id is set
  let classInstructor: Trainer | null = null;
  if (gymClass.instructorId) {
    const { data: trainerRow } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', gymClass.instructorId)
      .single();

    if (trainerRow) {
      classInstructor = mapDbTrainer(trainerRow);
    }
  }

  // If no specific instructor, fetch the first active trainer as fallback
  if (!classInstructor) {
    const { data: fallbackTrainer } = await supabase
      .from('trainers')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .limit(1)
      .single();

    if (fallbackTrainer) {
      classInstructor = mapDbTrainer(fallbackTrainer);
    }
  }

  // Fetch related classes (same category, excluding current)
  const { data: relatedRows } = await supabase
    .from('gym_classes')
    .select('*')
    .eq('category', gymClass.category)
    .eq('active', true)
    .neq('id', gymClass.id)
    .order('sort_order')
    .limit(3);

  const relatedClasses: GymClass[] = (relatedRows ?? []).map(mapDbClass);

  return (
    <ClassDetailClient
      gymClass={gymClass}
      classSchedule={classSchedule}
      classInstructor={classInstructor}
      relatedClasses={relatedClasses}
    />
  );
}
