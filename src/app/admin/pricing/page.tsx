'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { useToast } from '@/components/ui/Toast'
import { getPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../actions'

type PricingPlan = {
  id: string
  name: string
  price: number
  billing_period: string
  features: string[]
  is_popular: boolean
  active: boolean
}

export default function AdminPricingPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    billing_period: 'monthly',
    features: '',
    is_popular: false,
    active: true,
  })

  const loadPlans = async () => {
    try {
      const data = await getPricingPlans()
      setPlans(data)
    } catch (error) {
      toast.error('Failed to load pricing plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('price', formData.price)
      formDataObj.append('billing_period', formData.billing_period)
      formDataObj.append('features', JSON.stringify(formData.features.split('\n').filter(f => f.trim())))
      formDataObj.append('is_popular', formData.is_popular.toString())
      formDataObj.append('active', formData.active.toString())

      if (editingPlan) {
        await updatePricingPlan(editingPlan.id, formDataObj)
        toast.success('Pricing plan updated successfully')
      } else {
        await createPricingPlan(formDataObj)
        toast.success('Pricing plan created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadPlans()
    } catch (error) {
      toast.error('Failed to save pricing plan')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      billing_period: plan.billing_period,
      features: plan.features.join('\n'),
      is_popular: plan.is_popular,
      active: plan.active,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return

    try {
      await deletePricingPlan(id)
      toast.success('Pricing plan deleted')
      loadPlans()
    } catch (error) {
      toast.error('Failed to delete pricing plan')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      billing_period: 'monthly',
      features: '',
      is_popular: false,
      active: true,
    })
    setEditingPlan(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Pricing Plans</h1>
          <p className="text-muted mt-1">Manage membership pricing and features.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.is_popular ? 'border-str-gold' : ''}>
            <CardContent className="p-6">
              {plan.is_popular && (
                <Badge variant="primary" size="sm" className="mb-3">
                  Most Popular
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-str-gold">
                    ${plan.price}
                  </span>
                  <span className="text-muted">/{plan.billing_period}</span>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-muted flex items-start">
                    <span className="text-str-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <Badge variant={plan.active ? 'primary' : 'secondary'} size="sm">
                  {plan.active ? 'Active' : 'Inactive'}
                </Badge>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 text-muted hover:text-str-gold transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
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
        title={editingPlan ? 'Edit Pricing Plan' : 'Add Pricing Plan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Billing Period</label>
              <Select
                value={formData.billing_period}
                onChange={(e) => setFormData({ ...formData, billing_period: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Features (one per line)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-[2px] bg-background text-foreground"
              rows={6}
              required
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_popular}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Mark as Popular</span>
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
              {loading ? 'Saving...' : editingPlan ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
