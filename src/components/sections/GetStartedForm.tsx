'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { submitContactForm } from '@/app/actions/contact';

interface JotformSettings {
  enabled?: boolean;
  form_id?: string;
  embed_url?: string;
}

interface GetStartedFormProps {
  jotform?: JotformSettings | null;
  ghlFormUrl?: string | null;
}

export function GetStartedForm({ jotform, ghlFormUrl }: GetStartedFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    const result = await submitContactForm(formData);

    setIsSubmitting(false);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Reset form
      (document.getElementById('get-started-form') as HTMLFormElement)?.reset();
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  }

  // Priority: GHL > Jotform > Custom form
  const useGHL = !!ghlFormUrl;
  const useJotform = !useGHL && jotform?.enabled === true && !!jotform.embed_url;

  return (
    <section id="get-started" className="py-16 md:py-24 bg-str-black scroll-mt-20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
              Get Started
            </h2>
            <p className="text-concrete text-lg">
              Tell us about your goals and we'll help you find the right program.
            </p>
          </div>

          {useGHL ? (
            /* GoHighLevel Embed */
            <div className="bg-iron-gray rounded-md p-2 md:p-4">
              <iframe
                src={ghlFormUrl!}
                style={{ width: '100%', minHeight: '600px', border: 'none' }}
                title="Get Started Form"
                allowFullScreen
              />
            </div>
          ) : useJotform ? (
            /* Jotform Embed */
            <div className="bg-iron-gray rounded-md p-2 md:p-4">
              <iframe
                src={jotform!.embed_url}
                style={{ width: '100%', minHeight: '500px', border: 'none' }}
                title="Get Started Form"
                allowFullScreen
              />
            </div>
          ) : (
            /* Custom Form */
            <div className="bg-iron-gray rounded-md p-6 md:p-8">
              <form id="get-started-form" action={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-str-black border border-concrete/20 rounded-sm text-white placeholder-concrete/50 focus:outline-none focus:border-str-gold focus:ring-2 focus:ring-str-gold/20 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-str-black border border-concrete/20 rounded-sm text-white placeholder-concrete/50 focus:outline-none focus:border-str-gold focus:ring-2 focus:ring-str-gold/20 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-white font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 bg-str-black border border-concrete/20 rounded-sm text-white placeholder-concrete/50 focus:outline-none focus:border-str-gold focus:ring-2 focus:ring-str-gold/20 transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Goals */}
                <div>
                  <label htmlFor="goals" className="block text-white font-medium mb-2">
                    What are your fitness goals? *
                  </label>
                  <textarea
                    id="goals"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-str-black border border-concrete/20 rounded-sm text-white placeholder-concrete/50 focus:outline-none focus:border-str-gold focus:ring-2 focus:ring-str-gold/20 transition-colors resize-none"
                    placeholder="Tell us what you're looking to achieve..."
                  />
                </div>

                {/* SMS Consent */}
                <div className="text-xs text-concrete/70 leading-relaxed">
                  By providing your phone number, you agree to receive text messages from STR - Strength Through Resilience regarding your inquiry and our services. Message frequency varies. Message &amp; data rates may apply. Reply STOP to unsubscribe, HELP for help. View our{' '}
                  <a href="/terms" className="text-str-gold underline hover:text-str-gold/80">Terms of Service</a>{' '}and{' '}
                  <a href="/privacy" className="text-str-gold underline hover:text-str-gold/80">Privacy Policy</a>.
                </div>

                <input type="hidden" name="subject" value="New Get Started Inquiry" />
                <input type="hidden" name="source_page" value="home" />

                {/* Message Display */}
                {message && (
                  <div
                    className={`p-4 rounded-sm ${
                      message.type === 'success'
                        ? 'bg-success/20 border border-success text-success'
                        : 'bg-error/20 border border-error text-error'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </Button>

                <p className="text-center text-sm text-concrete">
                  We&apos;ll get back to you within 24 hours
                </p>
              </form>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
