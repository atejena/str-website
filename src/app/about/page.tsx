'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Target, Heart, Users, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { trainers } from '@/data/trainers';
import { siteSettings } from '@/data/settings';

const values = [
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'Every program is designed with clear, measurable outcomes. We track progress and adjust to ensure you hit your goals.',
  },
  {
    icon: Heart,
    title: 'Community First',
    description: 'We foster an inclusive, supportive environment where everyone—from beginners to athletes—feels welcome.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We invest in the best equipment, continuous coach education, and cutting-edge training methods.',
  },
  {
    icon: Users,
    title: 'Personal Attention',
    description: 'Small class sizes and personalized coaching mean you never get lost in the crowd.',
  },
];

const achievements = [
  'NSCA Certified Trainers',
  'CrossFit Level 2 Coaches',
  'Precision Nutrition Certified',
  'USA Weightlifting Certified',
  'CPR/AED Certified',
  'First Aid Certified',
];

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

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920"
              alt="STR Fitness gym interior"
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
                Our Story
              </span>
              <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
                STRENGTH THROUGH <span className="text-str-gold">RESILIENCE</span>
              </h1>
              <p className="text-body-lead text-muted max-w-2xl mx-auto">
                Founded on the belief that true fitness is built on consistency, community, and expert guidance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Origin Story */}
        <Section background="default">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                How It Started
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground mb-6">
                BUILT FROM <span className="text-str-gold">PASSION</span>
              </h2>
              {/* PLACEHOLDER: Replace with Spencer's actual story */}
              <div className="space-y-4 text-muted">
                <p>
                  STR was founded with a simple mission: to create a fitness facility that prioritizes results over hype.
                  After years of training in overcrowded gyms with cookie-cutter programs, founder Spencer set out to build
                  something different.
                </p>
                <p>
                  What started as personal training sessions in a small space has grown into Cranford's premier strength
                  and conditioning facility. We've kept what made us special—personalized attention, expert coaching,
                  and a tight-knit community—while expanding our capabilities.
                </p>
                <p>
                  Today, STR serves over 100 members who share our belief that fitness should be challenging, effective,
                  and sustainable. Whether you're picking up your first barbell or training for competition, you'll find
                  a home here.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800"
                  alt="STR Fitness training session"
                  fill
                  className="object-cover"
                />
                {/* Gold accent corner */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-4 right-4 w-full h-full border-t-4 border-r-4 border-str-gold" />
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Mission & Values */}
        <Section background="surface">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-display-section font-display font-bold text-foreground mb-4">
              OUR <span className="text-str-gold">VALUES</span>
            </h2>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              These principles guide everything we do, from how we design our programs to how we treat every member.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div key={value.title} variants={itemVariants}>
                <Card hover className="h-full text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-str-gold/10">
                      <value.icon className="w-8 h-8 text-str-gold" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Facility Photos */}
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Our Space
            </span>
            <h2 className="text-display-section font-display font-bold text-foreground">
              THE <span className="text-str-gold">FACILITY</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* PLACEHOLDER: Replace with actual facility photos */}
            {[
              'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
              'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600',
              'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600',
              'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600',
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/3]'} rounded-[2px] overflow-hidden`}>
                  <Image
                    src={src}
                    alt={`STR Fitness facility ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Team Introduction */}
        <Section background="surface">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Meet The Team
            </span>
            <h2 className="text-display-section font-display font-bold text-foreground mb-4">
              YOUR <span className="text-str-gold">COACHES</span>
            </h2>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Our certified coaches bring years of experience and genuine passion for helping you succeed.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {trainers.slice(0, 4).map((trainer) => (
              <motion.div key={trainer.id} variants={itemVariants}>
                <Link href={`/trainers/${trainer.slug}`} className="block group">
                  <Card hover className="overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={trainer.photo}
                        alt={trainer.fullName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-str-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-str-gold transition-colors">
                          {trainer.fullName}
                        </h3>
                        <p className="text-sm text-str-gold">{trainer.title}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Button asChild variant="secondary">
              <Link href="/trainers">
                Meet All Coaches
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Section>

        {/* Certifications */}
        <Section background="default">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Credentials
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground mb-6">
                CERTIFIED <span className="text-str-gold">EXCELLENCE</span>
              </h2>
              <p className="text-muted mb-8">
                Our team holds certifications from the most respected organizations in the fitness industry.
                We invest in ongoing education to bring you the most effective, evidence-based training methods.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-str-gold flex-shrink-0" />
                    <span className="text-sm text-muted">{achievement}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-video rounded-[2px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
                  alt="Personal training session at STR"
                  fill
                  className="object-cover"
                />
              </div>
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
                READY TO JOIN THE FAMILY?
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Come visit us for a free tour and consultation. See our facility, meet our coaches, and discover
                how STR can help you achieve your fitness goals.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-str-black text-white border-str-black hover:bg-str-black/90"
              >
                <Link href="/contact">
                  Schedule a Visit
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
