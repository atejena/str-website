// ============================================
// ENUMS & CONSTANTS
// ============================================

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type DayOfWeek = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type FAQCategory = 'Membership' | 'Classes' | 'Facilities' | 'Policies';

export type GalleryCategory = 'Facility' | 'Classes' | 'Events' | 'Transformations' | 'Instagram';

export type BlogCategory =
  | 'Workout Tips'
  | 'Nutrition'
  | 'Member Spotlights'
  | 'Gym News'
  | 'Recovery'
  | 'Motivation';

export type TransformationType =
  | 'Weight Loss'
  | 'Muscle Gain'
  | 'Strength'
  | 'Performance'
  | 'Lifestyle'
  | 'Recovery';

export type ClassCategory =
  | 'Strength'
  | 'Cardio & HIIT'
  | 'Functional Fitness'
  | 'Personal Training';

// ============================================
// GYM CLASS TYPES
// ============================================

export interface GymClass {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  instructorId?: string;
  category: ClassCategory;
  difficultyLevel: DifficultyLevel;
  durationMinutes: number;
  maxCapacity: number;
  caloriesBurned?: number;
  equipmentNeeded: string[];
  benefits: string[];
  featuredImage: string;
  galleryImages?: string[];
  priceDropIn?: number;
  includedInMembership: boolean;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassScheduleItem {
  id: string;
  classId: string;
  instructorId?: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  room?: string;
  recurring: boolean;
  effectiveFrom?: string;
  effectiveUntil?: string;
  cancelled: boolean;
  cancellationReason?: string;
}

// ============================================
// TRAINER TYPES
// ============================================

export interface Trainer {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  bio: string;
  shortBio: string;
  certifications: string[];
  experienceYears: number;
  photo: string;
  email?: string;
  instagram?: string;
  quote?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// MEMBERSHIP TYPES
// ============================================

export interface MembershipFeature {
  name: string;
  included: boolean;
  note?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  priceMonthly: number;
  priceAnnual?: number;
  setupFee?: number;
  contractMonths?: number;
  features: MembershipFeature[];
  includedClasses: string[];
  guestPassesMonthly: number;
  personalTrainingDiscount?: number;
  freezeDaysYearly?: number;
  highlighted: boolean;
  ctaText: string;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// TESTIMONIAL TYPES
// ============================================

export interface Testimonial {
  id: string;
  memberName: string;
  memberSince?: string;
  photo?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  transformationType?: TransformationType;
  beforeImage?: string;
  afterImage?: string;
  timeframe?: string;
  resultsSummary?: string;
  videoUrl?: string;
  featured: boolean;
  approved: boolean;
  source: 'google' | 'yelp' | 'website';
  createdAt: string;
}

// ============================================
// BLOG TYPES
// ============================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  authorId?: string;
  authorName: string;
  category: BlogCategory;
  tags: string[];
  featuredImage: string;
  readingTimeMinutes: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  published: boolean;
  publishDate: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// FAQ TYPES
// ============================================

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  sortOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// GALLERY TYPES
// ============================================

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: GalleryCategory;
  altText: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

// ============================================
// CONTACT TYPES
// ============================================

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  read: boolean;
  responded: boolean;
  notes?: string;
  createdAt: string;
}

// ============================================
// SITE SETTINGS TYPES
// ============================================

export interface BusinessHours {
  day: DayOfWeek;
  open: string;
  close: string;
  closed: boolean;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  twitter?: string;
}

export interface SiteSettings {
  gymName: string;
  tagline: string;
  email: string;
  phone?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  businessHours: BusinessHours[];
  socialLinks: SocialLinks;
  announcementBanner?: {
    text: string;
    link?: string;
    active: boolean;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

export type WithId<T> = T & { id: string };

export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Schedule item with class details joined
export interface ScheduleItemWithClass extends ClassScheduleItem {
  class: GymClass;
  instructor?: Trainer;
}
