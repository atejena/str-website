'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload, Video } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { AdminModal as Modal } from '@/components/admin'
import { Input } from '@/components/ui/Input'
import { AdminSelect as Select } from '@/components/admin'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import { 
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from '../actions'

type GalleryImage = {
  id: string
  title: string
  description: string | null
  image_url: string
  category: string
  alt_text: string
  media_type: string
  video_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export default function AdminGalleryPage() {
  const { addToast } = useToast()
  const toast = {
    success: (msg: string) => addToast({ title: msg, variant: 'success' as const, duration: 3000 }),
    error: (msg: string) => addToast({ title: msg, variant: 'error' as const, duration: 5000 }),
  }

  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Facility',
    alt_text: '',
    media_type: 'image',
    video_url: '',
    featured: false,
    sort_order: '0',
  })

  const loadImages = async () => {
    try {
      const data = await getGalleryImages()
      setImages(data)
    } catch (error) {
      toast.error('Failed to load gallery images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadImages()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append('title', formData.title)
      formDataObj.append('description', formData.description)
      formDataObj.append('category', formData.category)
      formDataObj.append('alt_text', formData.alt_text)
      formDataObj.append('media_type', formData.media_type)
      formDataObj.append('video_url', formData.video_url)
      formDataObj.append('featured', formData.featured.toString())
      formDataObj.append('sort_order', formData.sort_order)
      
      if (imageFile) {
        formDataObj.append('image', imageFile)
      }
      if (editingImage?.image_url) {
        formDataObj.append('existing_image_url', editingImage.image_url)
      }

      if (editingImage) {
        await updateGalleryImage(editingImage.id, formDataObj)
        toast.success('Gallery image updated successfully')
      } else {
        await createGalleryImage(formDataObj)
        toast.success('Gallery image created successfully')
      }

      setModalOpen(false)
      resetForm()
      loadImages()
    } catch (error) {
      toast.error('Failed to save gallery image')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData({
      title: image.title,
      description: image.description || '',
      category: image.category,
      alt_text: image.alt_text,
      media_type: image.media_type,
      video_url: image.video_url || '',
      featured: image.featured,
      sort_order: image.sort_order.toString(),
    })
    setModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      await deleteGalleryImage(id)
      toast.success('Gallery image deleted')
      loadImages()
    } catch (error) {
      toast.error('Failed to delete gallery image')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Facility',
      alt_text: '',
      media_type: 'image',
      video_url: '',
      featured: false,
      sort_order: '0',
    })
    setImageFile(null)
    setEditingImage(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gallery</h1>
          <p className="text-muted mt-1">Manage photos and videos.</p>
        </div>
        <Button onClick={() => { resetForm(); setModalOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Image
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="relative aspect-square">
              {image.media_type === 'video' && image.video_url ? (
                <div className="w-full h-full bg-surface flex items-center justify-center">
                  <Video className="w-12 h-12 text-muted" />
                </div>
              ) : (
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover"
                />
              )}
              {image.featured && (
                <div className="absolute top-2 left-2">
                  <Badge variant="primary" size="sm">
                    Featured
                  </Badge>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" size="sm">
                  {image.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-display font-bold text-sm text-foreground mb-1 truncate">
                {image.title}
              </h3>
              {image.description && (
                <p className="text-xs text-muted mb-3 line-clamp-2">
                  {image.description}
                </p>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="p-2 text-muted hover:text-str-gold transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 text-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); resetForm() }}
        title={editingImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
        size="lg"
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
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Facility">Facility</option>
                <option value="Classes">Classes</option>
                <option value="Events">Events</option>
                <option value="Transformations">Transformations</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Media Type</label>
              <Select
                value={formData.media_type}
                onChange={(e) => setFormData({ ...formData, media_type: e.target.value })}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alt Text *</label>
            <Input
              value={formData.alt_text}
              onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
              required
            />
          </div>

          {formData.media_type === 'image' ? (
            <div>
              <label className="block text-sm font-medium mb-2">
                {editingImage ? 'Replace Image' : 'Upload Image *'}
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 px-4 py-2 border border-border rounded-[2px] cursor-pointer hover:bg-surface">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {imageFile ? imageFile.name : 'Choose file'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    required={!editingImage}
                  />
                </label>
                {editingImage?.image_url && !imageFile && (
                  <span className="text-xs text-muted">Current image will be kept</span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Video URL *</label>
              <Input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                required={formData.media_type === 'video'}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Sort Order</label>
            <Input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
            />
          </div>

          <div>
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

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setModalOpen(false); resetForm() }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : editingImage ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
