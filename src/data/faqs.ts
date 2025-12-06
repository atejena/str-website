import type { FAQ, FAQCategory } from '@/types';

// PLACEHOLDER: Customize FAQs with STR-specific policies and information
export const faqs: FAQ[] = [
  // Membership FAQs
  {
    id: '1',
    question: 'What membership options do you offer?',
    answer:
      'We offer three membership tiers: Basic (gym access only), Premium (gym access + unlimited classes), and Elite (all-inclusive with personal training). Each tier can be paid monthly or annually, with annual memberships offering significant savings.',
    category: 'Membership',
    sortOrder: 1,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '2',
    question: 'Do you offer a free trial?',
    answer:
      'Yes! We offer a complimentary first visit that includes a facility tour and a sample workout with one of our coaches. This gives you a chance to experience our training style and meet the community before committing.',
    category: 'Membership',
    sortOrder: 2,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '3',
    question: 'Is there a contract or cancellation fee?',
    answer:
      'Monthly memberships require no long-term contract and can be cancelled with 30 days notice. Annual memberships offer a discounted rate in exchange for a 12-month commitment. Early cancellation of annual plans is subject to a prorated fee.',
    category: 'Membership',
    sortOrder: 3,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '4',
    question: 'Can I freeze my membership?',
    answer:
      'Elite members can freeze their membership for up to 14 days per year at no charge. Additional freeze days or freezes for other membership tiers can be arranged on a case-by-case basis. Please contact us to discuss your situation.',
    category: 'Membership',
    sortOrder: 4,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },

  // Classes FAQs
  {
    id: '5',
    question: 'Do I need to book classes in advance?',
    answer:
      'Yes, we recommend booking classes at least 24 hours in advance through our member portal or app. This helps us manage class sizes and ensure everyone gets adequate coaching attention. Walk-ins are welcome if space is available.',
    category: 'Classes',
    sortOrder: 1,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '6',
    question: 'What if I am a complete beginner?',
    answer:
      'All of our group classes are designed to be scalable for any fitness level. Our coaches provide modifications for every exercise, and we encourage beginners to start with our Functional Training or Small Group classes. We also recommend booking a personal training session first to learn proper form.',
    category: 'Classes',
    sortOrder: 2,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '7',
    question: 'What should I bring to class?',
    answer:
      'Bring comfortable workout clothes, athletic shoes (cross-trainers recommended), a water bottle, and a small towel. We provide all necessary equipment. Premium and Elite members have access to towel service.',
    category: 'Classes',
    sortOrder: 3,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '8',
    question: 'What is the cancellation policy for classes?',
    answer:
      'Please cancel at least 2 hours before class start time to avoid a late cancellation fee. This allows other members to book the spot. No-shows may be subject to a fee after repeated occurrences.',
    category: 'Classes',
    sortOrder: 4,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },

  // Facilities FAQs
  {
    id: '9',
    question: 'What equipment do you have?',
    answer:
      'Our facility features a full selection of free weights (barbells, dumbbells, kettlebells), power racks, functional training equipment, cardio machines, sleds, rowers, SkiErgs, and specialty equipment for Hyrox/Deka training. We continually invest in quality equipment.',
    category: 'Facilities',
    sortOrder: 1,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '10',
    question: 'Do you have locker rooms and showers?',
    answer:
      'Yes, we have full locker rooms with showers, changing areas, and secure day-use lockers. Premium and Elite members have access to towel service. We do not offer permanent locker rentals at this time.',
    category: 'Facilities',
    sortOrder: 2,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '11',
    question: 'Is parking available?',
    answer:
      'Yes, we have a dedicated parking lot with free parking for all members. Street parking is also available nearby. The facility is conveniently located with easy access from major roads in Cranford.',
    category: 'Facilities',
    sortOrder: 3,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },

  // Policies FAQs
  {
    id: '12',
    question: 'Can I bring a guest?',
    answer:
      'Premium members receive 2 guest passes per month, and Elite members receive 4. Guests must sign a waiver and be accompanied by the member. Additional guest passes can be purchased. Guests must be 16 or older unless participating in a youth program.',
    category: 'Policies',
    sortOrder: 1,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '13',
    question: 'What is the minimum age requirement?',
    answer:
      'Members must be at least 16 years old. Members aged 16-17 require a parent or guardian signature on the membership agreement and waiver. We may offer youth-specific programs with different age requirements.',
    category: 'Policies',
    sortOrder: 2,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '14',
    question: 'Do you offer student or senior discounts?',
    answer:
      'Yes, we offer a 10% discount on monthly memberships for students with valid ID and seniors 65+. This discount cannot be combined with other promotions or the annual membership discount.',
    category: 'Policies',
    sortOrder: 3,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '15',
    question: 'What is your refund policy?',
    answer:
      'Monthly memberships are non-refundable but can be cancelled with 30 days notice. Annual memberships paid upfront may be eligible for a prorated refund minus a cancellation fee if cancelled within the first 6 months. Please contact us to discuss individual circumstances.',
    category: 'Policies',
    sortOrder: 4,
    active: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

// Helper functions
export function getFAQById(id: string): FAQ | undefined {
  return faqs.find((f) => f.id === id);
}

export function getActiveFAQs(): FAQ[] {
  return faqs.filter((f) => f.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFAQsByCategory(category: FAQCategory): FAQ[] {
  return faqs
    .filter((f) => f.active && f.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFAQCategories(): FAQCategory[] {
  return ['Membership', 'Classes', 'Facilities', 'Policies'];
}
