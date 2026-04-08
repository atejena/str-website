import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'STR Fitness terms of service — membership agreements, liability, and gym usage policies.',
  alternates: { canonical: 'https://trainwithstr.com/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
