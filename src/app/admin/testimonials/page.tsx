'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Check, X, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
  rejectTestimonial
} from '../actions'

type Testimonial = {
  id: string
  member_name: string
  rating: number
  quote: string
  source: string
  transformation_type: string | null
  timeframe: string | null
  results_summary: string | null
  featured: boolean
  approved: boolean
  created_at: string
}

export default function AdminTestimonialsPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    member_name: '',
    rating: '5',
    quote: '',
    source: 'website',
    transformation_type: '',
    timeframe: '',
    results_summary: '',
    featured: false,
    approved: true,
  })

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('member_name', formData.member_name)
      formDataObj.append('rating', formData.rating)
      formDataObj.append('quote', formData.quote)
      formDataObj.append('source', formData.source)
      formDataObj.append('transformation_type', formData.transformation_type)
      formDataObj.append('timeframe', formData.timeframe)
      formDataObj.append('results_summary', formData.results_summary)
      formDataObj.append('featured', formData.featured.toString())
      formDataObj.append('approved', formData.approved.toString())

      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial.id, formDataObj)
        toast.success('Testimonial updated successfully')
      } else {
        await createTestimonial(formDataObj)
        toast.success('Testimonial created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadTestimonials()
    } catch (error) {
      toast.error('Failed to save testimonial')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      member_name: testimonial.member_name,
      rating: testimonial.rating.toString(),
      quote: testimonial.quote,
      source: testimonial.source,
      transformation_type: testimonial.transformation_type || '',
      timeframe: testimonial.timeframe || '',
      results_summary: testimonial.results_summary || '',
      featured: testimonial.featured,
      approved: testimonial.approved,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      await deleteTestimonial(id)
      toast.success('Testimonial deleted')
      loadTestimonials()
    } catch (error) {
      toast.error('Failed to delete testimonial')
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await approveTestimonial(id)
      toast.success('Testimonial approved')
      loadTestimonials()
    } catch (error) {
      toast.error('Failed to approve testimonial')
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectTestimonial(id)
      toast.success('Testimonial rejected')
      loadTestimonials()
    } catch (error) {
      toast.error('Failed to reject testimonial')
    }
  }

  const resetForm = () => {
    setFormData({
      member_name: '',
      rating: '5',
      quote: '',
      source: 'website',
      transformation_type: '',
      timeframe: '',
      results_summary: '',
      featured: false,
      approved: true,
    })
    setEditingTestimonial(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Testimonials</h1>
          <p className="text-muted mt-1">Manage member reviews and success stories.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-display font-bold text-foreground">
                      {testimonial.member_name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'fill-str-gold text-str-gold'
                              : 'text-border'
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant="outline" size="sm">
                      {testimonial.source}
                    </Badge>
                    {testimonial.approved ? (
                      <Badge variant="primary" size="sm">
                        <Check className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge variant="secondary" size="sm">
                        <X className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                    {testimonial.featured && (
                      <Badge variant="primary" size="sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <blockquote className="text-foreground mb-3 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {(testimonial.transformation_type || testimonial.timeframe || testimonial.results_summary) && (
                    <div className="text-sm text-muted space-y-1">
                      {testimonial.transformation_type && (
                        <div>
                          <span className="font-medium">Type:</span> {testimonial.transformation_type}
                        </div>
                      )}
                      {testimonial.timeframe && (
                        <div>
                          <span className="font-medium">Timeframe:</span> {testimonial.timeframe}
                        </div>
                      )}
                      {testimonial.results_summary && (
                        <div>
                          <span className="font-medium">Results:</span> {testimonial.results_summary}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {!testimonial.approved && (
                    <button
                      onClick={() => handleApprove(testimonial.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Approve"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  )}
                  {testimonial.approved && (
                    <button
                      onClick={() => handleReject(testimonial.id)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                      title="Unapprove"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-muted hover:text-str-gold transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Member Name *</label>
              <Input
                value={formData.member_name}
                onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <Select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quote *</label>
            <Textarea
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Source</label>
            <Select
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            >
              <option value="website">Website</option>
              <option value="google">Google</option>
              <option value="mindbody">MindBody</option>
              <option value="yelp">Yelp</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Transformation Type</label>
            <Input
              value={formData.transformation_type}
              onChange={(e) => setFormData({ ...formData, transformation_type: e.target.value })}
              placeholder="e.g., Weight Loss, Muscle Gain, Athletic Performance"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Timeframe</label>
              <Input
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                placeholder="e.g., 3 months, 6 weeks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Results Summary</label>
              <Input
                value={formData.results_summary}
                onChange={(e) => setFormData({ ...formData, results_summary: e.target.value })}
                placeholder="e.g., Lost 20lbs, Ran first 5K"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.approved}
                onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Approved</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
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
              {loading ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
