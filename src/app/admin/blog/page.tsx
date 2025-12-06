'use client';

import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted mt-1">Create and manage blog content.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-display font-bold uppercase tracking-wider text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogPosts.map((post) => (
                  <motion.tr key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-surface/50">
                    <td className="px-6 py-4">
                      <div className="font-display font-bold text-foreground">{post.title}</div>
                      <div className="text-sm text-muted">{post.readingTimeMinutes} min read</div>
                    </td>
                    <td className="px-6 py-4 text-muted">{post.authorName}</td>
                    <td className="px-6 py-4">
                      <Badge variant={post.published ? 'primary' : 'secondary'} size="sm">
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">{formatDate(post.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-muted hover:text-str-gold transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
