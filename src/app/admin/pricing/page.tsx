'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { getPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../actions'

type Feature = {
  name: string
  included: boolean
  note?: string
}

type PricingPlan = {
  id: string
  name: string
  slug: string
  description: string
  price_monthly: number
  price_annual: number | null
  setup_fee: number
  features: Feature[]
  highlighted: boolean
  cta_text: string
  active: boolean
  sort_order: number
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
    description: '',
    price_monthly: '',
    price_annual: '',
    setup_fee: '0',
    features: '',
    highlighted: false,
    cta_text: 'Get Started',
    active: true,
    sort_order: '0',
  })

  const loadPlans = async () => {
    try {
      const data = await getPricingPlans()
      setPlans(data as PricingPlan[])
    } catch {
      toast.error('Failed to load pricing plans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('description', formData.description)
      formDataObj.append('price_monthly', formData.price_monthly)
      formDataObj.append('price_annual', formData.price_annual)
      formDataObj.append('setup_fee', formData.setup_fee)
      formDataObj.append('features', formData.features)
      formDataObj.append('highlighted', formData.highlighted.toString())
      formDataObj.append('cta_text', formData.cta_text)
      formDataObj.append('active', formData.active.toString())
      formDataObj.append('sort_order', formData.sort_order)

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
    } catch {
      toast.error('Failed to save pricing plan')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan)
    const featuresText = (plan.features || [])
      .map(f => {
        if (typeof f === 'string') return f
        return f.included ? f.name : `[excluded] ${f.name}`
      })
      .join('\n')

    setFormData({
      name: plan.name,
      description: plan.description || '',
      price_monthly: plan.price_monthly?.toString() || '0',
      price_annual: plan.price_annual?.toString() || '',
      setup_fee: plan.setup_fee?.toString() || '0',
      features: featuresText,
      highlighted: plan.highlighted || false,
      cta_text: plan.cta_text || 'Get Started',
      active: plan.active,
      sort_order: plan.sort_order?.toString() || '0',
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return

    try {
      await deletePricingPlan(id)
      toast.success('Pricing plan deleted')
      loadPlans()
    } catch {
      toast.error('Failed to delete pricing plan')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price_monthly: '',
      price_annual: '',
      setup_fee: '0',
      features: '',
      highlighted: false,
      cta_text: 'Get Started',
      active: true,
      sort_order: '0',
    })
    setEditingPlan(null)
  }

  const getIncludedFeatures = (features: Feature[]) => {
    if (!features || !Array.isArray(features)) return []
    return features.filter(f => typeof f === 'object' ? f.included : true)
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

      {loading && plans.length === 0 && (
        <p className="text-muted">Loading plans...</p>
      )}

      {!loading && plans.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted mb-4">No pricing plans yet.</p>
            <Button onClick={() => { resetForm(); setModalOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Plan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Plans Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.highlighted ? 'border-str-gold' : ''}>
            <CardContent className="p-6">
              {plan.highlighted && (
                <Badge variant="primary" size="sm" className="mb-3">
                  Most Popular
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="text-sm text-muted mb-3">{plan.description}</p>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-str-gold">
                    ${plan.price_monthly}
                  </span>
                  <span className="text-muted">/month</span>
                </div>
                {plan.price_annual != null && plan.price_annual > 0 && (
                  <p className="text-sm text-muted mt-1">
                    or ${plan.price_annual}/year
                  </p>
                )}
              </div>
              
              <ul className="space-y-2 mb-6">
                {getIncludedFeatures(plan.features).map((feature, idx) => (
                  <li key={idx} className="text-sm text-muted flex items-start">
                    <span className="text-str-gold mr-2">✓</span>
                    {typeof feature === 'string' ? feature : feature.name}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Badge variant={plan.active ? 'primary' : 'secondary'} size="sm">
                    {plan.active ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-xs text-muted">Order: {plan.sort_order}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-2 text-muted hover:text-str-gold transition-colors cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-muted hover:text-red-500 transition-colors cursor-pointer"
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
            <label className="block text-sm font-medium mb-2">Plan Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Premium"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-[2px] bg-background text-foreground"
              rows={2}
              placeholder="Short description of this plan"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Price *</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price_monthly}
                onChange={(e) => setFormData({ ...formData, price_monthly: e.target.value })}
                placeholder="99"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Annual Price</label>
              <Input
                type="number"
                step="0.01"
                value={formData.price_annual}
                onChange={(e) => setFormData({ ...formData, price_annual: e.target.value })}
                placeholder="950"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Setup Fee</label>
              <Input
                type="number"
                step="0.01"
                value={formData.setup_fee}
                onChange={(e) => setFormData({ ...formData, setup_fee: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Features (one per line, prefix with [excluded] for non-included)
            </label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-[2px] bg-background text-foreground"
              rows={6}
              placeholder={"Unlimited gym access\nAccess to all equipment\nLocker room access\n[excluded] Personal training"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">CTA Button Text</label>
              <Input
                value={formData.cta_text}
                onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                placeholder="Get Started"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sort Order</label>
              <Input
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.highlighted}
                onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Highlight as Popular</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setModalOpen(false); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
