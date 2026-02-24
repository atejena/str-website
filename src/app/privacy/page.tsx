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
import { getGymInfo } from '@/lib/site-settings';

async function getPrivacyContent() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'privacy_content')
    .single();
  
  return data?.value as string || '';
}

async function getPrivacyLastUpdated() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'privacy_last_updated')
    .single();
  
  return data?.value as string || '';
}

export default async function PrivacyPage() {
  const [privacyMarkdown, privacyLastUpdated, maintenance, gymInfo] = await Promise.all([
    getPrivacyContent(),
    getPrivacyLastUpdated(),
    isMaintenanceMode(),
    getGymInfo(),
  ]);
  const contactEmail = gymInfo.email;
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
            {privacyLastUpdated && (
              <p className="text-muted">
                Last updated: {privacyLastUpdated}
              </p>
            )}
          </div>
        </Section>

        {/* Content — fully DB-driven */}
        <Section background="surface">
          <div
            className="max-w-3xl mx-auto prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground"
          >
            {privacyHtml ? (
              <div dangerouslySetInnerHTML={{ __html: privacyHtml }} />
            ) : (
              <p className="text-muted italic">Privacy policy content has not been added yet. Please update via the admin settings.</p>
            )}
          </div>
        </Section>

        {/* CTA */}
        <Section background="default">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-6">
              Have questions about our privacy practices?
            </p>
            <Button asChild variant="secondary">
              <Link href={maintenance ? `mailto:${contactEmail}` : "/contact"}>
                Contact Us
              </Link>
            </Button>
          </div>
        </Section>
      </main>
      {maintenance ? <MinimalFooter contactEmail={contactEmail} /> : <Footer contactEmail={contactEmail} />}
    </>
  );
}
