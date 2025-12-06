'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'dark' | 'light' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.setAttribute('data-theme', newTheme);
    }
  };

  const cycleTheme = () => {
    const themes: Theme[] = ['dark', 'light', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={cn(
          'flex items-center justify-center',
          'rounded-[2px] p-3',
          'min-h-[44px] min-w-[44px]',
          'text-muted transition-colors',
          'hover:bg-surface hover:text-foreground',
          'focus:outline-none focus:ring-2 focus:ring-focus-blue focus:ring-offset-2 focus:ring-offset-background'
        )}
        aria-label="Toggle theme"
      >
        <Moon className="h-5 w-5" />
      </button>
    );
  }

  const icons = {
    dark: <Moon className="h-5 w-5" />,
    light: <Sun className="h-5 w-5" />,
    system: <Monitor className="h-5 w-5" />,
  };

  const labels = {
    dark: 'Switch to light mode',
    light: 'Switch to system theme',
    system: 'Switch to dark mode',
  };

  return (
    <button
      onClick={cycleTheme}
      className={cn(
        'flex items-center justify-center',
        'rounded-[2px] p-3',
        'min-h-[44px] min-w-[44px]',
        'text-muted transition-colors',
        'hover:bg-surface hover:text-foreground',
        'focus:outline-none focus:ring-2 focus:ring-focus-blue focus:ring-offset-2 focus:ring-offset-background'
      )}
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      {icons[theme]}
    </button>
  );
}
