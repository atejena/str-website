'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>('');
  const { addToast } = useToast();
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.push('/login');
    router.refresh();
  };

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
          {/* User info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-str-gold/20 flex items-center justify-center">
              <User className="w-4 h-4 text-str-gold" />
            </div>
            <span className="hidden sm:inline font-display text-sm text-foreground">
              {userEmail || 'Admin'}
            </span>
          </div>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
