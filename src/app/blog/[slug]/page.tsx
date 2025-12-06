'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { use } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getPostBySlug, getPublishedPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-str-black via-str-black/60 to-str-black/30" />
          </div>

          <div className="container-custom relative z-10 py-12">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-str-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-display text-sm uppercase tracking-wider">Back to Blog</span>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-display-section md:text-display-hero font-display font-bold text-foreground mb-6 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <Section background="default">
          <div className="max-w-3xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-p:text-muted prose-p:leading-relaxed
                prose-a:text-str-gold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:text-muted prose-ol:text-muted
                prose-blockquote:border-str-gold prose-blockquote:text-muted prose-blockquote:italic
                prose-code:text-str-gold prose-code:bg-surface prose-code:px-1 prose-code:rounded
                prose-pre:bg-surface prose-pre:border prose-pre:border-border"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </motion.article>

            {/* Author Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 p-6 bg-surface rounded-[2px] border border-border"
            >
              <h3 className="font-display font-bold text-foreground mb-2">
                Written by {post.author}
              </h3>
              <p className="text-muted text-sm">
                {/* PLACEHOLDER: Add author bio when available */}
                Expert fitness content from the STR team.
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <Section background="surface">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Keep Reading
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground">
                RELATED <span className="text-str-gold">ARTICLES</span>
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <Card hover className="overflow-hidden h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-str-gold transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted">
                        {relatedPost.readingTimeMinutes} min read
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-str-gold">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-display-section font-display font-bold text-str-black mb-4">
                PUT KNOWLEDGE INTO ACTION
              </h2>
              <p className="text-body-lead text-str-black/80 mb-8">
                Ready to apply what you've learned? Start your fitness journey with STR today.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-str-black text-white border-str-black hover:bg-str-black/90"
              >
                <Link href="/contact">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
