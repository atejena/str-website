'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import type { GalleryImage, GalleryCategory } from '@/types/database';

const categories: ('All' | GalleryCategory)[] = ['All', 'Facility', 'Classes', 'Events', 'Transformations', 'Instagram'];

interface GalleryPageClientProps {
  galleryImages: GalleryImage[];
  instagramUrl?: string;
  instagramFeedEmbed?: string;
  instagramHandle?: string;
}

export default function GalleryPageClient({ galleryImages, instagramUrl, instagramFeedEmbed, instagramHandle }: GalleryPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const instagramImages = galleryImages.filter((img) => img.category === 'Instagram');

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" className="pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Photo Gallery
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              INSIDE <span className="text-str-gold">STR</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Take a look at our facility, classes, and community in action.
            </p>
          </motion.div>
        </Section>

        {/* Instagram Feed Section */}
        {(instagramFeedEmbed || instagramUrl) && (
          <Section background="surface" className="py-12 md:py-16">
            <div className="text-center mb-8">
              <h2 className="font-display text-h3 font-semibold uppercase text-foreground mb-3 tracking-wider flex items-center justify-center gap-3">
                <svg className="w-7 h-7 text-str-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Follow Us on Instagram
              </h2>
              <p className="text-muted text-lg">
                See the latest from STR on Instagram
              </p>
            </div>

            {instagramFeedEmbed ? (
              <div
                className="max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{ __html: instagramFeedEmbed }}
              />
            ) : instagramUrl ? (
              <div className="text-center">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-display font-bold uppercase tracking-wider text-sm rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Follow @{instagramUrl.replace(/https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '') || 'STR'}
                </a>
              </div>
            ) : null}
          </Section>
        )}

        {/* Instagram Featured Section */}
        {instagramImages.length > 0 && selectedCategory === 'All' && (
          <Section background="surface" className="py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <svg className="w-7 h-7 text-str-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  FOLLOW US ON <span className="text-str-gold">INSTAGRAM</span>
                </h2>
              </div>
              {instagramHandle && (
                <a
                  href={instagramUrl || `https://instagram.com/${instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-str-gold hover:text-str-gold/80 transition-colors font-display font-bold uppercase tracking-wider text-sm"
                >
                  @{instagramHandle} →
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {instagramImages.slice(0, 8).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-[2px] aspect-square">
                    <Image
                      src={image.imageUrl}
                      alt={image.altText}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-str-black/0 group-hover:bg-str-black/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-display font-bold uppercase tracking-wider text-sm">
                        View
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Category Filter */}
        <Section background="surface" className="py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-3 rounded-[2px] font-display font-bold uppercase tracking-wider transition-all',
                  'min-h-[44px] focus:outline-none focus:ring-2 focus:ring-focus-blue',
                  selectedCategory === category
                    ? 'bg-str-gold text-str-black'
                    : 'bg-background text-muted hover:text-str-gold border border-border'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </Section>

        {/* Gallery Grid */}
        <Section background="default">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    'relative cursor-pointer group',
                    image.featured && 'md:col-span-2 md:row-span-2'
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={cn(
                    'relative overflow-hidden rounded-[2px]',
                    image.featured ? 'aspect-square' : 'aspect-[4/3]'
                  )}>
                    <Image
                      src={image.imageUrl}
                      alt={image.altText}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-str-black/0 group-hover:bg-str-black/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-display font-bold uppercase tracking-wider text-sm">
                        View
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-str-black/95 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white hover:text-str-gold transition-colors p-2"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={selectedImage.imageUrl}
                    alt={selectedImage.altText}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {selectedImage.description && (
                  <p className="text-white text-center mt-4 font-display">
                    {selectedImage.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
