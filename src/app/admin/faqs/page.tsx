'use client';

import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { faqs } from '@/data/faqs';

export default function AdminFAQsPage() {
  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">FAQs</h1>
          <p className="text-muted mt-1">Manage frequently asked questions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-display font-bold text-str-gold">{category}</h2>
          {faqs
            .filter((f) => f.category === category)
            .map((faq) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className="font-display font-bold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-sm text-muted line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-2 text-muted hover:text-str-gold transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      ))}
    </div>
  );
}
