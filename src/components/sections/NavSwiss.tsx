'use client'

import Link from 'next/link'
import Image from 'next/image'

const NavSwiss = () => {
  
  return (
    <div className="admin-header">
     
      {/* Header principal com logo */}
      <div className="admin-header-main">
        <div className="admin-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Logo da Empresa */}
	              <div style={{ 
	                width: '96px', 
	                height: '96px', 
	                display: 'flex', 
	                alignItems: 'center', 
	                justifyContent: 'center'
	              }}>
                <Image 
                  src="/images/logo debarras.png" 
                  alt="Suisse Débarras Logo" 
	                  width={96}
	                  height={96}
                  style={{ 
                    objectFit: 'contain' 
                  }}
                />
              </div>
              
              {/* Textos do header */}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  Suisse Débarras
                </div>
	                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>
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
          <Link href="/devis" className="admin-nav-item">Devis Online</Link>
          <Link href="/contact" className="admin-nav-item">Contact</Link>
          <Link href="/feedback" className="admin-nav-item">Feedback</Link>
        </div>
      </div>
    </div>
  )
}

export default NavSwiss 