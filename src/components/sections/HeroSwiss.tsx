'use client'

import { useEffect, useState } from 'react'
import Button from '../ui/Button'

const HeroSwiss = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animação de entrada
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    // Efeito parallax no scroll
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Cálculos para efeitos parallax
  const opacity = Math.max(0, 1 - scrollY / 400)
  const translateY = scrollY * 0.5
  const scale = Math.max(0.8, 1 - scrollY / 2000)

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 sm:px-6"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: opacity,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 sm:opacity-30">
        <div className="absolute inset-0 bg-pattern-dots"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30"></div>

      <div className="container-swiss relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Título com animação - Simplificado */}
          <div className={`transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 sm:translate-y-12 opacity-0'
          }`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="block">Débarras Professionnel</span>
              <span className="block text-swiss-red">en Suisse</span>
            </h1>
          </div>
          
          {/* Subtitle com delay - Mais conciso */}
          <div className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 sm:translate-y-12 opacity-0'
          }`}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Libérez votre espace. Nous gérons le débarras et le nettoyage avec une efficacité suisse.
            </p>
          </div>
          
          {/* Button com delay maior - Foco no CTA principal */}
          <div className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 sm:translate-y-12 opacity-0'
          }`}>
            <div className="flex justify-center items-center">
              <Button 
                variant="primary" 
                className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Demander un Devis Gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Apenas visual */}
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } hidden sm:flex`}>
        <div className="flex flex-col items-center space-y-2 text-gray-400">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements - Responsive */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-swiss-red/10 rounded-full animate-pulse"></div>
      <div className="absolute top-32 sm:top-40 right-6 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-blue-500/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-24 sm:bottom-32 left-6 sm:left-20 w-8 sm:w-12 h-8 sm:h-12 bg-green-500/10 rounded-full animate-pulse delay-500"></div>
    </section>
  )
}

export default HeroSwiss 