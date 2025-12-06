'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { galleryImages } from '@/data/gallery';

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gallery</h1>
          <p className="text-muted mt-1">Manage photos for your gallery.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="relative aspect-square rounded-[2px] overflow-hidden bg-surface">
              <Image src={image.url} alt={image.alt} fill className="object-cover" />
              <div className="absolute inset-0 bg-str-black/0 group-hover:bg-str-black/60 transition-all" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button className="p-2 bg-str-gold text-str-black rounded-[2px] hover:brightness-110">
                    <Star className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-[2px] hover:brightness-110">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="outline" size="sm">{image.category}</Badge>
              </div>
              {image.featured && (
                <div className="absolute top-2 right-2">
                  <Star className="w-5 h-5 text-str-gold fill-str-gold" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
