'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CTABannerProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  variant?: 'gold' | 'dark';
}

export function CTABanner({
  headline = 'READY TO GET STRONGER?',
  subheadline = 'Join STR today and start your transformation. First session is on us.',
  ctaText = 'Start Your Free Trial',
  ctaLink = '/contact',
  variant = 'gold',
}: CTABannerProps) {
  const isGold = variant === 'gold';

  return (
    <section
      className={cn(
        'relative py-16 md:py-20 overflow-hidden',
        isGold ? 'bg-str-gold' : 'bg-str-black'
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke={isGold ? '#15151d' : '#fcb040'}
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2
            className={cn(
              'text-display-section font-display font-bold mb-4',
              isGold ? 'text-str-black' : 'text-foreground'
            )}
          >
            {headline}
          </h2>
          <p
            className={cn(
              'text-body-lead mb-8',
              isGold ? 'text-str-black/80' : 'text-muted'
            )}
          >
            {subheadline}
          </p>

          <Button
            asChild
            size="lg"
            variant={isGold ? 'secondary' : 'primary'}
            className={cn(
              isGold && 'bg-str-black text-white border-str-black hover:bg-str-black/90'
            )}
          >
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          {/* Trust Badge */}
          <p
            className={cn(
              'mt-6 text-sm',
              isGold ? 'text-str-black/60' : 'text-muted'
            )}
          >
            No commitment required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
