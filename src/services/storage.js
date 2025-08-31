import { supabase, STORAGE_BUCKETS } from './supabase'

// File upload utility
export const uploadFile = async (bucket, file, customName = null) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = customName || `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        upsert: false // Don't overwrite existing files
      })
    
    if (error) throw error
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return {
      success: true,
      data: {
        path: data.path,
        publicUrl,
        fileName
      },
      error: null
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message
    }
  }
}

// Delete file from storage
export const deleteFile = async (bucket, fileName) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName])
    
    if (error) throw error
    
    return {
      success: true,
      error: null
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Get public URL for file
export const getFileUrl = (bucket, fileName) => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName)
  
  return publicUrl
}

// Upload course image
export const uploadCourseImage = async (file) => {
  return uploadFile(STORAGE_BUCKETS.COURSES, file, `course-${Date.now()}`)
}

// Upload teacher image
export const uploadTeacherImage = async (file) => {
  return uploadFile(STORAGE_BUCKETS.TEACHERS, file, `teacher-${Date.now()}`)
}

// Upload certificate
export const uploadCertificate = async (file) => {
  return uploadFile(STORAGE_BUCKETS.CERTIFICATES, file, `cert-${Date.now()}`)
}

// Validate file type and size
export const validateFile = (file, allowedTypes, maxSizeMB = 5) => {
  const errors = []
  
  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    errors.push(`Fayl turi noto'g'ri. Ruxsat etilgan: ${allowedTypes.join(', ')}`)
  }
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    errors.push(`Fayl hajmi ${maxSizeMB}MB dan oshmasligi kerak`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Common file type constants
export const FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALL_CERTIFICATES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
}