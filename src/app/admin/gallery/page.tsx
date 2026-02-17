'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Upload, Video, X, Check } from 'lucide-react'
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

type BulkUploadItem = {
  id: string
  file: File
  preview: string
  title: string
  category: string
  alt_text: string
  featured: boolean
  media_type: 'image' | 'video'
  selected: boolean
  uploaded: boolean
  error?: string
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

  // Bulk upload state
  const [bulkModalOpen, setBulkModalOpen] = useState(false)
  const [bulkItems, setBulkItems] = useState<BulkUploadItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })

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

  // Bulk upload functions
  const detectMediaType = (filename: string): 'image' | 'video' => {
    const ext = filename.split('.').pop()?.toLowerCase()
    const videoExts = ['mp4', 'mov', 'webm', 'avi', 'mkv']
    return videoExts.includes(ext || '') ? 'video' : 'image'
  }

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length > 20) {
      toast.error('Maximum 20 files allowed')
      return
    }

    const items: BulkUploadItem[] = files.map((file, index) => {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
      const mediaType = detectMediaType(file.name)
      
      return {
        id: `${Date.now()}-${index}`,
        file,
        preview: URL.createObjectURL(file),
        title: nameWithoutExt,
        category: 'Facility',
        alt_text: nameWithoutExt,
        featured: false,
        media_type: mediaType,
        selected: false,
        uploaded: false,
      }
    })

    setBulkItems(items)
    setBulkModalOpen(true)
  }

  const updateBulkItem = (id: string, updates: Partial<BulkUploadItem>) => {
    setBulkItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

  const toggleBulkSelection = (id: string) => {
    setBulkItems(prev => prev.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ))
  }

  const toggleAllSelection = () => {
    const allSelected = bulkItems.every(item => item.selected)
    setBulkItems(prev => prev.map(item => ({ ...item, selected: !allSelected })))
  }

  const bulkSetCategory = (category: string) => {
    setBulkItems(prev => prev.map(item =>
      item.selected ? { ...item, category } : item
    ))
  }

  const bulkSetFeatured = (featured: boolean) => {
    setBulkItems(prev => prev.map(item =>
      item.selected ? { ...item, featured } : item
    ))
  }

  const handleBulkUpload = async () => {
    setUploading(true)
    setUploadProgress({ current: 0, total: bulkItems.length })

    for (let i = 0; i < bulkItems.length; i++) {
      const item = bulkItems[i]
      
      try {
        const formDataObj = new FormData()
        formDataObj.append('title', item.title)
        formDataObj.append('description', '')
        formDataObj.append('category', item.category)
        formDataObj.append('alt_text', item.alt_text)
        formDataObj.append('media_type', item.media_type)
        formDataObj.append('video_url', '')
        formDataObj.append('featured', item.featured.toString())
        formDataObj.append('sort_order', '0')
        formDataObj.append('image', item.file)

        await createGalleryImage(formDataObj)
        
        updateBulkItem(item.id, { uploaded: true })
        setUploadProgress({ current: i + 1, total: bulkItems.length })
      } catch (error) {
        updateBulkItem(item.id, { error: 'Upload failed' })
        toast.error(`Failed to upload ${item.title}`)
      }
    }

    setUploading(false)
    toast.success(`Successfully uploaded ${bulkItems.filter(i => i.uploaded).length} items`)
    
    // Refresh gallery and close modal after a short delay
    setTimeout(() => {
      loadImages()
      setBulkModalOpen(false)
      setBulkItems([])
      setUploadProgress({ current: 0, total: 0 })
    }, 1500)
  }

  const closeBulkModal = () => {
    if (uploading) {
      if (!confirm('Upload in progress. Are you sure you want to cancel?')) {
        return
      }
    }
    
    // Clean up preview URLs
    bulkItems.forEach(item => URL.revokeObjectURL(item.preview))
    
    setBulkModalOpen(false)
    setBulkItems([])
    setUploadProgress({ current: 0, total: 0 })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Gallery</h1>
          <p className="text-muted mt-1">Manage photos and videos.</p>
        </div>
        <div className="flex gap-3">
          <label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleBulkFileSelect}
              className="hidden"
            />
            <Button variant="outline" asChild>
              <span className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Bulk Upload
              </span>
            </Button>
          </label>
          <Button onClick={() => { resetForm(); setModalOpen(true) }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
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
                <option value="Training">Training</option>
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

      {/* Bulk Upload Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Bulk Upload</h2>
                <p className="text-sm text-muted mt-1">
                  {bulkItems.length} {bulkItems.length === 1 ? 'item' : 'items'} selected
                  {uploadProgress.total > 0 && ` • Uploading ${uploadProgress.current} of ${uploadProgress.total}`}
                </p>
              </div>
              <button
                onClick={closeBulkModal}
                disabled={uploading}
                className="p-2 text-muted hover:text-foreground transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bulk Actions Bar */}
            {bulkItems.some(item => item.selected) && (
              <div className="p-4 bg-surface border-b border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">
                    {bulkItems.filter(i => i.selected).length} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Category:</label>
                    <Select
                      onChange={(e) => bulkSetCategory(e.target.value)}
                      className="text-sm"
                    >
                      <option value="">Set for all...</option>
                      <option value="Facility">Facility</option>
                      <option value="Classes">Classes</option>
                      <option value="Events">Events</option>
                      <option value="Transformations">Transformations</option>
                      <option value="Training">Training</option>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => bulkSetFeatured(true)}
                    >
                      Set Featured
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => bulkSetFeatured(false)}
                    >
                      Unset Featured
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Items Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {/* Select All */}
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <input
                    type="checkbox"
                    checked={bulkItems.length > 0 && bulkItems.every(i => i.selected)}
                    onChange={toggleAllSelection}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Select All</span>
                </div>

                {/* Items */}
                {bulkItems.map((item) => (
                  <div
                    key={item.id}
                    className={`border rounded-lg p-4 ${
                      item.selected ? 'border-str-gold bg-str-gold/5' : 'border-border'
                    } ${item.uploaded ? 'opacity-60' : ''}`}
                  >
                    <div className="flex gap-4">
                      {/* Checkbox & Thumbnail */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => toggleBulkSelection(item.id)}
                          disabled={item.uploaded}
                          className="w-4 h-4 mt-1"
                        />
                        <div className="w-24 h-24 bg-surface rounded overflow-hidden flex-shrink-0">
                          {item.media_type === 'video' ? (
                            <div className="w-full h-full flex items-center justify-center">
                              <Video className="w-8 h-8 text-muted" />
                            </div>
                          ) : (
                            <img
                              src={item.preview}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Metadata Fields */}
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-1">Title</label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateBulkItem(item.id, { title: e.target.value })}
                            disabled={item.uploaded}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Category</label>
                          <Select
                            value={item.category}
                            onChange={(e) => updateBulkItem(item.id, { category: e.target.value })}
                            disabled={item.uploaded}
                            className="text-sm"
                          >
                            <option value="Facility">Facility</option>
                            <option value="Classes">Classes</option>
                            <option value="Events">Events</option>
                            <option value="Transformations">Transformations</option>
                            <option value="Training">Training</option>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Alt Text</label>
                          <Input
                            value={item.alt_text}
                            onChange={(e) => updateBulkItem(item.id, { alt_text: e.target.value })}
                            disabled={item.uploaded}
                            className="text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={item.featured}
                              onChange={(e) => updateBulkItem(item.id, { featured: e.target.checked })}
                              disabled={item.uploaded}
                              className="w-4 h-4"
                            />
                            <span className="text-xs">Featured</span>
                          </label>
                          <Badge variant={item.media_type === 'video' ? 'secondary' : 'outline'} size="sm">
                            {item.media_type}
                          </Badge>
                          {item.uploaded && (
                            <Badge variant="primary" size="sm">
                              <Check className="w-3 h-3 mr-1" />
                              Uploaded
                            </Badge>
                          )}
                          {item.error && (
                            <Badge variant="error" size="sm">
                              Error
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted">
                  {uploading ? 'Upload in progress...' : 'Review and upload all items'}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={closeBulkModal}
                    disabled={uploading}
                  >
                    {uploading ? 'Close' : 'Cancel'}
                  </Button>
                  <Button
                    onClick={handleBulkUpload}
                    disabled={uploading || bulkItems.length === 0}
                  >
                    {uploading ? `Uploading... (${uploadProgress.current}/${uploadProgress.total})` : `Upload All (${bulkItems.length})`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
