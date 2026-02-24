'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const message = formData.get('message') as string;
    const subject = formData.get('subject') as string | null;
    const source_page = formData.get('source_page') as string | null;
    const sms_consent_transactional = formData.get('sms_consent_transactional') === 'on';
    const sms_consent_marketing = formData.get('sms_consent_marketing') === 'on';

    // Validate required fields
    if (!name || !email || !message) {
      return {
        success: false,
        message: 'Please fill in all required fields.',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address.',
      };
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      message,
      subject: subject || null,
      source_page: source_page || null,
      sms_consent_transactional,
      sms_consent_marketing,
    });

    if (error) {
      console.error('Contact form submission error:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again or email us directly.',
      };
    }

    revalidatePath('/');

    return {
      success: true,
      message: 'Thank you! We\'ll get back to you within 24 hours.',
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
