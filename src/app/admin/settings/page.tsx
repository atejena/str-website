'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { siteSettings } from '@/data/settings';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted mt-1">Manage your website settings and business information.</p>
      </div>

      {/* Business Info */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-display font-bold text-foreground">Business Information</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              defaultValue={siteSettings.gymName}
            />
            <Input
              label="Tagline"
              defaultValue={siteSettings.tagline}
            />
          </div>

          <Input
            label="Email"
            type="email"
            defaultValue={siteSettings.email}
          />

          <Input
            label="Phone"
            type="tel"
            defaultValue={siteSettings.phone}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Street Address"
              defaultValue={siteSettings.address.street}
            />
            <Input
              label="Suite/Unit"
              defaultValue=""
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="City"
              defaultValue={siteSettings.address.city}
            />
            <Input
              label="State"
              defaultValue={siteSettings.address.state}
            />
            <Input
              label="ZIP Code"
              defaultValue={siteSettings.address.zip}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-display font-bold text-foreground">Social Media</h2>

          <Input
            label="Instagram URL"
            type="url"
            placeholder="https://instagram.com/yourhandle"
            defaultValue={siteSettings.socialLinks.instagram || ''}
          />

          <Input
            label="Facebook URL"
            type="url"
            placeholder="https://facebook.com/yourpage"
            defaultValue={siteSettings.socialLinks.facebook || ''}
          />

          <Input
            label="YouTube URL"
            type="url"
            placeholder="https://youtube.com/yourchannel"
            defaultValue={siteSettings.socialLinks.youtube || ''}
          />
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-display font-bold text-foreground">Business Hours</h2>

          <div className="space-y-4">
            {siteSettings.businessHours.map((hours) => (
              <div key={hours.day} className="grid grid-cols-3 gap-4 items-center">
                <span className="text-foreground font-display">{hours.day}</span>
                <Input
                  placeholder="Open time"
                  defaultValue={hours.closed ? '' : hours.open}
                  disabled={hours.closed}
                />
                <Input
                  placeholder="Close time"
                  defaultValue={hours.closed ? '' : hours.close}
                  disabled={hours.closed}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-xl font-display font-bold text-foreground">SEO Settings</h2>

          <Input
            label="Site Title"
            defaultValue={siteSettings.gymName}
            helperText="The title that appears in browser tabs and search results"
          />

          <Textarea
            label="Meta Description"
            defaultValue={siteSettings.tagline}
            rows={3}
            helperText="A brief description of your website for search engines (150-160 characters)"
          />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          Save Changes
        </Button>
      </div>

      {/* Info Note */}
      <p className="text-sm text-muted text-center">
        Note: Settings changes will take effect after connecting to Supabase.
      </p>
    </div>
  );
}
