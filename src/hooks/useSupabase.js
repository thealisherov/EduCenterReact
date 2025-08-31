import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ukkmynebzbrktkpjqxii.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVra215bmViemJya3RrcGpxeGlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MzQ5NTEsImV4cCI6MjA3MjExMDk1MX0.zsM_wd0W3Cb-hJufnVfxtAdnsGOKY1_bSlyRluvgvSU'

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