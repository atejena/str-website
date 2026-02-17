'use server'

import { createAdminClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function parsePlanFeatures(raw: string): { name: string; included: boolean; note?: string }[] {
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // Not JSON — parse as text lines
  }
  return raw.split('\n').filter(f => f.trim()).map(line => {
    const trimmed = line.trim()
    if (trimmed.startsWith('[excluded]')) {
      return { name: trimmed.replace('[excluded]', '').trim(), included: false }
    }
    return { name: trimmed, included: true }
  })
}

// ==================== CLASSES ====================

export async function getClasses() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('gym_classes')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data
}

export async function createClass(formData: FormData) {
  const supabase = await createAdminClient()
  
  const classData = {
    name: formData.get('name') as string,
    slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
    description: formData.get('description') as string,
    short_description: formData.get('short_description') as string,
    difficulty_level: formData.get('difficulty_level') as string,
    duration_minutes: parseInt(formData.get('duration_minutes') as string),
    max_capacity: parseInt(formData.get('max_capacity') as string),
    instructor_id: formData.get('instructor_id') || null,
    featured: formData.get('featured') === 'true',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
  }
  
  const { error } = await supabase.from('gym_classes').insert(classData)
  
  if (error) throw error
  revalidatePath('/admin/classes')
  return { success: true }
}

export async function updateClass(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const classData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    short_description: formData.get('short_description') as string,
    difficulty_level: formData.get('difficulty_level') as string,
    duration_minutes: parseInt(formData.get('duration_minutes') as string),
    max_capacity: parseInt(formData.get('max_capacity') as string),
    instructor_id: formData.get('instructor_id') || null,
    featured: formData.get('featured') === 'true',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('gym_classes')
    .update(classData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/classes')
  return { success: true }
}

export async function deleteClass(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('gym_classes').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/classes')
  return { success: true }
}

// ==================== TRAINERS ====================

export async function getTrainers() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('trainers')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data
}

export async function createTrainer(formData: FormData) {
  const supabase = await createAdminClient()
  
  let photoUrl = null
  const photoFile = formData.get('photo') as File
  
  if (photoFile && photoFile.size > 0) {
    const fileExt = photoFile.name.split('.').pop()
    const fileName = `trainers/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, photoFile)
    
    if (uploadError) throw uploadError
    
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)
    
    photoUrl = publicUrl
  }
  
  const certificationsStr = formData.get('certifications') as string
  const certifications = certificationsStr ? certificationsStr.split(',').map(c => c.trim()).filter(c => c) : []
  
  const trainerData = {
    name: formData.get('name') as string,
    slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
    title: formData.get('title') as string,
    specialty: formData.get('specialty') as string,
    bio: formData.get('bio') as string,
    short_bio: formData.get('short_bio') as string,
    photo: photoUrl,
    certifications,
    experience_years: parseInt(formData.get('experience_years') as string),
    instagram: formData.get('instagram') as string || null,
    quote: formData.get('quote') as string || null,
    featured: formData.get('featured') === 'true',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
  }
  
  const { error } = await supabase.from('trainers').insert(trainerData)
  
  if (error) throw error
  revalidatePath('/admin/trainers')
  return { success: true }
}

export async function updateTrainer(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  let photoUrl = formData.get('existing_photo') as string
  const photoFile = formData.get('photo') as File
  
  if (photoFile && photoFile.size > 0) {
    const fileExt = photoFile.name.split('.').pop()
    const fileName = `trainers/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, photoFile)
    
    if (uploadError) throw uploadError
    
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)
    
    photoUrl = publicUrl
  }
  
  const certificationsStr = formData.get('certifications') as string
  const certifications = certificationsStr ? certificationsStr.split(',').map(c => c.trim()).filter(c => c) : []
  
  const trainerData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    specialty: formData.get('specialty') as string,
    bio: formData.get('bio') as string,
    short_bio: formData.get('short_bio') as string,
    photo: photoUrl,
    certifications,
    experience_years: parseInt(formData.get('experience_years') as string),
    instagram: formData.get('instagram') as string || null,
    quote: formData.get('quote') as string || null,
    featured: formData.get('featured') === 'true',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('trainers')
    .update(trainerData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/trainers')
  return { success: true }
}

