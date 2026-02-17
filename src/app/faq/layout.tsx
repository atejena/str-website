import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about STR Fitness — memberships, classes, personal training, and getting started.',
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
