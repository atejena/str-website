import type { GalleryImage, GalleryCategory } from '@/types';

// PLACEHOLDER: Replace with real STR facility and member photos
export const galleryImages: GalleryImage[] = [
  // Facility
  {
    id: '1',
    title: 'Main Training Floor',
    description: 'Our spacious main training area with racks and platforms',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    category: 'Facility',
    altText: 'STR gym main training floor with squat racks and weights',
    featured: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    title: 'Free Weights Section',
    description: 'Extensive dumbbell and kettlebell collection',
    imageUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400',
    category: 'Facility',
    altText: 'Dumbbell rack at STR gym',
    featured: false,
    sortOrder: 2,
    createdAt: '2025-01-01',
  },
  {
    id: '3',
    title: 'Functional Training Zone',
    description: 'Dedicated space for functional movements and conditioning',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    category: 'Facility',
    altText: 'Functional training area with sleds and ropes',
    featured: false,
    sortOrder: 3,
    createdAt: '2025-01-01',
  },

  // Classes
  {
    id: '4',
    title: 'Strength & Conditioning Class',
    description: 'Members working through a barbell complex',
    imageUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400',
    category: 'Classes',
    altText: 'Group strength and conditioning class at STR',
    featured: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
  },
  {
    id: '5',
    title: 'HIIT Session',
    description: 'High-intensity interval training in action',
    imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400',
    category: 'Classes',
    altText: 'HIIT class members doing kettlebell swings',
    featured: false,
    sortOrder: 2,
    createdAt: '2025-01-01',
  },
  {
    id: '6',
    title: 'Personal Training',
    description: 'One-on-one coaching session',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    category: 'Classes',
    altText: 'Personal training session at STR',
    featured: false,
    sortOrder: 3,
    createdAt: '2025-01-01',
  },

  // Events
  {
    id: '7',
    title: 'Community Workout',
    description: 'Monthly community workout event',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400',
    category: 'Events',
    altText: 'STR community workout event',
    featured: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
  },
  {
    id: '8',
    title: 'Fitness Challenge',
    description: 'Members competing in our quarterly fitness challenge',
    imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400',
    category: 'Events',
    altText: 'Fitness challenge competition at STR',
    featured: false,
    sortOrder: 2,
    createdAt: '2025-01-01',
  },

  // Transformations
  {
    id: '9',
    title: 'Member Transformation - Michael',
    description: '6-month strength transformation journey',
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
    category: 'Transformations',
    altText: 'STR member transformation success story',
    featured: true,
    sortOrder: 1,
    createdAt: '2025-01-01',
  },
  {
    id: '10',
    title: 'Member Transformation - Sarah',
    description: 'Weight loss and strength gain journey',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    category: 'Transformations',
    altText: 'STR member weight loss transformation',
    featured: false,
    sortOrder: 2,
    createdAt: '2025-01-01',
  },
  {
    id: '11',
    title: 'Hyrox Competition',
    description: 'STR members competing in Hyrox event',
    imageUrl: 'https://images.unsplash.com/photo-1434596922112-19f563067271?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1434596922112-19f563067271?w=400',
    category: 'Events',
    altText: 'STR athletes at Hyrox competition',
    featured: false,
    sortOrder: 3,
    createdAt: '2025-01-01',
  },
  {
    id: '12',
    title: 'Cardio Equipment',
    description: 'Rowers and SkiErgs for conditioning',
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400',
    category: 'Facility',
    altText: 'Cardio equipment area at STR',
    featured: false,
    sortOrder: 4,
    createdAt: '2025-01-01',
  },
];

// Helper functions
export function getGalleryImageById(id: string): GalleryImage | undefined {
  return galleryImages.find((img) => img.id === id);
}

export function getAllGalleryImages(): GalleryImage[] {
  return galleryImages.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getGalleryByCategory(category: GalleryCategory): GalleryImage[] {
  return galleryImages
    .filter((img) => img.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getFeaturedGalleryImages(limit?: number): GalleryImage[] {
  const featured = galleryImages.filter((img) => img.featured).sort((a, b) => a.sortOrder - b.sortOrder);
  return limit ? featured.slice(0, limit) : featured;
}

export function getGalleryCategories(): GalleryCategory[] {
  return ['Facility', 'Classes', 'Events', 'Transformations'];
}
