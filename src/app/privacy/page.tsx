'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" className="pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              Legal
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              PRIVACY <span className="text-str-gold">POLICY</span>
            </h1>
            <p className="text-muted">
              Last updated: January 1, 2025
            </p>
          </motion.div>
        </Section>

        {/* Content */}
        <Section background="surface">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground"
          >
            <h2>1. Information We Collect</h2>
            <p>
              At STR - Strength Through Resilience, we collect information you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account or membership</li>
              <li>Sign up for classes or personal training sessions</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our website or in person</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include your name, email address, phone number, billing address, payment information, and fitness goals or health information you choose to share.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process memberships and payments</li>
              <li>Schedule and manage class bookings</li>
              <li>Communicate with you about your account, classes, and gym updates</li>
              <li>Personalize your fitness experience and training programs</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our services and develop new programs</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations (payment processors, scheduling software)</li>
              <li>Professional advisors (lawyers, accountants) as needed</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2>6. Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.
            </p>

            <h2>7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children under 16. Members aged 16-17 require parental consent.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or our data practices, please contact us at:
            </p>
            <ul>
              <li>Email: spencer@trainwithstr.com</li>
              <li>Address: 8 Eastman St, Suite 3, Cranford, NJ 07016</li>
            </ul>
          </motion.div>
        </Section>

        {/* CTA */}
        <Section background="default">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-6">
              Have questions about our privacy practices?
            </p>
            <Button asChild variant="secondary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
