import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  HeroHome,
  FindUs,
  GetStartedForm,
  OurOfferings,
  MiniBanner,
  GoogleMaps,
  TestimonialsScrolling,
  GalleryPreview,
} from '@/components/sections';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  // Fetch approved testimonials for scrolling carousel
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('id, member_name, rating, quote, source')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  // Fetch social links for footer
  const { data: settings } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'social_links')
    .single();

  const socialLinks = settings?.value || {};

  // Fetch jotform settings
  const { data: jotformSettings } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'jotform')
    .single();

  const jotform = jotformSettings?.value as {
    enabled?: boolean;
    form_id?: string;
    embed_url?: string;
  } | null;

  // Fetch Google Place ID for review links
  const { data: googlePlaceIdSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'google_place_id')
    .single();

  const googlePlaceId = (googlePlaceIdSetting?.value as string) || '';

  // Fetch Instagram URL for gallery preview
  const { data: instagramSetting } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'social_instagram')
    .single();

  const instagramUrl = (instagramSetting?.value as string) || '';

  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1. Hero - Logo + Slogan */}
        <HeroHome />

        {/* 2. Find Us - Contact Information */}
        <FindUs />

        {/* 3. Get Started - Signup Form */}
        <GetStartedForm jotform={jotform} />

        {/* 4. Our Offerings - Semi-Private / Group Training */}
        <OurOfferings />

        {/* 5. Mini Banner - Contact Info + Location */}
        <MiniBanner />

        {/* 6. Google Maps Embed */}
        <GoogleMaps />

        {/* 7. Scrolling Reviews */}
        {testimonials && testimonials.length > 0 && (
          <TestimonialsScrolling testimonials={testimonials} googlePlaceId={googlePlaceId || undefined} />
        )}

        {/* 8. Photos & Videos Gallery Preview */}
        <GalleryPreview instagramUrl={instagramUrl || undefined} />
      </main>

      {/* 9. Footer */}
      <Footer socialLinks={socialLinks} />
    </>
  );
}
