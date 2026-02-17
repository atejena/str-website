'use client'

import { useState, useEffect } from 'react'
import { Save, Settings as SettingsIcon, RefreshCw } from 'lucide-react'
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
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<Record<string, unknown> | null>(null)

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

  const triggerSync = async (endpoint: 'sync' | 'sync/reviews' | 'sync/instagram') => {
    const syncKey = settings.sync_secret_key || prompt('Enter your SYNC_SECRET_KEY:')
    if (!syncKey) return

    setSyncing(true)
    setSyncResult(null)
    try {
      const res = await fetch(`/api/${endpoint}?key=${encodeURIComponent(syncKey)}`)
      const data = await res.json()
      setSyncResult(data)
      if (data.success || data.reviews || data.instagram) {
        toast.success('Sync completed successfully')
      } else {
        toast.error(data.error || 'Sync failed')
      }
    } catch (error) {
      toast.error('Sync request failed')
    } finally {
      setSyncing(false)
    }
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
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle</label>
              <Input
                value={settings.instagram_handle || ''}
                onChange={(e) => updateSetting('instagram_handle', e.target.value)}
                placeholder="trainwithstr"
              />
              <p className="text-xs text-muted mt-1">
                Your Instagram username (without @). Used for auto-sync and display.
              </p>
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
            
            <div className="border-t border-border pt-4 mt-6">
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                GoHighLevel Form Embeds
              </h3>
              <p className="text-sm text-muted mb-4">
                Add GHL form URLs to embed forms on your site. GHL forms take priority over Jotform and custom forms.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Get Started Form URL (Homepage)</label>
                  <Input
                    type="url"
                    value={settings.ghl_get_started_form_url || ''}
                    onChange={(e) => updateSetting('ghl_get_started_form_url', e.target.value)}
                    placeholder="https://api.leadconnectorhq.com/widget/form/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Form URL (Contact Page)</label>
                  <Input
                    type="url"
                    value={settings.ghl_contact_form_url || ''}
                    onChange={(e) => updateSetting('ghl_contact_form_url', e.target.value)}
                    placeholder="https://api.leadconnectorhq.com/widget/form/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">General Form URL (Fallback)</label>
                  <Input
                    type="url"
                    value={settings.ghl_general_form_url || ''}
                    onChange={(e) => updateSetting('ghl_general_form_url', e.target.value)}
                    placeholder="https://api.leadconnectorhq.com/widget/form/..."
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
                <Input
                  value={settings.google_analytics_id || ''}
                  onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
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
            <div>
              <label className="block text-sm font-medium mb-2">Google Place ID</label>
              <Input
                value={settings.google_place_id || ''}
                onChange={(e) => updateSetting('google_place_id', e.target.value)}
                placeholder="ChIJUbJkArezw4kRrIcYZFBjQlk"
              />
              <p className="text-xs text-muted mt-1">
                Used for Google Reviews auto-sync, &quot;Leave a Review&quot; and &quot;See All Reviews on Google&quot; links. Default: STR Fitness Cranford NJ. Find your Place ID at{' '}
                <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-str-gold underline">
                  Google Place ID Finder
                </a>.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Feed Embed Code</label>
              <Textarea
                value={settings.instagram_feed_embed || ''}
                onChange={(e) => updateSetting('instagram_feed_embed', e.target.value)}
                rows={5}
                placeholder="Paste widget embed code from SnapWidget, Elfsight, etc."
              />
              <p className="text-xs text-muted mt-1">
                Paste an Instagram feed widget embed code (from SnapWidget, Elfsight, etc.) to display an Instagram feed on the gallery page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Sync Controls */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Auto-Sync
          </h2>
          <p className="text-sm text-muted mb-6">
            Sync Google Reviews and Instagram posts to your website. Requires <code className="bg-surface px-1 py-0.5 rounded text-xs">SYNC_SECRET_KEY</code>, <code className="bg-surface px-1 py-0.5 rounded text-xs">GOOGLE_PLACES_API_KEY</code>, and optionally <code className="bg-surface px-1 py-0.5 rounded text-xs">INSTAGRAM_ACCESS_TOKEN</code> environment variables on Vercel.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sync Secret Key (for testing from browser)</label>
              <Input
                type="password"
                value={settings.sync_secret_key || ''}
                onChange={(e) => updateSetting('sync_secret_key', e.target.value)}
                placeholder="Paste your SYNC_SECRET_KEY here to test sync"
              />
              <p className="text-xs text-muted mt-1">
                This is NOT saved to the database — only used to test sync from this page. The actual key is set as an env var.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button
                variant="outline"
                onClick={() => triggerSync('sync/reviews')}
                disabled={syncing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                Sync Google Reviews
              </Button>
              <Button
                variant="outline"
                onClick={() => triggerSync('sync/instagram')}
                disabled={syncing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                Sync Instagram Posts
              </Button>
              <Button
                onClick={() => triggerSync('sync')}
                disabled={syncing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                Sync All
              </Button>
            </div>
            {syncResult && (
              <div className="bg-surface border border-border rounded p-4 mt-4">
                <h3 className="text-sm font-bold mb-2">Sync Result:</h3>
                <pre className="text-xs text-muted overflow-auto max-h-48 whitespace-pre-wrap">
                  {JSON.stringify(syncResult, null, 2)}
                </pre>
              </div>
            )}
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

      {/* Terms & Conditions */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Terms &amp; Conditions
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Terms Content (Markdown)</label>
              <Textarea
                value={settings.terms_content || ''}
                onChange={(e) => updateSetting('terms_content', e.target.value)}
                rows={20}
                placeholder="# Terms of Service&#10;&#10;## 1. Acceptance of Terms&#10;&#10;Your terms content here..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted mt-2">
                Use Markdown formatting. This content will be displayed on the /terms page.
              </p>
            </div>
            
            <div className="bg-surface border border-border rounded p-4">
              <h3 className="text-sm font-bold mb-2">Markdown Formatting Guide:</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-muted font-mono">
                <div><span className="text-foreground"># Heading 1</span></div>
                <div><span className="text-foreground">## Heading 2</span></div>
                <div><span className="text-foreground">**bold text**</span></div>
                <div><span className="text-foreground">*italic text*</span></div>
                <div><span className="text-foreground">- list item</span></div>
                <div><span className="text-foreground">1. numbered item</span></div>
                <div><span className="text-foreground">[link text](url)</span></div>
                <div><span className="text-foreground">&gt; blockquote</span></div>
                <div><span className="text-foreground">---</span> (horizontal rule)</div>
                <div><span className="text-foreground">`code`</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-6">
            Privacy Policy
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Privacy Policy Content (Markdown)</label>
              <Textarea
                value={settings.privacy_content || ''}
                onChange={(e) => updateSetting('privacy_content', e.target.value)}
                rows={20}
                placeholder="# Privacy Policy&#10;&#10;## 1. Information We Collect&#10;&#10;Your privacy policy content here..."
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted mt-2">
                Use Markdown formatting. This content will be displayed on the /privacy page.
              </p>
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
