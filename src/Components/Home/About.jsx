import React from 'react'
import { Users, Trophy, BookOpen, Star } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'O\'quvchilar' },
    { icon: BookOpen, number: '15+', label: 'Kurslar' },
    { icon: Trophy, number: '300+', label: 'Sertifikatlar' },
    { icon: Star, number: '4.9', label: 'Baho' }
  ]

  const features = [
    {
      title: 'Professional O\'qituvchilar',
      description: 'Tajribali dasturchilar va texnologiya ekspertlari',
      icon: Users
    },
    {
      title: 'Amaliy Loyihalar',
      description: 'Real dunyo loyihalari ustida ishlash',
      icon: BookOpen
    },
    {
      title: 'Individual Yondashuv',
      description: 'Har bir o\'quvchiga alohida e\'tibor',
      icon: Star
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Biz Haqimizda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zamonaviy texnologiyalar va professional dasturlash bo'yicha ta'lim berishda 
            etakchi o'quv markazimiz sizning karyerangizni yangi bosqichga olib chiqadi.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map(({ icon: Icon, number, label }, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{number}</div>
              <div className="text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map(({ title, description, icon: Icon }, index) => (
            <div key={index} className="text-center p-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bizning Missiyamiz
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Har bir o'quvchini zamonaviy texnologiyalar bilan tanishtirib, ularning professional 
            ko'nikmalarini rivojlantirish va kelajakdagi muvaffaqiyatli karyera uchun tayyorlash. 
            Biz nafaqat nazariy bilim, balki amaliy tajriba ham beramiz.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About