'use client'

import { useState } from 'react'

const ContactSwiss = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  return (
    <div className="admin-container" id="contact">
      <div className="admin-main-layout">
        <div className="admin-content">
          
          <div className="admin-section">
            <h2>Contact</h2>
            <p style={{ marginBottom: '30px' }}>
              Contactez-nous pour obtenir un devis gratuit ou pour toute question 
              concernant nos services de débarras.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              
              {/* Formulaire */}
              <div>
                <h3 style={{ marginBottom: '20px' }}>Demande de devis</h3>
                <form onSubmit={handleSubmit}>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Nom *</label>
                    <input 
                      type="text"
                      name="name"
                      className="admin-form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Email *</label>
                    <input 
                      type="email"
                      name="email"
                      className="admin-form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Téléphone</label>
                    <input 
                      type="tel"
                      name="phone"
                      className="admin-form-input"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-form-label">Description du projet *</label>
                    <textarea 
                      name="message"
                      className="admin-form-input"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet de débarras..."
                      required
                    />
                  </div>
                  
                  <button type="submit" className="admin-btn">
                    Envoyer la demande
                  </button>
                </form>
              </div>
              
              {/* Informations de contact */}
              <div>
                <h3 style={{ marginBottom: '20px' }}>Informations</h3>
                
                <div className="admin-card">
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>Débarras Pro Sàrl</h4>
                  <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Adresse:</strong><br/>
                      Route Cantonale 15<br/>
                      1950 Sion, Valais<br/>
                      Suisse
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Téléphone:</strong><br/>
                      <a href="tel:+41270001234" style={{ color: 'var(--link-blue)' }}>
                        +41 27 000 12 34
                      </a>
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Email:</strong><br/>
                      <a href="mailto:info@debarras-pro.ch" style={{ color: 'var(--link-blue)' }}>
                        info@debarras-pro.ch
                      </a>
                    </div>
                    
                    <div>
                      <strong>Horaires:</strong><br/>
                      Lundi - Vendredi: 8h00 - 18h00<br/>
                      Samedi: 8h00 - 16h00<br/>
                      Dimanche: Fermé
                    </div>
                  </div>
                </div>
                
                <div className="admin-card">
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>Urgences</h4>
                  <p style={{ fontSize: '14px' }}>
                    Pour les interventions urgentes (inondations, sinistres), 
                    contactez-nous 24h/7j au:
                  </p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--swiss-red)' }}>
                    +41 79 123 45 67
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="admin-sidebar">
          <div className="admin-sidebar-item">
            <h4>Devis gratuit</h4>
            <p>Réponse garantie sous 24 heures. Déplacement gratuit dans toute la Suisse romande.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Paiement</h4>
            <p>Facture après service. Paiement possible par virement bancaire ou en espèces.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Assurance</h4>
            <p>Tous nos services sont couverts par une assurance responsabilité civile de 2 millions CHF.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSwiss 