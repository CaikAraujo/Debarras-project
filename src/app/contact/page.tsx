'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import ContactSwiss from '@/components/sections/ContactSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <ContactSwiss />
      
      {/* Seção adicional de informações legais */}
      <section className="section-swiss bg-white border-b border-gray-200">
        <div className="container-swiss">
          <div className="max-w-4xl">
            <h2 className="text-primary mb-8">Informations Légales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-6">Mentions Légales</h3>
                <div className="space-y-4 text-secondary">
                  <div>
                    <strong>Raison sociale :</strong><br />
                    Débarras Pro Sàrl
                  </div>
                  <div>
                    <strong>Numéro IDE :</strong><br />
                    CHE-123.456.789
                  </div>
                  <div>
                    <strong>Siège social :</strong><br />
                    Route du Débarras 15<br />
                    1950 Sion, Valais
                  </div>
                  <div>
                    <strong>Capital social :</strong><br />
                    CHF 20'000.-
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-primary mb-6">Protection des Données</h3>
                <div className="space-y-4 text-secondary text-sm">
                  <p>
                    Conformément à la Loi fédérale sur la protection des données (LPD), 
                    nous nous engageons à protéger vos données personnelles.
                  </p>
                  <div>
                    <strong>Collecte de données :</strong><br />
                    Uniquement les informations nécessaires à l'exécution de nos services.
                  </div>
                  <div>
                    <strong>Utilisation :</strong><br />
                    Devis, facturation, communication liée aux services.
                  </div>
                  <div>
                    <strong>Conservation :</strong><br />
                    10 ans maximum selon les obligations légales suisses.
                  </div>
                  <div>
                    <strong>Vos droits :</strong><br />
                    Accès, rectification, suppression de vos données sur demande.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-6">Conditions Générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-secondary text-sm">
                <div>
                  <h4 className="font-semibold text-primary mb-3">Devis et Facturation</h4>
                  <ul className="space-y-2">
                    <li>• Devis gratuit et sans engagement</li>
                    <li>• Prix fixe communiqué avant intervention</li>
                    <li>• Facturation après validation du client</li>
                    <li>• Paiement 30 jours net</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-3">Assurances et Garanties</h4>
                  <ul className="space-y-2">
                    <li>• Assurance RC 2 millions CHF</li>
                    <li>• Personnel formé et certifié</li>
                    <li>• Garantie satisfaction 100%</li>
                    <li>• Service après-vente inclus</li>
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