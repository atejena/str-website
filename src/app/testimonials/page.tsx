import { createServerSupabaseClient } from '@/lib/supabase/server';
import TestimonialsPageClient from './TestimonialsPageClient';
import type { Testimonial } from '@/types/database';

// Map snake_case DB columns to camelCase Testimonial fields
function mapTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    id: row.id as string,
    memberName: (row.member_name as string) || '',
    memberSince: row.member_since as string | undefined,
    photo: row.photo as string | undefined,
    rating: (row.rating as Testimonial['rating']) || 5,
    quote: row.quote as string,
    transformationType: row.transformation_type as Testimonial['transformationType'],
    beforeImage: row.before_image as string | undefined,
    afterImage: row.after_image as string | undefined,
    timeframe: row.timeframe as string | undefined,
    resultsSummary: row.results_summary as string | undefined,
    videoUrl: row.video_url as string | undefined,
    featured: row.featured as boolean,
    approved: row.approved as boolean,
    source: (row.source as Testimonial['source']) || 'website',
    createdAt: row.created_at as string,
  };
}

export default async function TestimonialsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rawTestimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  const allTestimonials: Testimonial[] = (rawTestimonials || []).map(mapTestimonial);

  const featuredTestimonials = allTestimonials.filter((t) => t.featured);
  const otherTestimonials = allTestimonials.filter((t) => !t.featured);

  return (
    <TestimonialsPageClient
      featuredTestimonials={featuredTestimonials}
      otherTestimonials={otherTestimonials}
    />
  );
}
