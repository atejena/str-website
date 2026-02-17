import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Trainer, GymClass } from '@/types';
import TrainerDetailClient from './TrainerDetailClient';

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

interface TrainerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TrainerDetailPage({ params }: TrainerDetailPageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  // Fetch the specific trainer
  const { data: trainerRow } = await supabase
    .from('trainers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!trainerRow) {
    notFound();
  }

  const trainer = mapDbTrainer(trainerRow);

  // Fetch classes this trainer teaches (by instructor_id)
  const { data: trainerClassRows } = await supabase
    .from('gym_classes')
    .select('*')
    .eq('instructor_id', trainer.id)
    .eq('active', true)
    .order('sort_order')
    .limit(5);

  let trainerClasses: GymClass[] = (trainerClassRows ?? []).map(mapDbClass);

  // If no classes assigned via instructor_id, fetch first few active classes as placeholder
  if (trainerClasses.length === 0) {
    const { data: fallbackClassRows } = await supabase
      .from('gym_classes')
      .select('*')
      .eq('active', true)
      .order('sort_order')
      .limit(3);

    trainerClasses = (fallbackClassRows ?? []).map(mapDbClass);
  }

  // Fetch other trainers
  const { data: otherTrainerRows } = await supabase
    .from('trainers')
    .select('*')
    .neq('id', trainer.id)
    .eq('active', true)
    .order('sort_order')
    .limit(3);

  const otherTrainers: Trainer[] = (otherTrainerRows ?? []).map(mapDbTrainer);

  return (
    <TrainerDetailClient
      trainer={trainer}
      trainerClasses={trainerClasses}
      otherTrainers={otherTrainers}
    />
  );
}
