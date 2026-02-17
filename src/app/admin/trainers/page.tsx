'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getTrainers, 
  createTrainer, 
  updateTrainer, 
  deleteTrainer 
} from '../actions'

type Trainer = {
  id: string
  name: string
  slug: string
  title: string
  specialty: string
  bio: string
  short_bio: string
  certifications: string[]
  experience_years: number
  photo: string | null
  instagram: string | null
  quote: string | null
  featured: boolean
  active: boolean
  sort_order: number
}

export default function AdminTrainersPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    specialty: '',
    bio: '',
    short_bio: '',
    certifications: '',
    experience_years: '0',
    instagram: '',
    quote: '',
    featured: false,
    active: true,
    sort_order: '0',
  })

  const loadTrainers = async () => {
    try {
      const data = await getTrainers()
      setTrainers(data)
    } catch (error) {
      toast.error('Failed to load trainers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTrainers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('title', formData.title)
      formDataObj.append('specialty', formData.specialty)
      formDataObj.append('bio', formData.bio)
      formDataObj.append('short_bio', formData.short_bio)
      formDataObj.append('certifications', formData.certifications)
      formDataObj.append('experience_years', formData.experience_years)
      formDataObj.append('instagram', formData.instagram)
      formDataObj.append('quote', formData.quote)
      formDataObj.append('featured', formData.featured.toString())
      formDataObj.append('active', formData.active.toString())
      formDataObj.append('sort_order', formData.sort_order)
      
      if (photoFile) {
        formDataObj.append('photo', photoFile)
      }
      if (editingTrainer?.photo) {
        formDataObj.append('existing_photo', editingTrainer.photo)
      }

      if (editingTrainer) {
        await updateTrainer(editingTrainer.id, formDataObj)
        toast.success('Trainer updated successfully')
      } else {
        await createTrainer(formDataObj)
        toast.success('Trainer created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadTrainers()
    } catch (error) {
      toast.error('Failed to save trainer')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (trainer: Trainer) => {
    setEditingTrainer(trainer)
    setFormData({
      name: trainer.name,
      title: trainer.title,
      specialty: trainer.specialty,
      bio: trainer.bio,
      short_bio: trainer.short_bio,
      certifications: trainer.certifications.join(', '),
      experience_years: trainer.experience_years.toString(),
      instagram: trainer.instagram || '',
      quote: trainer.quote || '',
      featured: trainer.featured,
      active: trainer.active,
      sort_order: trainer.sort_order.toString(),
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trainer?')) return

    try {
      await deleteTrainer(id)
      toast.success('Trainer deleted')
      loadTrainers()
    } catch (error) {
      toast.error('Failed to delete trainer')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      specialty: '',
      bio: '',
      short_bio: '',
      certifications: '',
      experience_years: '0',
      instagram: '',
      quote: '',
      featured: false,
      active: true,
      sort_order: '0',
    })
    setPhotoFile(null)
    setEditingTrainer(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Trainers</h1>
          <p className="text-muted mt-1">Manage gym trainers and instructors.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      {/* Trainers Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <Card key={trainer.id}>
            <CardContent className="p-6">
              {trainer.photo && (
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-full h-48 object-cover rounded-[2px] mb-4"
                />
              )}
              <div className="mb-4">
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {trainer.name}
                </h3>
                <p className="text-str-gold text-sm font-medium">{trainer.title}</p>
                <p className="text-muted text-sm mt-1">{trainer.specialty}</p>
              </div>
              
              {trainer.featured && (
                <Badge variant="primary" size="sm" className="mb-3">
                  Featured
                </Badge>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Badge variant={trainer.active ? 'primary' : 'secondary'} size="sm">
                    {trainer.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-xs text-muted">{trainer.experience_years} yrs</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(trainer)}
                    className="p-2 text-muted hover:text-str-gold transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(trainer.id)}
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
        title={editingTrainer ? 'Edit Trainer' : 'Add Trainer'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Specialty *</label>
              <Input
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Bio *</label>
            <Input
              value={formData.short_bio}
              onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio *</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Certifications (comma-separated)
            </label>
            <Input
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="e.g., NASM-CPT, ACE-CPT, CrossFit Level 1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Experience (years)</label>
              <Input
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle</label>
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Quote</label>
            <Textarea
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              rows={2}
              placeholder="Inspirational quote or motto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photo</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-border rounded-[2px] cursor-pointer hover:bg-surface">
                <Upload className="w-4 h-4" />
                <span className="text-sm">
                  {photoFile ? photoFile.name : 'Choose file'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              {editingTrainer?.photo && !photoFile && (
                <span className="text-xs text-muted">Current photo will be kept</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort Order</label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
            </label>
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
              {loading ? 'Saving...' : editingTrainer ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
