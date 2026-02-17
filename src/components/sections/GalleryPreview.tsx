import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface GalleryPreviewProps {
  instagramUrl?: string;
}

export async function GalleryPreview({ instagramUrl }: GalleryPreviewProps) {
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

        {/* View All Buttons */}
        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-str-gold text-str-gold font-display font-bold uppercase tracking-wider text-sm rounded-[2px] hover:bg-str-gold/10 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow Us on Instagram
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
