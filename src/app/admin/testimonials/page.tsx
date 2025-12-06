'use client';

import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Testimonials</h1>
        <p className="text-muted mt-1">Review and approve member testimonials.</p>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-display font-bold text-foreground">{testimonial.memberName}</span>
                      <Badge variant={testimonial.approved ? 'primary' : 'secondary'} size="sm">
                        {testimonial.approved ? 'Approved' : 'Pending'}
                      </Badge>
                      {testimonial.featured && <Badge variant="outline" size="sm">Featured</Badge>}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn('w-4 h-4', i < testimonial.rating ? 'text-str-gold fill-str-gold' : 'text-muted')} />
                      ))}
                    </div>
                    <p className="text-muted">"{testimonial.quote}"</p>
                    {testimonial.resultsSummary && (
                      <p className="text-sm text-str-gold mt-2">{testimonial.resultsSummary}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 text-muted hover:text-green-500 transition-colors" aria-label="Approve">
                      <Check className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-muted hover:text-red-500 transition-colors" aria-label="Reject">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
