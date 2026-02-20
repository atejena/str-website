import type { Metadata, Viewport } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import GoHighLevelWidget from '@/components/GoHighLevelWidget';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import { createServerSupabaseClient } from '@/lib/supabase/server';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#15151d' },
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://trainwithstr.com'),
  title: {
    default: 'STR - Strength Through Resilience | Premium Gym in Cranford, NJ',
    template: '%s | STR Fitness',
  },
  description:
    'STR is a premium strength and conditioning gym in Cranford, NJ offering personal training, group fitness classes, HIIT, and Hyrox/Deka conditioning. Build strength through resilience.',
  keywords: [
    'gym in Cranford NJ',
    'Cranford fitness center',
    'personal training Cranford',
    'HIIT classes Cranford NJ',
    'strength training Union County NJ',
    'STR gym',
    'Strength Through Resilience',
    'Hyrox training',
    'functional fitness',
  ],
  authors: [{ name: 'STR Fitness' }],
  creator: 'STR Fitness',
  publisher: 'STR Fitness',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trainwithstr.com',
    siteName: 'STR - Strength Through Resilience',
    title: 'STR - Strength Through Resilience | Premium Gym in Cranford, NJ',
    description:
      'Build strength through resilience at STR, a premium gym in Cranford, NJ. Expert coaching, group classes, and personalized training programs.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'STR Gym - Strength Through Resilience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STR - Strength Through Resilience | Premium Gym in Cranford, NJ',
    description:
      'Build strength through resilience at STR, a premium gym in Cranford, NJ.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

// JSON-LD Structured Data for Organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: 'STR - Strength Through Resilience',
  alternateName: 'STR Fitness',
  description:
    'Premium strength and conditioning gym offering personal training, group fitness classes, and Hyrox/Deka conditioning in Cranford, NJ.',
  url: 'https://trainwithstr.com',
  logo: 'https://trainwithstr.com/images/str-logo.webp',
  image: 'https://trainwithstr.com/images/og-image.jpg',
  telephone: '', // To be added
  email: 'spencer@trainwithstr.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8 Eastman St, Suite 3',
    addressLocality: 'Cranford',
    addressRegion: 'NJ',
    postalCode: '07016',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.6584,
    longitude: -74.2995,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '05:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '07:00',
      closes: '20:00',
    },
  ],
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card',
  sameAs: [
    // Social media links to be added
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings from site_settings
  const supabase = await createServerSupabaseClient();
  const { data: integrationSettings } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('key', 'integrations')
    .single();

  const ghlWidgetId =
    (integrationSettings?.value as Record<string, string> | null)?.gohighlevel_widget_id || '';

  // Fetch maintenance mode settings
  const { data: maintenanceRow } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'maintenance_mode')
    .single();

  const maintenanceValue = maintenanceRow?.value as Record<string, unknown> | null;
  const maintenanceSettings = {
    enabled: (maintenanceValue?.enabled as boolean) ?? false,
    title: (maintenanceValue?.title as string) || 'Coming Soon',
    subtitle: (maintenanceValue?.subtitle as string) || '',
    showLogo: (maintenanceValue?.show_logo as boolean) ?? true,
  };

  // Fetch social links for under construction page
  const { data: socialRow } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'social_links')
    .single();
  const socialValue = socialRow?.value as Record<string, string> | null;
  const socialLinks = {
    instagram: socialValue?.instagram || '',
    facebook: socialValue?.facebook || '',
    youtube: socialValue?.youtube || '',
    tiktok: socialValue?.tiktok || '',
  };

  // Check if user has a session (for preview mode)
  const { data: { user } } = await supabase.auth.getUser();
  const hasSession = !!user;

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${oswald.variable} ${inter.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ToastProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <MaintenanceGuard
            maintenance={maintenanceSettings}
            socialLinks={socialLinks}
            hasSession={hasSession}
          >
            {children}
          </MaintenanceGuard>
        </ToastProvider>
        {ghlWidgetId && <GoHighLevelWidget widgetId={ghlWidgetId} />}
      </body>
    </html>
  );
}
