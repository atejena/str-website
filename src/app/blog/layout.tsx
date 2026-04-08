import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Fitness tips, training advice, and gym news from STR Fitness in Cranford, NJ.',
  alternates: { canonical: 'https://trainwithstr.com/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
