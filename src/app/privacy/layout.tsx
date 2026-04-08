import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'STR Fitness privacy policy — how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://trainwithstr.com/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
