import Card from '../ui/Card'
import Button from '../ui/Button'
import Form from '../ui/Form'

const testimonials = [
  {
    name: 'Marie Dubois',
    location: 'Genève',
    service: 'Débarras résidentiel',
    rating: 5,
    comment: 'Service impeccable et très professionnel. L\'équipe est arrivée à l\'heure et a fait un travail remarquable.',
    date: 'Mars 2024'
  },
  {
    name: 'Peter Müller',
    location: 'Lausanne', 
    service: 'Débarras commercial',
    rating: 5,
    comment: 'Excellent service pour le débarras de nos bureaux. Rapide, efficace et respectueux de l\'environnement.',
    date: 'Février 2024'
  },
  {
    name: 'Sophie Martin',
    location: 'Sion',
    service: 'Nettoyage professionnel',
    rating: 5,
    comment: 'Après le débarras, ils ont fait un nettoyage complet. Le résultat était parfait, comme neuf.',
    date: 'Janvier 2024'
  },
  {
    name: 'Jean-Claude Favre',
    location: 'Fribourg',
    service: 'Élimination de gravats',
    rating: 5,
    comment: 'Intervention rapide pour éliminer les gravats de notre rénovation. Tout fait dans les règles.',
    date: 'Décembre 2023'
  }
]

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
      ★
    </span>
  ))
}

const FeedbackSwiss = () => {
  return (
    <section className="section-swiss bg-gray-50 border-b border-gray-200" id="feedback">
      <div className="container-swiss">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h2 className="text-primary mb-6">Témoignages Clients</h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Découvrez pourquoi plus de 500 clients nous font confiance 
            pour leurs projets de débarras à travers la Suisse.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
          <Card>
            <Card.Content className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
              <div className="text-secondary">Note moyenne</div>
              <div className="flex justify-center mt-2">
                {renderStars(5)}
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-secondary">Clients satisfaits</div>
              <div className="text-sm text-light mt-2">Sur 500+ projets</div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">24h</div>
              <div className="text-secondary">Réponse garantie</div>
              <div className="text-sm text-light mt-2">Devis sous 24h</div>
            </Card.Content>
          </Card>
        </div>

        {/* Témoignages récents */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-primary text-center mb-12">
            Avis Récents de nos Clients
          </h3>
          <div className="grid-swiss-2">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover>
                <Card.Content>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-light">{testimonial.location} • {testimonial.date}</p>
                      <p className="text-sm text-secondary">{testimonial.service}</p>
                    </div>
                    <div className="flex text-sm">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <p className="text-secondary leading-relaxed text-sm">
                    "{testimonial.comment}"
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Formulaire de témoignage */}
        <div className="grid-swiss-2">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">
              Partagez votre Expérience
            </h3>
            <p className="text-secondary mb-8">
              Votre avis nous aide à améliorer nos services et aide d'autres clients 
              à faire leur choix. Merci de prendre quelques minutes pour nous évaluer.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-swiss-red rounded-full"></span>
                <span className="text-secondary text-sm">Processus simple et rapide</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-swiss-red rounded-full"></span>
                <span className="text-secondary text-sm">Avis publié après vérification</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-swiss-red rounded-full"></span>
                <span className="text-secondary text-sm">Données confidentielles protégées</span>
              </div>
            </div>
          </div>

          <Card>
            <Card.Header>
              <Card.Title>Laisser un Avis</Card.Title>
            </Card.Header>
            <Card.Content>
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Field>
                    <Form.Label htmlFor="feedback-nom" required>Nom</Form.Label>
                    <Form.Input 
                      id="feedback-nom"
                      name="nom"
                      type="text"
                      placeholder="Votre nom"
                      required
                    />
                  </Form.Field>
                  
                  <Form.Field>
                    <Form.Label htmlFor="feedback-location">Localisation</Form.Label>
                    <Form.Input 
                      id="feedback-location"
                      name="location"
                      type="text"
                      placeholder="Ville, Canton"
                    />
                  </Form.Field>
                </div>
                
                <Form.Field>
                  <Form.Label htmlFor="feedback-rating" required>Note</Form.Label>
                  <select 
                    id="feedback-rating"
                    name="rating"
                    className="w-full px-4 py-3 border border-gray-300 rounded bg-white text-gray-700 transition-colors duration-200 focus:outline-none focus:border-swiss-red"
                    required
                  >
                    <option value="">Choisissez une note</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Très bien</option>
                    <option value="3">⭐⭐⭐ Bien</option>
                    <option value="2">⭐⭐ Moyen</option>
                    <option value="1">⭐ Décevant</option>
                  </select>
                </Form.Field>
                
                <Form.Field>
                  <Form.Label htmlFor="feedback-comment" required>Votre avis</Form.Label>
                  <Form.Textarea 
                    id="feedback-comment"
                    name="comment"
                    placeholder="Partagez votre expérience avec nos services..."
                    className="min-h-[100px]"
                    required
                  />
                </Form.Field>
                
                <Button type="submit" variant="primary" className="w-full">
                  Publier l'Avis
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </div>

        {/* Call to action final */}
        <div className="text-center mt-16 pt-16 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Rejoignez nos Clients Satisfaits
          </h3>
          <p className="text-secondary mb-8 max-w-2xl mx-auto">
            Découvrez pourquoi nous sommes la référence en débarras professionnel en Suisse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Demander un Devis
            </Button>
            <Button variant="outline" size="lg">
              Appeler Maintenant
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackSwiss 