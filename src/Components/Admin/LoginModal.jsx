import React, { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Info } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { DEFAULT_CREDENTIALS } from '../../services/supabase'

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDefaults, setShowDefaults] = useState(false)
  
  const { signIn } = useAuth()

  // Default credentials ni avtomatik to'ldirish (development mode)
  useEffect(() => {
    if (import.meta.env.DEV) {
      setEmail(DEFAULT_CREDENTIALS.email)
      setPassword(DEFAULT_CREDENTIALS.password)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await signIn(email, password)
      
      if (signInError) {
        setError(signInError.message === 'Invalid login credentials' 
          ? 'Email yoki parol noto\'g\'ri' 
          : signInError.message)
      } else {
        // Login successful
        onClose()
        setEmail('')
        setPassword('')
        setError('')
      }
    } catch (err) {
      setError('Tizimga kirishda xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setError('')
    setShowPassword(false)
    setShowDefaults(false)
    onClose()
  }

  const fillDefaults = () => {
    setEmail(DEFAULT_CREDENTIALS.email)
    setPassword(DEFAULT_CREDENTIALS.password)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tizimga kirish</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Development mode - default credentials hint */}
        {import.meta.env.DEV && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-800 font-medium">Development Mode</p>
                <p className="text-blue-700">
                  Test uchun: 
                  <button 
                    type="button"
                    onClick={fillDefaults}
                    className="ml-2 text-blue-600 underline hover:text-blue-800"
                  >
                    Default ma'lumotlarni to'ldirish
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@oquvmarkazi.uz"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="Parolingizni kiriting"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Kirish...
                </div>
              ) : (
                'Kirish'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Bekor qilish
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Admin panelga kirish uchun admin hisobingiz bo'lishi kerak
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal