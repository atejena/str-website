import { createServerSupabaseClient } from '@/lib/supabase/server';
import { TestimonialsCarouselClient } from './TestimonialsCarouselClient';
import type { Testimonial } from '@/types';

export async function TestimonialsCarousel() {
  const supabase = await createServerSupabaseClient();

  const { data: testimonialData } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approved', true)
    .eq('featured', true)
    .order('created_at', { ascending: false });

  // Map snake_case DB columns to camelCase types
  const testimonials: Testimonial[] = (testimonialData || []).map((t: Record<string, unknown>) => ({
    id: t.id as string,
    memberName: (t.member_name as string) || '',
    memberSince: t.member_since as string | undefined,
    photo: t.photo as string | undefined,
    rating: (t.rating as Testimonial['rating']) || 5,
    quote: (t.quote as string) || '',
    transformationType: t.transformation_type as Testimonial['transformationType'] | undefined,
    beforeImage: t.before_image as string | undefined,
    afterImage: t.after_image as string | undefined,
    timeframe: t.timeframe as string | undefined,
    resultsSummary: t.results_summary as string | undefined,
    videoUrl: t.video_url as string | undefined,
    featured: (t.featured as boolean) || false,
    approved: (t.approved as boolean) || true,
    source: (t.source as Testimonial['source']) || 'website',
    createdAt: (t.created_at as string) || '',
  }));

  return <TestimonialsCarouselClient testimonials={testimonials} />;
}
