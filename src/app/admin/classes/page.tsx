'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { classes } from '@/data/classes';

export default function AdminClassesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Classes</h1>
          <p className="text-muted mt-1">Manage your gym classes and schedules.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>

      {/* Classes Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Class Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {classes.map((gymClass) => (
                  <motion.tr
                    key={gymClass.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-surface/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-display font-bold text-foreground">
                            {gymClass.name}
                          </div>
                          <div className="text-sm text-muted">{gymClass.difficultyLevel}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" size="sm">
                        {gymClass.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
                      {gymClass.durationMinutes} min
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={gymClass.active ? 'primary' : 'secondary'} size="sm">
                        {gymClass.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-muted hover:text-foreground transition-colors"
                          aria-label={gymClass.active ? 'Deactivate' : 'Activate'}
                        >
                          {gymClass.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          className="p-2 text-muted hover:text-str-gold transition-colors"
                          aria-label="Edit class"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-muted hover:text-red-500 transition-colors"
                          aria-label="Delete class"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Info Note */}
      <p className="text-sm text-muted text-center">
        Note: Full CRUD operations will be available after connecting to Supabase.
      </p>
    </div>
  );
}
