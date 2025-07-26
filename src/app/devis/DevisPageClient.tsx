'use client'

export const dynamic = "force-dynamic";

import NavSwiss from '@/components/sections/NavSwiss'
import DevisSwiss from '@/components/sections/DevisSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'

export default function DevisPageClient() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <DevisSwiss />
      
      {/* Seção de informações adicionais */}
      <section className="section-swiss bg-gray-50 border-b border-gray-200">
        <div className="container-swiss">
          <div className="max-w-4xl">
            <h2 className="text-primary mb-8">Comment ça marche ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Sélectionnez</h3>
                <p className="text-secondary">
                  Choisissez les pièces de votre logement et le nombre d&apos;objets à débarrasser dans chaque espace.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Calculez</h3>
                <p className="text-secondary">
                  Notre système calcule automatiquement le coût total de votre débarras selon votre sélection.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">Réservez</h3>
                <p className="text-secondary">
                  Confirmez votre devis et réservez votre créneau d&apos;intervention en ligne de façon sécurisée.
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-4">Nos Garanties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-secondary">
                <div>
                  <h4 className="font-semibold text-primary mb-2">✓ Prix Fixe Garanti</h4>
                  <p>Le prix affiché est définitif, sans surprise ni coût supplémentaire.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">✓ Intervention Rapide</h4>
                  <p>Planification flexible selon vos disponibilités, même en urgence.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">✓ Tri Écologique</h4>
                  <p>Recyclage professionnel et don aux associations locales.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">✓ Équipe Professionnelle</h4>
                  <p>Personnel formé, assuré et respectueux de votre domicile.</p>
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