import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Trainers',
  description: 'Meet the certified coaches at STR Fitness — experienced trainers specializing in strength, conditioning, and functional fitness.',
};

export default function TrainersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
