import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about STR Fitness — our mission, values, and the team behind Cranford\'s premier strength and conditioning gym.',
  alternates: { canonical: 'https://trainwithstr.com/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
