'use client'

const HeroSwiss = () => {
  return (
    <div className="admin-container">
      <div className="admin-main-layout">
        
        {/* Conteúdo principal */}
        <div className="admin-content">
          
          {/* Equipe de direção - inspirado nos membros do conselho federal */}
          <div className="admin-section">
            <h1>Équipe de Direction</h1>
            <p style={{ marginBottom: '30px' }}>
              Notre équipe expérimentée assure un service professionnel de débarras 
              conforme aux normes suisses les plus strictes.
            </p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '140px', 
                  height: '180px', 
                  background: '#f0f0f0', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '12px'
                }}>
                  Photo<br/>Directeur
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Marc Dubois</div>
                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>Directeur Général</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '140px', 
                  height: '180px', 
                  background: '#f0f0f0', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '12px'
                }}>
                  Photo<br/>Responsable
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Anne Mueller</div>
                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>Responsable Opérations</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '140px', 
                  height: '180px', 
                  background: '#f0f0f0', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '12px'
                }}>
                  Photo<br/>Chef Équipe
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Pierre Martinet</div>
                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>Chef d'Équipe Valais</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '140px', 
                  height: '180px', 
                  background: '#f0f0f0', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '12px'
                }}>
                  Photo<br/>Spécialiste
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Sofia Bernasconi</div>
                <div style={{ fontSize: '12px', color: 'var(--text-medium)' }}>Spécialiste Recyclage</div>
              </div>
            </div>
          </div>
          
          {/* Article principal avec image */}
          <div className="admin-section" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            <div style={{ 
              background: '#f0f0f0', 
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
              fontSize: '14px'
            }}>
              Image débarras<br/>professionnel
            </div>
            <div>
              <h2 style={{ color: 'var(--link-blue)' }}>
                Service de débarras conforme aux normes suisses
              </h2>
              <p>
                Débarras Pro investit dans des solutions durables pour le traitement 
                des déchets en Suisse. Notre équipe certifiée garantit un service 
                professionnel respectueux de l'environnement.
              </p>
              <p>
                Nos méthodes de tri sélectif et de recyclage dépassent les exigences 
                légales suisses, offrant une solution complète pour le débarras 
                de logements et locaux commerciaux.
              </p>
              <ul style={{ fontSize: '14px', marginTop: '15px' }}>
                <li style={{ marginBottom: '5px' }}>
                  <a href="#" style={{ color: 'var(--link-blue)' }}>
                    Communiqué: Nouvelle certification ISO 14001 🔗
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Section réseaux sociaux */}
          <div className="admin-section">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '200px 1fr', 
              gap: '20px',
              padding: '20px',
              background: 'var(--background-gray)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ 
                background: '#f0f0f0', 
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
                fontSize: '12px'
              }}>
                Image<br/>équipe travail
              </div>
              <div>
                <h3 style={{ marginBottom: '15px' }}>Réseaux sociaux</h3>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>📄 tout</span>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ 
                        background: 'var(--swiss-red)', 
                        color: 'white', 
                        padding: '4px 8px',
                        fontSize: '12px'
                      }}>f</span>
                      <span style={{ fontSize: '13px' }}>Débarras Pro Suisse</span>
                    </div>
                    <span style={{ fontSize: '20px' }}>✕</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Sidebar comme admin.ch */}
        <div className="admin-sidebar">
          
          <div className="admin-sidebar-item">
            <h4>Ukraine</h4>
            <p>Soutien aux réfugiés ukrainiens avec services de débarras gratuits.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Genève internationale</h4>
            <p>Services spécialisés pour les organisations internationales.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Suisse-UE</h4>
            <p>Collaboration transfrontalière pour les déménagements.</p>
          </div>
          
          <div className="admin-sidebar-item">
            <h4>Too big to fail</h4>
            <p>Solutions pour les grandes entreprises et institutions.</p>
          </div>
          
          <div className="admin-sidebar-item" style={{ background: 'white', padding: '20px' }}>
            <h4 style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>Engagement approfondi</h4>
            <h4 style={{ color: 'var(--text-dark)', fontSize: '16px', marginBottom: '10px' }}>
              Engagement international
            </h4>
            <p>Notre expertise s'étend au-delà des frontières suisses.</p>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default HeroSwiss 