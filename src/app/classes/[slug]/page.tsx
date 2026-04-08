import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { GymClass, ClassScheduleItem, Trainer } from '@/types';
import ClassDetailClient from './ClassDetailClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://trainwithstr.com';

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

export async function generateMetadata({ params }: ClassDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: row } = await supabase
    .from('gym_classes')
    .select('name, short_description, meta_title, meta_description, featured_image')
    .eq('slug', slug)
    .single();

  if (!row) return {};

  const title = (row.meta_title as string) || (row.name as string);
  const description = (row.meta_description as string) || (row.short_description as string);
  const image = (row.featured_image as string) || '/images/og-image.jpg';
  const canonicalUrl = `${SITE_URL}/classes/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      images: [{ url: image, width: 1200, height: 630, alt: row.name as string }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: gymClass.name,
    description: gymClass.description || gymClass.shortDescription,
    image: gymClass.featuredImage || `${SITE_URL}/images/og-image.jpg`,
    url: `${SITE_URL}/classes/${gymClass.slug}`,
    provider: {
      '@type': 'HealthClub',
      name: 'STR - Strength Through Resilience',
      url: 'https://trainwithstr.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClassDetailClient
        gymClass={gymClass}
        classSchedule={classSchedule}
        classInstructor={classInstructor}
        relatedClasses={relatedClasses}
      />
    </>
  );
}
