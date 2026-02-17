'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Dumbbell,
  Users,
  FileText,
  MessageSquare,
  Image,
  HelpCircle,
  Mail,
  Settings,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/classes', label: 'Classes', icon: Dumbbell },
  { href: '/admin/trainers', label: 'Trainers', icon: Users },
  { href: '/admin/pricing', label: 'Pricing', icon: FileText },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/careers', label: 'Careers', icon: Users },
  { href: '/admin/leads', label: 'Leads', icon: Mail },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border',
        'transform transition-transform duration-200 ease-in-out',
        'lg:relative lg:translate-x-0 lg:min-h-screen',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-xl font-display font-bold text-str-gold">STR</span>
          <span className="text-sm font-display text-muted">Admin</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-muted hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-[2px] transition-colors',
                'min-h-[44px]',
                isActive
                  ? 'bg-str-gold/10 text-str-gold'
                  : 'text-muted hover:text-foreground hover:bg-background'
              )}
              onClick={onClose}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-display text-sm uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Back to Site */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-[2px] border border-border text-muted hover:text-str-gold hover:border-str-gold transition-colors"
        >
          <span className="font-display text-sm uppercase tracking-wider">
            View Site
          </span>
        </Link>
      </div>
    </aside>
  );
}
