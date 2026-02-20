'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Send, CheckCircle } from 'lucide-react';
import type { SocialLinks } from './MaintenanceGuard';

interface UnderConstructionProps {
  title: string;
  subtitle: string;
  showLogo: boolean;
  socialLinks?: SocialLinks;
  contactEmail?: string;
}

// TikTok icon (lucide doesn't have one)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.3z" />
    </svg>
  );
}

export default function UnderConstruction({
  title,
  subtitle,
  showLogo,
  socialLinks,
  contactEmail = 'info@trainwithstr.com',
}: UnderConstructionProps) {
  const hasSocials = socialLinks && Object.values(socialLinks).some(v => !!v);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          sms_consent: formData.get('sms_consent') === 'on',
          subject: 'Coming Soon Page Inquiry',
          source_page: 'coming-soon',
        }),
      });

      if (res.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
        setErrorMsg('Something went wrong. Please try again.');
      }
    } catch {
      setFormState('error');
      setErrorMsg(`Unable to send. Please email ${contactEmail} directly.`);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0f] overflow-y-auto">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-gradient-shift bg-[length:400%_400%] bg-gradient-to-br from-[#15151d] via-[#1a1a2e] to-[#0f0f1a]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-str-gold/5 blur-[120px]" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center px-6 max-w-2xl mx-auto">
          {showLogo && (
            <div className="mb-10 flex justify-center">
              <Image
                src="/images/str-logo.webp"
                alt="STR Fitness"
                width={180}
                height={90}
                className="h-auto w-auto max-w-[180px]"
                priority
              />
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-lg mx-auto">
              {subtitle}
            </p>
          )}

          {/* Decorative line */}
          <div className="w-20 h-0.5 bg-str-gold mx-auto mb-10" />

          {/* Contact Form */}
          <div className="max-w-md mx-auto mb-10">
            {formState === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-str-gold mx-auto mb-3" />
                <p className="text-white font-display font-bold text-lg mb-1">Message Sent!</p>
                <p className="text-gray-400 text-sm">We&apos;ll be in touch soon.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-str-gold text-sm underline hover:text-str-gold/80 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <p className="text-center font-display text-sm font-bold uppercase tracking-widest text-str-gold mb-1">
                  STR - Strength Through Resilience
                </p>
                <p className="text-center text-gray-400 text-sm mb-4">
                  Interested? Drop us a message and we&apos;ll keep you posted.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Name *"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-str-gold/50 transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-str-gold/50 transition-colors"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email *"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-str-gold/50 transition-colors"
                />

                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your fitness goals..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 text-sm focus:outline-none focus:border-str-gold/50 transition-colors resize-none"
                />

                {/* SMS Consent Checkbox — A2P Compliant */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sms_consent_cs"
                    name="sms_consent"
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent cursor-pointer accent-[#C8A951] flex-shrink-0"
                  />
                  <label htmlFor="sms_consent_cs" className="text-[11px] text-gray-500 leading-relaxed cursor-pointer">
                    I agree to receive text messages from <strong className="text-gray-400">STR - Strength Through Resilience</strong> regarding my inquiry, account updates, service notifications, and promotional offers. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.{' '}
                    <Link href="/privacy" className="text-str-gold/70 underline hover:text-str-gold">Privacy Policy</Link>{' '}&amp;{' '}
                    <Link href="/terms" className="text-str-gold/70 underline hover:text-str-gold">Terms of Service</Link>.
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-str-gold text-black font-display font-bold uppercase tracking-wider text-sm rounded hover:bg-str-gold/90 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {formState === 'submitting' ? 'Sending...' : 'Get In Touch'}
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          {hasSocials && (
            <div className="flex items-center justify-center gap-5">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-str-gold transition-colors duration-300 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-str-gold transition-colors duration-300 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-str-gold transition-colors duration-300 group"
                  aria-label="Subscribe on YouTube"
                >
                  <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-str-gold transition-colors duration-300 group"
                  aria-label="Follow us on TikTok"
                >
                  <TikTokIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 text-center">
        <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
          <Link href="/privacy" className="hover:text-gray-400 transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-gray-400 transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
