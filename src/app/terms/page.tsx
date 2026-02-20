import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MinimalHeader } from '@/components/layout/MinimalHeader';
import { MinimalFooter } from '@/components/layout/MinimalFooter';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { isMaintenanceMode } from '@/lib/maintenance';

async function getTermsContent() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'terms_content')
    .single();
  
  return data?.value as string || '';
}

export default async function TermsPage() {
  const [termsMarkdown, maintenance] = await Promise.all([
    getTermsContent(),
    isMaintenanceMode(),
  ]);
  const termsHtml = marked(termsMarkdown);

  return (
    <>
      {maintenance ? <MinimalHeader /> : <Header />}
      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" className="pt-32 pb-12">
          <div className="max-w-3xl mx-auto">
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
          </div>
        </Section>

        {/* Content */}
        <Section background="surface">
          <div
            className="max-w-3xl mx-auto prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground"
          >
            {termsHtml && <div dangerouslySetInnerHTML={{ __html: termsHtml }} />}

            {/* SMS/Text Messaging Terms (A2P Compliance) */}
            <h2 id="sms-terms">SMS/Text Messaging Terms</h2>

            <h3>Description of SMS Use Cases</h3>
            <p>
              STR - Strength Through Resilience offers an SMS/text messaging program to provide members and prospective members with:
            </p>
            <ul>
              <li><strong>Inquiry responses:</strong> Replies to questions submitted through our website forms</li>
              <li><strong>Appointment reminders:</strong> Notifications about upcoming classes, training sessions, and scheduled visits</li>
              <li><strong>Account updates:</strong> Membership status, payment confirmations, and account changes</li>
              <li><strong>Service notifications:</strong> Schedule changes, facility updates, and class cancellations</li>
              <li><strong>Promotional messages:</strong> Special offers, events, and gym updates (only with explicit consent)</li>
            </ul>

            <h3>Opt-Out Instructions</h3>
            <p>
              You may opt out of receiving text messages at any time by:
            </p>
            <ul>
              <li>Replying <strong>STOP</strong> to any text message from STR</li>
              <li>Emailing <a href="mailto:spencer@trainwithstr.com">spencer@trainwithstr.com</a> with the subject &quot;SMS Opt-Out&quot;</li>
              <li>Contacting us at 8 Eastman St, Suite 3, Cranford, NJ 07016</li>
            </ul>
            <p>
              After opting out, you will receive a one-time confirmation message. No further texts will be sent unless you re-subscribe.
            </p>

            <h3>Message &amp; Data Rate Disclosure</h3>
            <p>
              Standard message and data rates from your wireless carrier may apply to text messages you send to and receive from STR. Please contact your wireless carrier for details about your specific texting plan and any charges that may apply. STR is not responsible for any fees charged by your carrier.
            </p>

            <h3>Message Frequency</h3>
            <p>
              Message frequency varies depending on your interactions and account activity. You may receive up to 10 messages per month. Recurring messages may be sent for appointment reminders, account updates, and promotional content (if opted in).
            </p>

            <h3>Carrier Liability Disclaimer</h3>
            <p>
              Wireless carriers are not liable for delayed or undelivered messages. STR and its messaging service providers are not responsible for any delays, failures, or errors in the delivery of text messages, including messages sent through SMS, MMS, or other messaging formats. Delivery is subject to effective transmission from your wireless carrier. T-Mobile is not liable for delayed or undelivered messages.
            </p>

            <h3>Age Restriction</h3>
            <p>
              You must be at least 18 years of age to opt in to receive text messages from STR. If you are under 18, please do not provide your phone number or opt in to our messaging program without parental consent.
            </p>

            <h3>Customer Support</h3>
            <p>
              For help or questions about our text messaging program, you may:
            </p>
            <ul>
              <li>Reply <strong>HELP</strong> to any text message</li>
              <li>Email us at <a href="mailto:spencer@trainwithstr.com">spencer@trainwithstr.com</a></li>
              <li>Visit us at 8 Eastman St, Suite 3, Cranford, NJ 07016</li>
            </ul>

            <h3>Privacy</h3>
            <p>
              Your privacy is important to us. Please review our <a href="/privacy">Privacy Policy</a> for details on how we collect, use, and protect your personal information, including your phone number and SMS opt-in data.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section background="default">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-6">
              Have questions about our terms of service?
            </p>
            <Button asChild variant="secondary">
              <Link href={maintenance ? "mailto:spencer@trainwithstr.com" : "/contact"}>
                Contact Us
              </Link>
            </Button>
          </div>
        </Section>
      </main>
      {maintenance ? <MinimalFooter /> : <Footer />}
    </>
  );
}
