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

async function getTermsContent() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'terms_content')
    .single();
  
  return data?.value as string || '';
}

async function getTermsLastUpdated() {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'terms_last_updated')
    .single();
  
  return data?.value as string || '';
}

export default async function TermsPage() {
  const [termsMarkdown, termsLastUpdated, maintenance, gymInfo] = await Promise.all([
    getTermsContent(),
    getTermsLastUpdated(),
    isMaintenanceMode(),
    getGymInfo(),
  ]);
  const contactEmail = gymInfo.email;
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
            {termsLastUpdated && (
              <p className="text-muted">
                Last updated: {termsLastUpdated}
              </p>
            )}
          </div>
        </Section>

        {/* Content — fully DB-driven */}
        <Section background="surface">
          <div
            className="max-w-3xl mx-auto prose prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted prose-li:text-muted prose-strong:text-foreground"
          >
            {termsHtml ? (
              <div dangerouslySetInnerHTML={{ __html: termsHtml }} />
            ) : (
              <p className="text-muted italic">Terms of service content has not been added yet. Please update via the admin settings.</p>
            )}
          </div>
        </Section>

        {/* CTA */}
        <Section background="default">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-muted mb-6">
              Have questions about our terms of service?
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
