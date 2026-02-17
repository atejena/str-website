import { createServerSupabaseClient } from '@/lib/supabase/server';
import BlogPageClient from './BlogPageClient';
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

export default async function BlogPage() {
  const supabase = await createServerSupabaseClient();

  const { data: rawPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('publish_date', { ascending: false });

  const allPosts: BlogPost[] = (rawPosts || []).map(mapBlogPost);

  const featuredPost = allPosts.find((p) => p.featured) || null;
  const otherPosts = allPosts.filter((p) => p.id !== featuredPost?.id);

  return <BlogPageClient featuredPost={featuredPost} otherPosts={otherPosts} />;
}
