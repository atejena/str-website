'use client'

import { useState, useEffect } from 'react'
import { Save, Settings as SettingsIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getSettings,
  updateSettings
} from '../actions'

type Settings = Record<string, any>

export default function AdminSettingsPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const loadSettings = async () => {
    try {
      const data = await getSettings()
      setSettings(data)
    } catch (error) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSettings(settings)
      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
          <p className="text-muted mt-1">Configure site settings and integrations.</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Gym Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            Gym Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gym Name</label>
                <Input
                  value={settings.gym_name || ''}
                  onChange={(e) => updateSetting('gym_name', e.target.value)}
                  placeholder="STR Gym"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tagline</label>
                <Input
                  value={settings.tagline || ''}
                  onChange={(e) => updateSetting('tagline', e.target.value)}
                  placeholder="Strength. Training. Results."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => updateSetting('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => updateSetting('email', e.target.value)}
                  placeholder="info@strgym.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Street Address</label>
              <Input
                value={settings.address_street || ''}
                onChange={(e) => updateSetting('address_street', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Input
                  value={settings.address_city || ''}
                  onChange={(e) => updateSetting('address_city', e.target.value)}
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Input
                  value={settings.address_state || ''}
                  onChange={(e) => updateSetting('address_state', e.target.value)}
                  placeholder="NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <Input
                  value={settings.address_zip || ''}
                  onChange={(e) => updateSetting('address_zip', e.target.value)}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Business Hours
          </h2>
          <div className="space-y-3">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <div className="capitalize font-medium text-foreground">{day}</div>
                <Input
                  value={settings[`hours_${day}_open`] || ''}
                  onChange={(e) => updateSetting(`hours_${day}_open`, e.target.value)}
                  placeholder="9:00 AM"
                />
                <Input
                  value={settings[`hours_${day}_close`] || ''}
                  onChange={(e) => updateSetting(`hours_${day}_close`, e.target.value)}
                  placeholder="8:00 PM"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <Input
                type="url"
                value={settings.social_facebook || ''}
                onChange={(e) => updateSetting('social_facebook', e.target.value)}
                placeholder="https://facebook.com/strgym"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <Input
                type="url"
                value={settings.social_instagram || ''}
                onChange={(e) => updateSetting('social_instagram', e.target.value)}
                placeholder="https://instagram.com/strgym"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <Input
                type="url"
                value={settings.social_youtube || ''}
                onChange={(e) => updateSetting('social_youtube', e.target.value)}
                placeholder="https://youtube.com/@strgym"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">TikTok</label>
              <Input
                type="url"
                value={settings.social_tiktok || ''}
                onChange={(e) => updateSetting('social_tiktok', e.target.value)}
                placeholder="https://tiktok.com/@strgym"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Integrations
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">TrainHeroic Whiteboard URL</label>
              <Input
                type="url"
                value={settings.trainheroic_whiteboard_url || ''}
                onChange={(e) => updateSetting('trainheroic_whiteboard_url', e.target.value)}
                placeholder="https://trainheroic.com/whiteboard/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GoHighLevel Widget ID</label>
              <Input
                value={settings.gohighlevel_widget_id || ''}
                onChange={(e) => updateSetting('gohighlevel_widget_id', e.target.value)}
                placeholder="widget_123456"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
              <Input
                value={settings.google_analytics_id || ''}
                onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps Embed URL</label>
              <Textarea
                value={settings.google_maps_embed_url || ''}
                onChange={(e) => updateSetting('google_maps_embed_url', e.target.value)}
                rows={3}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jotform */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Jotform Integration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.jotform_enabled === true || settings.jotform_enabled === 'true'}
                  onChange={(e) => updateSetting('jotform_enabled', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Enable Jotform</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Form ID</label>
              <Input
                value={settings.jotform_form_id || ''}
                onChange={(e) => updateSetting('jotform_form_id', e.target.value)}
                placeholder="123456789012345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Embed URL</label>
              <Textarea
                value={settings.jotform_embed_url || ''}
                onChange={(e) => updateSetting('jotform_embed_url', e.target.value)}
                rows={3}
                placeholder="https://form.jotform.com/..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="mr-2 h-5 w-5" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>
    </div>
  )
}
