'use client'

import Link from 'next/link'

const NavSwiss = () => {
  
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
              {/* Logo da Empresa */}
              <div style={{ 
                width: '60px', 
                height: '60px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
                <img 
                  src="/images/logo debarras.png" 
                  alt="Suisse Débarras Logo" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }}
                />
              </div>
              
              {/* Textos do header */}
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-medium)', marginBottom: '2px' }}>
                  Service Professionnel Suisse
                </div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  Suisse Débarras
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-medium)' }}>
                  Solutions de débarras et nettoyage
                </div>
              </div>
            </div>
            
            {/* Busca */}
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
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="admin-nav">
        <div className="admin-container">
          <Link href="/" className="admin-nav-item">À propos</Link>
          <Link href="/services" className="admin-nav-item">Services</Link>
          <Link href="/contact" className="admin-nav-item">Contact</Link>
          <Link href="/feedback" className="admin-nav-item">Feedback</Link>
        </div>
      </div>
    </div>
  )
}

export default NavSwiss 