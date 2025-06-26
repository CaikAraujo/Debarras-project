import Form from '../ui/Form'
import Button from '../ui/Button'
import Card from '../ui/Card'

const ContactSwiss = () => {
  return (
    <section className="section-swiss bg-main" id="contact">
      <div className="container-swiss">
        <div className="text-center mb-12">
          <h2 className="text-primary mb-6">Contact</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit ou pour toute question 
            concernant nos services de débarras en Suisse.
          </p>
        </div>
        
        <div className="grid-swiss-2">
          {/* Formulaire de contact */}
          <Card>
            <Card.Header>
              <Card.Title>Demande de Devis</Card.Title>
              <p className="text-secondary text-sm">
                Remplissez ce formulaire et nous vous contacterons sous 24h.
              </p>
            </Card.Header>
            
            <Card.Content>
              <Form>
                <Form.Field>
                  <Form.Label htmlFor="nom" required>Nom complet</Form.Label>
                  <Form.Input 
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="Votre nom et prénom"
                    required
                  />
                </Form.Field>
                
                <Form.Field>
                  <Form.Label htmlFor="email" required>Email</Form.Label>
                  <Form.Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.ch"
                    required
                  />
                </Form.Field>
                
                <Form.Field>
                  <Form.Label htmlFor="telephone">Téléphone</Form.Label>
                  <Form.Input 
                    id="telephone"
                    name="telephone"
                    type="tel"
                    placeholder="+41 XX XXX XX XX"
                  />
                </Form.Field>
                
                <Form.Field>
                  <Form.Label htmlFor="service">Type de service</Form.Label>
                  <select 
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-accent focus:outline-none transition-colors"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="debarras-residentiel">Débarras résidentiel</option>
                    <option value="debarras-commercial">Débarras commercial</option>
                    <option value="nettoyage">Nettoyage professionnel</option>
                    <option value="gravats">Élimination de gravats</option>
                    <option value="organisation">Organisation d'espaces</option>
                    <option value="urgence">Service d'urgence</option>
                  </select>
                </Form.Field>
                
                <Form.Field>
                  <Form.Label htmlFor="message" required>Message</Form.Label>
                  <Form.Textarea 
                    id="message"
                    name="message"
                    placeholder="Décrivez votre projet, la surface, l'urgence, etc."
                    required
                  />
                </Form.Field>
                
                <Button type="submit" variant="primary" className="w-full">
                  Envoyer la Demande
                </Button>
              </Form>
            </Card.Content>
          </Card>
          
          {/* Informations de contact */}
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title>Informations de Contact</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div>
                  <h4 className="font-medium text-primary mb-2">Adresse</h4>
                  <p className="text-secondary">
                    Rue de l'Industrie 12<br />
                    1950 Sion, Valais<br />
                    Suisse
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Téléphone</h4>
                  <p className="text-secondary">
                    <a href="tel:+41270001234" className="text-link hover:underline">
                      +41 27 000 12 34
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary mb-2">Email</h4>
                  <p className="text-secondary">
                    <a href="mailto:contact@debarras-pro.ch" className="text-link hover:underline">
                      contact@debarras-pro.ch
                    </a>
                  </p>
                </div>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Header>
                <Card.Title>Horaires d'Ouverture</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-primary">Lundi - Vendredi</span>
                  <span className="text-secondary">8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary">Samedi</span>
                  <span className="text-secondary">9h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary">Dimanche</span>
                  <span className="text-secondary">Sur demande</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-primary font-medium">Urgences 24h/7j</span>
                    <span className="text-accent">+41 79 XXX XX XX</span>
                  </div>
                </div>
              </Card.Content>
            </Card>
            
            <Card>
              <Card.Content>
                <div className="text-center">
                  <div className="text-accent font-semibold mb-2">Zone de Service</div>
                  <p className="text-secondary text-sm">
                    Nous intervenons dans toute la Suisse romande 
                    et une partie de la Suisse alémanique.
                  </p>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSwiss 