'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Flame } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { GymClass } from '@/types';

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

interface ClassesPreviewClientProps {
  featuredClasses: GymClass[];
}

export function ClassesPreviewClient({ featuredClasses }: ClassesPreviewClientProps) {
  return (
    <Section id="classes-preview">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
      >
        <div>
          <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
            Our Programs
          </span>
          <h2 className="text-display-section font-display font-bold text-foreground">
            TRAINING THAT <span className="text-str-gold">WORKS</span>
          </h2>
        </div>
        <Button asChild variant="secondary" className="mt-6 md:mt-0">
          <Link href="/classes">
            View All Classes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      {/* Classes Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {featuredClasses.map((gymClass) => (
          <motion.div key={gymClass.id} variants={itemVariants}>
            <Link href={`/classes/${gymClass.slug}`} className="block group">
              <Card hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={gymClass.featuredImage}
                    alt={gymClass.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-str-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="sm">
                      {gymClass.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-str-gold transition-colors">
                    {gymClass.name}
                  </h3>
                  <p className="text-sm text-muted mb-4 line-clamp-2">
                    {gymClass.shortDescription}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{gymClass.durationMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>Max {gymClass.maxCapacity}</span>
                    </div>
                    {gymClass.caloriesBurned && (
                      <div className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-str-gold" />
                        <span>{gymClass.caloriesBurned} cal</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
