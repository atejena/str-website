import { Container } from '@/components/layout/Container';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GoogleMaps() {
  const supabase = await createServerSupabaseClient();

  // Try to fetch Google Maps embed URL from settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'integrations')
    .single();

  const embedUrl =
    settings?.value?.google_maps_embed_url ||
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.5!2d-74.306!3d40.656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM5JzIxLjYiTiA3NMKwMTgnMjEuNiJX!5e0!3m2!1sen!2sus!4v1';

  return (
    <section className="py-16 md:py-24 bg-iron-gray">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
            Visit Us
          </h2>
          <p className="text-concrete text-lg">
            Conveniently located in Cranford, New Jersey
          </p>
        </div>
      </Container>

      {/* Full-width map */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="STR Location on Google Maps"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
