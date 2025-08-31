import React, { useState, useEffect } from 'react'
import { X, BookOpen, Users, Trophy, Plus, Edit, Trash2, Upload } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../services/supabase'
import Navbar from '../Layouts/Navbar'
import CourseManager from './CourseManager'
import TeacherManager from './TeacherManager'
import ResultManager from './ResultManager'

const AdminDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState([])
  const [teachers, setTeachers] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, isAdmin, signOut } = useAuth()

  const navItems = [
    { key: 'courses', label: 'Kurslar', icon: BookOpen },
    { key: 'teachers', label: "O'qituvchilar", icon: Users },
    { key: 'results', label: 'Natijalar', icon: Trophy }
  ]

  useEffect(() => {
    if (user && isAdmin()) {
      fetchAllData()
    }
  }, [user])

  const fetchAllData = async () => {
    setLoading(true)
    await Promise.all([
      fetchCourses(),
      fetchTeachers(),
      fetchResults()
    ])
    setLoading(false)
  }

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
    }
  }

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
    }
  }

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) {
        setResults(data || [])
      }
    } catch (err) {
      console.error('Results fetch error:', err)
    }
  }

  if (!user || !isAdmin()) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Ruxsat yo'q</h2>
          <p className="mb-4">Sizda admin huquqlari yo'q.</p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Orqaga
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="min-h-full">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Xush kelibsiz, {user.email}
                </span>
                <button
                  onClick={signOut}
                  className="text-red-600 hover:text-red-700"
                >
                  Chiqish
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navbar
          items={navItems}
          activeItem={activeTab}
          onItemClick={setActiveTab}
          className="border-b"
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          ) : (
            <>
              {activeTab === 'courses' && (
                <CourseManager 
                  courses={courses} 
                  onUpdate={fetchCourses} 
                />
              )}
              
              {activeTab === 'teachers' && (
                <TeacherManager 
                  teachers={teachers} 
                  onUpdate={fetchTeachers} 
                />
              )}
              
              {activeTab === 'results' && (
                <ResultManager 
                  results={results} 
                  onUpdate={fetchResults} 
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard