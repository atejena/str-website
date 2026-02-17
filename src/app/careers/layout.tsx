import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the STR team — explore open positions at Cranford\'s premier strength and conditioning gym.',
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
