'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, Flame, CheckCircle, ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import { use } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getClassBySlug, getActiveClasses, getScheduleForClass } from '@/data/classes';
import { trainers } from '@/data/trainers';

interface ClassDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = use(params);
  const gymClass = getClassBySlug(slug);

  if (!gymClass) {
    notFound();
  }

  const classSchedule = getScheduleForClass(gymClass.id);
  const allClasses = getActiveClasses();
  const relatedClasses = allClasses
    .filter((c) => c.category === gymClass.category && c.id !== gymClass.id)
    .slice(0, 3);

  // Get a random trainer for this class (placeholder until real instructor assignments)
  const classInstructor = trainers[0];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={gymClass.featuredImage}
              alt={gymClass.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-str-black via-str-black/60 to-str-black/30" />
          </div>

          <div className="container-custom relative z-10 py-12">
            {/* Back Link */}
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-muted hover:text-str-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-display text-sm uppercase tracking-wider">All Classes</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary">{gymClass.category}</Badge>
                <Badge variant="secondary">{gymClass.difficultyLevel}</Badge>
              </div>

              <h1 className="text-display-hero font-display font-bold text-foreground mb-4">
                {gymClass.name.toUpperCase()}
              </h1>

              <p className="text-body-lead text-muted max-w-2xl">
                {gymClass.shortDescription}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <Section background="surface">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-str-gold/10 mb-3">
                <Clock className="w-6 h-6 text-str-gold" />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {gymClass.durationMinutes} min
              </div>
              <div className="text-sm text-muted">Duration</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-str-gold/10 mb-3">
                <Users className="w-6 h-6 text-str-gold" />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {gymClass.maxCapacity}
              </div>
              <div className="text-sm text-muted">Max Capacity</div>
            </div>
            {gymClass.caloriesBurned && (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-str-gold/10 mb-3">
                  <Flame className="w-6 h-6 text-str-gold" />
                </div>
                <div className="text-2xl font-display font-bold text-foreground">
                  {gymClass.caloriesBurned}
                </div>
                <div className="text-sm text-muted">Calories Burned</div>
              </div>
            )}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-str-gold/10 mb-3">
                <DollarSign className="w-6 h-6 text-str-gold" />
              </div>
              <div className="text-2xl font-display font-bold text-foreground">
                {gymClass.includedInMembership ? 'Included' : `$${gymClass.priceDropIn}`}
              </div>
              <div className="text-sm text-muted">
                {gymClass.includedInMembership ? 'In Membership' : 'Drop-in Rate'}
              </div>
            </div>
          </div>
        </Section>

        {/* Main Content */}
        <Section background="default">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description & Benefits */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  About This Class
                </h2>
                <p className="text-muted leading-relaxed">{gymClass.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Benefits
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {gymClass.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-str-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Equipment Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {gymClass.equipmentNeeded.map((equipment) => (
                    <Badge key={equipment} variant="outline">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Schedule Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-str-gold" />
                    <h3 className="font-display font-bold text-foreground">
                      Class Schedule
                    </h3>
                  </div>
                  {classSchedule.length > 0 ? (
                    <ul className="space-y-3">
                      {classSchedule.map((schedule) => (
                        <li
                          key={schedule.id}
                          className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        >
                          <span className="text-foreground font-medium">
                            {schedule.dayOfWeek}
                          </span>
                          <span className="text-str-gold font-mono text-sm">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted text-sm">
                      Contact us for scheduling options.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Instructor Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-foreground mb-4">
                    Class Instructor
                  </h3>
                  <Link
                    href={`/trainers/${classInstructor.slug}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-str-gold">
                      <Image
                        src={classInstructor.photo}
                        alt={classInstructor.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-display font-bold text-foreground group-hover:text-str-gold transition-colors">
                        {classInstructor.fullName}
                      </div>
                      <div className="text-sm text-str-gold">{classInstructor.title}</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-str-gold border-str-gold">
                <CardContent className="p-6 text-center">
                  <h3 className="font-display font-bold text-str-black text-xl mb-2">
                    Ready to Try?
                  </h3>
                  <p className="text-str-black/80 text-sm mb-4">
                    Book your free trial class today
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-str-black text-white hover:bg-str-black/90"
                  >
                    <Link href="/contact">Book Free Trial</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>

        {/* Related Classes */}
        {relatedClasses.length > 0 && (
          <Section background="surface">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                You Might Also Like
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground">
                RELATED <span className="text-str-gold">CLASSES</span>
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedClasses.map((relatedClass) => (
                <Link
                  key={relatedClass.id}
                  href={`/classes/${relatedClass.slug}`}
                  className="block group"
                >
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedClass.featuredImage}
                        alt={relatedClass.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-str-black/20 to-transparent" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-str-gold transition-colors">
                        {relatedClass.name}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2">
                        {relatedClass.shortDescription}
                      </p>
                    </CardContent>
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
