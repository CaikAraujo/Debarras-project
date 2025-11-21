'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import useI18n from '@/components/i18n/useI18n'
import LanguagePicker from '@/components/i18n/languagePicker'

const NavSwiss = () => {
  const { t } = useI18n()
  
  return (
    <div className="admin-header">
     
      {/* Header principal com logo */}
      <div className="admin-header-main">
        <div className="admin-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto', minWidth: 220 }}>
              {/* Logo da Empresa */}
	              <div style={{ 
	                width: '72px', 
	                height: '72px', 
	                display: 'flex', 
	                alignItems: 'center', 
	                justifyContent: 'center'
	              }}>
                <Image 
                  src="/images/logo debarras.png" 
                  alt="Suisse Débarras Logo" 
	                  width={72}
	                  height={72}
                  style={{ 
                    objectFit: 'contain' 
                  }}
                />
              </div>
              
              {/* Textos do header */}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  {t.brand}
                </div>
	                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>
                  {t.tagline}
                </div>
              </div>
            </div>
            
            {/* Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
              <a 
                href="tel:+41229391549" 
                className="phone-button"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(220, 0, 24, 0.04)',
                  border: '1px solid rgba(220, 0, 24, 0.1)',
                  borderRadius: '24px',
                  color: 'var(--text-dark)', 
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(220, 0, 24, 0.08)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 0, 24, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(220, 0, 24, 0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: 'var(--swiss-red)',
                  borderRadius: '50%',
                  color: 'white'
                }}>
                  <Phone size={14} fill="white" />
                </div>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>+41 22 939 15 49</span>
              </a>
              <LanguagePicker />
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <div className="admin-nav">
        <div className="admin-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Link href="/" className="admin-nav-item">{t.nav.about}</Link>
          <Link href="/services" className="admin-nav-item">{t.nav.services}</Link>
          <Link href="/devis" className="admin-nav-item">{t.nav.devis}</Link>
          <Link href="/contact" className="admin-nav-item">{t.nav.contact}</Link>
          <Link href="/feedback" className="admin-nav-item">{t.nav.feedback}</Link>
        </div>
      </div>
    </div>
  )
}

export default NavSwiss 