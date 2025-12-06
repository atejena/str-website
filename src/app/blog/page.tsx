'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/layout/Section';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { blogPosts, getFeaturedPosts, getPublishedPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const allPosts = getPublishedPosts();
  const featuredPost = featuredPosts[0];
  const otherPosts = allPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero Section */}
        <Section background="default" className="pt-32 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
              STR Blog
            </span>
            <h1 className="text-display-hero font-display font-bold text-foreground mb-6">
              FITNESS <span className="text-str-gold">INSIGHTS</span>
            </h1>
            <p className="text-body-lead text-muted max-w-2xl mx-auto">
              Expert advice, training tips, and success stories from the STR community.
            </p>
          </motion.div>
        </Section>

        {/* Featured Post */}
        {featuredPost && (
          <Section background="surface">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <Card hover className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="primary">Featured</Badge>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="font-display text-3xl font-bold text-foreground mb-4 group-hover:text-str-gold transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.authorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(featuredPost.publishDate || featuredPost.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readingTimeMinutes} min read</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </Section>
        )}

        {/* All Posts */}
        <Section background="default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-display-section font-display font-bold text-foreground">
              LATEST <span className="text-str-gold">ARTICLES</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {otherPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <Card hover className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-str-gold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border mt-auto">
                        <span>{formatDate(post.publishDate || post.createdAt)}</span>
                        <span>{post.readingTimeMinutes} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* Newsletter CTA */}
        <Section background="surface">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-display font-bold uppercase tracking-widest text-str-gold mb-4 block">
                Stay Updated
              </span>
              <h2 className="text-display-section font-display font-bold text-foreground mb-4">
                GET FITNESS <span className="text-str-gold">TIPS</span>
              </h2>
              <p className="text-muted mb-8">
                Subscribe to our newsletter for weekly training tips, nutrition advice, and exclusive offers.
              </p>
              {/* PLACEHOLDER: Newsletter signup form to be implemented with email service */}
              <p className="text-sm text-muted italic">
                Newsletter signup coming soon. Follow us on social media for updates!
              </p>
            </motion.div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
