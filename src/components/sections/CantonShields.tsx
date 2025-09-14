'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cantons as cantonData } from '@/data/devisData'
import useI18n from '@/components/i18n/useI18n'


const CantonShields = () => {
  const { t } = useI18n()
  return (
    <section className="section-swiss bg-gray-50 border-b border-gray-200">
      <div className="container-swiss">
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6">{t.cantons.title}</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">{t.cantons.desc}</p>
        </div>
        {/* Grid dos escudos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {cantonData.map((canton, idx) => {
            const isLastOdd = idx === cantonData.length - 1 && cantonData.length % 2 === 1
            const classes = `card-swiss card-swiss-hover text-center p-6 ${isLastOdd ? 'col-span-2 md:col-span-1' : ''}`
            return (
              <Link
                key={canton.id}
                href={`/devis?canton=${canton.id}`}
                className={classes}
                style={{ height: '150px', textDecoration: 'none' }}
              >
                <div className="mb-4">
                  <div className="canton-shield-container">
                    <Image
                      src={canton.image}
                      alt={`Escudo de ${canton.name}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-sm font-medium text-primary">
                  {canton.name}
                </div>
              </Link>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-secondary mb-6">{t.cantons.teamLocal}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/devis" className="admin-btn">{t.common.requestQuote}</a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CantonShields 