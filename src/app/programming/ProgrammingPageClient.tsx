'use client';

import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';

interface ProgrammingPageClientProps {
  whiteboardUrl: string;
}

export default function ProgrammingPageClient({ whiteboardUrl }: ProgrammingPageClientProps) {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* Hero */}
        <Section className="pt-32 pb-12 md:pt-40 md:pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-str-gold font-semibold tracking-widest uppercase text-sm mb-4">
              Daily Workouts
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              TODAY&apos;S{' '}
              <span className="text-str-gold">PROGRAMMING</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Check what&apos;s on the whiteboard
            </p>
          </motion.div>
        </Section>

        {/* Whiteboard */}
        <Section className="pb-20 md:pb-28">
          {whiteboardUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <iframe
                src={whiteboardUrl}
                title="TrainHeroic Whiteboard"
                className="w-full border-0"
                style={{ minHeight: '80vh' }}
                allow="fullscreen"
                loading="lazy"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center justify-center py-24 md:py-32 rounded-2xl border border-white/10 bg-white/5"
            >
              <Dumbbell className="w-16 h-16 text-str-gold mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-400 text-lg max-w-md text-center">
                Programming will be available soon. Check back or ask your coach!
              </p>
            </motion.div>
          )}
        </Section>
      </main>

      <Footer />
    </>
  );
}
