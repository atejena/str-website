'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ className, children, label, error, ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="mb-2 block font-display text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between',
          'rounded-[2px] bg-surface px-4 py-3',
          'border border-border',
          'text-foreground',
          'min-h-[44px]',
          'transition-colors duration-200',
          'focus:border-str-gold focus:outline-none focus:ring-2 focus:ring-focus-blue/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
)

AdminSelect.displayName = 'AdminSelect'
