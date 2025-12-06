'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { trainers } from '@/data/trainers';

export default function AdminTrainersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Trainers</h1>
          <p className="text-muted mt-1">Manage your coaching staff.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <motion.div
            key={trainer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={trainer.photo}
                  alt={trainer.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={trainer.active ? 'primary' : 'secondary'} size="sm">
                    {trainer.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-display font-bold text-foreground">{trainer.name}</h3>
                <p className="text-sm text-str-gold">{trainer.title}</p>
                <p className="text-sm text-muted mt-2 line-clamp-2">{trainer.bio}</p>
                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-border">
                  <button className="p-2 text-muted hover:text-foreground transition-colors">
                    {trainer.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-muted hover:text-str-gold transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
