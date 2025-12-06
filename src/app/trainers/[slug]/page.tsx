'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Award, Quote, ArrowRight } from 'lucide-react';
import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { trainers, getTrainerBySlug } from '@/data/trainers';
import { classes } from '@/data/classes';

interface TrainerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function TrainerDetailPage({ params }: TrainerDetailPageProps) {
  const { slug } = use(params);
  const trainer = getTrainerBySlug(slug);

  if (!trainer) {
    notFound();
  }

  // Get classes this trainer teaches (placeholder logic)
  const trainerClasses = classes.filter((c) => c.active).slice(0, 3);

  // Get other trainers
  const otherTrainers = trainers.filter((t) => t.id !== trainer.id && t.active).slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={trainer.photo}
              alt={trainer.fullName}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-str-black via-str-black/50 to-transparent" />
          </div>

          <div className="container-custom relative z-10 py-12">
            {/* Back Link */}
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 text-muted hover:text-str-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-display text-sm uppercase tracking-wider">All Coaches</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-display-hero font-display font-bold text-foreground mb-2">
                {trainer.fullName.toUpperCase()}
              </h1>
              <p className="text-str-gold font-display text-xl uppercase tracking-wider mb-4">
                {trainer.title}
              </p>

              {trainer.instagram && (
                <a
                  href={`https://instagram.com/${trainer.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted hover:text-str-gold transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@{trainer.instagram}</span>
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <Section background="default">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Bio & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Quote */}
              {trainer.personalQuote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <Quote className="absolute -top-2 -left-2 w-12 h-12 text-str-gold/20" />
                  <blockquote className="text-2xl font-display text-foreground italic pl-8">
                    "{trainer.personalQuote}"
                  </blockquote>
                </motion.div>
              )}

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  About {trainer.fullName.split(' ')[0]}
                </h2>
                <p className="text-muted leading-relaxed">{trainer.bio}</p>
              </motion.div>

              {/* Specialties */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialties.map((specialty) => (
                    <Badge key={specialty} variant="primary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Certifications
                </h2>
                <ul className="space-y-3">
                  {trainer.certifications.map((cert) => (
                    <li key={cert} className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-str-gold flex-shrink-0" />
                      <span className="text-muted">{cert}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Experience */}
              {trainer.yearsExperience && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-4 p-6 bg-surface rounded-[2px] border border-border"
                >
                  <div className="text-4xl font-display font-bold text-str-gold">
                    {trainer.yearsExperience}+
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Years of Experience</div>
                    <div className="text-sm text-muted">Helping clients achieve their goals</div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Classes Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">
                    Classes Taught
                  </h3>
                  <ul className="space-y-3">
                    {trainerClasses.map((gymClass) => (
                      <li key={gymClass.id}>
                        <Link
                          href={`/classes/${gymClass.slug}`}
                          className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:text-str-gold transition-colors"
                        >
                          <span className="text-foreground">{gymClass.name}</span>
                          <ArrowRight className="w-4 h-4 text-muted" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Book Session Card */}
              <Card className="bg-str-gold border-str-gold">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display font-bold text-str-black text-xl mb-2">
                    Train with {trainer.fullName.split(' ')[0]}
                  </h3>
                  <p className="text-str-black/80 text-sm mb-4">
                    Book a personal training session
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-str-black text-white hover:bg-str-black/90"
                  >
                    <Link href="/contact">Book Session</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* Other Trainers */}
        {otherTrainers.length > 0 && (
          <Section background="surface">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Meet More Coaches
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground">
                OTHER <span className="text-str-gold">TRAINERS</span>
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {otherTrainers.map((otherTrainer) => (
                <Link
                  key={otherTrainer.id}
                  href={`/trainers/${otherTrainer.slug}`}
                  className="block group"
                >
                  <Card hover className="overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={otherTrainer.photo}
                        alt={otherTrainer.fullName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-str-gold transition-colors">
                          {otherTrainer.fullName}
                        </h3>
                        <p className="text-sm text-str-gold">{otherTrainer.title}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
