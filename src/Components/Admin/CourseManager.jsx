import React, { useState } from 'react'
import { Plus, Edit, Trash2, Upload, X } from 'lucide-react'

const CourseManager = ({ courses, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    image_url: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = newCourse.image_url

      // Agar yangi rasm yuklangan bo'lsa
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `course-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('courses')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('courses')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const courseData = {
        ...newCourse,
        image_url: imageUrl,
        price: parseFloat(newCourse.price)
      }

      if (editingCourse) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourse.id)

        if (error) throw error
      } else {
        // Add new course
        const { error } = await supabase
          .from('courses')
          .insert([courseData])

        if (error) throw error
      }

      // Reset form
      setNewCourse({ title: '', description: '', price: '', image_url: '' })
      setImageFile(null)
      setShowAddModal(false)
      setEditingCourse(null)
      onUpdate()
    } catch (error) {
      console.error('Course save error:', error)
      alert('Kursni saqlashda xatolik yuz berdi')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (course) => {
    setEditingCourse(course)
    setNewCourse({
      title: course.title,
      description: course.description || '',
      price: course.price.toString(),
      image_url: course.image_url || ''
    })
    setShowAddModal(true)
  }

  const handleDelete = async (courseId) => {
    if (!confirm('Kursni o\'chirmoqchimisiz?')) return

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', courseId)

    if (error) {
      console.error('Course delete error:', error)
      alert('Kursni o\'chirishda xatolik yuz berdi')
    } else {
      onUpdate()
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Preview uchun
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewCourse(prev => ({ ...prev, image_url: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kurslar boshqaruvi</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Yangi kurs</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-gray-600">{course.price} so'm</p>
                {course.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingCourse(null)
                  setNewCourse({ title: '', description: '', price: '', image_url: '' })
                  setImageFile(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kurs nomi</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tavsif</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Narxi (so'm)</label>
                <input
                  type="number"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rasm</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {newCourse.image_url && (
                  <img
                    src={newCourse.image_url}
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Saqlanmoqda...' : (editingCourse ? 'Yangilash' : 'Qo\'shish')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingCourse(null)
                    setNewCourse({ title: '', description: '', price: '', image_url: '' })
                    setImageFile(null)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseManager