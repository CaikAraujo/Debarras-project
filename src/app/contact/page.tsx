'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import ContactSwiss from '@/components/sections/ContactSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import useI18n from '@/components/i18n/useI18n'

export default function ContactPage() {
  const { t } = useI18n()
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <ContactSwiss />
      
      {/* Seção adicional de informações legais */}
      <section className="section-swiss bg-white border-b border-gray-200">
        <div className="container-swiss">
          <div className="max-w-4xl">
            <h2 className="text-primary mb-8">{t.contact.legal.header}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-6">{t.contact.legal.mentionsTitle}</h3>
                <div className="space-y-4 text-secondary">
                  <div>
                    <strong>{t.contact.legal.labels.company}</strong><br />
                    Suisse Débarras
                  </div>
                  <div>
                    <strong>{t.contact.legal.labels.ide}</strong><br />
                    CHE-123.456.789
                  </div>
                  <div>
                    <strong>{t.contact.legal.labels.hq}</strong><br />
                    Avenue des Communes-Réunies 43<br />
                    1212 Grand-Lancy<br />
                    Genève, Suisse
                  </div>
                  <div>
                    <strong>{t.contact.legal.labels.capital}</strong><br />
                    CHF 20'000.-
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-6">{t.contact.legal.privacyTitle}</h3>
                {/* LPD - Loi sur la Protection des Données */}
                <div className="space-y-4 text-secondary text-sm">
                  <p>{t.contact.legal.lpd}</p>
                  <div>
                    <strong>{t.contact.legal.collect.label}</strong><br />
                    {t.contact.legal.collect.text}
                  </div>
                  <div>
                    <strong>{t.contact.legal.use.label}</strong><br />
                    {t.contact.legal.use.text}
                  </div>
                  <div>
                    <strong>{t.contact.legal.retention.label}</strong><br />
                    {t.contact.legal.retention.text}
                  </div>
                  <div>
                    <strong>{t.contact.legal.rights.label}</strong><br />
                    {t.contact.legal.rights.text}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-6">{t.contact.legal.termsTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary text-sm">
                <div>
                  <h4 className="font-semibold text-primary mb-3">{t.contact.legal.invoiceTitle}</h4>
                  <ul className="space-y-2">
                    <li>{t.contact.legal.invoiceBullets[0]}</li>
                    <li>{t.contact.legal.invoiceBullets[1]}</li>
                    <li>{t.contact.legal.invoiceBullets[2]}</li>
                    <li>{t.contact.legal.invoiceBullets[3]}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-3">{t.contact.legal.assuranceTitle}</h4>
                  <ul className="space-y-2">
                    <li>{t.contact.legal.assuranceBullets[0]}</li>
                    <li>{t.contact.legal.assuranceBullets[1]}</li>
                    <li>{t.contact.legal.assuranceBullets[2]}</li>
                    <li>{t.contact.legal.assuranceBullets[3]}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FooterSwiss />
    </div>
  )
} 