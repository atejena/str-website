'use client';

import { createContext, useContext } from 'react';

export interface PageVisibilitySettings {
  classes: boolean;
  trainers: boolean;
  pricing: boolean;
  programming: boolean;
  about: boolean;
  contact: boolean;
  blog: boolean;
  gallery: boolean;
  testimonials: boolean;
  faq: boolean;
  careers: boolean;
}

const DEFAULT_VISIBILITY: PageVisibilitySettings = {
  classes: true,
  trainers: true,
  pricing: true,
  programming: true,
  about: true,
  contact: true,
  blog: true,
  gallery: true,
  testimonials: true,
  faq: true,
  careers: true,
};

const PageVisibilityContext = createContext<PageVisibilitySettings>(DEFAULT_VISIBILITY);

export function usePageVisibility() {
  return useContext(PageVisibilityContext);
}

interface PageVisibilityProviderProps {
  visibility: Partial<PageVisibilitySettings>;
  children: React.ReactNode;
}

export function PageVisibilityProvider({ visibility, children }: PageVisibilityProviderProps) {
  const settings = { ...DEFAULT_VISIBILITY, ...visibility };
  return (
    <PageVisibilityContext.Provider value={settings}>
      {children}
    </PageVisibilityContext.Provider>
  );
}
