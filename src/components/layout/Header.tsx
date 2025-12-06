'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/classes', label: 'Classes' },
  { href: '/trainers', label: 'Trainers' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-card'
            : 'bg-transparent'
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-between py-4"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2"
              aria-label="STR - Home"
            >
              <Image
                src="/images/str-logo.webp"
                alt="STR Logo"
                width={48}
                height={48}
                className="h-10 w-auto md:h-12"
                priority
              />
              <span className="sr-only">STR - Strength Through Resilience</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 font-display text-sm font-medium uppercase tracking-wider',
                    'transition-colors duration-200',
                    'hover:text-str-gold',
                    pathname === link.href
                      ? 'text-str-gold'
                      : 'text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <Button asChild>
                <Link href="/contact">Join Now</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'flex items-center justify-center',
                  'rounded-[2px] p-3',
                  'min-h-[44px] min-w-[44px]',
                  'text-foreground transition-colors',
                  'hover:bg-surface',
                  'focus:outline-none focus:ring-2 focus:ring-focus-blue'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navLinks}
        currentPath={pathname}
      />
    </>
  );
}
