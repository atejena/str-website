'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { getFeaturedTestimonials } from '@/data/testimonials';

export function TestimonialsCarousel() {
  const testimonials = getFeaturedTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <Section background="surface" id="testimonials">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
          Success Stories
        </span>
        <h2 className="text-display-section font-display font-bold text-foreground">
          REAL <span className="text-str-gold">RESULTS</span>
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Quote Icon */}
        <Quote className="absolute -top-4 left-0 w-16 h-16 text-str-gold/20 -z-10" />

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="text-center p-8 md:p-12">
              <CardContent className="space-y-6">
                {/* Rating */}
                <div className="flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < currentTestimonial.rating
                          ? 'text-str-gold fill-str-gold'
                          : 'text-muted'
                      )}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-display text-foreground leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center gap-4">
                  {currentTestimonial.photo && (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-str-gold">
                      <Image
                        src={currentTestimonial.photo}
                        alt={currentTestimonial.memberName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-display font-bold text-foreground">
                      {currentTestimonial.memberName}
                    </div>
                    {currentTestimonial.transformationType && (
                      <div className="text-sm text-str-gold">
                        {currentTestimonial.transformationType}
                        {currentTestimonial.timeframe && ` - ${currentTestimonial.timeframe}`}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Summary */}
                {currentTestimonial.resultsSummary && (
                  <div className="inline-block px-4 py-2 bg-str-gold/10 rounded-[2px] text-sm text-str-gold">
                    {currentTestimonial.resultsSummary}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className={cn(
              'flex items-center justify-center',
              'w-12 h-12 rounded-full',
              'border border-border bg-surface',
              'text-muted transition-all duration-200',
              'hover:border-str-gold hover:text-str-gold',
              'focus:outline-none focus:ring-2 focus:ring-focus-blue'
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-200',
                  index === currentIndex
                    ? 'bg-str-gold w-8'
                    : 'bg-border hover:bg-muted'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className={cn(
              'flex items-center justify-center',
              'w-12 h-12 rounded-full',
              'border border-border bg-surface',
              'text-muted transition-all duration-200',
              'hover:border-str-gold hover:text-str-gold',
              'focus:outline-none focus:ring-2 focus:ring-focus-blue'
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Section>
  );
}
