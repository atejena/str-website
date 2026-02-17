'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { getCareers, createCareer, updateCareer, deleteCareer } from '../actions'

type Career = {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  active: boolean
  created_at: string
}

export default function AdminCareersPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCareer, setEditingCareer] = useState<Career | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employment_type: 'full-time',
    description: '',
    requirements: '',
    responsibilities: '',
    active: true,
  })

  const loadCareers = async () => {
    try {
      const data = await getCareers()
      setCareers(data)
    } catch (error) {
      toast.error('Failed to load career postings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCareers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('title', formData.title)
      formDataObj.append('department', formData.department)
      formDataObj.append('location', formData.location)
      formDataObj.append('employment_type', formData.employment_type)
      formDataObj.append('description', formData.description)
      formDataObj.append('requirements', JSON.stringify(formData.requirements.split('\n').filter(r => r.trim())))
      formDataObj.append('responsibilities', JSON.stringify(formData.responsibilities.split('\n').filter(r => r.trim())))
      formDataObj.append('active', formData.active.toString())

      if (editingCareer) {
        await updateCareer(editingCareer.id, formDataObj)
        toast.success('Career posting updated successfully')
      } else {
        await createCareer(formDataObj)
        toast.success('Career posting created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadCareers()
    } catch (error) {
      toast.error('Failed to save career posting')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (career: Career) => {
    setEditingCareer(career)
    setFormData({
      title: career.title,
      department: career.department,
      location: career.location,
      employment_type: career.employment_type,
      description: career.description,
      requirements: career.requirements.join('\n'),
      responsibilities: career.responsibilities.join('\n'),
      active: career.active,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this career posting?')) return

    try {
      await deleteCareer(id)
      toast.success('Career posting deleted')
      loadCareers()
    } catch (error) {
      toast.error('Failed to delete career posting')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      employment_type: 'full-time',
      description: '',
      requirements: '',
      responsibilities: '',
      active: true,
    })
    setEditingCareer(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Career Postings</h1>
          <p className="text-muted mt-1">Manage job openings and applications.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Jobs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Type
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
                {careers.map((career) => (
                  <tr key={career.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-display font-bold text-foreground">
                        {career.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{career.department}</td>
                    <td className="px-6 py-4 text-muted">{career.location}</td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" size="sm">
                        {career.employment_type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={career.active ? 'primary' : 'secondary'} size="sm">
                        {career.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(career)}
                          className="p-2 text-muted hover:text-str-gold transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(career.id)}
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
        title={editingCareer ? 'Edit Career Posting' : 'Add Career Posting'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Department *</label>
              <Input
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Employment Type</label>
            <Select
              value={formData.employment_type}
              onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </Select>
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

          <div>
            <label className="block text-sm font-medium mb-2">
              Requirements (one per line) *
            </label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Responsibilities (one per line) *
            </label>
            <Textarea
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              rows={4}
              required
            />
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
              {loading ? 'Saving...' : editingCareer ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
