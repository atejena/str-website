import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programming',
  description:
    'Check today\'s workout programming at STR Fitness. View the daily whiteboard for strength, conditioning, and class workouts powered by TrainHeroic.',
};

export default function ProgrammingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
