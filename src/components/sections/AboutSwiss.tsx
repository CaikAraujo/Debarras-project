'use client'

import { useState, useEffect } from 'react'

const AboutSwiss = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const images = [
    '/images/carrossel/geneva-947315_1920.jpg',
    '/images/carrossel/switzerland-5414899_1920.jpg',
    '/images/carrossel/matterhorn-3019429_1920.jpg',
    '/images/carrossel/mountains-7963159_1920.jpg',
    '/images/carrossel/buildings-6262595_1920.jpg',
    '/images/carrossel/pexels-tiohugo-16146279.jpg'
  ]

  // Navegação automática a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <section className="section-swiss bg-main border-b border-gray-200" id="about" style={{paddingTop: 0, overflowX: 'hidden'}}>
      <div className="container-swiss">
        
        {/* Introduction */}
        <div
          className=""
          style={{
            position: 'relative',
            width: '100vw',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            overflow: 'hidden',
            marginBottom: '0',
            marginTop: '0',
            paddingTop: '0',
            paddingBottom: '0',
          }}
        >
                     {/* Carrossel de imagens de fundo */}
           {images.map((image, index) => (
             <div
               key={index}
               style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
                 backgroundImage: `url('${image}')`,
                 backgroundSize: 'cover',
                                   backgroundPosition: index === 0 ? 'center 85%' : 'center',
                 backgroundRepeat: 'no-repeat',
                 opacity: index === currentSlide ? 1 : 0,
                 transition: 'opacity 1s ease-in-out',
                 zIndex: index === currentSlide ? 1 : 0
               }}
             />
           ))}
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.6)',
            zIndex: 2,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '900px',
            margin: '0 auto',
            padding: '32px 16px',
            color: '#000',
          }}>
            <h2 className="text-black mb-6" style={{fontSize: '2rem'}}>Suisse Débarras – Votre partenaire de confiance en Suisse romande</h2>
            <p className="text-base leading-relaxed mb-3" style={{fontSize: '1.05rem', color: '#000'}}>
              Avec près de 10 ans d'expérience et des succursales dans chaque canton romand <br/>
              <span style={{fontWeight:600}}>(Genève, Vaud, Valais, Fribourg, Neuchâtel, Jura, Berne)</span>,<br/>
              Suisse Débarras est votre solution rapide, efficace et discrète pour tout type de débarras.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{fontSize: '0.98rem', color: '#000'}}>
              Chaque année, nous intervenons sur plus de 500 biens : appartements, maisons, chalets, fermes, entreprises, granges, garages, et bâtiments publics.
            </p>
            <div className="leading-relaxed mb-3" style={{lineHeight:'1.6', fontSize: '0.98rem', color: '#000'}}>
              <div style={{marginBottom:'8px', fontWeight:600}}>Nos services incluent :</div>
              <ul style={{listStyle:'none', paddingLeft:0, margin:0}}>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  Tri, démontage et évacuation des encombrants
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  Recyclage en déchetteries agréées
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  Nettoyage après intervention (sur demande)
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  Devis gratuit et intervention rapide
                </li>
              </ul>
            </div>
            <p className="leading-relaxed" style={{fontWeight:600, fontSize: '0.98rem', color: '#000'}}>
              Notre mission ? Remettre votre bien en état impeccable, que ce soit pour une succession, un déménagement ou simplement faire de la place.
            </p>
          </div>
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
                <small>Couverture 5 millions CHF</small>
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