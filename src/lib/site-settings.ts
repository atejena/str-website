import { createServerSupabaseClient } from '@/lib/supabase/server';

export interface GymInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const DEFAULT_GYM_INFO: GymInfo = {
  name: 'STR - Strength Through Resilience',
  email: 'info@trainwithstr.com',
  phone: '',
  address: {
    street: '8 Eastman St, Suite 3',
    city: 'Cranford',
    state: 'NJ',
    zip: '07016',
  },
};

export async function getGymInfo(): Promise<GymInfo> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'gym_info')
      .single();

    if (!data?.value) return DEFAULT_GYM_INFO;

    const val = data.value as Record<string, unknown>;
    const addr = (val.address || {}) as Record<string, string>;

    return {
      name: (val.name as string) || DEFAULT_GYM_INFO.name,
      email: (val.email as string) || DEFAULT_GYM_INFO.email,
      phone: (val.phone as string) || DEFAULT_GYM_INFO.phone,
      address: {
        street: addr.street || DEFAULT_GYM_INFO.address.street,
        city: addr.city || DEFAULT_GYM_INFO.address.city,
        state: addr.state || DEFAULT_GYM_INFO.address.state,
        zip: addr.zip || DEFAULT_GYM_INFO.address.zip,
      },
    };
  } catch {
    return DEFAULT_GYM_INFO;
  }
}
