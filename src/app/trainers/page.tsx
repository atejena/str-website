'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { trainers } from '@/data/trainers';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function TrainersPage() {
  const activeTrainers = trainers.filter((t) => t.active);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920"
              alt="STR Fitness trainers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-str-black/70 via-str-black/60 to-str-black" />
          </div>

          <div className="container-custom relative z-10 text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Meet The Team
              </span>
              <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
                YOUR <span className="text-str-gold">COACHES</span>
              </h1>
              <p className="text-body-lead text-muted max-w-2xl mx-auto">
                Expert trainers dedicated to helping you achieve your fitness goals with personalized guidance and proven methods.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Trainers Grid */}
        <Section background="default">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2"
          >
            {activeTrainers.map((trainer) => (
              <motion.div key={trainer.id} variants={itemVariants}>
                <Link href={`/trainers/${trainer.slug}`} className="block group">
                  <Card hover className="overflow-hidden">
                    <div className="grid md:grid-cols-[280px_1fr]">
                      {/* Photo */}
                      <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                        <Image
                          src={trainer.photo}
                          alt={trainer.fullName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-str-black/60 via-transparent to-transparent md:hidden" />
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 flex flex-col justify-center">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-str-gold transition-colors">
                          {trainer.fullName}
                        </h2>
                        <p className="text-str-gold font-display uppercase tracking-wider text-sm mb-4">
                          {trainer.title}
                        </p>

                        <p className="text-muted text-sm mb-4 line-clamp-3">
                          {trainer.bio}
                        </p>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {trainer.specialties ? (
                            trainer.specialties.slice(0, 3).map((specialty) => (
                              <Badge key={specialty} variant="outline" size="sm">
                                {specialty}
                              </Badge>
                            ))
                          ) : trainer.specialty ? (
                            <Badge variant="outline" size="sm">
                              {trainer.specialty}
                            </Badge>
                          ) : null}
                        </div>

                        {/* Social & CTA */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                          {trainer.instagram && (
                            <a
                              href={`https://instagram.com/${trainer.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-muted hover:text-str-gold transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Instagram className="w-4 h-4" />
                              <span className="text-sm">@{trainer.instagram}</span>
                            </a>
                          )}
                          <span className="flex items-center gap-1 text-sm text-muted group-hover:text-str-gold transition-colors ml-auto">
                            View Profile
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Join Team CTA */}
        <Section background="surface">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Careers
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground mb-4">
                JOIN OUR <span className="text-str-gold">TEAM</span>
              </h2>
              <p className="text-muted mb-8">
                Are you a certified trainer passionate about helping others achieve their fitness goals?
                We're always looking for talented coaches to join the STR family.
              </p>
              <Button asChild variant="secondary">
                <Link href="/contact">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
                TRAIN WITH THE BEST
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Book a free consultation with one of our expert coaches and start your transformation today.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-str-black text-white border-str-black hover:bg-str-black/90"
              >
                <Link href="/contact">
                  Schedule Consultation
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
