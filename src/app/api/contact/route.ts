import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = body.name || [body.firstName, body.lastName].filter(Boolean).join(' ');
    const email = body.email;
    const phone = body.phone || null;
    const message = body.message || '';
    const subject = body.subject || null;
    const sourcePage = body.source_page || null;
    const smsConsent = body.sms_consent || false;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Anti-spam check (honeypot from contact page form)
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const supabase = await createAdminClient();

    const { error } = await supabase.from('contact_submissions').insert({
      name,
      email,
      phone,
      message,
      subject,
      source_page: sourcePage,
      sms_consent: smsConsent,
    });

    if (error) {
      console.error('Contact form submission error:', error);
      // Still return success to user even if DB insert fails
      // (column may not exist yet for sms_consent — try without it)
      if (error.message?.includes('sms_consent')) {
        const { error: retryError } = await supabase.from('contact_submissions').insert({
          name,
          email,
          phone,
          message,
          subject,
          source_page: sourcePage,
        });
        if (retryError) {
          console.error('Contact form retry error:', retryError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you soon.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
