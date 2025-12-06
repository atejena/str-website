'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Users, Flame, ArrowRight, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getActiveClasses, classSchedule } from '@/data/classes';

const categories = ['All', 'Strength', 'Personal Training', 'Cardio & HIIT', 'Functional Fitness'];
const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

export default function ClassesPage() {
  const allClasses = getActiveClasses();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');

  const filteredClasses = allClasses.filter((gymClass) => {
    const categoryMatch = selectedCategory === 'All' || gymClass.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All Levels' || gymClass.difficultyLevel === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Get class by ID for schedule display
  const getClassById = (id: string) => allClasses.find((c) => c.id === id);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920"
              alt="STR Fitness classes"
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
                Our Programs
              </span>
              <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
                CLASSES & <span className="text-str-gold">TRAINING</span>
              </h1>
              <p className="text-body-lead text-muted max-w-2xl mx-auto">
                From strength training to HIIT, find the perfect class to match your fitness goals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <Section background="surface">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 text-muted">
              <Filter className="w-5 h-5" />
              <span className="font-display font-bold uppercase tracking-wider">Filter Classes</span>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-4 py-2 rounded-[2px] text-sm font-display font-bold uppercase tracking-wider transition-all',
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
            </div>
          </div>
        </Section>

        {/* Classes Grid */}
        <Section background="default">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${selectedDifficulty}`}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredClasses.map((gymClass) => (
              <motion.div key={gymClass.id} variants={itemVariants}>
                <Link href={`/classes/${gymClass.slug}`} className="block group">
                  <Card hover className="overflow-hidden h-full">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={gymClass.featuredImage}
                        alt={gymClass.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-str-black/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="primary" size="sm">
                          {gymClass.category}
                        </Badge>
                        <Badge variant="secondary" size="sm">
                          {gymClass.difficultyLevel}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6">
                      <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-str-gold transition-colors">
                        {gymClass.name}
                      </h3>
                      <p className="text-sm text-muted mb-4 line-clamp-2">
                        {gymClass.shortDescription}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{gymClass.durationMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>Max {gymClass.maxCapacity}</span>
                        </div>
                        {gymClass.caloriesBurned && (
                          <div className="flex items-center gap-1">
                            <Flame className="h-4 w-4 text-str-gold" />
                            <span>{gymClass.caloriesBurned} cal</span>
                          </div>
                        )}
                      </div>

                      {/* Price/Included */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        {gymClass.includedInMembership ? (
                          <span className="text-sm text-str-gold font-display font-bold">
                            Included in Membership
                          </span>
                        ) : (
                          <span className="text-sm text-muted">
                            Starting at <span className="text-str-gold font-bold">${gymClass.priceDropIn}</span>/session
                          </span>
                        )}
                        <ArrowRight className="h-5 w-5 text-muted group-hover:text-str-gold group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted text-lg">No classes found matching your filters.</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDifficulty('All Levels');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Section>

        {/* Weekly Schedule */}
        <Section background="surface" id="schedule">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Class Schedule
            </span>
            <h2 className="text-display-section font-display font-bold text-foreground">
              WEEKLY <span className="text-str-gold">TIMETABLE</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-4 text-left font-display font-bold uppercase tracking-wider text-muted">
                    Day
                  </th>
                  <th className="py-4 px-4 text-left font-display font-bold uppercase tracking-wider text-muted">
                    Time
                  </th>
                  <th className="py-4 px-4 text-left font-display font-bold uppercase tracking-wider text-muted">
                    Class
                  </th>
                  <th className="py-4 px-4 text-left font-display font-bold uppercase tracking-wider text-muted">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((day) => {
                  const daySchedule = classSchedule
                    .filter((s) => s.dayOfWeek === day && !s.cancelled)
                    .sort((a, b) => a.startTime.localeCompare(b.startTime));

                  if (daySchedule.length === 0) return null;

                  return daySchedule.map((schedule, index) => {
                    const gymClass = getClassById(schedule.classId);
                    if (!gymClass) return null;

                    return (
                      <tr
                        key={schedule.id}
                        className="border-b border-border/50 hover:bg-surface/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          {index === 0 && (
                            <span className="font-display font-bold text-foreground">{day}</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-str-gold font-mono">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/classes/${gymClass.slug}`}
                            className="text-foreground hover:text-str-gold transition-colors"
                          >
                            {gymClass.name}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-muted">
                          {gymClass.durationMinutes} min
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
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
                TRY A CLASS FOR FREE
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Not sure which class is right for you? Book a free trial session and experience STR firsthand.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-str-black text-white border-str-black hover:bg-str-black/90"
              >
                <Link href="/contact">
                  Book Free Trial
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
