'use client'

const ServicesSwiss = () => {
  return (
    <div className="admin-container">
      <div className="admin-main-layout">
        <div className="admin-content">
          
          <div className="admin-section">
            <h2>Nos Services</h2>
            <p style={{ marginBottom: '30px' }}>
              Débarras Pro offre une gamme complète de services professionnels 
              conformes aux normes suisses.
            </p>
            
            <div className="admin-service-grid">
              <div className="admin-card">
                <h3>Débarras Résidentiel</h3>
                <p>
                  Évacuation complète de logements, appartements et maisons. 
                  Service professionnel avec tri sélectif selon les normes suisses.
                </p>
                <ul style={{ fontSize: '13px', marginTop: '10px' }}>
                  <li>• Appartements et maisons</li>
                  <li>• Caves et greniers</li>
                  <li>• Succession et héritage</li>
                </ul>
              </div>
              
              <div className="admin-card">
                <h3>Débarras Commercial</h3>
                <p>
                  Débarras de bureaux, locaux commerciaux et espaces professionnels. 
                  Solutions adaptées aux entreprises.
                </p>
                <ul style={{ fontSize: '13px', marginTop: '10px' }}>
                  <li>• Bureaux et open-space</li>
                  <li>• Entrepôts et stockage</li>
                  <li>• Locaux commerciaux</li>
                </ul>
              </div>
              
              <div className="admin-card">
                <h3>Nettoyage Professionnel</h3>
                <p>
                  Nettoyage approfondi après débarras. Remise en état complète 
                  des locaux.
                </p>
                <ul style={{ fontSize: '13px', marginTop: '10px' }}>
                  <li>• Nettoyage post-débarras</li>
                  <li>• Remise en état</li>
                  <li>• Préparation location</li>
                </ul>
              </div>
              
              <div className="admin-card">
                <h3>Tri et Recyclage</h3>
                <p>
                  Tri sélectif et recyclage conformes aux réglementations 
                  environnementales suisses.
                </p>
                <ul style={{ fontSize: '13px', marginTop: '10px' }}>
                  <li>• Tri sélectif certifié</li>
                  <li>• Recyclage écologique</li>
                  <li>• Élimination conforme</li>
                </ul>
              </div>
            </div>
            
            {/* Statistiques comme admin.ch */}
            <div className="admin-stats">
              <div className="admin-stat">
                <span className="admin-stat-number">2500+</span>
                <div className="admin-stat-label">Débarras réalisés</div>
              </div>
              <div className="admin-stat">
                <span className="admin-stat-number">95%</span>
                <div className="admin-stat-label">Matériaux recyclés</div>
              </div>
              <div className="admin-stat">
                <span className="admin-stat-number">48h</span>
                <div className="admin-stat-label">Délai moyen</div>
              </div>
              <div className="admin-stat">
                <span className="admin-stat-number">100%</span>
                <div className="admin-stat-label">Clients satisfaits</div>
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="admin-sidebar">
          <div className="admin-sidebar-item">
            <h4>Zones d'intervention</h4>
            <p>Service dans toute la Suisse romande: Genève, Vaud, Valais, Neuchâtel, Jura, Fribourg.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Certifications</h4>
            <p>ISO 14001 certifié. Membre USIC. Assurance RC 2M CHF.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesSwiss 