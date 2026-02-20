import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Container } from './Container';

export function MinimalHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-str-black/95 backdrop-blur-sm border-b border-concrete/10">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="STR - Home">
            <Image
              src="/images/str-logo.webp"
              alt="STR Logo"
              width={48}
              height={48}
              className="h-10 w-auto"
            />
            <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
              STR
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-concrete hover:text-str-gold transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </Container>
    </header>
  );
}
