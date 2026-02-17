import type { Trainer } from '@/types';

// PLACEHOLDER: Replace with real trainer data from Spencer
export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Spencer',
    slug: 'spencer',
    title: 'Owner & Head Coach',
    specialty: 'Strength & Conditioning',
    bio: 'As the founder of STR, Spencer brings over 10 years of experience in strength and conditioning. His philosophy centers on building resilience through progressive training, proper form, and sustainable fitness habits. Spencer has helped hundreds of clients transform their bodies and minds through his evidence-based approach to training.',
    shortBio: 'Founder of STR with 10+ years of strength and conditioning experience.',
    certifications: ['CSCS', 'USAW Level 2', 'CPR/AED'],
    experienceYears: 10,
    photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400',
    email: 'spencer@trainwithstr.com',
    instagram: 'trainwithstr',
    quote: 'Strength is not just physical—it is the resilience to keep going when things get hard.',
    featured: true,
    active: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    slug: 'marcus-johnson',
    title: 'Strength Coach',
    specialty: 'Powerlifting & Olympic Lifting',
    bio: 'Marcus is a competitive powerlifter turned coach with a passion for helping others discover their strength potential. Specializing in barbell movements, he has coached athletes from beginners to national-level competitors. His methodical approach ensures safe progression while pushing clients to achieve personal records.',
    shortBio: 'Competitive powerlifter specializing in barbell training and strength sports.',
    certifications: ['NSCA-CPT', 'USAW Level 1', 'Precision Nutrition L1'],
    experienceYears: 7,
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    instagram: 'marcus_lifts',
    quote: 'Every PR starts with showing up consistently.',
    featured: true,
    active: true,
    sortOrder: 2,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    title: 'HIIT & Conditioning Coach',
    specialty: 'HIIT & Metabolic Conditioning',
    bio: 'Sarah brings infectious energy to every class she teaches. With a background in group fitness and metabolic conditioning, she knows how to push you past your limits while keeping workouts fun and engaging. Her classes are known for their creative programming and results-driven approach.',
    shortBio: 'High-energy coach specializing in HIIT and metabolic conditioning.',
    certifications: ['ACE-CPT', 'TRX Certified', 'Kettlebell Athletics L2'],
    experienceYears: 5,
    photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
    instagram: 'sarah_trains',
    quote: 'The workout does not get easier—you get stronger.',
    featured: true,
    active: true,
    sortOrder: 3,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '4',
    name: 'David Martinez',
    slug: 'david-martinez',
    title: 'Functional Movement Specialist',
    specialty: 'Functional Training & Mobility',
    bio: 'David specializes in functional movement and corrective exercise. After overcoming his own injuries through proper movement training, he became passionate about helping others move better and feel better. His sessions focus on mobility, stability, and building a foundation for lifelong fitness.',
    shortBio: 'Movement specialist focused on functional training and injury prevention.',
    certifications: ['FMS Certified', 'NASM-CES', 'Yoga Alliance RYT-200'],
    experienceYears: 6,
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    instagram: 'david_moves',
    quote: 'Move well first, then move often.',
    featured: false,
    active: true,
    sortOrder: 4,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

// Helper functions
export function getTrainerById(id: string): Trainer | undefined {
  return trainers.find((t) => t.id === id);
}

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return trainers.find((t) => t.slug === slug);
}

export function getActiveTrainers(): Trainer[] {
  return trainers.filter((t) => t.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedTrainers(limit?: number): Trainer[] {
  const featured = trainers.filter((t) => t.active && t.featured).sort((a, b) => a.sortOrder - b.sortOrder);
  return limit ? featured.slice(0, limit) : featured;
}
