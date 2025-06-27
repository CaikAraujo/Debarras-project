'use client'

import { useState } from 'react'

const NavSwiss = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <div className="admin-header">
      {/* Barra superior com idiomas e contato */}
      <div className="admin-header-top">
        <div className="admin-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--swiss-red)', fontWeight: 'bold' }}>▷</span>
              <span>Débarras Professionnel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span>Contact</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ padding: '2px 6px', background: 'var(--background)', border: '1px solid var(--border-gray)', fontSize: '11px' }}>DE</span>
                <span style={{ padding: '2px 6px', background: 'var(--swiss-red)', color: 'white', fontSize: '11px' }}>FR</span>
                <span style={{ padding: '2px 6px', background: 'var(--background)', border: '1px solid var(--border-gray)', fontSize: '11px' }}>IT</span>
                <span style={{ padding: '2px 6px', background: 'var(--background)', border: '1px solid var(--border-gray)', fontSize: '11px' }}>RM</span>
                <span style={{ padding: '2px 6px', background: 'var(--background)', border: '1px solid var(--border-gray)', fontSize: '11px' }}>EN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal com logo */}
      <div className="admin-header-main">
        <div className="admin-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Logo da Suíça */}
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--swiss-red)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '32px'
              }}>
                +
              </div>
              
              {/* Textos do header */}
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-medium)', marginBottom: '2px' }}>
                  Service Professionnel Suisse
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  Débarras Pro
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-medium)' }}>
                  Solutions de débarras et nettoyage
                </div>
              </div>
            </div>
            
            {/* Busca e temas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  placeholder="Search" 
                  style={{
                    padding: '6px 12px',
                    border: '1px solid var(--border-gray)',
                    fontSize: '13px',
                    width: '200px'
                  }}
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '6px', 
                  color: 'var(--text-medium)'
                }}>🔍</span>
              </div>
              <select style={{
                padding: '6px 12px',
                border: '1px solid var(--border-gray)',
                fontSize: '13px',
                background: 'white'
              }}>
                <option>Thèmes A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="admin-nav">
        <div className="admin-container">
          <a href="#" className="admin-nav-item">Services</a>
          <a href="#about" className="admin-nav-item">À propos</a>
          <a href="#" className="admin-nav-item">Zones d'intervention</a>
          <a href="#contact" className="admin-nav-item">Contact</a>
          <a href="#" className="admin-nav-item">Devis</a>
          <a href="#" className="admin-nav-item">Documentation</a>
        </div>
      </div>
    </div>
  )
}

export default NavSwiss 