import React, { useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import { supabase } from '../../services/supabase'

const ResultManager = ({ results, onUpdate }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingResult, setEditingResult] = useState(null)
  const [newResult, setNewResult] = useState({
    student_name: '',
    certificate_title: '',
    image_url: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = newResult.image_url

      // Agar yangi rasm yuklangan bo'lsa
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `result-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('certificates')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('certificates')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const resultData = {
        ...newResult,
        image_url: imageUrl
      }

      if (editingResult) {
        // Update existing result
        const { error } = await supabase
          .from('results')
          .update(resultData)
          .eq('id', editingResult.id)

        if (error) throw error
      } else {
        // Add new result
        const { error } = await supabase
          .from('results')
          .insert([resultData])

        if (error) throw error
      }

      // Reset form
      setNewResult({ student_name: '', certificate_title: '', image_url: '' })
      setImageFile(null)
      setShowAddModal(false)
      setEditingResult(null)
      onUpdate()
    } catch (error) {
      console.error('Result save error:', error)
      alert('Natijani saqlashda xatolik yuz berdi')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (result) => {
    setEditingResult(result)
    setNewResult({
      student_name: result.student_name,
      certificate_title: result.certificate_title || '',
      image_url: result.image_url || ''
    })
    setShowAddModal(true)
  }

  const handleDelete = async (resultId) => {
    if (!confirm('Natijani o\'chirmoqchimisiz?')) return

    const { error } = await supabase
      .from('results')
      .delete()
      .eq('id', resultId)

    if (error) {
      console.error('Result delete error:', error)
      alert('Natijani o\'chirishda xatolik yuz berdi')
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
        setNewResult(prev => ({ ...prev, image_url: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Natijalar boshqaruvi</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Yangi natija</span>
        </button>
      </div>

      {/* Results List */}
      <div className="grid gap-4">
        {results.map((result) => (
          <div key={result.id} className="bg-white border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {result.image_url && (
                <img
                  src={result.image_url}
                  alt={result.certificate_title}
                  className="w-20 h-16 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-semibold">{result.student_name}</h3>
                <p className="text-gray-600">{result.certificate_title}</p>
                <p className="text-sm text-gray-500">
                  {new Date(result.created_at).toLocaleDateString('uz-UZ')}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(result)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(result.id)}
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
                {editingResult ? 'Natijani tahrirlash' : 'Yangi natija qo\'shish'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingResult(null)
                  setNewResult({ student_name: '', certificate_title: '', image_url: '' })
                  setImageFile(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">O'quvchi ismi</label>
                <input
                  type="text"
                  value={newResult.student_name}
                  onChange={(e) => setNewResult(prev => ({ ...prev, student_name: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sertifikat nomi</label>
                <input
                  type="text"
                  value={newResult.certificate_title}
                  onChange={(e) => setNewResult(prev => ({ ...prev, certificate_title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sertifikat rasmi</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {newResult.image_url && (
                  <div className="mt-2">
                    {newResult.image_url.endsWith('.pdf') ? (
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-600">PDF fayl yuklangan</p>
                      </div>
                    ) : (
                      <img
                        src={newResult.image_url}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {uploading ? 'Saqlanmoqda...' : (editingResult ? 'Yangilash' : 'Qo\'shish')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingResult(null)
                    setNewResult({ student_name: '', certificate_title: '', image_url: '' })
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

export default ResultManager