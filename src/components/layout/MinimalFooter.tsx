import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Container } from './Container';

interface MinimalFooterProps {
  contactEmail?: string;
}

export function MinimalFooter({ contactEmail = 'info@trainwithstr.com' }: MinimalFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-str-black border-t border-concrete/10" role="contentinfo">
      <Container>
        <div className="py-8">
          {/* Contact Only */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-2 text-concrete hover:text-str-gold transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              {contactEmail}
            </a>
            <a
              href="https://maps.google.com/?q=8+Eastman+St,+Suite+3,+Cranford,+NJ+07016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-concrete hover:text-str-gold transition-colors text-sm"
            >
              <MapPin className="w-4 h-4" />
              8 Eastman St, Suite 3, Cranford, NJ 07016
            </a>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-concrete/10 pt-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-concrete text-sm">
                © {currentYear} STR - Strength Through Resilience
              </p>
              <div className="flex gap-4 text-sm">
                <Link href="/privacy" className="text-concrete hover:text-str-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-concrete hover:text-str-gold transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
