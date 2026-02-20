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
            dangerouslySetInnerHTML={{ __html: privacyHtml }}
          />
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
