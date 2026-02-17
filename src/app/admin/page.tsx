import Link from 'next/link'
import {
  Users,
  Dumbbell,
  FileText,
  MessageSquare,
  Mail,
  Image,
  HelpCircle,
  Briefcase,
  DollarSign,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { getDashboardStats, getLeads } from './actions'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()
  const allLeads = await getLeads()
  const recentLeads = allLeads.slice(0, 5)

  const statCards = [
    {
      label: 'Total Classes',
      value: stats.classes,
      icon: Dumbbell,
      href: '/admin/classes',
      color: 'text-str-gold',
    },
    {
      label: 'Active Trainers',
      value: stats.trainers,
      icon: Users,
      href: '/admin/trainers',
      color: 'text-blue-400',
    },
    {
      label: 'Blog Posts',
      value: stats.blog,
      icon: FileText,
      href: '/admin/blog',
      color: 'text-green-400',
    },
    {
      label: 'Testimonials',
      value: stats.testimonials,
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'text-purple-400',
    },
    {
      label: 'Gallery Images',
      value: stats.gallery,
      icon: Image,
      href: '/admin/gallery',
      color: 'text-pink-400',
    },
    {
      label: 'FAQs',
      value: stats.faqs,
      icon: HelpCircle,
      href: '/admin/faqs',
      color: 'text-indigo-400',
    },
    {
      label: 'Active Jobs',
      value: stats.careers,
      icon: Briefcase,
      href: '/admin/careers',
      color: 'text-orange-400',
    },
    {
      label: 'New Leads',
      value: stats.newLeads,
      icon: Mail,
      href: '/admin/leads',
      color: 'text-red-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted mt-1">Welcome back! Here's an overview of your gym.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
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
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
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

        {/* Recent Leads */}
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
              {recentLeads.length === 0 ? (
                <p className="text-sm text-muted text-center py-4">No leads yet</p>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-3 rounded-[2px] bg-surface"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-foreground text-sm truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-muted truncate">{lead.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      {lead.status === 'new' && (
                        <span className="px-2 py-1 text-xs bg-str-gold/20 text-str-gold rounded">
                          New
                        </span>
                      )}
                      <p className="text-xs text-muted whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
