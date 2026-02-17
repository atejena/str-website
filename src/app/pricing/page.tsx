import { createServerSupabaseClient } from '@/lib/supabase/server';
import PricingPageClient from './PricingPageClient';
import type { MembershipPlan, FAQ } from '@/types';

export default async function PricingPage() {
  const supabase = await createServerSupabaseClient();

  const { data: plansData } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const { data: faqsData } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', 'Membership')
    .eq('active', true)
    .order('sort_order');

  // Map snake_case DB columns to camelCase types
  const plans: MembershipPlan[] = (plansData || []).map((p: Record<string, unknown>) => ({
    id: p.id as string,
    name: p.name as string,
    slug: p.slug as string,
    tagline: (p.tagline as string) || '',
    description: (p.description as string) || '',
    priceMonthly: (p.price_monthly as number) || 0,
    priceAnnual: p.price_annual as number | undefined,
    setupFee: p.setup_fee as number | undefined,
    contractMonths: p.contract_months as number | undefined,
    features: (p.features as MembershipPlan['features']) || [],
    includedClasses: (p.included_classes as string[]) || [],
    guestPassesMonthly: (p.guest_passes_monthly as number) || 0,
    personalTrainingDiscount: p.personal_training_discount as number | undefined,
    freezeDaysYearly: p.freeze_days_yearly as number | undefined,
    highlighted: (p.highlighted as boolean) || false,
    ctaText: (p.cta_text as string) || 'Get Started',
    active: (p.active as boolean) || true,
    sortOrder: (p.sort_order as number) || 0,
    createdAt: (p.created_at as string) || '',
    updatedAt: (p.updated_at as string) || '',
  }));

  const faqs: FAQ[] = (faqsData || []).map((f: Record<string, unknown>) => ({
    id: f.id as string,
    question: (f.question as string) || '',
    answer: (f.answer as string) || '',
    category: (f.category as FAQ['category']) || 'Membership',
    sortOrder: (f.sort_order as number) || 0,
    active: (f.active as boolean) || true,
    createdAt: (f.created_at as string) || '',
    updatedAt: (f.updated_at as string) || '',
  }));

  return <PricingPageClient plans={plans} faqs={faqs} />;
}
