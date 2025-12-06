'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'default' | 'surface' | 'gold' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withContainer?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      containerSize = 'xl',
      background = 'default',
      padding = 'lg',
      withContainer = true,
      children,
      ...props
    },
    ref
  ) => {
    const backgrounds = {
      default: 'bg-background',
      surface: 'bg-surface',
      gold: 'bg-str-gold text-str-black',
      gradient: 'bg-gradient-to-b from-background to-surface',
    };

    const paddings = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-12 md:py-16 lg:py-20',
    };

    return (
      <section
        ref={ref}
        className={cn(backgrounds[background], paddings[padding], className)}
        {...props}
      >
        {withContainer ? (
          <Container size={containerSize}>{children}</Container>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