export async function deleteTrainer(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('trainers').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/trainers')
  return { success: true }
}

// ==================== PRICING ====================

export async function getPricingPlans() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data
}

export async function createPricingPlan(formData: FormData) {
  const supabase = await createAdminClient()
  
  const features = parsePlanFeatures(formData.get('features') as string || '[]')

  const planData = {
    name: formData.get('name') as string,
    slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    description: formData.get('description') as string || '',
    price_monthly: parseFloat(formData.get('price_monthly') as string) || 0,
    price_annual: parseFloat(formData.get('price_annual') as string) || null,
    setup_fee: parseFloat(formData.get('setup_fee') as string) || 0,
    features,
    highlighted: formData.get('highlighted') === 'true',
    cta_text: formData.get('cta_text') as string || 'Get Started',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
  }
  
  const { error } = await supabase.from('membership_plans').insert(planData)
  
  if (error) throw error
  revalidatePath('/admin/pricing')
  return { success: true }
}

export async function updatePricingPlan(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const features = parsePlanFeatures(formData.get('features') as string || '[]')

  const planData = {
    name: formData.get('name') as string,
    slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    description: formData.get('description') as string || '',
    price_monthly: parseFloat(formData.get('price_monthly') as string) || 0,
    price_annual: parseFloat(formData.get('price_annual') as string) || null,
    setup_fee: parseFloat(formData.get('setup_fee') as string) || 0,
    features,
    highlighted: formData.get('highlighted') === 'true',
    cta_text: formData.get('cta_text') as string || 'Get Started',
    active: formData.get('active') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string) || 0,
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('membership_plans')
    .update(planData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/pricing')
  return { success: true }
}

export async function deletePricingPlan(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('membership_plans').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/pricing')
  return { success: true }
}

// ==================== BLOG ====================

export async function getBlogPosts() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createAdminClient()
  
  const tagsStr = formData.get('tags') as string
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : []
  
  const postData = {
    title: formData.get('title') as string,
    slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    author_name: formData.get('author_name') as string,
    category: formData.get('category') as string,
    tags,
    featured_image: formData.get('featured_image') as string || null,
    reading_time_minutes: parseInt(formData.get('reading_time_minutes') as string || '5'),
    published: formData.get('published') === 'true',
    publish_date: formData.get('publish_date') as string || null,
    featured: formData.get('featured') === 'true',
  }
  
  const { error } = await supabase.from('blog_posts').insert(postData)
  
  if (error) throw error
  revalidatePath('/admin/blog')
  return { success: true }
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const tagsStr = formData.get('tags') as string
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(t => t) : []
  
  const postData = {
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    author_name: formData.get('author_name') as string,
    category: formData.get('category') as string,
    tags,
    featured_image: formData.get('featured_image') as string || null,
    reading_time_minutes: parseInt(formData.get('reading_time_minutes') as string || '5'),
    published: formData.get('published') === 'true',
    publish_date: formData.get('publish_date') as string || null,
    featured: formData.get('featured') === 'true',
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('blog_posts')
    .update(postData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/blog')
  return { success: true }
}

export async function deleteBlogPost(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/blog')
  return { success: true }
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createAdminClient()
  
  const testimonialData = {
    member_name: formData.get('member_name') as string,
    rating: parseInt(formData.get('rating') as string),
    quote: formData.get('quote') as string,
    source: formData.get('source') as string,
    transformation_type: formData.get('transformation_type') as string || null,
    timeframe: formData.get('timeframe') as string || null,
    results_summary: formData.get('results_summary') as string || null,
    featured: formData.get('featured') === 'true',
    approved: formData.get('approved') === 'true',
  }
  
  const { error } = await supabase.from('testimonials').insert(testimonialData)
  
  if (error) throw error
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function updateTestimonial(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const testimonialData = {
    member_name: formData.get('member_name') as string,
    rating: parseInt(formData.get('rating') as string),
    quote: formData.get('quote') as string,
    source: formData.get('source') as string,
    transformation_type: formData.get('transformation_type') as string || null,
    timeframe: formData.get('timeframe') as string || null,
    results_summary: formData.get('results_summary') as string || null,
    featured: formData.get('featured') === 'true',
    approved: formData.get('approved') === 'true',
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('testimonials')
    .update(testimonialData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function approveTestimonial(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('testimonials')
    .update({ approved: true, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function rejectTestimonial(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('testimonials')
    .update({ approved: false, updated_at: new Date().toISOString() })
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/testimonials')
  return { success: true }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/testimonials')
  return { success: true }
}

// ==================== GALLERY ====================

export async function getGalleryImages() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data
}

export async function createGalleryImage(formData: FormData) {
  const supabase = await createAdminClient()
  
  let imageUrl = formData.get('existing_image_url') as string || ''
  const imageFile = formData.get('image') as File
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile)
    
    if (uploadError) throw uploadError
    
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)
    
    imageUrl = publicUrl
  }
  
  const imageData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: imageUrl,
    category: formData.get('category') as string,
    alt_text: formData.get('alt_text') as string,
    media_type: formData.get('media_type') as string,
    video_url: formData.get('video_url') as string || null,
    featured: formData.get('featured') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
  }
  
  const { error } = await supabase.from('gallery_images').insert(imageData)
  
  if (error) throw error
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function updateGalleryImage(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  let imageUrl = formData.get('existing_image_url') as string
  const imageFile = formData.get('image') as File
  
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, imageFile)
    
    if (uploadError) throw uploadError
    
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)
    
    imageUrl = publicUrl
  }
  
  const imageData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: imageUrl,
    category: formData.get('category') as string,
    alt_text: formData.get('alt_text') as string,
    media_type: formData.get('media_type') as string,
    video_url: formData.get('video_url') as string || null,
    featured: formData.get('featured') === 'true',
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('gallery_images')
    .update(imageData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/gallery')
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('gallery_images').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/gallery')
  return { success: true }
}

// ==================== FAQS ====================

export async function getFAQs() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data
}

export async function createFAQ(formData: FormData) {
  const supabase = await createAdminClient()
  
  const faqData = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    active: formData.get('active') === 'true',
  }
  
  const { error } = await supabase.from('faqs').insert(faqData)
  
  if (error) throw error
  revalidatePath('/admin/faqs')
  return { success: true }
}

export async function updateFAQ(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const faqData = {
    question: formData.get('question') as string,
    answer: formData.get('answer') as string,
    category: formData.get('category') as string,
    sort_order: parseInt(formData.get('sort_order') as string || '0'),
    active: formData.get('active') === 'true',
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('faqs')
    .update(faqData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/faqs')
  return { success: true }
}

export async function deleteFAQ(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/faqs')
  return { success: true }
}

// ==================== CAREERS ====================

export async function getCareers() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('career_postings')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function createCareer(formData: FormData) {
  const supabase = await createAdminClient()
  
  const careerData = {
    title: formData.get('title') as string,
    slug: (formData.get('title') as string).toLowerCase().replace(/\s+/g, '-'),
    department: formData.get('department') as string,
    location: formData.get('location') as string,
    employment_type: formData.get('employment_type') as string,
    description: formData.get('description') as string,
    requirements: JSON.parse(formData.get('requirements') as string || '[]'),
    responsibilities: JSON.parse(formData.get('responsibilities') as string || '[]'),
    active: formData.get('active') === 'true',
  }
  
  const { error } = await supabase.from('career_postings').insert(careerData)
  
  if (error) throw error
  revalidatePath('/admin/careers')
  return { success: true }
}

export async function updateCareer(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  
  const careerData = {
    title: formData.get('title') as string,
    department: formData.get('department') as string,
    location: formData.get('location') as string,
    employment_type: formData.get('employment_type') as string,
    description: formData.get('description') as string,
    requirements: JSON.parse(formData.get('requirements') as string || '[]'),
    responsibilities: JSON.parse(formData.get('responsibilities') as string || '[]'),
    active: formData.get('active') === 'true',
    updated_at: new Date().toISOString(),
  }
  
  const { error } = await supabase
    .from('career_postings')
    .update(careerData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/careers')
  return { success: true }
}

export async function deleteCareer(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('career_postings').delete().eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/careers')
  return { success: true }
}

// ==================== LEADS ====================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLeads(): Promise<any[]> {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function updateLead(id: string, updates: { read?: boolean; responded?: boolean; notes?: string }) {
  const supabase = await createAdminClient()
  
  const updateData: any = {
    updated_at: new Date().toISOString(),
  }
  
  if (updates.read !== undefined) {
    updateData.read = updates.read
  }
  
  if (updates.responded !== undefined) {
    updateData.responded = updates.responded
  }
  
  if (updates.notes !== undefined) {
    updateData.notes = updates.notes
  }
  
  const { error } = await supabase
    .from('contact_submissions')
    .update(updateData)
    .eq('id', id)
  
  if (error) throw error
  revalidatePath('/admin/leads')
  return { success: true }
}

// ==================== SETTINGS ====================

export async function getSettings() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
  
  if (error) throw error
  
  // Convert nested DB structure to flat structure for the admin UI
  const settings: Record<string, any> = {}
  
  data?.forEach((setting: { key: string; value: any }) => {
    const { key, value } = setting
    
    // Handle nested structures
    if (key === 'gym_info') {
      settings.gym_name = value?.name || ''
      settings.tagline = value?.tagline || ''
      settings.phone = value?.phone || ''
      settings.email = value?.email || ''
      settings.address_street = value?.address?.street || ''
      settings.address_city = value?.address?.city || ''
      settings.address_state = value?.address?.state || ''
      settings.address_zip = value?.address?.zip || ''
    } else if (key === 'business_hours') {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
      days.forEach(day => {
        settings[`hours_${day}_open`] = value?.[day]?.open || ''
        settings[`hours_${day}_close`] = value?.[day]?.close || ''
      })
    } else if (key === 'social_links') {
      settings.social_facebook = value?.facebook || ''
      settings.social_instagram = value?.instagram || ''
      settings.social_youtube = value?.youtube || ''
      settings.social_tiktok = value?.tiktok || ''
    } else if (key === 'integrations') {
      settings.trainheroic_whiteboard_url = value?.trainheroic_whiteboard_url || ''
      settings.gohighlevel_widget_id = value?.gohighlevel_widget_id || ''
      settings.google_analytics_id = value?.google_analytics_id || ''
      settings.google_maps_embed_url = value?.google_maps_embed_url || ''
      settings.ghl_get_started_form_url = value?.ghl_get_started_form_url || ''
      settings.ghl_contact_form_url = value?.ghl_contact_form_url || ''
      settings.ghl_general_form_url = value?.ghl_general_form_url || ''
    } else if (key === 'jotform') {
      settings.jotform_enabled = value?.enabled || false
      settings.jotform_form_id = value?.form_id || ''
      settings.jotform_embed_url = value?.embed_url || ''
    } else if (key === 'terms_content') {
      settings.terms_content = value || ''
    } else if (key === 'privacy_content') {
      settings.privacy_content = value || ''
    } else {
      // Keep other settings as-is (instagram_handle, google_place_id, etc.)
      settings[key] = value
    }
  })
  
  return settings
}

export async function updateSettings(settings: Record<string, any>) {
  const supabase = await createAdminClient()
  
  // Re-group flat settings back into nested structure
  const updates: { key: string; value: any; updated_at: string }[] = []
  
  // Gym Info
  updates.push({
    key: 'gym_info',
    value: {
      name: settings.gym_name || '',
      tagline: settings.tagline || '',
      phone: settings.phone || '',
      email: settings.email || '',
      address: {
        street: settings.address_street || '',
        city: settings.address_city || '',
        state: settings.address_state || '',
        zip: settings.address_zip || '',
      }
    },
    updated_at: new Date().toISOString(),
  })
  
  // Business Hours
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const businessHours: Record<string, { open: string; close: string }> = {}
  days.forEach(day => {
    businessHours[day] = {
      open: settings[`hours_${day}_open`] || '',
      close: settings[`hours_${day}_close`] || '',
    }
  })
  updates.push({
    key: 'business_hours',
    value: businessHours,
    updated_at: new Date().toISOString(),
  })
  
  // Social Links
  updates.push({
    key: 'social_links',
    value: {
      facebook: settings.social_facebook || '',
      instagram: settings.social_instagram || '',
      youtube: settings.social_youtube || '',
      tiktok: settings.social_tiktok || '',
    },
    updated_at: new Date().toISOString(),
  })
  
  // Integrations
  updates.push({
    key: 'integrations',
    value: {
      trainheroic_whiteboard_url: settings.trainheroic_whiteboard_url || '',
      gohighlevel_widget_id: settings.gohighlevel_widget_id || '',
      google_analytics_id: settings.google_analytics_id || '',
      google_maps_embed_url: settings.google_maps_embed_url || '',
      ghl_get_started_form_url: settings.ghl_get_started_form_url || '',
      ghl_contact_form_url: settings.ghl_contact_form_url || '',
      ghl_general_form_url: settings.ghl_general_form_url || '',
    },
    updated_at: new Date().toISOString(),
  })
  
  // Jotform
  updates.push({
    key: 'jotform',
    value: {
      enabled: settings.jotform_enabled === true || settings.jotform_enabled === 'true',
      form_id: settings.jotform_form_id || '',
      embed_url: settings.jotform_embed_url || '',
    },
    updated_at: new Date().toISOString(),
  })
  
  // Terms Content
  if (settings.terms_content !== undefined) {
    updates.push({
      key: 'terms_content',
      value: settings.terms_content,
      updated_at: new Date().toISOString(),
    })
  }
  
  // Privacy Content
  if (settings.privacy_content !== undefined) {
    updates.push({
      key: 'privacy_content',
      value: settings.privacy_content,
      updated_at: new Date().toISOString(),
    })
  }
  
  // Other standalone settings (instagram_handle, google_place_id, etc.)
  const standaloneKeys = ['instagram_handle', 'google_place_id', 'instagram_feed_embed', 'sync_secret_key']
  standaloneKeys.forEach(key => {
    if (settings[key] !== undefined) {
      updates.push({
        key,
        value: settings[key],
        updated_at: new Date().toISOString(),
      })
    }
  })
  
  const { error } = await supabase
    .from('site_settings')
    .upsert(updates, { onConflict: 'key' })
  
  if (error) throw error
  revalidatePath('/admin/settings')
  return { success: true }
}

// ==================== DASHBOARD STATS ====================

export async function getDashboardStats() {
  const supabase = await createAdminClient()
  
  const [classes, trainers, blog, testimonials, gallery, faqs, careers, leads] = await Promise.all([
    supabase.from('gym_classes').select('id', { count: 'exact' }),
    supabase.from('trainers').select('id', { count: 'exact' }),
    supabase.from('blog_posts').select('id', { count: 'exact' }).eq('published', true),
    supabase.from('testimonials').select('id', { count: 'exact' }).eq('approved', true),
    supabase.from('gallery_images').select('id', { count: 'exact' }),
    supabase.from('faqs').select('id', { count: 'exact' }),
    supabase.from('career_postings').select('id', { count: 'exact' }).eq('active', true),
    supabase.from('contact_submissions').select('id', { count: 'exact' }).eq('status', 'new'),
  ])
  
  return {
    classes: classes.count || 0,
    trainers: trainers.count || 0,
    blog: blog.count || 0,
    testimonials: testimonials.count || 0,
    gallery: gallery.count || 0,
    faqs: faqs.count || 0,
    careers: careers.count || 0,
    newLeads: leads.count || 0,
  }
}
