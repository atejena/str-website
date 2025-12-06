import type { MembershipPlan } from '@/types';

// PLACEHOLDER: Replace with real pricing data from Spencer
export const membershipPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Basic',
    slug: 'basic',
    tagline: 'Get Started',
    description:
      'Perfect for those beginning their fitness journey or looking for flexible gym access without commitment.',
    priceMonthly: 49,
    priceAnnual: 470, // ~2 months free
    setupFee: 0,
    features: [
      { name: 'Unlimited gym access', included: true },
      { name: 'Access to all equipment', included: true },
      { name: 'Locker room access', included: true },
      { name: 'Free WiFi', included: true },
      { name: 'Group classes', included: false, note: 'Pay per class' },
      { name: 'Personal training sessions', included: false },
      { name: 'Guest passes', included: false },
      { name: 'Towel service', included: false },
      { name: 'Nutrition consultation', included: false },
    ],
    includedClasses: [],
    guestPassesMonthly: 0,
    highlighted: false,
    ctaText: 'Start Basic',
    active: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'Premium',
    slug: 'premium',
    tagline: 'Most Popular',
    description:
      'Our most popular plan with full access to classes and premium amenities. Best value for serious fitness enthusiasts.',
    priceMonthly: 99,
    priceAnnual: 950, // ~2 months free
    setupFee: 0,
    features: [
      { name: 'Unlimited gym access', included: true },
      { name: 'Access to all equipment', included: true },
      { name: 'Locker room access', included: true },
      { name: 'Free WiFi', included: true },
      { name: 'Unlimited group classes', included: true },
      { name: 'Personal training sessions', included: false, note: '10% discount' },
      { name: '2 guest passes/month', included: true },
      { name: 'Towel service', included: true },
      { name: 'Nutrition consultation', included: false },
    ],
    includedClasses: ['1', '4', '5', '6', '7'],
    guestPassesMonthly: 2,
    personalTrainingDiscount: 10,
    highlighted: true,
    ctaText: 'Go Premium',
    active: true,
    sortOrder: 2,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '3',
    name: 'Elite',
    slug: 'elite',
    tagline: 'All Inclusive',
    description:
      'The ultimate fitness experience with personal training included, unlimited amenities, and exclusive member benefits.',
    priceMonthly: 199,
    priceAnnual: 1900, // ~2 months free
    setupFee: 0,
    features: [
      { name: 'Unlimited gym access', included: true },
      { name: 'Access to all equipment', included: true },
      { name: 'Locker room access', included: true },
      { name: 'Free WiFi', included: true },
      { name: 'Unlimited group classes', included: true },
      { name: '4 PT sessions/month', included: true },
      { name: '4 guest passes/month', included: true },
      { name: 'Towel service', included: true },
      { name: 'Monthly nutrition consultation', included: true },
    ],
    includedClasses: ['1', '2', '3', '4', '5', '6', '7'],
    guestPassesMonthly: 4,
    freezeDaysYearly: 14,
    highlighted: false,
    ctaText: 'Go Elite',
    active: true,
    sortOrder: 3,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

// Helper functions
export function getPlanById(id: string): MembershipPlan | undefined {
  return membershipPlans.find((p) => p.id === id);
}

export function getPlanBySlug(slug: string): MembershipPlan | undefined {
  return membershipPlans.find((p) => p.slug === slug);
}

export function getActivePlans(): MembershipPlan[] {
  return membershipPlans.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getHighlightedPlan(): MembershipPlan | undefined {
  return membershipPlans.find((p) => p.active && p.highlighted);
}
