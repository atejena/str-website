'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text';
}

function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const variants = {
    default: '',
    circular: 'rounded-full',
    text: 'h-4 w-full rounded',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-surface',
        'rounded-[4px]',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
function SkeletonCard() {
  return (
    <div className="rounded-[4px] bg-surface p-6 shadow-card">
      <Skeleton className="mb-4 h-48 w-full" />
      <Skeleton variant="text" className="mb-2 h-6 w-3/4" />
      <Skeleton variant="text" className="mb-4 h-4 w-1/2" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="mt-1 h-4 w-full" />
      <Skeleton variant="text" className="mt-1 h-4 w-2/3" />
    </div>
  );
}

function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return <Skeleton variant="circular" className={sizes[size]} />;
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={cn('h-4', i === lines - 1 && 'w-2/3')}
        />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText };
