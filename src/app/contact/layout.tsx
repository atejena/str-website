import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with STR Fitness in Cranford, NJ. Book a free trial, ask about memberships, or visit us at 8 Eastman St, Suite 3.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
