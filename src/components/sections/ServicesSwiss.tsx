'use client'

import Link from 'next/link'
import useI18n from '@/components/i18n/useI18n'

const ServicesSwiss = () => {
  const { t } = useI18n()
  return (
    <section className="section-swiss bg-main">
      <div className="container-swiss">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-primary text-3xl font-bold mb-6">{t.servicesPage.header}</h1>
          <p className="text-lg text-secondary max-w-4xl mx-auto leading-relaxed">{t.servicesPage.desc}</p>
        </div>

                         {/* Services Grid */}
         <div className="grid-swiss-2 mb-16 items-stretch">
           
           <Link
            href="/services/nettoyage"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.nettoyage.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.nettoyage.title}`}
           >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.nettoyage.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.nettoyage.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.nettoyage.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.nettoyage.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.nettoyage.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
                       <Link
            href="/services/entreprises"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.entreprises.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.entreprises.title}`}
          >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.entreprises.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.entreprises.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.entreprises.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.entreprises.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.entreprises.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
                       <Link
            href="/services/fin-chantier"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.finChantier.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.finChantier.title}`}
          >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.finChantier.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.finChantier.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.finChantier.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.finChantier.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.finChantier.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
                       <Link
            href="/services/ecopoints"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.ecopoints.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.ecopoints.title}`}
          >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.ecopoints.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.ecopoints.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.ecopoints.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.ecopoints.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.ecopoints.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
                       <Link
            href="/services/destruction"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.destruction.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.destruction.title}`}
          >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.destruction.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.destruction.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.destruction.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.destruction.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.destruction.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
                       <Link
            href="/services/dechets-speciaux"
            className="group card-swiss card-swiss-hover text-center h-full flex flex-col justify-between cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swiss-red"
            style={{textDecoration:'none'}}
            aria-label={`${t.servicesPage.cards.dechetsSpeciaux.title} — ${t.common.learnMore}`}
            title={`${t.servicesPage.cards.dechetsSpeciaux.title}`}
          >
            <div>
              <h3 className="text-primary text-xl font-semibold mb-4">{t.servicesPage.cards.dechetsSpeciaux.title}</h3>
              <p className="text-secondary mb-4">{t.servicesPage.cards.dechetsSpeciaux.desc}</p>
            </div>
            <div className="space-y-1 mt-auto">
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.dechetsSpeciaux.bullets[0]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.dechetsSpeciaux.bullets[1]}
              </div>
              <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                <span className="text-swiss-red">✓</span> {t.servicesPage.cards.dechetsSpeciaux.bullets[2]}
              </div>
            </div>
            <div className="mt-4 text-swiss-red font-medium inline-flex items-center justify-center gap-1 transition-transform group-hover:translate-x-0.5">
              {t.common.learnMore} <span>→</span>
            </div>
          </Link>
          
         </div>
        
        {/* Statistiques */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h3 className="text-primary text-xl font-semibold text-center mb-8">{t.servicesPage.statsTitle}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="metric-card">
              <div className="metric-number">10+</div>
              <div className="metric-label">{t.servicesPage.stats.years}</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">6</div>
              <div className="metric-label">{t.servicesPage.stats.services}</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">500+</div>
              <div className="metric-label">{t.servicesPage.stats.projects}</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">48h</div>
              <div className="metric-label">{t.servicesPage.stats.maxDelay}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="metric-card">
              <div className="metric-number">95%</div>
              <div className="metric-label">{t.servicesPage.stats.recycled}</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">98%</div>
              <div className="metric-label">{t.servicesPage.stats.satisfied}</div>
            </div>
          </div>
        </div>




      </div>
    </section>
  )
}

export default ServicesSwiss 