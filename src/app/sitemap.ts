import type { MetadataRoute } from 'next';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://trainwithstr.com';

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/classes`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${SITE_URL}/trainers`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.7 },
  { url: `${SITE_URL}/gallery`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/testimonials`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/faq`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/careers`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerSupabaseClient();

  const [{ data: posts }, { data: classes }, { data: trainers }] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true),
    supabase
      .from('gym_classes')
      .select('slug, updated_at')
      .eq('active', true),
    supabase
      .from('trainers')
      .select('slug, updated_at')
      .eq('active', true),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post: { slug: string; updated_at: string | null }) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const classRoutes: MetadataRoute.Sitemap = (classes ?? []).map((gymClass: { slug: string; updated_at: string | null }) => ({
    url: `${SITE_URL}/classes/${gymClass.slug}`,
    lastModified: gymClass.updated_at ? new Date(gymClass.updated_at) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const trainerRoutes: MetadataRoute.Sitemap = (trainers ?? []).map((trainer: { slug: string; updated_at: string | null }) => ({
    url: `${SITE_URL}/trainers/${trainer.slug}`,
    lastModified: trainer.updated_at ? new Date(trainer.updated_at) : undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...STATIC_ROUTES, ...blogRoutes, ...classRoutes, ...trainerRoutes];
}
