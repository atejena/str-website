'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';

const quickLinks = [
  { href: '/classes', label: 'Classes' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

const classLinks = [
  { href: '/classes/strength-conditioning', label: 'Strength & Conditioning' },
  { href: '/classes/personal-training', label: 'Personal Training' },
  { href: '/classes/hiit', label: 'HIIT Classes' },
  { href: '/classes/functional-training', label: 'Functional Training' },
];

const supportLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
  { href: '/testimonials', label: 'Testimonials' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-str-black" role="contentinfo">
      {/* Main Footer */}
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block" aria-label="STR - Home">
              <Image
                src="/images/str-logo.webp"
                alt="STR Logo"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
            <p className="font-display text-xl font-bold uppercase tracking-wider text-str-gold">
              Strength Through Resilience
            </p>
            <p className="text-muted">
              Premium strength and conditioning gym in Cranford, NJ. Expert coaching,
              state-of-the-art equipment, and a community built on resilience.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-center',
                  'rounded-[2px] p-3',
                  'min-h-[44px] min-w-[44px]',
                  'bg-surface text-muted',
                  'transition-colors duration-200',
                  'hover:bg-str-gold hover:text-str-black'
                )}
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-center',
                  'rounded-[2px] p-3',
                  'min-h-[44px] min-w-[44px]',
                  'bg-surface text-muted',
                  'transition-colors duration-200',
                  'hover:bg-str-gold hover:text-str-black'
                )}
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-flex items-center gap-2',
                      'text-muted transition-colors duration-200',
                      'hover:text-str-gold'
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Classes */}
          <div>
            <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wider text-foreground">
              Our Classes
            </h3>
            <ul className="space-y-3">
              {classLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'inline-flex items-center gap-2',
                      'text-muted transition-colors duration-200',
                      'hover:text-str-gold'
                    )}
                  >
                    <ArrowRight className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 font-display text-lg font-bold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=8+Eastman+St,+Suite+3,+Cranford,+NJ+07016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-start gap-3',
                    'text-muted transition-colors duration-200',
                    'hover:text-str-gold'
                  )}
                >
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                  <span>
                    8 Eastman St, Suite 3
                    <br />
                    Cranford, NJ 07016
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:spencer@trainwithstr.com"
                  className={cn(
                    'flex items-center gap-3',
                    'text-muted transition-colors duration-200',
                    'hover:text-str-gold'
                  )}
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <span>spencer@trainwithstr.com</span>
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-foreground">
                Hours
              </h4>
              <p className="text-sm text-muted">Mon - Fri: 5:00 AM - 10:00 PM</p>
              <p className="text-sm text-muted">Sat - Sun: 7:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <p className="text-sm text-muted">
              &copy; {currentYear} STR - Strength Through Resilience. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted transition-colors hover:text-str-gold"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted transition-colors hover:text-str-gold"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
