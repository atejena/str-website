'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { 
  getBlogPosts, 
  createBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from '../actions'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author_name: string
  category: string
  tags: string[]
  featured_image: string | null
  reading_time_minutes: number
  published: boolean
  publish_date: string | null
  featured: boolean
  created_at: string
}

export default function AdminBlogPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author_name: '',
    category: 'Training',
    tags: '',
    featured_image: '',
    reading_time_minutes: '5',
    published: false,
    publish_date: '',
    featured: false,
  })

  const loadPosts = async () => {
    try {
      const data = await getBlogPosts()
      setPosts(data)
    } catch (error) {
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('title', formData.title)
      formDataObj.append('excerpt', formData.excerpt)
      formDataObj.append('content', formData.content)
      formDataObj.append('author_name', formData.author_name)
      formDataObj.append('category', formData.category)
      formDataObj.append('tags', formData.tags)
      formDataObj.append('featured_image', formData.featured_image)
      formDataObj.append('reading_time_minutes', formData.reading_time_minutes)
      formDataObj.append('published', formData.published.toString())
      formDataObj.append('publish_date', formData.publish_date)
      formDataObj.append('featured', formData.featured.toString())

      if (editingPost) {
        await updateBlogPost(editingPost.id, formDataObj)
        toast.success('Blog post updated successfully')
      } else {
        await createBlogPost(formDataObj)
        toast.success('Blog post created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadPosts()
    } catch (error) {
      toast.error('Failed to save blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author_name: post.author_name,
      category: post.category,
      tags: post.tags.join(', '),
      featured_image: post.featured_image || '',
      reading_time_minutes: post.reading_time_minutes.toString(),
      published: post.published,
      publish_date: post.publish_date || '',
      featured: post.featured,
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      await deleteBlogPost(id)
      toast.success('Blog post deleted')
      loadPosts()
    } catch (error) {
      toast.error('Failed to delete blog post')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author_name: '',
      category: 'Training',
      tags: '',
      featured_image: '',
      reading_time_minutes: '5',
      published: false,
      publish_date: '',
      featured: false,
    })
    setShowPreview(false)
    setEditingPost(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted mt-1">Manage blog content and articles.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Post
        </Button>
      </div>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-display font-bold uppercase tracking-wider text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-display font-bold text-foreground">
                        {post.title}
                      </div>
                      <div className="text-xs text-muted mt-1">
                        {post.reading_time_minutes} min read
                      </div>
                      {post.featured && (
                        <Badge variant="primary" size="sm" className="mt-1">
                          Featured
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" size="sm">
                        {post.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">{post.author_name}</td>
                    <td className="px-6 py-4">
                      <Badge variant={post.published ? 'primary' : 'secondary'} size="sm">
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 text-muted hover:text-str-gold transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editingPost ? 'Edit Blog Post' : 'Add Blog Post'}
        size="full"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Excerpt *</label>
            <Textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Author *</label>
              <Input
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Training">Training</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Success Stories">Success Stories</option>
                <option value="Tips">Tips</option>
                <option value="Events">Events</option>
                <option value="News">News</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reading Time (min)</label>
              <Input
                type="number"
                value={formData.reading_time_minutes}
                onChange={(e) => setFormData({ ...formData, reading_time_minutes: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., fitness, strength training, weight loss"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
            <Input
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Publish Date</label>
            <Input
              type="date"
              value={formData.publish_date}
              onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Content (Markdown) *</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
            
            <div className={`grid gap-4 ${showPreview ? 'grid-cols-2' : 'grid-cols-1'}`}>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                required
                className="font-mono text-sm"
              />
              
              {showPreview && (
                <div className="border border-border rounded-[2px] p-4 bg-surface overflow-y-auto max-h-[500px]">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm">Featured</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setModalOpen(false); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingPost ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
