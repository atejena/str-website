import { createServerSupabaseClient } from '@/lib/supabase/server';
import ProgrammingPageClient from './ProgrammingPageClient';

export default async function ProgrammingPage() {
  const supabase = await createServerSupabaseClient();

  const { data: settings } = await supabase
    .from('site_settings')
    .select('key, value')
    .eq('key', 'integrations')
    .single();

  const whiteboardUrl =
    (settings?.value as Record<string, string> | null)?.trainheroic_whiteboard_url || '';

  return <ProgrammingPageClient whiteboardUrl={whiteboardUrl} />;
}
