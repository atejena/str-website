'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { usePageVisibility } from '@/lib/contexts/page-visibility';

interface FooterProps {
  socialLinks?: {
    instagram?: string;
    facebook?: string;
  };
  contactEmail?: string;
}

export function Footer({ socialLinks = {}, contactEmail = 'info@trainwithstr.com' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const pageVisibility = usePageVisibility();

  const allNavigationLinks = [
    { href: '/about', label: 'About', key: 'about' },
    { href: '/classes', label: 'Classes', key: 'classes' },
    { href: '/pricing', label: 'Pricing', key: 'pricing' },
    { href: '/blog', label: 'Blog', key: 'blog' },
    { href: '/contact', label: 'Contact', key: 'contact' },
  ];

  // Filter navigation links based on page visibility
  const navigationLinks = allNavigationLinks.filter(
    link => pageVisibility[link.key as keyof typeof pageVisibility] !== false
  );

  return (
    <footer className="bg-str-black border-t border-concrete/10" role="contentinfo">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="STR - Home">
              <Image
                src="/images/str-logo.webp"
                alt="STR Logo"
                width={80}
                height={80}
                className="h-16 w-auto"
              />
            </Link>
            <p className="font-display text-lg font-bold uppercase tracking-wider text-str-gold mb-3">
              Strength Through Resilience
            </p>
            <p className="text-concrete text-sm leading-relaxed">
              Premium strength and conditioning facility in Cranford, NJ.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-concrete hover:text-str-gold transition-colors text-sm inline-block py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=8+Eastman+St,+Suite+3,+Cranford,+NJ+07016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-concrete hover:text-str-gold transition-colors text-sm group"
                >
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    8 Eastman St, Suite 3<br />
                    Cranford, NJ 07016
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-3 text-concrete hover:text-str-gold transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>{contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center',
                    'rounded-sm p-3',
                    'min-h-[44px] min-w-[44px]',
                    'bg-iron-gray text-concrete',
                    'transition-colors duration-200',
                    'hover:bg-str-gold hover:text-str-black'
                  )}
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center',
                    'rounded-sm p-3',
                    'min-h-[44px] min-w-[44px]',
                    'bg-iron-gray text-concrete',
                    'transition-colors duration-200',
                    'hover:bg-str-gold hover:text-str-black'
                  )}
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {!socialLinks.instagram && !socialLinks.facebook && (
                <p className="text-concrete text-sm">Coming soon</p>
              )}
            </div>
            <p className="text-concrete text-xs mt-4">Cranford, NJ</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-concrete/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-concrete text-sm">
              © {currentYear} STR - Strength Through Resilience. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="text-concrete hover:text-str-gold transition-colors py-2 inline-block"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-concrete hover:text-str-gold transition-colors py-2 inline-block"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
