import { createClient } from '@supabase/supabase-js'

// Environment variables dan olish
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Konfiguratsiya mavjudligini tekshirish
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase konfiguratsiyasi topilmadi. .env faylini tekshiring.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database tables
export const TABLES = {
  COURSES: 'courses',
  TEACHERS: 'teachers', 
  RESULTS: 'results',
  PROFILES: 'profiles'
}

// Storage buckets
export const STORAGE_BUCKETS = {
  COURSES: 'courses',
  TEACHERS: 'teachers',
  CERTIFICATES: 'certificates'
}

// Helper functions
export const uploadFile = async (bucket, file, fileName) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return { data: { path: data.path, publicUrl }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const deleteFile = async (bucket, path) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])
    
    return { error }
  } catch (error) {
    return { error }
  }
}

export const getPublicUrl = (bucket, path) => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return publicUrl
}

// Default credentials (faqat development uchun)
export const DEFAULT_CREDENTIALS = {
  email: import.meta.env.VITE_DEFAULT_ADMIN_EMAIL || 'admin@oquvmarkazi.uz',
  password: import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD || 'Admin123!'
}