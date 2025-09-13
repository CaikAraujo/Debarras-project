'use client'

export const dynamic = "force-dynamic";

import NavSwiss from '@/components/sections/NavSwiss'
import DevisSwiss from '@/components/sections/DevisSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import useI18n from '@/components/i18n/useI18n'

export default function DevisPageClient() {
  const { t } = useI18n()
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <DevisSwiss />
      
      {/* Seção de informações adicionais */}
      <section className="section-swiss bg-gray-50 border-b border-gray-200">
        <div className="container-swiss">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-primary mb-8">{t.devis.landing.howTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              <div className="text-center max-w-xs">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{t.devis.landing.steps[0].title}</h3>
                <p className="text-secondary">
                  {t.devis.landing.steps[0].desc}
                </p>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{t.devis.landing.steps[1].title}</h3>
                <p className="text-secondary">
                  {t.devis.landing.steps[1].desc}
                </p>
              </div>
              
              <div className="text-center max-w-xs">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">{t.devis.landing.steps[2].title}</h3>
                <p className="text-secondary">
                  {t.devis.landing.steps[2].desc}
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-4">{t.devis.landing.guaranteesTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-secondary">
                <div>
                  <h4 className="font-semibold text-primary mb-2">{t.devis.landing.guarantees[0].title}</h4>
                  <p>{t.devis.landing.guarantees[0].desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">{t.devis.landing.guarantees[1].title}</h4>
                  <p>{t.devis.landing.guarantees[1].desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">{t.devis.landing.guarantees[2].title}</h4>
                  <p>{t.devis.landing.guarantees[2].desc}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">{t.devis.landing.guarantees[3].title}</h4>
                  <p>{t.devis.landing.guarantees[3].desc}</p>
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