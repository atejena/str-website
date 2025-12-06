import type { Testimonial } from '@/types';

// PLACEHOLDER: Replace with real testimonials from STR members
export const testimonials: Testimonial[] = [
  {
    id: '1',
    memberName: 'Michael R.',
    memberSince: '2024-03',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    rating: 5,
    quote:
      'STR completely changed my approach to fitness. The coaches here actually care about your progress and form. I have never felt stronger or more confident. Down 30 lbs and hitting PRs I never thought possible.',
    transformationType: 'Weight Loss',
    timeframe: '6 months',
    resultsSummary: 'Lost 30 lbs, gained significant strength',
    featured: true,
    approved: true,
    source: 'website',
    createdAt: '2024-09-15',
  },
  {
    id: '2',
    memberName: 'Jennifer L.',
    memberSince: '2024-01',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    rating: 5,
    quote:
      'As a busy mom of two, I needed a gym that offered effective workouts in a supportive environment. STR delivers both. The trainers work with my schedule and the community keeps me accountable.',
    transformationType: 'Lifestyle',
    featured: true,
    approved: true,
    source: 'google',
    createdAt: '2024-08-20',
  },
  {
    id: '3',
    memberName: 'David K.',
    memberSince: '2023-11',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    rating: 5,
    quote:
      'The Hyrox training program at STR prepared me perfectly for my first competition. Spencer and the team know how to structure training for peak performance. Finished in the top 20%!',
    transformationType: 'Performance',
    timeframe: '4 months',
    resultsSummary: 'Completed first Hyrox race, top 20%',
    featured: true,
    approved: true,
    source: 'website',
    createdAt: '2024-07-10',
  },
  {
    id: '4',
    memberName: 'Amanda T.',
    memberSince: '2024-05',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    rating: 5,
    quote:
      'I was intimidated to join a strength-focused gym as a beginner, but STR made me feel welcome from day one. The coaches scale everything appropriately and celebrate every small win.',
    transformationType: 'Strength',
    featured: false,
    approved: true,
    source: 'yelp',
    createdAt: '2024-10-05',
  },
  {
    id: '5',
    memberName: 'Robert M.',
    memberSince: '2024-02',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    rating: 5,
    quote:
      'After years of doing the same routine at big box gyms, STR showed me what real training looks like. The programming is intelligent, the equipment is top-notch, and results speak for themselves.',
    transformationType: 'Muscle Gain',
    timeframe: '8 months',
    resultsSummary: 'Gained 15 lbs of muscle, doubled strength',
    featured: true,
    approved: true,
    source: 'google',
    createdAt: '2024-06-25',
  },
  {
    id: '6',
    memberName: 'Lisa H.',
    memberSince: '2024-04',
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200',
    rating: 5,
    quote:
      'Coming back from a knee injury, I was nervous about training again. The functional movement classes at STR helped me rebuild strength safely. Now I move better than I did before the injury!',
    transformationType: 'Recovery',
    timeframe: '5 months',
    resultsSummary: 'Full recovery from knee injury',
    featured: false,
    approved: true,
    source: 'website',
    createdAt: '2024-09-30',
  },
];

// Helper functions
export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find((t) => t.id === id);
}

export function getApprovedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.approved);
}

export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const featured = testimonials.filter((t) => t.approved && t.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getTestimonialsByType(type: string): Testimonial[] {
  return testimonials.filter((t) => t.approved && t.transformationType === type);
}
