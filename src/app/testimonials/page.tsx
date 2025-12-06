'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { testimonials, getFeaturedTestimonials } from '@/data/testimonials';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function TestimonialsPage() {
  const featuredTestimonials = getFeaturedTestimonials();
  const allTestimonials = testimonials.filter((t) => t.approved);

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
              Success Stories
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              REAL <span className="text-str-gold">RESULTS</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Don't just take our word for it. Hear from members who have transformed their lives at STR.
            </p>
          </motion.div>
        </Section>

        {/* Featured Testimonials */}
        <Section background="surface">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2"
          >
            {featuredTestimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={itemVariants}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-str-gold/30 mb-4" />

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'w-5 h-5',
                            i < testimonial.rating
                              ? 'text-str-gold fill-str-gold'
                              : 'text-muted'
                          )}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl font-display text-foreground leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Results Summary */}
                    {testimonial.resultsSummary && (
                      <div className="inline-block px-4 py-2 bg-str-gold/10 rounded-[2px] text-sm text-str-gold mb-6">
                        {testimonial.resultsSummary}
                      </div>
                    )}

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {testimonial.photo && (
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-str-gold">
                          <Image
                            src={testimonial.photo}
                            alt={testimonial.memberName}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-display font-bold text-foreground">
                          {testimonial.memberName}
                        </div>
                        {testimonial.transformationType && (
                          <div className="text-sm text-str-gold">
                            {testimonial.transformationType}
                            {testimonial.timeframe && ` - ${testimonial.timeframe}`}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* All Testimonials Grid */}
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-section font-display font-bold text-foreground">
              MORE <span className="text-str-gold">REVIEWS</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {allTestimonials
              .filter((t) => !t.featured)
              .map((testimonial) => (
                <motion.div key={testimonial.id} variants={itemVariants}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'w-4 h-4',
                              i < testimonial.rating
                                ? 'text-str-gold fill-str-gold'
                                : 'text-muted'
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-muted leading-relaxed mb-4 line-clamp-4">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        {testimonial.photo && (
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-str-gold">
                            <Image
                              src={testimonial.photo}
                              alt={testimonial.memberName}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-display font-bold text-foreground text-sm">
                            {testimonial.memberName}
                          </div>
                          {testimonial.transformationType && (
                            <div className="text-xs text-muted">
                              {testimonial.transformationType}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </Section>

        {/* Google Review CTA */}
        <Section background="surface">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-str-gold fill-str-gold" />
                ))}
              </div>
              <h2 className="text-display-section font-display font-bold text-foreground mb-4">
                5.0 ON <span className="text-str-gold">GOOGLE</span>
              </h2>
              <p className="text-muted mb-8">
                We're proud of our 5-star rating on Google. If you're a member,
                we'd love to hear your feedback!
              </p>
              <Button asChild variant="secondary">
                <a
                  href="https://g.page/r/YOUR-GOOGLE-REVIEW-LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leave a Review
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* CTA */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-str-gold">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-display-section font-display font-bold text-str-black mb-4">
                WRITE YOUR SUCCESS STORY
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Join the hundreds of members who have transformed their lives at STR.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-str-black text-white border-str-black hover:bg-str-black/90"
              >
                <Link href="/contact">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
