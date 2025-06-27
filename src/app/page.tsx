'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import HeroSwiss from '@/components/sections/HeroSwiss'
import ServicesSwiss from '@/components/sections/ServicesSwiss'
import ContactSwiss from '@/components/sections/ContactSwiss'

export default function Home() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <HeroSwiss />
      <ServicesSwiss />
      <ContactSwiss />
      
      {/* Footer style admin.ch */}
      <div className="admin-footer">
        <div className="admin-container">
          <div className="admin-footer-grid">
            
            <div>
              <h4>Débarras Pro</h4>
              <ul>
                <li><a href="#">À propos de nous</a></li>
                <li><a href="#">Organisation</a></li>
                <li><a href="#">Emplois</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#">Débarras résidentiel</a></li>
                <li><a href="#">Débarras commercial</a></li>
                <li><a href="#">Nettoyage professionnel</a></li>
                <li><a href="#">Tri et recyclage</a></li>
              </ul>
            </div>
            
            <div>
              <h4>Informations</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Bases légales</a></li>
                <li><a href="#">Protection des données</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
            
            <div>
              <h4>Suivez-nous</h4>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Newsletter</a></li>
              </ul>
            </div>
            
          </div>
          
          <div style={{ 
            borderTop: '1px solid var(--border-gray)', 
            paddingTop: '20px', 
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--text-medium)'
          }}>
            <div>
              © 2024 Débarras Pro Sàrl. Tous droits réservés.
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" style={{ color: 'var(--text-medium)' }}>Mentions légales</a>
              <a href="#" style={{ color: 'var(--text-medium)' }}>Impressum</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
