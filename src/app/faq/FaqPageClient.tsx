'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import type { FAQ, FAQCategory } from '@/types/database';

const categories: FAQCategory[] = ['Membership', 'Classes', 'Facilities', 'Policies'];

interface FaqPageClientProps {
  faqs: FAQ[];
}

export default function FaqPageClient({ faqs }: FaqPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('Membership');

  const categoryFaqs = faqs
    .filter((f) => f.category === selectedCategory)
    .sort((a, b) => a.sortOrder - b.sortOrder);

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
              Help Center
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              FREQUENTLY ASKED <span className="text-str-gold">QUESTIONS</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Find answers to common questions about memberships, classes, facilities, and policies.
            </p>
          </motion.div>
        </Section>

        {/* Category Tabs */}
        <Section background="surface" className="py-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-6 py-3 rounded-[2px] font-display font-bold uppercase tracking-wider transition-all',
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
        </Section>

        {/* FAQ Accordion */}
        <Section background="default">
          <div className="max-w-3xl mx-auto">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-8">
                {selectedCategory} Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {categoryFaqs.length === 0 && (
                <p className="text-muted text-center py-8">
                  No FAQs found for this category.
                </p>
              )}
            </motion.div>
          </div>
        </Section>

        {/* Still Have Questions */}
        <Section background="surface">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MessageCircle className="w-12 h-12 text-str-gold mx-auto mb-4" />
              <h2 className="text-display-section font-display font-bold text-foreground mb-4">
                STILL HAVE <span className="text-str-gold">QUESTIONS?</span>
              </h2>
              <p className="text-muted mb-8">
                Can&apos;t find what you&apos;re looking for? Our team is here to help.
                Reach out and we&apos;ll get back to you within 24 hours.
              </p>
              <Button asChild variant="primary">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
