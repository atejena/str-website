import { createServerSupabaseClient } from '@/lib/supabase/server';
import FaqPageClient from './FaqPageClient';
import type { FAQ } from '@/types/database';

// Map snake_case DB columns to camelCase FAQ fields
function mapFaq(row: Record<string, unknown>): FAQ {
  return {
    id: row.id as string,
    question: row.question as string,
    answer: row.answer as string,
    category: row.category as FAQ['category'],
    sortOrder: (row.sort_order as number) || 0,
    active: row.active as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export default async function FAQPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rawFaqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('active', true)
    .order('sort_order');

  const faqs: FAQ[] = (rawFaqs || []).map(mapFaq);

  return <FaqPageClient faqs={faqs} />;
}
