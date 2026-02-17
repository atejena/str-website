import { notFound } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import BlogPostClient from './BlogPostClient';
import type { BlogPost } from '@/types/database';

// Map snake_case DB columns to camelCase BlogPost fields
function mapBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    authorId: row.author_id as string | undefined,
    authorName: (row.author_name as string) || 'STR Team',
    category: row.category as BlogPost['category'],
    tags: (row.tags as string[]) || [],
    featuredImage: row.featured_image as string,
    readingTimeMinutes: (row.reading_time_minutes as number) || 5,
    metaTitle: row.meta_title as string | undefined,
    metaDescription: row.meta_description as string | undefined,
    metaKeywords: row.meta_keywords as string[] | undefined,
    published: row.published as boolean,
    publishDate: (row.publish_date as string) || (row.created_at as string),
    featured: row.featured as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  // Fetch the post by slug
  const { data: rawPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!rawPost) {
    notFound();
  }

  const post = mapBlogPost(rawPost);

  // Fetch related posts (same category or shared tags, excluding current)
  const { data: rawAllPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .order('publish_date', { ascending: false })
    .limit(10);

  const allPosts = (rawAllPosts || []).map(mapBlogPost);

  // Filter for related posts by tags
  const relatedPosts = allPosts
    .filter((p: BlogPost) => p.tags.some((tag: string) => post.tags.includes(tag)))
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
