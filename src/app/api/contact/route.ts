import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  honeypot: z.string().max(0), // Anti-spam
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, subject, message, honeypot } = result.data;

    // Anti-spam check
    if (honeypot) {
      // Bot detected - silently succeed but don't process
      return NextResponse.json({ success: true });
    }

    // PLACEHOLDER: Add your email service integration here
    // Options: Resend, SendGrid, Mailgun, Nodemailer, etc.
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'STR Website <noreply@trainwithstr.com>',
    //   to: process.env.CONTACT_EMAIL_TO,
    //   subject: `New Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // PLACEHOLDER: Save to Supabase contact_submissions table
    // const { error } = await supabase.from('contact_submissions').insert({
    //   first_name: firstName,
    //   last_name: lastName,
    //   email,
    //   phone,
    //   subject,
    //   message,
    //   status: 'new',
    // });

    // Log for now (remove in production)
    console.log('Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We\'ll get back to you soon!',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    );
  }
}
