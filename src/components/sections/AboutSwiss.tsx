'use client'

const AboutSwiss = () => {
  return (
    <section className="section-swiss bg-main border-b border-gray-200" id="about">
      <div className="container-swiss">
        
        {/* Introduction */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-primary mb-6">À propos de Débarras Pro</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            Débarras Pro est une entreprise suisse spécialisée dans le débarras et le nettoyage professionnel. 
            Depuis 2014, nous intervenons dans toute la Suisse romande avec des solutions conformes 
            aux normes environnementales les plus strictes.
          </p>
          <p className="text-secondary leading-relaxed">
            Notre équipe certifiée garantit un service professionnel avec tri sélectif, 
            recyclage responsable et élimination conforme aux réglementations cantonales.
          </p>
        </div>

        {/* Chiffres clés */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="card-swiss text-center">
            <div className="text-2xl font-bold text-accent mb-2">10+</div>
            <div className="text-secondary text-sm">Années d'expérience</div>
          </div>
          <div className="card-swiss text-center">
            <div className="text-2xl font-bold text-accent mb-2">500+</div>
            <div className="text-secondary text-sm">Projets réalisés</div>
          </div>
          <div className="card-swiss text-center">
            <div className="text-2xl font-bold text-accent mb-2">95%</div>
            <div className="text-secondary text-sm">Matériaux recyclés</div>
          </div>
          <div className="card-swiss text-center">
            <div className="text-2xl font-bold text-accent mb-2">24h</div>
            <div className="text-secondary text-sm">Délai de réponse</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-primary text-xl font-semibold mb-6">Certifications et Conformité</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-accent font-medium">✓</span>
                <div>
                  <div className="font-medium text-primary text-sm">Assurance responsabilité civile</div>
                  <div className="text-secondary text-xs">Couverture 2 millions CHF</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent font-medium">✓</span>
                <div>
                  <div className="font-medium text-primary text-sm">Certification ISO 14001</div>
                  <div className="text-secondary text-xs">Management environnemental</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-accent font-medium">✓</span>
                <div>
                  <div className="font-medium text-primary text-sm">Membre USIC</div>
                  <div className="text-secondary text-xs">Union Suisse des Installateurs-Couvreurs</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-primary text-xl font-semibold mb-6">Zone d'Intervention</h3>
            <div className="space-y-4">
              <div className="text-secondary text-sm">
                <strong className="text-primary">Suisse romande :</strong> Valais, Vaud, Genève, 
                Fribourg, Neuchâtel, Jura, Berne romande
              </div>
              <div className="text-secondary text-sm">
                Interventions sur site dans un délai de 48 heures maximum.
              </div>
              <div className="text-secondary text-sm">
                Devis gratuit et sans engagement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSwiss 