import type { GymClass, ClassScheduleItem } from '@/types';

// PLACEHOLDER: Replace with real class data from Spencer
export const classes: GymClass[] = [
  {
    id: '1',
    name: 'Strength & Conditioning',
    slug: 'strength-conditioning',
    description:
      'Our flagship strength and conditioning class combines compound movements, functional exercises, and progressive overload principles to build real-world strength. Each session is designed to challenge your limits while maintaining proper form and technique. Whether you are a beginner or an experienced lifter, our coaches will scale the workout to match your current fitness level.',
    shortDescription:
      'Build functional strength through compound movements and progressive overload training.',
    category: 'Strength',
    difficultyLevel: 'All Levels',
    durationMinutes: 60,
    maxCapacity: 12,
    caloriesBurned: 500,
    equipmentNeeded: ['Barbell', 'Dumbbells', 'Kettlebells', 'Pull-up Bar'],
    benefits: [
      'Build lean muscle mass',
      'Increase metabolic rate',
      'Improve bone density',
      'Enhance functional movement',
      'Boost confidence',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    galleryImages: [],
    priceDropIn: 35,
    includedInMembership: true,
    featured: true,
    active: true,
    sortOrder: 1,
    metaTitle: 'Strength & Conditioning Classes in Cranford, NJ | STR Fitness',
    metaDescription:
      'Build real-world strength with our expert-led strength and conditioning classes. All fitness levels welcome.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '2',
    name: 'Private Personal Training',
    slug: 'personal-training',
    description:
      'One-on-one personal training sessions tailored to your specific goals, whether that is weight loss, muscle building, athletic performance, or rehabilitation. Your dedicated coach will create a customized program, track your progress, and provide the accountability you need to succeed.',
    shortDescription:
      'Personalized 1-on-1 coaching tailored to your unique fitness goals.',
    category: 'Personal Training',
    difficultyLevel: 'All Levels',
    durationMinutes: 60,
    maxCapacity: 1,
    caloriesBurned: 450,
    equipmentNeeded: ['Full Gym Access'],
    benefits: [
      'Personalized programming',
      'Dedicated attention',
      'Faster results',
      'Injury prevention',
      'Accountability partner',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
    galleryImages: [],
    includedInMembership: false,
    featured: true,
    active: true,
    sortOrder: 2,
    metaTitle: 'Personal Training in Cranford, NJ | STR Fitness',
    metaDescription:
      'Get personalized 1-on-1 coaching with our certified personal trainers. Customized programs for your goals.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '3',
    name: 'Semi-Private Training',
    slug: 'semi-private-training',
    description:
      'Train with 2-4 people in a small group setting, getting the benefits of personalized coaching at a more affordable rate. Perfect for training partners, couples, or friends who want to work out together with expert guidance.',
    shortDescription:
      'Small group training with personalized coaching for 2-4 people.',
    category: 'Personal Training',
    difficultyLevel: 'All Levels',
    durationMinutes: 60,
    maxCapacity: 4,
    caloriesBurned: 450,
    equipmentNeeded: ['Full Gym Access'],
    benefits: [
      'Cost-effective coaching',
      'Train with friends',
      'Personalized attention',
      'Group motivation',
      'Flexible scheduling',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800',
    galleryImages: [],
    includedInMembership: false,
    featured: false,
    active: true,
    sortOrder: 3,
    metaTitle: 'Semi-Private Training in Cranford, NJ | STR Fitness',
    metaDescription:
      'Train with friends in our semi-private sessions. Get personalized coaching in a small group setting.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '4',
    name: 'HIIT Style',
    slug: 'hiit',
    description:
      'High-Intensity Interval Training designed to torch calories and boost your metabolism. These fast-paced sessions alternate between intense bursts of activity and brief recovery periods, delivering maximum results in minimum time.',
    shortDescription:
      'High-intensity interval training for maximum calorie burn.',
    category: 'Cardio & HIIT',
    difficultyLevel: 'Intermediate',
    durationMinutes: 45,
    maxCapacity: 16,
    caloriesBurned: 600,
    equipmentNeeded: ['Bodyweight', 'Kettlebells', 'Battle Ropes', 'Box'],
    benefits: [
      'Burn calories fast',
      'Boost metabolism',
      'Improve cardiovascular health',
      'Time-efficient workouts',
      'Increase endurance',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800',
    galleryImages: [],
    priceDropIn: 30,
    includedInMembership: true,
    featured: true,
    active: true,
    sortOrder: 4,
    metaTitle: 'HIIT Classes in Cranford, NJ | STR Fitness',
    metaDescription:
      'Torch calories with our high-intensity interval training classes. Fast, effective, and challenging.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '5',
    name: 'Functional Training',
    slug: 'functional-training',
    description:
      'Improve your everyday movement patterns with exercises that mimic real-life activities. Focus on mobility, stability, and strength in movements you use daily, reducing injury risk and enhancing quality of life.',
    shortDescription:
      'Train movements, not just muscles, for better daily life.',
    category: 'Functional Fitness',
    difficultyLevel: 'All Levels',
    durationMinutes: 60,
    maxCapacity: 12,
    caloriesBurned: 400,
    equipmentNeeded: ['Resistance Bands', 'Medicine Ball', 'TRX', 'Bodyweight'],
    benefits: [
      'Improve daily movements',
      'Reduce injury risk',
      'Enhance flexibility',
      'Build core strength',
      'Better balance & coordination',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800',
    galleryImages: [],
    priceDropIn: 30,
    includedInMembership: true,
    featured: false,
    active: true,
    sortOrder: 5,
    metaTitle: 'Functional Training in Cranford, NJ | STR Fitness',
    metaDescription:
      'Improve your everyday movements with functional training. Build strength that transfers to real life.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '6',
    name: 'Small Group Classes',
    slug: 'small-group',
    description:
      'Our signature small group classes offer the energy and motivation of group fitness with the personalized attention of a smaller setting. Limited to 8 participants, you will get coaching cues and form corrections throughout the session.',
    shortDescription:
      'Group energy with personalized attention in classes limited to 8.',
    category: 'Strength',
    difficultyLevel: 'All Levels',
    durationMinutes: 45,
    maxCapacity: 8,
    caloriesBurned: 400,
    equipmentNeeded: ['Varies by Session'],
    benefits: [
      'Community motivation',
      'Personalized coaching',
      'Structured programming',
      'Variety of workouts',
      'Affordable group rates',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
    galleryImages: [],
    priceDropIn: 25,
    includedInMembership: true,
    featured: false,
    active: true,
    sortOrder: 6,
    metaTitle: 'Small Group Fitness Classes in Cranford, NJ | STR Fitness',
    metaDescription:
      'Join our small group classes for personalized coaching in a motivating group setting.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: '7',
    name: 'Hyrox/Deka Conditioning',
    slug: 'hyrox-deka',
    description:
      'Train specifically for Hyrox and Deka competitions, or use this intense hybrid workout to push your fitness to the next level. Combines running, functional movements, and strength exercises in a race-simulation format.',
    shortDescription:
      'Competition-style training for Hyrox and Deka events.',
    category: 'Cardio & HIIT',
    difficultyLevel: 'Advanced',
    durationMinutes: 60,
    maxCapacity: 10,
    caloriesBurned: 700,
    equipmentNeeded: ['SkiErg', 'Rower', 'Sled', 'Wall Balls', 'Sandbag'],
    benefits: [
      'Competition preparation',
      'Elite conditioning',
      'Mental toughness',
      'Full-body workout',
      'Race simulation',
    ],
    featuredImage: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800',
    galleryImages: [],
    priceDropIn: 40,
    includedInMembership: true,
    featured: true,
    active: true,
    sortOrder: 7,
    metaTitle: 'Hyrox & Deka Training in Cranford, NJ | STR Fitness',
    metaDescription:
      'Train for Hyrox and Deka competitions with our specialized conditioning classes.',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

// PLACEHOLDER: Replace with real schedule data from Spencer
export const classSchedule: ClassScheduleItem[] = [
  // Monday
  { id: '1', classId: '1', dayOfWeek: 'Monday', startTime: '06:00', endTime: '07:00', recurring: true, cancelled: false },
  { id: '2', classId: '4', dayOfWeek: 'Monday', startTime: '12:00', endTime: '12:45', recurring: true, cancelled: false },
  { id: '3', classId: '6', dayOfWeek: 'Monday', startTime: '17:30', endTime: '18:15', recurring: true, cancelled: false },
  { id: '4', classId: '1', dayOfWeek: 'Monday', startTime: '18:30', endTime: '19:30', recurring: true, cancelled: false },

  // Tuesday
  { id: '5', classId: '7', dayOfWeek: 'Tuesday', startTime: '06:00', endTime: '07:00', recurring: true, cancelled: false },
  { id: '6', classId: '5', dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '10:00', recurring: true, cancelled: false },
  { id: '7', classId: '4', dayOfWeek: 'Tuesday', startTime: '17:30', endTime: '18:15', recurring: true, cancelled: false },
  { id: '8', classId: '1', dayOfWeek: 'Tuesday', startTime: '18:30', endTime: '19:30', recurring: true, cancelled: false },

  // Wednesday
  { id: '9', classId: '1', dayOfWeek: 'Wednesday', startTime: '06:00', endTime: '07:00', recurring: true, cancelled: false },
  { id: '10', classId: '6', dayOfWeek: 'Wednesday', startTime: '12:00', endTime: '12:45', recurring: true, cancelled: false },
  { id: '11', classId: '4', dayOfWeek: 'Wednesday', startTime: '17:30', endTime: '18:15', recurring: true, cancelled: false },
  { id: '12', classId: '5', dayOfWeek: 'Wednesday', startTime: '18:30', endTime: '19:30', recurring: true, cancelled: false },

  // Thursday
  { id: '13', classId: '7', dayOfWeek: 'Thursday', startTime: '06:00', endTime: '07:00', recurring: true, cancelled: false },
  { id: '14', classId: '1', dayOfWeek: 'Thursday', startTime: '09:00', endTime: '10:00', recurring: true, cancelled: false },
  { id: '15', classId: '6', dayOfWeek: 'Thursday', startTime: '17:30', endTime: '18:15', recurring: true, cancelled: false },
  { id: '16', classId: '4', dayOfWeek: 'Thursday', startTime: '18:30', endTime: '19:15', recurring: true, cancelled: false },

  // Friday
  { id: '17', classId: '1', dayOfWeek: 'Friday', startTime: '06:00', endTime: '07:00', recurring: true, cancelled: false },
  { id: '18', classId: '5', dayOfWeek: 'Friday', startTime: '09:00', endTime: '10:00', recurring: true, cancelled: false },
  { id: '19', classId: '4', dayOfWeek: 'Friday', startTime: '17:00', endTime: '17:45', recurring: true, cancelled: false },

  // Saturday
  { id: '20', classId: '1', dayOfWeek: 'Saturday', startTime: '08:00', endTime: '09:00', recurring: true, cancelled: false },
  { id: '21', classId: '7', dayOfWeek: 'Saturday', startTime: '09:30', endTime: '10:30', recurring: true, cancelled: false },
  { id: '22', classId: '6', dayOfWeek: 'Saturday', startTime: '11:00', endTime: '11:45', recurring: true, cancelled: false },

  // Sunday
  { id: '23', classId: '5', dayOfWeek: 'Sunday', startTime: '09:00', endTime: '10:00', recurring: true, cancelled: false },
  { id: '24', classId: '4', dayOfWeek: 'Sunday', startTime: '10:30', endTime: '11:15', recurring: true, cancelled: false },
];

// Helper functions
export function getClassById(id: string): GymClass | undefined {
  return classes.find((c) => c.id === id);
}

export function getClassBySlug(slug: string): GymClass | undefined {
  return classes.find((c) => c.slug === slug);
}

export function getActiveClasses(): GymClass[] {
  return classes.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedClasses(limit?: number): GymClass[] {
  const featured = classes.filter((c) => c.active && c.featured).sort((a, b) => a.sortOrder - b.sortOrder);
  return limit ? featured.slice(0, limit) : featured;
}

export function getClassesByCategory(category: string): GymClass[] {
  return classes.filter((c) => c.active && c.category === category).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getScheduleForDay(day: string): ClassScheduleItem[] {
  return classSchedule.filter((s) => s.dayOfWeek === day && !s.cancelled);
}

export function getScheduleForClass(classId: string): ClassScheduleItem[] {
  return classSchedule.filter((s) => s.classId === classId && !s.cancelled);
}
