import type { SiteSettings } from '@/types';

// PLACEHOLDER: Update with confirmed business information from Spencer
export const siteSettings: SiteSettings = {
  gymName: 'STR - Strength Through Resilience',
  tagline: 'Strength Through Resilience',
  email: 'spencer@trainwithstr.com',
  phone: '', // PLACEHOLDER: Add phone number when available
  address: {
    street: '8 Eastman St, Suite 3',
    city: 'Cranford',
    state: 'NJ',
    zip: '07016',
    country: 'US',
  },
  businessHours: [
    { day: 'Monday', open: '05:00', close: '22:00', closed: false },
    { day: 'Tuesday', open: '05:00', close: '22:00', closed: false },
    { day: 'Wednesday', open: '05:00', close: '22:00', closed: false },
    { day: 'Thursday', open: '05:00', close: '22:00', closed: false },
    { day: 'Friday', open: '05:00', close: '22:00', closed: false },
    { day: 'Saturday', open: '07:00', close: '20:00', closed: false },
    { day: 'Sunday', open: '07:00', close: '20:00', closed: false },
  ],
  socialLinks: {
    instagram: '', // PLACEHOLDER: Add Instagram handle
    facebook: '', // PLACEHOLDER: Add Facebook URL
    youtube: undefined,
    tiktok: undefined,
    twitter: undefined,
  },
  announcementBanner: {
    text: 'New Year Special: First month FREE with annual membership!',
    link: '/pricing',
    active: false, // Set to true to enable
  },
};

// Helper functions
export function getFormattedAddress(): string {
  const { street, city, state, zip } = siteSettings.address;
  return `${street}, ${city}, ${state} ${zip}`;
}

export function getGoogleMapsUrl(): string {
  const address = getFormattedAddress();
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function getBusinessHoursForDay(day: string) {
  return siteSettings.businessHours.find((h) => h.day === day);
}

export function isCurrentlyOpen(): boolean {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[now.getDay()];
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  const todayHours = getBusinessHoursForDay(currentDay);
  if (!todayHours || todayHours.closed) return false;

  return currentTime >= todayHours.open && currentTime < todayHours.close;
}
