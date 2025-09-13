'use client'

import Link from 'next/link'
import useI18n from '@/components/i18n/useI18n'

const FooterSwiss = () => {
  const { t } = useI18n()
  return (
    <div className="admin-footer">
      <div className="admin-container">
        <div className="admin-footer-grid">
          
          <div>
            <h4>{t.footer.brand}</h4>
            <ul>
              <li><Link href="/">{t.footer.aboutUs}</Link></li>
              <li><Link href="/services">{t.footer.services}</Link></li>
              <li><Link href="/contact">{t.footer.contact}</Link></li>
              <li><Link href="/feedback">{t.footer.feedback}</Link></li>
            </ul>
          </div>
          
                      <div>
              <h4>{t.footer.services}</h4>
              <ul>
                <li><Link href="/services">{t.footer.serviceLinks[0]}</Link></li>
                <li><Link href="/services">{t.footer.serviceLinks[1]}</Link></li>
                <li><Link href="/services">{t.footer.serviceLinks[2]}</Link></li>
                <li><Link href="/services">{t.footer.serviceLinks[3]}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4>{t.footer.info}</h4>
              <ul>
                <li><Link href="/contact">{t.footer.docs}</Link></li>
                <li><Link href="/contact">{t.footer.legalBases}</Link></li>
                <li><Link href="/contact">{t.footer.privacy}</Link></li>
                <li><Link href="/contact">{t.footer.accessibility}</Link></li>
              </ul>
            </div>
          
                      <div>
              <h4>{t.footer.followUs}</h4>
              <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><Link href="/feedback">{t.footer.testimonials}</Link></li>
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
              {t.footer.copyright}
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link href="/contact" style={{ color: 'var(--text-medium)' }}>{t.footer.mentions}</Link>
              <Link href="/contact" style={{ color: 'var(--text-medium)' }}>{t.footer.impressum}</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default FooterSwiss 