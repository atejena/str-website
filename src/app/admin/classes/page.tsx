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
  getClasses, 
  createClass, 
  updateClass, 
  deleteClass,
  getTrainers 
} from '../actions'

type GymClass = {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  difficulty_level: string
  duration_minutes: number
  max_capacity: number
  instructor_id: string | null
  featured: boolean
  active: boolean
  sort_order: number
}

type Trainer = {
  id: string
  name: string
}

export default function AdminClassesPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [classes, setClasses] = useState<GymClass[]>([])
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<GymClass | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    difficulty_level: 'All Levels',
    duration_minutes: '60',
    max_capacity: '20',
    instructor_id: '',
    featured: false,
    active: true,
    sort_order: '0',
  })

  const loadData = async () => {
    try {
      const [classesData, trainersData] = await Promise.all([
        getClasses(),
        getTrainers()
      ])
      setClasses(classesData)
      setTrainers(trainersData)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('description', formData.description)
      formDataObj.append('short_description', formData.short_description)
      formDataObj.append('difficulty_level', formData.difficulty_level)
      formDataObj.append('duration_minutes', formData.duration_minutes)
      formDataObj.append('max_capacity', formData.max_capacity)
      formDataObj.append('instructor_id', formData.instructor_id)
      formDataObj.append('featured', formData.featured.toString())
      formDataObj.append('active', formData.active.toString())
      formDataObj.append('sort_order', formData.sort_order)

      if (editingClass) {
        await updateClass(editingClass.id, formDataObj)
        toast.success('Class updated successfully')
      } else {
        await createClass(formDataObj)
        toast.success('Class created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadData()
    } catch (error) {
      toast.error('Failed to save class')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (gymClass: GymClass) => {
    setEditingClass(gymClass)
    setFormData({
      name: gymClass.name,
      description: gymClass.description,
      short_description: gymClass.short_description,
      difficulty_level: gymClass.difficulty_level,
      duration_minutes: gymClass.duration_minutes.toString(),
      max_capacity: gymClass.max_capacity.toString(),
      instructor_id: gymClass.instructor_id || '',
      featured: gymClass.featured,
      active: gymClass.active,
      sort_order: gymClass.sort_order.toString(),
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this class?')) return

    try {
      await deleteClass(id)
      toast.success('Class deleted')
      loadData()
    } catch (error) {
      toast.error('Failed to delete class')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      short_description: '',
      difficulty_level: 'All Levels',
      duration_minutes: '60',
      max_capacity: '20',
      instructor_id: '',
      featured: false,
      active: true,
      sort_order: '0',
    })
    setEditingClass(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Classes</h1>
          <p className="text-muted mt-1">Manage gym classes and schedules.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Capacity
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
                  <tr key={gymClass.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-display font-bold text-foreground">
                        {gymClass.name}
                      </div>
                      {gymClass.featured && (
                        <Badge variant="primary" size="sm" className="mt-1">
                          Featured
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" size="sm">
                        {gymClass.difficulty_level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">{gymClass.duration_minutes} min</td>
                    <td className="px-6 py-4 text-muted">{gymClass.max_capacity}</td>
                    <td className="px-6 py-4">
                      <Badge variant={gymClass.active ? 'primary' : 'secondary'} size="sm">
                        {gymClass.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(gymClass)}
                          className="p-2 text-muted hover:text-str-gold transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(gymClass.id)}
                          className="p-2 text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editingClass ? 'Edit Class' : 'Add Class'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Class Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Short Description *</label>
            <Input
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <Select
                value={formData.difficulty_level}
                onChange={(e) => setFormData({ ...formData, difficulty_level: e.target.value })}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instructor</label>
              <Select
                value={formData.instructor_id}
                onChange={(e) => setFormData({ ...formData, instructor_id: e.target.value })}
              >
                <option value="">No Instructor</option>
                {trainers.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
              <Input
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Capacity</label>
              <Input
                type="number"
                value={formData.max_capacity}
                onChange={(e) => setFormData({ ...formData, max_capacity: e.target.value })}
                required
              />
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
              {loading ? 'Saving...' : editingClass ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
