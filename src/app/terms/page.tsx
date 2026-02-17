import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { createServerSupabaseClient } from '@/lib/supabase/server';

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
  const termsMarkdown = await getTermsContent();
  const termsHtml = marked(termsMarkdown);

  return (
    <>
      <Header />
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
            dangerouslySetInnerHTML={{ __html: termsHtml }}
          />
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
