'use client'

const AboutSwiss = () => {
  return (
    <section className="section-swiss bg-main border-b border-gray-200" id="about">
      <div className="container-swiss">
        
        {/* Introduction */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-primary mb-6">À propos de Débarras Pro</h2>
          <p className="text-lg text-secondary leading-relaxed mb-6">
            Nous sommes une entreprise de débarras et de nettoyage active dans toute la Suisse romande avec une succursale dans chaque canton.
            <br />
            <strong>(Genève – Vaud – Valais – Fribourg – Neuchâtel – Jura – Berne)</strong>
          </p>
          
          <p className="text-secondary leading-relaxed mb-4">
            Nos années d&apos;expérience nous ont forgé une réputation de leader du débarras en Suisse romande.
            <br />
            <strong>Bientôt 10 ans à votre service !</strong>
          </p>
          
          <p className="text-secondary leading-relaxed mb-4">
            Chaque année, nous intervenons sur environ 500 propriétés : appartements, maisons, chalets, granges, écuries, fermes, entreprises et bâtiments publics.
          </p>
          
          <p className="text-secondary leading-relaxed">
            Notre mission ? Débarrasser et nettoyer pour remettre votre bien en état impeccable au suivant.
          </p>
        </div>

        {/* Chiffres clés */}
        <div className="grid-swiss-4 mb-16">
          <div className="metric-card">
            <div className="metric-number">10+</div>
            <div className="metric-label">Années d&apos;expérience</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">500+</div>
            <div className="metric-label">Projets réalisés</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">95%</div>
            <div className="metric-label">Matériaux recyclés</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">24h</div>
            <div className="metric-label">Délai de réponse</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid-swiss-2">
          <div className="card-swiss card-swiss-hover">
            <h3 className="text-primary text-xl font-semibold mb-6 text-center">Certifications et Conformité</h3>
            <div className="text-center space-y-6">
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> Assurance responsabilité civile
                </div>
                <small>Couverture 2 millions CHF</small>
              </div>
              
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> Certification ISO 14001
                </div>
                <small>Management environnemental</small>
              </div>
              
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> Membre USIC
                </div>
                <small>Union Suisse des Installateurs-Couvreurs</small>
              </div>
            </div>
          </div>

          <div className="card-swiss card-swiss-hover">
            <h3 className="text-primary text-xl font-semibold mb-6 text-center">Zone d&apos;Intervention</h3>
            
            <div className="text-center space-y-6">
              <p className="text-secondary">
                <strong>Suisse romande :</strong><br />
                Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura, Berne romande
              </p>
              
              <p className="text-secondary">
                • Interventions sur site dans un délai de 48 heures maximum.
              </p>
              
              <p className="text-secondary">
                • Devis gratuit et sans engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSwiss 