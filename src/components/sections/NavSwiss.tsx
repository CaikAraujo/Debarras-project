'use client'

import { useState, useEffect } from 'react'
import Button from '../ui/Button'

const NavSwiss = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const navigation = [
    { name: 'Accueil', href: '#' },
    { name: 'À Propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Témoignages', href: '#feedback' },
    { name: 'Contact', href: '#contact' }
  ]

  // Effet de scroll pour la navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="container-swiss">
        <div className="flex items-center justify-between h-20">
          {/* Logo moderne */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center group no-underline">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-swiss-red to-swiss-red-dark rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                {/* Indicateur de disponibilité */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold text-gray-900 group-hover:text-swiss-red transition-colors duration-300">
                  Débarras Pro
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wide">
                  SERVICES SUISSES
                </div>
              </div>
            </a>
          </div>
          
          {/* Navigation moderne */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative py-2 text-sm font-medium text-gray-700 hover:text-swiss-red transition-all duration-300 group no-underline"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-swiss-red group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
          
          {/* Actions modernes */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Contact rapide */}
            <div className="flex items-center space-x-4 text-sm">
              <a 
                href="tel:+41270001234"
                className="flex items-center space-x-2 text-gray-600 hover:text-swiss-red transition-colors duration-300 no-underline"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-swiss-red-light transition-colors duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="font-medium">+41 27 000 12 34</span>
              </a>
            </div>
            
            {/* CTA principal */}
            <Button variant="primary" className="px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Devis Gratuit
            </Button>
          </div>
          
          {/* Menu mobile button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-expanded="false"
          >
            <span className="sr-only">Menu</span>
            <div className="relative w-6 h-6">
              <span className={`absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 top-3' : 'top-1'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 top-3 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 top-3' : 'top-5'
              }`}></span>
            </div>
          </button>
        </div>
        
        {/* Menu mobile moderne */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-6 border-t border-gray-100">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-swiss-red hover:bg-gray-50 rounded-lg transition-all duration-300 no-underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            {/* Actions mobile */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              <a 
                href="tel:+41270001234"
                className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 no-underline"
              >
                <svg className="w-5 h-5 text-swiss-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="font-semibold text-gray-900">+41 27 000 12 34</span>
              </a>
              
              <Button variant="primary" className="w-full py-4 rounded-xl font-semibold text-lg">
                Devis Gratuit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavSwiss 