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

async function getPrivacyContent() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'privacy_content')
    .single();
  
  return data?.value as string || '';
}

export default async function PrivacyPage() {
  const [privacyMarkdown, maintenance] = await Promise.all([
    getPrivacyContent(),
    isMaintenanceMode(),
  ]);
  const privacyHtml = marked(privacyMarkdown);

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
              PRIVACY <span className="text-str-gold">POLICY</span>
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
            {privacyHtml && <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />}

            {/* SMS/Text Messaging Privacy Section (A2P Compliance) */}
            <h2 id="sms-opt-in">SMS/Text Messaging Opt-In &amp; Data</h2>
            <p>
              When you provide your phone number through our website forms (Get Started, Contact Us) and check the SMS consent box, you opt in to receive text messages from STR - Strength Through Resilience. We collect your phone number solely for the following purposes:
            </p>
            <ul>
              <li>Responding to your inquiries and service requests</li>
              <li>Sending appointment reminders and scheduling confirmations</li>
              <li>Providing account updates and membership notifications</li>
              <li>Delivering promotional offers and gym updates (only if you opt in)</li>
            </ul>
            <p>
              <strong>Opt-in method:</strong> By checking the SMS consent checkbox on our website forms, you expressly agree to receive text messages. This consent is not a condition of purchasing any goods or services.
            </p>
            <p>
              <strong>Message frequency:</strong> Message frequency varies based on your interactions and account activity. You may receive up to 10 messages per month.
            </p>
            <p>
              <strong>Opt-out:</strong> You can opt out at any time by replying STOP to any text message. You will receive a confirmation message and no further texts will be sent. You may also contact us at <a href="mailto:spencer@trainwithstr.com">spencer@trainwithstr.com</a> to opt out.
            </p>
            <p>
              <strong>Help:</strong> Reply HELP to any text message for assistance, or contact us at <a href="mailto:spencer@trainwithstr.com">spencer@trainwithstr.com</a>.
            </p>
            <p>
              <strong>Message and data rates:</strong> Standard message and data rates from your wireless carrier may apply to messages you send and receive.
            </p>

            <h2 id="mobile-info-sharing">Mobile Information Sharing</h2>
            <p>
              We do not sell, rent, lease, or share your mobile phone number or any personal information collected via SMS/text messaging with third parties or affiliates for marketing or promotional purposes. Your phone number and opt-in data are used solely by STR - Strength Through Resilience for the purposes described in this Privacy Policy.
            </p>
            <p>
              We may share your information only with service providers who assist in delivering text messages (e.g., our messaging platform), and they are contractually obligated to protect your data and use it only for the purpose of providing their services to us.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section background="default">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-6">
              Have questions about our privacy practices?
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
