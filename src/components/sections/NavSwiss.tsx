'use client'

import Link from 'next/link'
import Image from 'next/image'
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
            
            {/* Busca + Language */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 260px', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', flex: '1 1 160px', maxWidth: 280 }}>
                <input 
                  type="text" 
                  placeholder={t.search} 
                  style={{
                    padding: '6px 28px 6px 10px',
                    border: '1px solid var(--border-gray)',
                    fontSize: '13px',
                    width: '100%'
                  }}
                />
                <span style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '6px', 
                  color: 'var(--text-medium)'
                }}>🔍</span>
              </div>
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