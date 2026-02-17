import { createServerSupabaseClient } from '@/lib/supabase/server';
import CareersPageClient from './CareersPageClient';

export default async function CareersPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch active career postings
  const { data: postings } = await supabase
    .from('career_postings')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  // Fetch social links for footer
  const { data: settings } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'social_links')
    .single();

  const socialLinks = settings?.value || {};

  return (
    <CareersPageClient
      postings={postings || []}
      socialLinks={socialLinks}
    />
  );
}
