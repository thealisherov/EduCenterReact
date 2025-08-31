import React, { useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { supabase } from '../../services/supabase'

const TeacherManager = ({ teachers, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    profession: '',
    experience: '',
    image_url: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = newTeacher.image_url

      // Agar yangi rasm yuklangan bo'lsa
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `teacher-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('teachers')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('teachers')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const teacherData = {
        ...newTeacher,
        image_url: imageUrl
      }

      if (editingTeacher) {
        // Update existing teacher
        const { error } = await supabase
          .from('teachers')
          .update(teacherData)
          .eq('id', editingTeacher.id)

        if (error) throw error
      } else {
        // Add new teacher
        const { error } = await supabase
          .from('teachers')
          .insert([teacherData])

        if (error) throw error
      }

      // Reset form
      setNewTeacher({ name: '', profession: '', experience: '', image_url: '' })
      setImageFile(null)
      setShowAddModal(false)
      setEditingTeacher(null)
      onUpdate()
    } catch (error) {
      console.error('Teacher save error:', error)
      alert('O\'qituvchini saqlashda xatolik yuz berdi')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher)
    setNewTeacher({
      name: teacher.name,
      profession: teacher.profession || '',
      experience: teacher.experience || '',
      image_url: teacher.image_url || ''
    })
    setShowAddModal(true)
  }

  const handleDelete = async (teacherId) => {
    if (!confirm('O\'qituvchini o\'chirmoqchimisiz?')) return

    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', teacherId)

    if (error) {
      console.error('Teacher delete error:', error)
      alert('O\'qituvchini o\'chirishda xatolik yuz berdi')
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
        setNewTeacher(prev => ({ ...prev, image_url: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">O'qituvchilar boshqaruvi</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Yangi o'qituvchi</span>
        </button>
      </div>

      {/* Teachers List */}
      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {teacher.image_url && (
                <img
                  src={teacher.image_url}
                  alt={teacher.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">{teacher.name}</h3>
                <p className="text-blue-600 font-medium">{teacher.profession}</p>
                <p className="text-gray-600 text-sm">{teacher.experience}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(teacher)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(teacher.id)}
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
                {editingTeacher ? 'O\'qituvchini tahrirlash' : 'Yangi o\'qituvchi qo\'shish'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingTeacher(null)
                  setNewTeacher({ name: '', profession: '', experience: '', image_url: '' })
                  setImageFile(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">F.I.SH</label>
                <input
                  type="text"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mutaxassisligi</label>
                <input
                  type="text"
                  value={newTeacher.profession}
                  onChange={(e) => setNewTeacher(prev => ({ ...prev, profession: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tajriba</label>
                <textarea
                  value={newTeacher.experience}
                  onChange={(e) => setNewTeacher(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
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
                {newTeacher.image_url && (
                  <img
                    src={newTeacher.image_url}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded-full mx-auto"
                  />
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Saqlanmoqda...' : (editingTeacher ? 'Yangilash' : 'Qo\'shish')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingTeacher(null)
                    setNewTeacher({ name: '', profession: '', experience: '', image_url: '' })
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

export default TeacherManager