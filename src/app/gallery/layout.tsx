import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'See STR Fitness in action — photos and videos of our gym, classes, community events, and member transformations.',
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
