import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function GalleryPreview() {
  const supabase = await createServerSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: galleryItems } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order')
    .limit(8) as { data: any[] | null };

  if (!galleryItems || galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-str-black">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
            Gallery
          </h2>
          <p className="text-concrete text-lg">
            A glimpse into the STR experience
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square overflow-hidden rounded-sm bg-iron-gray group cursor-pointer"
            >
              <Image
                src={item.thumbnail_url || item.image_url}
                alt={item.alt_text || item.title || 'STR Gallery Image'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Video play icon overlay */}
              {item.media_type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-str-black/40 group-hover:bg-str-black/60 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-str-gold flex items-center justify-center">
                    <Play className="w-8 h-8 text-str-black fill-str-black ml-1" />
                  </div>
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-medium truncate">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
