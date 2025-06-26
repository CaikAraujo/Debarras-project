'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import HeroSwiss from '@/components/sections/HeroSwiss'
import AboutSwiss from '@/components/sections/AboutSwiss'
import ServicesSwiss from '@/components/sections/ServicesSwiss'
import FeedbackSwiss from '@/components/sections/FeedbackSwiss'
import ContactSwiss from '@/components/sections/ContactSwiss'
import SectionDivider from '@/components/ui/SectionDivider'

export default function Home() {
  return (
    <div className="min-h-screen bg-main">
      <NavSwiss />
      <HeroSwiss />
      <SectionDivider variant="accent" />
      <AboutSwiss />
      <SectionDivider variant="dots" />
      <ServicesSwiss />
      <SectionDivider variant="accent" />
      <FeedbackSwiss />
      <SectionDivider variant="default" />
      <ContactSwiss />
      
      {/* Footer minimalista */}
      <footer className="section-swiss bg-section border-t border-gray-200">
        <div className="container-swiss">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-primary mb-4">Débarras Pro</h3>
              <p className="text-secondary text-sm mb-4">
                Spécialistes en débarras et nettoyage professionnel en Suisse.
                Service rapide, écologique et conforme aux normes.
              </p>
              <div className="flex space-x-4 text-sm text-light">
                <span>Certifié ISO 14001</span>
                <span>Assurance RC</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-secondary">
                <li><a href="#" className="hover:text-accent transition-colors">Débarras résidentiel</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Débarras commercial</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Nettoyage professionnel</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Élimination de gravats</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Organisation d'espaces</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-secondary">
                <p>Rue de l'Industrie 12</p>
                <p>1950 Sion, Valais</p>
                <p>
                  <a href="tel:+41270001234" className="text-link hover:underline">
                    +41 27 000 12 34
                  </a>
                </p>
                <p>
                  <a href="mailto:contact@debarras-pro.ch" className="text-link hover:underline">
                    contact@debarras-pro.ch
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-light">
            <div>
              © 2024 Débarras Pro. Tous droits réservés.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-accent transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-accent transition-colors">Politique de confidentialité</a>
              <a href="/feedback" className="hover:text-accent transition-colors">Témoignages</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
