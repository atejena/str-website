import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';

export function HeroHome() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
          alt="STR Gym Training"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-str-black/70 via-str-black/80 to-str-black" />
      </div>

      {/* Content */}
      <Container className="relative z-10 text-center py-20">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/str-logo.webp"
            alt="STR - Strength Through Resilience"
            width={200}
            height={200}
            className="w-32 md:w-40 lg:w-48 h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <h1 className="font-display text-h1 font-bold uppercase text-white mb-4 md:mb-6 tracking-wider">
          Strength Through Resilience
        </h1>

        {/* Subtitle */}
        <p className="text-body-lg md:text-xl text-concrete max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          Premium strength and conditioning facility in Cranford, NJ. 
          Where serious training meets supportive community.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5"
          >
            <Link href="#get-started">Get Started</Link>
          </Button>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-str-gold rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-str-gold rounded-full" />
        </div>
      </div>
    </section>
  );
}
