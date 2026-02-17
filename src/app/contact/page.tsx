import { createServerSupabaseClient } from '@/lib/supabase/server';
import ContactPageClient from './ContactPageClient';

export default async function ContactPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch site settings
  const { data: settingsRows } = await supabase
    .from('site_settings')
    .select('key, value');

  const settings: Record<string, unknown> = {};
  settingsRows?.forEach((row: { key: string; value: unknown }) => {
    settings[row.key] = row.value;
  });

  return <ContactPageClient settings={settings} />;
}
