'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  Dumbbell,
  FileText,
  MessageSquare,
  Mail,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { classes } from '@/data/classes';
import { trainers } from '@/data/trainers';
import { blogPosts } from '@/data/blog';
import { testimonials } from '@/data/testimonials';

// PLACEHOLDER: Replace with real data from Supabase
const stats = [
  {
    label: 'Total Classes',
    value: classes.filter((c) => c.active).length,
    icon: Dumbbell,
    href: '/admin/classes',
    color: 'text-str-gold',
  },
  {
    label: 'Active Trainers',
    value: trainers.filter((t) => t.active).length,
    icon: Users,
    href: '/admin/trainers',
    color: 'text-blue-400',
  },
  {
    label: 'Blog Posts',
    value: blogPosts.filter((p) => p.status === 'published').length,
    icon: FileText,
    href: '/admin/blog',
    color: 'text-green-400',
  },
  {
    label: 'Testimonials',
    value: testimonials.filter((t) => t.approved).length,
    icon: MessageSquare,
    href: '/admin/testimonials',
    color: 'text-purple-400',
  },
];

const recentLeads = [
  // PLACEHOLDER: Will be populated from Supabase
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Membership Inquiry', date: '2025-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Free Trial', date: '2025-01-14' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Personal Training', date: '2025-01-13' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">Welcome back! Here's an overview of your gym.</p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Link href={stat.href}>
              <Card hover className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted mb-1">{stat.label}</p>
                      <p className="text-3xl font-display font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-surface ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/admin/classes"
                  className="flex items-center justify-between p-3 rounded-[2px] bg-surface hover:bg-str-gold/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-5 h-5 text-str-gold" />
                    <span className="text-foreground">Manage Classes</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-str-gold transition-colors" />
                </Link>
                <Link
                  href="/admin/blog"
                  className="flex items-center justify-between p-3 rounded-[2px] bg-surface hover:bg-str-gold/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-str-gold" />
                    <span className="text-foreground">Write Blog Post</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-str-gold transition-colors" />
                </Link>
                <Link
                  href="/admin/testimonials"
                  className="flex items-center justify-between p-3 rounded-[2px] bg-surface hover:bg-str-gold/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-str-gold" />
                    <span className="text-foreground">Review Testimonials</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-str-gold transition-colors" />
                </Link>
                <Link
                  href="/admin/leads"
                  className="flex items-center justify-between p-3 rounded-[2px] bg-surface hover:bg-str-gold/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-str-gold" />
                    <span className="text-foreground">View Contact Leads</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-str-gold transition-colors" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold text-foreground">
                  Recent Leads
                </h2>
                <Link
                  href="/admin/leads"
                  className="text-sm text-str-gold hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 rounded-[2px] bg-surface"
                  >
                    <div>
                      <p className="font-display font-bold text-foreground text-sm">
                        {lead.name}
                      </p>
                      <p className="text-xs text-muted">{lead.subject}</p>
                    </div>
                    <p className="text-xs text-muted">{lead.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-str-gold/50 bg-str-gold/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-str-gold flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">
                  Static Data Mode
                </h3>
                <p className="text-sm text-muted">
                  This admin panel is currently using static TypeScript data.
                  To enable full CRUD operations, connect to Supabase by adding the required
                  environment variables and updating the service layer.
                  See the production readiness checklist in the plan for details.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
