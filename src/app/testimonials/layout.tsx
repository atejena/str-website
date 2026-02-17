import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what STR Fitness members say about their experience — real reviews from our Cranford, NJ gym community.',
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
