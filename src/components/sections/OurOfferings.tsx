import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function OurOfferings() {
  const supabase = await createServerSupabaseClient();

  // Fetch the two main offerings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: mainOfferings } = await supabase
    .from('gym_classes')
    .select('*')
    .in('slug', ['semi-private-training', 'group-training'])
    .eq('active', true)
    .order('sort_order') as { data: any[] | null };

  // Fetch other classes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: otherClasses } = await supabase
    .from('gym_classes')
    .select('*')
    .not('slug', 'in', '(semi-private-training,group-training)')
    .eq('active', true)
    .order('sort_order')
    .limit(4) as { data: any[] | null };

  return (
    <section className="py-16 md:py-24 bg-str-black">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-h2 font-semibold uppercase text-white mb-4 tracking-wider">
            Our Offerings
          </h2>
          <p className="text-concrete text-lg max-w-2xl mx-auto">
            Choose the training style that fits your goals
          </p>
        </div>

        {/* Main Offerings - Large Cards */}
        {mainOfferings && mainOfferings.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            {mainOfferings.map((offering) => (
              <div
                key={offering.id}
                className="bg-iron-gray rounded-md overflow-hidden shadow-card hover:shadow-elevated transition-shadow group"
              >
                {/* Gold accent strip */}
                <div className="h-1 bg-str-gold" />
                
                <div className="p-6 md:p-8">
                  {/* Difficulty Badge */}
                  <div className="inline-block px-3 py-1 bg-str-gold/20 text-str-gold text-sm font-bold uppercase rounded-sm mb-4">
                    {offering.difficulty_level}
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl uppercase text-white mb-4 tracking-wide">
                    {offering.name}
                  </h3>

                  <p className="text-concrete mb-6 leading-relaxed">
                    {offering.short_description || offering.description}
                  </p>

                  <Button
                    asChild
                    variant="secondary"
                    className="group-hover:bg-str-gold group-hover:text-str-black group-hover:border-str-gold transition-all"
                  >
                    <Link href={`/classes/${offering.slug}`}>
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other Classes - Smaller Cards */}
        {otherClasses && otherClasses.length > 0 && (
          <>
            <h3 className="font-display text-xl md:text-2xl uppercase text-center text-white mb-8 tracking-wider">
              Additional Programs
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {otherClasses.map((classItem) => (
                <Link
                  key={classItem.id}
                  href={`/classes/${classItem.slug}`}
                  className="bg-iron-gray rounded-md p-6 hover:bg-iron-gray/80 transition-colors group"
                >
                  <div className="h-0.5 w-12 bg-str-gold mb-4" />
                  <h4 className="font-display text-lg uppercase text-white mb-2 tracking-wide group-hover:text-str-gold transition-colors">
                    {classItem.name}
                  </h4>
                  <p className="text-sm text-concrete line-clamp-2">
                    {classItem.short_description}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* View All CTA */}
        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/classes">View All Classes</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
