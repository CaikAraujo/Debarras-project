import Card from '../ui/Card'
import Button from '../ui/Button'

const certifications = [
  {
    title: 'Certification ISO 14001',
    description: 'Système de management environnemental conforme aux standards suisses',
    icon: '🌱'
  },
  {
    title: 'Assurance RC Professionnelle',
    description: 'Couverture complète pour tous nos services et interventions',
    icon: '🛡️'
  },
  {
    title: 'Agrément Cantonal',
    description: 'Autorisations officielles dans tous les cantons suisses',
    icon: '📋'
  },
  {
    title: 'Formation Certifiée',
    description: 'Personnel qualifié selon les normes de sécurité suisses',
    icon: '🎓'
  }
]

const coverageAreas = [
  'Genève et région lémanique',
  'Vaud et Riviera',
  'Valais (Haut et Bas-Valais)',
  'Fribourg et environs',
  'Neuchâtel et Jura',
  'Berne (zone francophone)',
  'Zürich (services sélectionnés)',
  'Bâle (interventions spéciales)'
]

const AboutSwiss = () => {
  return (
    <section className="section-swiss bg-gray-50 border-b border-gray-200 relative z-20" id="about">
      <div className="container-swiss">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6">Notre Expertise en Suisse</h2>
          <p className="text-lg text-secondary max-w-4xl mx-auto">
            Depuis plus de 10 ans, Débarras Pro est votre partenaire de confiance 
            pour tous vos projets de débarras et nettoyage en Suisse. 
            Notre approche respecte les standards suisses les plus exigeants.
          </p>
        </div>

        {/* Histoire et présentation */}
        <div className="grid-swiss-2 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Une Entreprise Suisse, Pour la Suisse
            </h3>
            <div className="space-y-4 text-secondary">
              <p>
                Fondée en 2014 à Sion, Débarras Pro s'est rapidement imposée comme 
                référence dans le domaine du débarras professionnel en Suisse romande. 
                Notre équipe de spécialistes comprend les spécificités du marché suisse 
                et les exigences environnementales strictes du pays.
              </p>
              <p>
                Nous travaillons en étroite collaboration avec les services communaux, 
                les déchetteries officielles et les centres de tri agréés pour garantir 
                une gestion responsable de tous les matériaux évacués.
              </p>
              <p>
                Notre engagement : offrir un service irréprochable qui respecte 
                l'environnement et contribue à l'économie circulaire suisse.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <Card.Content>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-secondary">Projets réalisés</div>
                </div>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Content>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">8</div>
                  <div className="text-sm text-secondary">Cantons couverts</div>
                </div>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Content>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">95%</div>
                  <div className="text-sm text-secondary">Matériaux recyclés</div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Certifications et conformité */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-primary text-center mb-12">
            Certifications et Conformité Suisse
          </h3>
          <div className="grid-swiss-2">
            {certifications.map((cert, index) => (
              <Card key={index} hover>
                <Card.Content>
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{cert.icon}</div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{cert.title}</h4>
                      <p className="text-secondary text-sm">{cert.description}</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Zone de couverture */}
        <div className="mb-16">
          <div className="grid-swiss-2">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Zones d'Intervention
              </h3>
              <p className="text-secondary mb-6">
                Notre réseau couvre l'ensemble de la Suisse romande et s'étend 
                vers certaines régions alémaniques pour des interventions spécialisées.
              </p>
              <ul className="space-y-2">
                {coverageAreas.map((area, index) => (
                  <li key={index} className="flex items-center text-secondary">
                    <span className="w-2 h-2 bg-swiss-red rounded-full mr-3"></span>
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-gray-50">
              <Card.Content>
                <h4 className="font-semibold text-primary mb-4">
                  Temps d'Intervention Garantis
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Suisse romande</span>
                    <span className="font-medium text-primary">24h - 48h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Genève - Lausanne</span>
                    <span className="font-medium text-primary">Même jour</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Valais central</span>
                    <span className="font-medium text-primary">2h - 4h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Urgences</span>
                    <span className="font-medium text-accent">1h</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-light">
                    * Délais indicatifs selon disponibilité et conditions météorologiques
                  </p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Engagement environnemental */}
        <Card className="mb-16">
          <Card.Content>
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Engagement Environnemental
              </h3>
              <p className="text-secondary mb-8">
                En tant qu'entreprise suisse, nous prenons très au sérieux notre responsabilité 
                environnementale. Notre processus de tri sélectif permet de valoriser jusqu'à 
                95% des matériaux collectés selon les standards suisses.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">♻️</div>
                  <h4 className="font-semibold text-primary mb-2">Tri Sélectif</h4>
                  <p className="text-sm text-secondary">
                    Séparation rigoureuse selon les normes cantonales
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="font-semibold text-primary mb-2">Économie Circulaire</h4>
                  <p className="text-sm text-secondary">
                    Partenariats avec entreprises sociales suisses
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h4 className="font-semibold text-primary mb-2">Traçabilité</h4>
                  <p className="text-sm text-secondary">
                    Rapport détaillé de destination des matériaux
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Call to action */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-primary mb-4">
            Prêt à Découvrir l'Excellence Suisse ?
          </h3>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Confiez votre projet à des professionnels qui connaissent 
            parfaitement les exigences et standards suisses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Demander un Devis
            </Button>
            <Button variant="outline" size="lg">
              Voir nos Références
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSwiss 