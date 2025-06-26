import Card from '../ui/Card'

const services = [
  {
    title: 'Débarras Résidentiel',
    description: 'Vide-greniers, caves, appartements et maisons avec tri sélectif et évacuation responsable.',
    icon: '🏠'
  },
  {
    title: 'Débarras Commercial', 
    description: 'Bureaux, entrepôts, magasins et locaux professionnels. Service adapté aux entreprises.',
    icon: '🏢'
  },
  {
    title: 'Nettoyage Professionnel',
    description: 'Nettoyage approfondi après débarras, remise en état complète des locaux.',
    icon: '✨'
  },
  {
    title: 'Élimination de Gravats',
    description: 'Évacuation de matériaux de construction, déchets de rénovation selon normes suisses.',
    icon: '🚛'
  },
  {
    title: 'Organisation d\'Espaces',
    description: 'Conseil en organisation et aménagement d\'espaces pour optimiser votre environnement.',
    icon: '📦'
  },
  {
    title: 'Service d\'Urgence',
    description: 'Intervention rapide 24h/7j pour situations urgentes et sinistres.',
    icon: '⚡'
  }
]

const ServicesSwiss = () => {
  return (
    <section className="section-swiss bg-main border-b border-gray-200" id="services">
      <div className="container-swiss">
        <div className="text-center mb-12">
          <h2 className="text-primary mb-6">Nos Services</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Une gamme complète de services professionnels adaptés 
            aux besoins résidentiels et commerciaux en Suisse.
          </p>
        </div>
        
        <div className="grid-swiss-3">
          {services.map((service, index) => (
            <Card key={index} hover className="text-center h-full">
              <Card.Content>
                <div className="text-4xl mb-4">{service.icon}</div>
                <Card.Title>{service.title}</Card.Title>
                <p className="text-secondary leading-relaxed">
                  {service.description}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-secondary mb-6">
            Tous nos services sont certifiés et conformes aux normes environnementales suisses.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-light">
            <span>✓ Assurance professionnelle</span>
            <span>✓ Tri sélectif écologique</span>
            <span>✓ Devis gratuit sous 24h</span>
            <span>✓ Équipe certifiée</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSwiss 