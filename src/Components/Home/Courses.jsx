import React, { useState, useEffect } from 'react'
import { supabase } from '../../services/supabase'
import Card from '../UI/Card'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) {
        setCourses(data || [])
      }
    } catch (err) {
      console.error('Courses fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Kurslar yuklanmoqda...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bizning Kurslarimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional dasturlash va texnologiya bo'yicha eng so'nggi kurslar
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="transition-transform hover:scale-105">
              {course.image_url && (
                <img
                  src={course.image_url}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {new Intl.NumberFormat('uz-UZ').format(course.price)} so'm
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Batafsil
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {courses.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Hozircha kurslar mavjud emas
          </div>
        )}
      </div>
    </section>
  )
}

export default Courses