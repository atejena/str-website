'use client'

import { useState, useEffect } from 'react'
import { Mail, Check, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getLeads,
  updateLead
} from '../actions'

type Lead = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  responded: boolean
  notes: string | null
  created_at: string
}

export default function AdminLeadsPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [notes, setNotes] = useState('')

  const loadLeads = async () => {
    try {
      const data = await getLeads()
      setLeads(data)
    } catch (error) {
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLeads()
  }, [])

  const handleToggleExpand = async (lead: Lead) => {
    if (!lead.read) {
      // Mark as read when expanded
      try {
        await updateLead(lead.id, { read: true })
        loadLeads()
      } catch (error) {
        toast.error('Failed to mark as read')
      }
    }
    
    setExpandedLead(expandedLead === lead.id ? null : lead.id)
  }

  const handleToggleRead = async (lead: Lead) => {
    try {
      await updateLead(lead.id, { read: !lead.read })
      toast.success(lead.read ? 'Marked as unread' : 'Marked as read')
      loadLeads()
    } catch (error) {
      toast.error('Failed to update lead')
    }
  }

  const handleToggleResponded = async (lead: Lead) => {
    try {
      await updateLead(lead.id, { responded: !lead.responded })
      toast.success(lead.responded ? 'Marked as not responded' : 'Marked as responded')
      loadLeads()
    } catch (error) {
      toast.error('Failed to update lead')
    }
  }

  const handleOpenNotes = (lead: Lead) => {
    setSelectedLead(lead)
    setNotes(lead.notes || '')
    setModalOpen(true)
  }

  const handleSaveNotes = async () => {
    if (!selectedLead) return
    
    setLoading(true)
    try {
      await updateLead(selectedLead.id, { notes })
      toast.success('Notes saved successfully')
      setModalOpen(false)
      loadLeads()
    } catch (error) {
      toast.error('Failed to save notes')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  // Stats
  const stats = {
    total: leads.length,
    unread: leads.filter(l => !l.read).length,
    notResponded: leads.filter(l => !l.responded).length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Leads</h1>
          <p className="text-muted mt-1">Manage contact form submissions.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Total Leads</p>
                <p className="text-3xl font-display font-bold text-foreground mt-1">
                  {stats.total}
                </p>
              </div>
              <Mail className="w-8 h-8 text-muted" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Unread</p>
                <p className="text-3xl font-display font-bold text-str-gold mt-1">
                  {stats.unread}
                </p>
              </div>
              <Mail className="w-8 h-8 text-str-gold" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Needs Response</p>
                <p className="text-3xl font-display font-bold text-orange-500 mt-1">
                  {stats.notResponded}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {leads.map((lead) => (
          <Card key={lead.id} className={!lead.read ? 'border-str-gold' : ''}>
            <CardContent className="p-6">
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => handleToggleExpand(lead)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {!lead.read && (
                      <div className="w-2 h-2 rounded-full bg-str-gold" />
                    )}
                    <h3 className="text-lg font-display font-bold text-foreground">
                      {lead.name}
                    </h3>
                    <Badge variant={lead.responded ? 'primary' : 'secondary'} size="sm">
                      {lead.responded ? 'Responded' : 'New'}
                    </Badge>
                    {lead.notes && (
                      <Badge variant="outline" size="sm">
                        Has Notes
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted space-y-1">
                    <div>
                      <span className="font-medium">Email:</span> {lead.email}
                    </div>
                    {lead.phone && (
                      <div>
                        <span className="font-medium">Phone:</span> {lead.phone}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Subject:</span> {lead.subject}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {formatDate(lead.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {expandedLead === lead.id ? (
                    <ChevronUp className="w-5 h-5 text-muted" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted" />
                  )}
                </div>
              </div>

              {expandedLead === lead.id && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Message:</p>
                    <p className="text-muted whitespace-pre-wrap">{lead.message}</p>
                  </div>

                  {lead.notes && (
                    <div className="mb-4 p-4 bg-surface rounded-[2px]">
                      <p className="text-sm font-medium mb-2">Internal Notes:</p>
                      <p className="text-muted text-sm whitespace-pre-wrap">{lead.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleRead(lead)
                      }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      {lead.read ? 'Mark Unread' : 'Mark Read'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleResponded(lead)
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {lead.responded ? 'Mark Not Responded' : 'Mark Responded'}
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenNotes(lead)
                      }}
                    >
                      {lead.notes ? 'Edit Notes' : 'Add Notes'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notes Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Lead Notes"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Internal Notes for {selectedLead?.name}
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Add internal notes about this lead..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveNotes} disabled={loading}>
              {loading ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
