import { supabase, TABLES } from './supabase'

// Courses API
export const coursesAPI = {
  // Barcha kurslarni olish
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Yangi kurs qo'shish
  create: async (courseData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .insert([courseData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Kursni yangilash
  update: async (id, courseData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.COURSES)
        .update(courseData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Kursni o'chirish
  delete: async (id) => {
    try {
      const { error } = await supabase
        .from(TABLES.COURSES)
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      return { error }
    }
  }
}

// Teachers API
export const teachersAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEACHERS)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  create: async (teacherData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEACHERS)
        .insert([teacherData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  update: async (id, teacherData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.TEACHERS)
        .update(teacherData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from(TABLES.TEACHERS)
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      return { error }
    }
  }
}

// Results API
export const resultsAPI = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.RESULTS)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  create: async (resultData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.RESULTS)
        .insert([resultData])
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  update: async (id, resultData) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.RESULTS)
        .update(resultData)
        .eq('id', id)
        .select()
      
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from(TABLES.RESULTS)
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (error) {
      return { error }
    }
  }
}