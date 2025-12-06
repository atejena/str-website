'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      id="mobile-menu"
      className={cn(
        'fixed inset-0 z-40 lg:hidden',
        'transition-all duration-300',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0'
      )}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-background/95 backdrop-blur-md',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <nav
        className={cn(
          'relative flex h-full flex-col items-center justify-center',
          'transition-transform duration-300',
          isOpen ? 'translate-y-0' : '-translate-y-8'
        )}
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col items-center gap-6">
          {links.map((link, index) => (
            <li
              key={link.href}
              className={cn(
                'transition-all duration-300',
                isOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(
                  'block font-display text-2xl font-bold uppercase tracking-wider',
                  'transition-colors duration-200',
                  'hover:text-str-gold',
                  'min-h-[44px] flex items-center', // Accessibility: 44px touch target
                  currentPath === link.href
                    ? 'text-str-gold'
                    : 'text-foreground'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div
          className={cn(
            'mt-10 transition-all duration-300',
            isOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: isOpen ? `${links.length * 50}ms` : '0ms',
          }}
        >
          <Button asChild size="lg" className="w-64">
            <Link href="/contact" onClick={onClose}>
              Join Now
            </Link>
          </Button>
        </div>

        {/* Contact Info */}
        <div
          className={cn(
            'mt-10 text-center transition-all duration-300',
            isOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          )}
          style={{
            transitionDelay: isOpen ? `${(links.length + 1) * 50}ms` : '0ms',
          }}
        >
          <p className="text-sm text-muted">8 Eastman St, Suite 3</p>
          <p className="text-sm text-muted">Cranford, NJ 07016</p>
        </div>
      </nav>
    </div>
  );
}
