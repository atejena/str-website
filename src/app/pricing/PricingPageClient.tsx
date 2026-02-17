'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import type { MembershipPlan, FAQ } from '@/types';

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

interface PricingPageClientProps {
  plans: MembershipPlan[];
  faqs: FAQ[];
}

export default function PricingPageClient({ plans, faqs }: PricingPageClientProps) {
  const activePlans = plans;
  const pricingFaqs = faqs;

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
              Membership Plans
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              INVEST IN YOUR <span className="text-str-gold">STRENGTH</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Choose the plan that fits your goals. All memberships include access to our expert coaches and premium equipment.
            </p>
          </motion.div>
        </Section>

        {/* Pricing Cards */}
        <Section background="surface">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto"
          >
            {activePlans.map((plan) => (
              <motion.div key={plan.id} variants={itemVariants}>
                <Card
                  className={cn(
                    'relative h-full',
                    plan.highlighted && 'border-str-gold border-2 ring-4 ring-str-gold/20'
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="primary" size="lg">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h2>
                      <p className="text-muted text-sm mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-display font-bold text-str-gold">
                          ${plan.priceMonthly}
                        </span>
                        <span className="text-muted">/month</span>
                      </div>
                      {plan.setupFee != null && plan.setupFee > 0 && (
                        <p className="text-sm text-muted mt-2">
                          + ${plan.setupFee} one-time setup fee
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features
                        .filter((feature) => feature.included)
                        .map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-str-gold flex-shrink-0 mt-0.5" />
                            <span className="text-muted text-sm">{feature.name}</span>
                          </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      asChild
                      size="lg"
                      variant={plan.highlighted ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>

                    {/* Commitment */}
                    {plan.contractMonths && (
                      <p className="text-xs text-center text-muted mt-4">
                        {plan.contractMonths} month minimum commitment
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Feature Comparison */}
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Compare Plans
            </span>
            <h2 className="text-display-section font-display font-bold text-foreground">
              FEATURE <span className="text-str-gold">BREAKDOWN</span>
            </h2>
          </motion.div>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <p className="text-sm text-muted text-center mb-4 md:hidden">← Scroll to compare plans →</p>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 px-4 text-left font-display font-bold uppercase tracking-wider text-muted">
                    Feature
                  </th>
                  {activePlans.map((plan) => (
                    <th
                      key={plan.id}
                      className={cn(
                        'py-4 px-4 text-center font-display font-bold uppercase tracking-wider',
                        plan.highlighted ? 'text-str-gold' : 'text-muted'
                      )}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Group Classes', basic: true, premium: true, elite: true },
                  { name: 'Gym Access', basic: 'Limited Hours', premium: '24/7', elite: '24/7' },
                  { name: 'Personal Training', basic: false, premium: '2 sessions/mo', elite: '4 sessions/mo' },
                  { name: 'Nutrition Coaching', basic: false, premium: false, elite: true },
                  { name: 'InBody Scans', basic: false, premium: 'Monthly', elite: 'Weekly' },
                  { name: 'Guest Passes', basic: '1/mo', premium: '2/mo', elite: '4/mo' },
                  { name: 'Locker', basic: false, premium: false, elite: true },
                  { name: 'Priority Booking', basic: false, premium: true, elite: true },
                ].map((feature) => (
                  <tr key={feature.name} className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground">{feature.name}</td>
                    {['basic', 'premium', 'elite'].map((tier) => {
                      const value = feature[tier as keyof typeof feature];
                      return (
                        <td key={tier} className="py-4 px-4 text-center">
                          {value === true ? (
                            <Check className="w-5 h-5 text-str-gold mx-auto" />
                          ) : value === false ? (
                            <span className="text-muted">-</span>
                          ) : (
                            <span className="text-muted text-sm">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Pricing FAQ */}
        <Section background="surface">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Questions?
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground">
                MEMBERSHIP <span className="text-str-gold">FAQ</span>
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-4">
              {pricingFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <Button asChild variant="secondary">
                <Link href="/faq">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  View All FAQs
                </Link>
              </Button>
            </div>
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
                START YOUR FREE TRIAL
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Not ready to commit? Try us for free with no obligation.
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
