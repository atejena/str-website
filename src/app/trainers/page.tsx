import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { Trainer } from '@/types';
import TrainersPageClient from './TrainersPageClient';

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

export default async function TrainersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: trainerRows } = await supabase
    .from('trainers')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const activeTrainers: Trainer[] = (trainerRows ?? []).map(mapDbTrainer);

  return <TrainersPageClient activeTrainers={activeTrainers} />;
}
