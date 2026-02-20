import { MapPin, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

interface MiniBannerProps {
  contactEmail?: string;
}

export function MiniBanner({ contactEmail = 'info@trainwithstr.com' }: MiniBannerProps) {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-str-gold via-str-gold to-[#fcc560]">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-str-black">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">
                8 Eastman St, Suite 3, Cranford, NJ 07016
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-str-black/20" />
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium hover:underline"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="bg-str-black text-str-gold border-str-black hover:bg-str-black/90 flex-shrink-0"
          >
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
