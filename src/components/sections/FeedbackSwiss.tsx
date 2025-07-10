import Card from '../ui/Card'
import Form from '../ui/Form'

const testimonials = [
  {
    name: 'Marie Dubois',
    location: 'Genève',
    service: 'Débarras résidentiel',
    rating: 5,
    comment: 'Service impeccable et très professionnel. L&apos;équipe est arrivée à l&apos;heure et a fait un travail remarquable.',
    date: 'Mars 2024'
  },
  {
    name: 'Peter Müller',
    location: 'Lausanne', 
    service: 'Débarras commercial',
    rating: 5,
    comment: 'Excellent service pour le débarras de nos bureaux. Rapide, efficace et respectueux de l&apos;environnement.',
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
  },
  {
    name: 'Isabelle Perrin',
    location: 'Neuchâtel',
    service: 'Déchets spéciaux',
    rating: 5,
    comment: 'Très compétents pour l&apos;évacuation de nos produits chimiques. Respect total des normes de sécurité.',
    date: 'Novembre 2023'
  },
  {
    name: 'Marc Rosset',
    location: 'Yverdon',
    service: 'Destruction de matériel',
    rating: 5,
    comment: 'Destruction sécurisée de nos documents confidentiels avec certificat. Service discret et professionnel.',
    date: 'Octobre 2023'
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
        <div className="grid-swiss-3 mb-16">
          <div className="metric-card">
            <div className="metric-number">4.9/5</div>
            <div className="metric-label">Note moyenne</div>
            <div className="flex justify-center mt-2">
              {renderStars(5)}
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-number">98%</div>
            <div className="metric-label">Clients satisfaits</div>
            <div className="text-sm text-light mt-2">Sur 500+ projets</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">48h</div>
            <div className="metric-label">Délai maximum</div>
            <div className="text-sm text-light mt-2">Intervention garantie</div>
          </div>
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
                    {testimonial.comment}
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Section d'évaluation */}
        <div className="mb-16">
          <div className="max-w-5xl mx-auto">
            
            {/* En-tête élégant */}
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-primary mb-6">
                Partagez votre Expérience
              </h3>
              <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
                Votre avis nous aide à améliorer nos services et guide d&apos;autres clients 
                dans le choix de leurs prestations de débarras.
              </p>
            </div>

                         {/* Cards d'avantages */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
               <div className="card-swiss card-swiss-hover text-center">
                 <div className="mb-4 flex justify-center">
                   <span className="text-swiss-red text-5xl font-bold">+</span>
                 </div>
                 <h4 className="text-lg font-semibold text-primary mb-3">Simple et Rapide</h4>
                 <p className="text-secondary">Formulaire en moins de 3 minutes</p>
               </div>
               
               <div className="card-swiss card-swiss-hover text-center">
                 <div className="mb-4 flex justify-center">
                   <span className="text-swiss-red text-5xl font-bold">+</span>
                 </div>
                 <h4 className="text-lg font-semibold text-primary mb-3">Vérification Qualité</h4>
                 <p className="text-secondary">Avis validé avant publication</p>
               </div>
               
               <div className="card-swiss card-swiss-hover text-center">
                 <div className="mb-4 flex justify-center">
                   <span className="text-swiss-red text-5xl font-bold">+</span>
                 </div>
                 <h4 className="text-lg font-semibold text-primary mb-3">Données Sécurisées</h4>
                 <p className="text-secondary">Protection selon la LPD suisse</p>
               </div>
             </div>

            {/* Formulaire moderne */}
            <div className="card-swiss">
              <div className="border-b border-gray-200 pb-6 mb-8">
                <h4 className="text-2xl font-semibold text-primary text-center">
                  Évaluer nos Services
                </h4>
              </div>
              
              <Form>
                <div className="space-y-8">
                  {/* Informations personnelles */}
                  <div>
                    <h5 className="text-lg font-medium text-primary mb-6">Vos Informations</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Form.Field>
                        <Form.Label htmlFor="feedback-nom" required>Nom complet</Form.Label>
                        <Form.Input 
                          id="feedback-nom"
                          name="nom"
                          type="text"
                          placeholder="Jean Dupont"
                          required
                        />
                      </Form.Field>
                      
                      <Form.Field>
                        <Form.Label htmlFor="feedback-location">Localisation</Form.Label>
                        <Form.Input 
                          id="feedback-location"
                          name="location"
                          type="text"
                          placeholder="Genève"
                        />
                      </Form.Field>
                    </div>
                  </div>
                  
                  {/* Service et évaluation */}
                  <div>
                    <h5 className="text-lg font-medium text-primary mb-6">Votre Expérience</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Form.Field>
                        <Form.Label htmlFor="feedback-service">Service utilisé</Form.Label>
                        <select 
                          id="feedback-service"
                          name="service"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 transition-all duration-200 focus:outline-none focus:border-swiss-red focus:ring-2 focus:ring-red-100"
                        >
                          <option value="">Choisir un service</option>
                          <option value="debarras-residentiel">Débarras résidentiel</option>
                          <option value="debarras-commercial">Débarras commercial</option>
                          <option value="nettoyage-desinfection">Nettoyage et désinfection</option>
                          <option value="fin-chantier">Nettoyage fin de chantier</option>
                          <option value="dechets-speciaux">Déchets spéciaux</option>
                          <option value="destruction-materiel">Destruction de matériel</option>
                        </select>
                      </Form.Field>
                      
                      <Form.Field>
                        <Form.Label htmlFor="feedback-rating" required>Note globale</Form.Label>
                        <select 
                          id="feedback-rating"
                          name="rating"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 transition-all duration-200 focus:outline-none focus:border-swiss-red focus:ring-2 focus:ring-red-100"
                          required
                        >
                          <option value="">Choisir une note</option>
                          <option value="5">★★★★★ Excellent</option>
                          <option value="4">★★★★☆ Très bien</option>
                          <option value="3">★★★☆☆ Bien</option>
                          <option value="2">★★☆☆☆ Moyen</option>
                          <option value="1">★☆☆☆☆ Insatisfaisant</option>
                        </select>
                      </Form.Field>
                    </div>
                  </div>
                  
                  {/* Témoignage */}
                  <div>
                    <h5 className="text-lg font-medium text-primary mb-6">Votre Témoignage</h5>
                    <Form.Field>
                      <Form.Label htmlFor="feedback-comment" required>Décrivez votre expérience</Form.Label>
                      <Form.Textarea 
                        id="feedback-comment"
                        name="comment"
                        placeholder="Partagez votre expérience : qualité du service, ponctualité de l'équipe, satisfaction générale..."
                        className="min-h-[140px] focus:ring-2 focus:ring-red-100"
                        required
                      />
                       <p className="text-sm text-gray-500 mt-2">
                         Minimum 50 caractères pour un témoignage de qualité
                       </p>
                    </Form.Field>
                  </div>
                </div>

                {/* Consentement */}
                <div className="pt-8 mt-8 border-t border-gray-200">
                  <Form.Field>
                    <div className="flex items-center">
                      <input 
                        type="checkbox"
                        id="feedback-consent"
                        name="consent"
                        className="h-5 w-5 text-swiss-red rounded border-gray-300 focus:ring-red-500"
                        required
                      />
                      <Form.Label htmlFor="feedback-consent" className="ml-3 text-sm mb-0">
                        J&apos;accepte que mon témoignage soit utilisé à des fins marketing 
                        et publié sur le site de Suisse Débarras.
                      </Form.Label>
                    </div>
                  </Form.Field>
                </div>
                
                <div className="text-center pt-6 border-t border-gray-200 mt-8">
                   <button type="submit" className="admin-btn">
                     Publier mon Avis
                   </button>
                   <p className="text-sm text-gray-500 mt-4 max-w-lg mx-auto">
                     En publiant cet avis, vous acceptez nos conditions d&apos;utilisation 
                     et confirmez l&apos;authenticité de votre témoignage.
                   </p>
                 </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackSwiss 