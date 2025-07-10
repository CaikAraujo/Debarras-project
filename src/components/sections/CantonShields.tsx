'use client'

import Image from 'next/image'

const cantons = [
  { name: 'Genève', image: '/images/escudos/geneve.png' },
  { name: 'Vaud', image: '/images/escudos/vaud.png' },
  { name: 'Valais', image: '/images/escudos/valais.png' },
  { name: 'Fribourg', image: '/images/escudos/fribourg.svg' },
  { name: 'Neuchâtel', image: '/images/escudos/neuchatel.png' },
  { name: 'Jura', image: '/images/escudos/jura.svg' },
  { name: 'Berne', image: '/images/escudos/berne.svg' }
]

const CantonShields = () => {
  return (
    <section className="section-swiss bg-gray-50 border-b border-gray-200">
      <div className="container-swiss">
        
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6">Nos Cantons d&apos;Intervention</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Nous intervenons dans tous les cantons de la Suisse romande avec la même qualité 
            de service et le respect des réglementations locales.
          </p>
        </div>

        {/* Grid dos escudos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center">
          {cantons.map((canton, index) => (
            <div 
              key={index} 
              className="card-swiss card-swiss-hover text-center p-6"
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
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-secondary mb-6">
            Une équipe locale dans chaque canton pour mieux vous servir
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="admin-btn">
              Demander un Devis
            </a>
            <a href="tel:+41276051234" className="admin-btn-outline">
              Appeler Maintenant
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CantonShields 