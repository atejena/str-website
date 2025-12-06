'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

export default function TermsPage() {
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
              TERMS OF <span className="text-str-gold">SERVICE</span>
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the services provided by STR - Strength Through Resilience (&quot;STR,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including our gym facilities, classes, personal training, and website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Membership Agreement</h2>
            <h3>2.1 Eligibility</h3>
            <p>
              To become a member, you must be at least 16 years of age. Members aged 16-17 require a parent or guardian to sign the membership agreement and liability waiver on their behalf.
            </p>
            <h3>2.2 Membership Types</h3>
            <p>
              We offer various membership tiers (Basic, Premium, Elite) with different benefits and pricing. Details are available on our pricing page and at our facility.
            </p>
            <h3>2.3 Payment</h3>
            <p>
              Monthly membership fees are due on the same date each month. Annual memberships are paid in full at sign-up. Failed payments may result in suspension of membership privileges until the account is current.
            </p>

            <h2>3. Cancellation and Refunds</h2>
            <h3>3.1 Monthly Memberships</h3>
            <p>
              Monthly memberships may be cancelled with 30 days written notice. No refunds are provided for the remaining days of the current billing period.
            </p>
            <h3>3.2 Annual Memberships</h3>
            <p>
              Annual memberships cancelled within the first 6 months may be eligible for a prorated refund minus a cancellation fee. Cancellations after 6 months are not eligible for refunds.
            </p>
            <h3>3.3 Membership Freeze</h3>
            <p>
              Elite members may freeze their membership for up to 14 days per year. Additional freeze requests are handled on a case-by-case basis.
            </p>

            <h2>4. Facility Rules and Conduct</h2>
            <p>Members agree to:</p>
            <ul>
              <li>Treat all staff, coaches, and fellow members with respect</li>
              <li>Use equipment properly and return weights to their designated areas</li>
              <li>Wipe down equipment after use</li>
              <li>Wear appropriate athletic attire and closed-toe shoes</li>
              <li>Not engage in personal training of others without authorization</li>
              <li>Follow all posted rules and staff instructions</li>
              <li>Not use the facility while under the influence of alcohol or drugs</li>
            </ul>
            <p>
              Violation of these rules may result in membership suspension or termination without refund.
            </p>

            <h2>5. Class Booking and Cancellations</h2>
            <ul>
              <li>Classes should be booked at least 24 hours in advance when possible</li>
              <li>Cancellations must be made at least 2 hours before class start time</li>
              <li>Late cancellations or no-shows may result in fees</li>
              <li>We reserve the right to cancel classes due to low enrollment or emergencies</li>
            </ul>

            <h2>6. Assumption of Risk and Liability Waiver</h2>
            <p>
              <strong>IMPORTANT:</strong> Physical exercise involves inherent risks including, but not limited to, injury, disability, and death. By using our facilities and services, you acknowledge these risks and assume full responsibility for any injuries or damages that may occur.
            </p>
            <p>
              You agree to release STR, its owners, employees, coaches, and agents from any and all claims, damages, or liabilities arising from your use of our facilities and services.
            </p>
            <p>
              You confirm that you are physically able to participate in exercise activities and have consulted with a physician if you have any medical conditions.
            </p>

            <h2>7. Personal Property</h2>
            <p>
              STR is not responsible for lost, stolen, or damaged personal property. We recommend using our day-use lockers and not leaving valuables unattended.
            </p>

            <h2>8. Photography and Media</h2>
            <p>
              STR may take photographs or videos within the facility for promotional purposes. By entering our premises, you consent to being photographed or recorded. Please inform staff if you do not wish to appear in promotional materials.
            </p>

            <h2>9. Guest Policy</h2>
            <ul>
              <li>Guests must be at least 16 years old</li>
              <li>Guests must sign a waiver before using the facility</li>
              <li>Members are responsible for their guests&apos; conduct</li>
              <li>Guest passes are included based on membership tier</li>
            </ul>

            <h2>10. Intellectual Property</h2>
            <p>
              All content on our website, including logos, images, text, and training materials, is the property of STR and may not be used without written permission.
            </p>

            <h2>11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms. We will notify members of significant changes via email or posted notice.
            </p>

            <h2>12. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of New Jersey. Any disputes shall be resolved in the courts of Union County, New Jersey.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              For questions about these terms, please contact us:
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
              Have questions about our terms of service?
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
