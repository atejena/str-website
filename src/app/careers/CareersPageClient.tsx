'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

interface CareerPosting {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  employment_type: string | null;
  description: string;
  requirements: string | null;
  benefits: string | null;
  salary_range: string | null;
  location: string | null;
  active: boolean;
  created_at: string;
}

interface CareersPageClientProps {
  postings: CareerPosting[];
  socialLinks: Record<string, string>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CareersPageClient({ postings, socialLinks }: CareersPageClientProps) {
  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative bg-str-black py-20 md:py-28 overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25% 25%, rgba(198,163,80,0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(198,163,80,0.2) 0%, transparent 50%)',
              }}
            />
          </div>

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center relative z-10"
            >
              <div className="inline-block mb-6">
                <span className="text-str-gold font-display text-sm md:text-base uppercase tracking-[0.3em]">
                  Careers at STR
                </span>
                <div className="h-0.5 w-full bg-str-gold/40 mt-2" />
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white tracking-wider mb-6">
                Join Our{' '}
                <span className="text-str-gold">Team</span>
              </h1>

              <p className="text-concrete text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Be part of the STR community. We&apos;re looking for passionate individuals
                who want to help others build strength through resilience.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Job Postings Section */}
        <section className="bg-background py-16 md:py-24">
          <Container>
            {postings.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              >
                {postings.map((posting) => (
                  <motion.div
                    key={posting.id}
                    variants={itemVariants}
                    className="bg-surface border border-concrete/10 rounded-md p-6 md:p-8 hover:border-str-gold/30 transition-colors group"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h2 className="font-display text-xl md:text-2xl font-semibold uppercase text-white tracking-wide group-hover:text-str-gold transition-colors">
                        {posting.title}
                      </h2>

                      <div className="flex flex-wrap gap-3 mt-3">
                        {posting.department && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-concrete">
                            <Briefcase className="w-3.5 h-3.5 text-str-gold" />
                            {posting.department}
                          </span>
                        )}
                        {posting.employment_type && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-concrete">
                            <Clock className="w-3.5 h-3.5 text-str-gold" />
                            {posting.employment_type}
                          </span>
                        )}
                        {posting.location && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-concrete">
                            <MapPin className="w-3.5 h-3.5 text-str-gold" />
                            {posting.location}
                          </span>
                        )}
                      </div>

                      {posting.salary_range && (
                        <p className="text-str-gold/80 text-sm mt-2 font-medium">
                          {posting.salary_range}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-concrete text-sm md:text-base leading-relaxed mb-4 line-clamp-4">
                      {posting.description}
                    </p>

                    {/* Requirements preview */}
                    {posting.requirements && (
                      <div className="mb-4">
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-2">
                          Requirements
                        </h3>
                        <p className="text-concrete/80 text-sm leading-relaxed line-clamp-3">
                          {posting.requirements}
                        </p>
                      </div>
                    )}

                    {/* Benefits preview */}
                    {posting.benefits && (
                      <div className="mb-6">
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-2">
                          Benefits
                        </h3>
                        <p className="text-concrete/80 text-sm leading-relaxed line-clamp-3">
                          {posting.benefits}
                        </p>
                      </div>
                    )}

                    {/* Apply button */}
                    <a
                      href={`mailto:spencer@trainwithstr.com?subject=Application: ${encodeURIComponent(posting.title)}`}
                      className="inline-block"
                    >
                      <Button variant="primary" size="md">
                        Apply Now
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center max-w-xl mx-auto py-12"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-str-gold/10 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-str-gold" />
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-semibold uppercase text-white tracking-wide mb-4">
                  No Open Positions
                </h2>

                <p className="text-concrete text-lg leading-relaxed mb-8">
                  We don&apos;t have any open positions right now, but we&apos;re always
                  looking for great people. Check back soon or send us your resume.
                </p>

                <a
                  href="mailto:spencer@trainwithstr.com?subject=Resume Submission"
                  className="inline-flex items-center gap-2 text-str-gold hover:text-str-gold/80 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  spencer@trainwithstr.com
                </a>
              </motion.div>
            )}
          </Container>
        </section>
      </main>

      <Footer socialLinks={socialLinks} />
    </>
  );
}
