'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-display font-bold uppercase tracking-wider',
      'rounded-[2px] transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:pointer-events-none disabled:opacity-50',
      'min-h-[44px]' // Accessibility: 44px touch target
    );

    const variants = {
      primary: cn(
        'bg-str-gold text-str-black',
        'hover:brightness-110 hover:-translate-y-0.5',
        'active:brightness-95 active:translate-y-0',
        'shadow-button hover:shadow-elevated'
      ),
      secondary: cn(
        'bg-surface text-foreground',
        'border-2 border-str-gold',
        'hover:bg-str-gold hover:text-str-black',
        'transition-colors'
      ),
      outline: cn(
        'border-2 border-border text-foreground',
        'hover:border-str-gold hover:text-str-gold',
        'bg-transparent'
      ),
      ghost: cn(
        'text-foreground',
        'hover:bg-surface hover:text-str-gold',
        'bg-transparent'
      ),
      link: cn(
        'text-str-gold underline-offset-4',
        'hover:underline',
        'bg-transparent p-0 h-auto min-h-0'
      ),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const Comp = asChild ? Slot : 'button';

    // When using asChild, pass styles to the child element directly
    // and don't wrap with loading/icons since the child manages its own content
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(
            baseStyles,
            variants[variant],
            variant !== 'link' && sizes[size],
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
