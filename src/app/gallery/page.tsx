'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { galleryImages, getGalleryByCategory } from '@/data/gallery';
import type { GalleryCategory } from '@/types/database';

const categories: ('All' | GalleryCategory)[] = ['All', 'Facility', 'Classes', 'Events', 'Transformations'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : getGalleryByCategory(selectedCategory as GalleryCategory);

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
