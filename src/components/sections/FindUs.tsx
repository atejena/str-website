import { MapPin, Mail } from 'lucide-react';
import { Container } from '@/components/layout/Container';

interface FindUsProps {
  contactEmail?: string;
}

export function FindUs({ contactEmail = 'info@trainwithstr.com' }: FindUsProps) {
  return (
    <section className="py-16 md:py-20 bg-iron-gray">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
            Find Us
          </h2>
          <p className="text-concrete max-w-2xl mx-auto">
            Located in the heart of Cranford, New Jersey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
          {/* Address */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-sm bg-str-gold flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-str-black" />
            </div>
            <h3 className="font-display text-xl uppercase text-white mb-2 tracking-wider">
              Location
            </h3>
            <a
              href="https://maps.google.com/?q=8+Eastman+St,+Suite+3,+Cranford,+NJ+07016"
              target="_blank"
              rel="noopener noreferrer"
              className="text-concrete hover:text-str-gold transition-colors"
            >
              8 Eastman St, Suite 3<br />
              Cranford, NJ 07016
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-sm bg-str-gold flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-str-black" />
            </div>
            <h3 className="font-display text-xl uppercase text-white mb-2 tracking-wider">
              Email
            </h3>
            <a
              href={`mailto:${contactEmail}`}
              className="text-concrete hover:text-str-gold transition-colors"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
