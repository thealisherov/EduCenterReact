import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import Card from '../UI/Card'

const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) {
        setTeachers(data || [])
      }
    } catch (err) {
      console.error('Teachers fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="teachers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">O'qituvchilar yuklanmoqda...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="teachers" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bizning O'qituvchilarimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tajribali professional dasturchilar va texnologiya ekspertlari
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="text-center">
              {teacher.image_url && (
                <div className="p-6 pb-0">
                  <img
                    src={teacher.image_url}
                    alt={teacher.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {teacher.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {teacher.profession}
                </p>
                <p className="text-gray-600">
                  {teacher.experience}
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        {teachers.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Hozircha o'qituvchilar ma'lumotlari mavjud emas
          </div>
        )}
      </div>
    </section>
  )
}

export default Teachers