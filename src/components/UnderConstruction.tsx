'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import type { SocialLinks } from './MaintenanceGuard';

interface UnderConstructionProps {
  title: string;
  subtitle: string;
  showLogo: boolean;
  socialLinks?: SocialLinks;
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
}: UnderConstructionProps) {
  const hasSocials = socialLinks && Object.values(socialLinks).some(v => !!v);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0f] overflow-hidden">
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
