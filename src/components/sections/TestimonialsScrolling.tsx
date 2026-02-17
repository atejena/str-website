'use client';

import { Star } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { useEffect, useRef } from 'react';

interface Testimonial {
  id: string;
  member_name: string;
  rating: number;
  quote: string;
  source: string;
}

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsScrolling({ testimonials }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scrollerInner = scrollerRef.current.querySelector('.scroller-inner');
    if (!scrollerInner) return;

    // Duplicate items for infinite scroll
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      scrollerInner.appendChild(duplicatedItem);
    });
  }, [testimonials]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-str-black overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
            What Our Members Say
          </h2>
          <p className="text-concrete text-lg">
            Real results from real people
          </p>
        </div>
      </Container>

      {/* Scrolling testimonials */}
      <div ref={scrollerRef} className="scroller" data-speed="slow">
        <div className="scroller-inner flex gap-6 animate-scroll">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[350px] md:w-[400px] bg-iron-gray rounded-md p-6 md:p-8"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'fill-str-gold text-str-gold'
                        : 'fill-none text-concrete/30'
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white mb-6 leading-relaxed line-clamp-5">
                "{testimonial.quote}"
              </p>

              {/* Author and Source */}
              <div className="flex items-center justify-between">
                <p className="font-display text-str-gold uppercase tracking-wide">
                  {testimonial.member_name}
                </p>
                <div className="text-xs text-concrete uppercase px-2 py-1 bg-str-black rounded-sm">
                  {testimonial.source === 'google' ? 'Google' : 'Mindbody'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx>{`
        .scroller {
          max-width: 100%;
        }

        .scroller-inner {
          padding-block: 1rem;
          display: flex;
          flex-wrap: nowrap;
          gap: 1.5rem;
        }

        .scroller[data-animated='true'] {
          overflow: hidden;
          -webkit-mask: linear-gradient(
            90deg,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
          mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .scroller[data-animated='true'] .scroller-inner {
          width: max-content;
          flex-wrap: nowrap;
          animation: scroll 40s linear infinite;
        }

        @keyframes scroll {
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroller[data-animated='true'] .scroller-inner {
            animation: none;
          }
        }

        /* Auto-enable animation on mount */
        .scroller {
          overflow: hidden;
          -webkit-mask: linear-gradient(
            90deg,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
          mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .animate-scroll {
          width: max-content;
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
