'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getFAQs, 
  createFAQ, 
  updateFAQ, 
  deleteFAQ 
} from '../actions'

type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  sort_order: number
  active: boolean
  created_at: string
}

export default function AdminFAQsPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    sort_order: '0',
    active: true,
  })

  const loadFAQs = async () => {
    try {
      const data = await getFAQs()
      setFaqs(data)
    } catch (error) {
      toast.error('Failed to load FAQs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFAQs()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('question', formData.question)
      formDataObj.append('answer', formData.answer)
      formDataObj.append('category', formData.category)
      formDataObj.append('sort_order', formData.sort_order)
      formDataObj.append('active', formData.active.toString())

      if (editingFAQ) {
        await updateFAQ(editingFAQ.id, formDataObj)
        toast.success('FAQ updated successfully')
      } else {
        await createFAQ(formDataObj)
        toast.success('FAQ created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadFAQs()
    } catch (error) {
      toast.error('Failed to save FAQ')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      sort_order: faq.sort_order.toString(),
      active: faq.active,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      await deleteFAQ(id)
      toast.success('FAQ deleted')
      loadFAQs()
    } catch (error) {
      toast.error('Failed to delete FAQ')
    }
  }

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      sort_order: '0',
      active: true,
    })
    setEditingFAQ(null)
  }

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = []
    }
    acc[faq.category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  const categories = ['Getting Started', 'Training', 'Membership', 'Facilities', 'General']

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">FAQs</h1>
          <p className="text-muted mt-1">Manage frequently asked questions.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {/* FAQs by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryFAQs = faqsByCategory[category] || []
          if (categoryFAQs.length === 0) return null

          return (
            <div key={category}>
              <h2 className="text-xl font-display font-bold text-foreground mb-4">
                {category}
              </h2>
              <div className="space-y-3">
                {categoryFAQs.map((faq) => (
                  <Card key={faq.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-display font-bold text-foreground">
                              {faq.question}
                            </h3>
                            {!faq.active && (
                              <Badge variant="secondary" size="sm">
                                Inactive
                              </Badge>
                            )}
                            <span className="text-xs text-muted">
                              Order: {faq.sort_order}
                            </span>
                          </div>
                          <p className="text-muted">{faq.answer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(faq)}
                            className="p-2 text-muted hover:text-str-gold transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(faq.id)}
                            className="p-2 text-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editingFAQ ? 'Edit FAQ' : 'Add FAQ'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Question *</label>
            <Input
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Answer *</label>
            <Textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Getting Started">Getting Started</option>
                <option value="Training">Training</option>
                <option value="Membership">Membership</option>
                <option value="Facilities">Facilities</option>
                <option value="General">General</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort Order</label>
              <Input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setModalOpen(false); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingFAQ ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
