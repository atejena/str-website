import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membership Plans & Pricing',
  description: 'View STR Fitness membership plans — Basic, Premium, and Elite options with group classes, personal training, and 24/7 access.',
  alternates: { canonical: 'https://trainwithstr.com/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
