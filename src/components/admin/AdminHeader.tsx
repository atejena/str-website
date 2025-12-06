'use client';

import { Menu, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-16 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-muted hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search placeholder */}
        <div className="hidden md:block flex-1 max-w-md">
          {/* PLACEHOLDER: Add search functionality later */}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            className="p-2 text-muted hover:text-foreground transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
          </button>

          {/* User menu */}
          <button
            className="flex items-center gap-2 p-2 text-muted hover:text-foreground transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-str-gold/20 flex items-center justify-center">
              <User className="w-4 h-4 text-str-gold" />
            </div>
            <span className="hidden sm:inline font-display text-sm">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
