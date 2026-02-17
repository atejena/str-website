import { createServerSupabaseClient } from '@/lib/supabase/server';
import AboutPageClient from './AboutPageClient';
import type { Trainer } from '@/types';

export default async function AboutPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch active trainers
  const { data: trainersData } = await supabase
    .from('trainers')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  // Map snake_case DB columns to camelCase types
  const trainers: Trainer[] = (trainersData || []).map((t: Record<string, unknown>) => ({
    id: t.id as string,
    name: (t.name as string) || '',
    slug: (t.slug as string) || '',
    title: (t.title as string) || '',
    specialty: (t.specialty as string) || '',
    bio: (t.bio as string) || '',
    shortBio: (t.short_bio as string) || '',
    certifications: (t.certifications as string[]) || [],
    experienceYears: (t.experience_years as number) || 0,
    photo: (t.photo as string) || '',
    email: t.email as string | undefined,
    instagram: t.instagram as string | undefined,
    quote: t.quote as string | undefined,
    featured: (t.featured as boolean) || false,
    active: (t.active as boolean) || true,
    sortOrder: (t.sort_order as number) || 0,
    createdAt: (t.created_at as string) || '',
    updatedAt: (t.updated_at as string) || '',
  }));

  return <AboutPageClient trainers={trainers} />;
}
