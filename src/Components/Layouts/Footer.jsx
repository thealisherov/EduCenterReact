import React from 'react'
import { BookOpen, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo va Ma'lumot */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
              <h3 className="text-2xl font-bold">O'quv Markazi</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Zamonaviy dasturlash va texnologiyalar bo'yicha professional ta'lim. 
              Sizning karyerangiz bizning maqsadimiz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Tezkor Havolalar */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tezkor Havolalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#courses" className="text-gray-400 hover:text-white transition">
                  Kurslar
                </a>
              </li>
              <li>
                <a href="#teachers" className="text-gray-400 hover:text-white transition">
                  O'qituvchilar
                </a>
              </li>
              <li>
                <a href="#results" className="text-gray-400 hover:text-white transition">
                  Natijalar
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition">
                  Biz haqimizda
                </a>
              </li>
            </ul>
          </div>

          {/* Aloqa Ma'lumotlari */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Aloqa</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">+998 90 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-400">info@oquvmarkazi.uz</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-1" />
                <span className="text-gray-400">
                  Toshkent shahri, Yunusobod tumani, 
                  Amir Temur ko'chasi 108
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pastki chiziq */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 O'quv Markazi. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Maxfiylik siyosati
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition">
                Foydalanish shartlari
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer