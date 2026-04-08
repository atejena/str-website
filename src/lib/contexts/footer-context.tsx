'use client';

import { createContext, useContext } from 'react';

export interface FooterData {
  email: string;
  phone: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
}

const DEFAULT_FOOTER_DATA: FooterData = {
  email: 'info@trainwithstr.com',
  phone: '',
  socialLinks: {},
};

const FooterContext = createContext<FooterData>(DEFAULT_FOOTER_DATA);

export function useFooterData() {
  return useContext(FooterContext);
}

interface FooterDataProviderProps {
  data: FooterData;
  children: React.ReactNode;
}

export function FooterDataProvider({ data, children }: FooterDataProviderProps) {
  return (
    <FooterContext.Provider value={data}>
      {children}
    </FooterContext.Provider>
  );
}
