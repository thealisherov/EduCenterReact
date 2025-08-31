import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Kelajakni O'rganaylik
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Professional dasturlash kurslari bilan texnologiya sohasida o'z karyerangizni boshlang
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
              Kurslarni Ko'rish
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Bog'lanish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero