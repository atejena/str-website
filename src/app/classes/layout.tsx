import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Explore STR\'s class offerings — semi-private training, group sessions, HIIT, strength & conditioning, and Hyrox prep in Cranford, NJ.',
  alternates: { canonical: 'https://trainwithstr.com/classes' },
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
