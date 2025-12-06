'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Users, Target, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

const values = [
  {
    icon: Dumbbell,
    title: 'Premium Equipment',
    description:
      'Train with top-tier barbells, dumbbells, and specialty equipment. Everything you need to build real strength.',
  },
  {
    icon: Users,
    title: 'Expert Coaching',
    description:
      'Our certified coaches provide personalized attention in every session. Proper form, progressive programming, proven results.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    description:
      'Evidence-based training methods designed to help you hit your goals, whether that is fat loss, muscle gain, or athletic performance.',
  },
  {
    icon: Trophy,
    title: 'Community',
    description:
      'Join a supportive community of like-minded individuals who push each other to be better every single day.',
  },
];

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
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function ValueProposition() {
  return (
    <Section background="surface" id="why-str">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
          Why Choose STR
        </span>
        <h2 className="text-display-section font-display font-bold text-foreground mb-4">
          BUILT FOR <span className="text-str-gold">RESULTS</span>
        </h2>
        <p className="text-body-lead text-muted max-w-2xl mx-auto">
          We have created an environment where you can focus on what matters: getting stronger,
          moving better, and building lasting fitness habits.
        </p>
      </motion.div>

      {/* Value Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {values.map((value, index) => (
          <motion.div key={value.title} variants={itemVariants}>
            <Card
              hover
              className={cn(
                'h-full text-center',
                index === 0 && 'lg:border-t-4 lg:border-t-str-gold'
              )}
            >
              <CardContent className="pt-8 pb-8">
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-str-gold/10">
                  <value.icon className="w-8 h-8 text-str-gold" />
                </div>

                {/* Content */}
                <CardTitle className="text-xl mb-3">{value.title}</CardTitle>
                <CardDescription className="text-muted">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        {[
          { value: '7+', label: 'Class Types' },
          { value: '100+', label: 'Active Members' },
          { value: '10+', label: 'Years Experience' },
          { value: '5.0', label: 'Google Rating' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl md:text-5xl font-display font-bold text-str-gold mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-muted uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
