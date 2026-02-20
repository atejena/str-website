import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function isMaintenanceMode(): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'maintenance_mode')
    .single();

  const value = data?.value as Record<string, unknown> | null;
  return (value?.enabled as boolean) ?? false;
}
