'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, Eye, CheckCircle, Archive } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// PLACEHOLDER: These would come from Supabase contact_submissions table
const leads = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    subject: 'Membership Inquiry',
    message: 'I\'m interested in joining your gym. What are the membership options?',
    status: 'new',
    createdAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '555-987-6543',
    subject: 'Free Trial',
    message: 'Would like to book a free trial session this weekend.',
    status: 'contacted',
    createdAt: '2025-01-14T15:45:00Z',
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike@example.com',
    phone: '',
    subject: 'Personal Training',
    message: 'Looking for a personal trainer for weight loss goals.',
    status: 'converted',
    createdAt: '2025-01-13T09:00:00Z',
  },
];

const statusColors: Record<string, string> = {
  new: 'primary',
  contacted: 'secondary',
  converted: 'outline',
};

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Contact Leads</h1>
        <p className="text-muted mt-1">View and manage contact form submissions.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-display font-bold text-str-gold">
              {leads.filter((l) => l.status === 'new').length}
            </div>
            <div className="text-sm text-muted">New</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-display font-bold text-foreground">
              {leads.filter((l) => l.status === 'contacted').length}
            </div>
            <div className="text-sm text-muted">Contacted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-display font-bold text-green-400">
              {leads.filter((l) => l.status === 'converted').length}
            </div>
            <div className="text-sm text-muted">Converted</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <motion.div key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-bold text-foreground">
                        {lead.firstName} {lead.lastName}
                      </h3>
                      <Badge variant={statusColors[lead.status] as 'primary' | 'secondary' | 'outline'} size="sm">
                        {lead.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${lead.email}`} className="hover:text-str-gold">{lead.email}</a>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <a href={`tel:${lead.phone}`} className="hover:text-str-gold">{lead.phone}</a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-str-gold mb-2">{lead.subject}</p>
                    <p className="text-muted">{lead.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="p-2 text-muted hover:text-str-gold transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted hover:text-green-500 transition-colors" title="Mark as Converted">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted hover:text-foreground transition-colors" title="Archive">
                      <Archive className="w-4 h-4" />
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
