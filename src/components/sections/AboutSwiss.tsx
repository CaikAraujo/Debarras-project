'use client'

import { useState, useEffect } from 'react'
import useI18n from '@/components/i18n/useI18n'

const AboutSwiss = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useI18n()
  
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
            <h2 className="text-black mb-6" style={{fontSize: '2rem'}}>{t.about.title}</h2>
            <p className="text-base leading-relaxed mb-3" style={{fontSize: '1.05rem', color: '#000'}}>
              {t.about.p1a} <br/>
              <span style={{fontWeight:600}}>{t.about.p1b}</span>,<br/>
              {t.about.p1c}
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{fontSize: '0.98rem', color: '#000'}}>
              {t.about.p2}
            </p>
            <div className="leading-relaxed mb-3" style={{lineHeight:'1.6', fontSize: '0.98rem', color: '#000'}}>
              <div style={{marginBottom:'8px', fontWeight:600}}>{t.about.listTitle}</div>
              <ul style={{listStyle:'none', paddingLeft:0, margin:0}}>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  {t.about.list[0]}
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  {t.about.list[1]}
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  {t.about.list[2]}
                </li>
                <li style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{display:'inline-block', width:'8px', height:'8px', borderRadius:'50%', background:'var(--swiss-red)'}}></span>
                  {t.about.list[3]}
                </li>
              </ul>
            </div>
            <p className="leading-relaxed" style={{fontWeight:600, fontSize: '0.98rem', color: '#000'}}>
              {t.about.mission}
            </p>
          </div>
        </div>

        {/* Chiffres clés */}
        <div className="grid-swiss-4 mb-16">
          <div className="metric-card">
            <div className="metric-number">10+</div>
            <div className="metric-label">{t.about.metrics.years}</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">500+</div>
            <div className="metric-label">{t.about.metrics.projects}</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">95%</div>
            <div className="metric-label">{t.about.metrics.recycled}</div>
          </div>
          <div className="metric-card">
            <div className="metric-number">24h</div>
            <div className="metric-label">{t.about.metrics.response}</div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid-swiss-2">
          <div className="card-swiss card-swiss-hover">
            <h3 className="text-primary text-xl font-semibold mb-6 text-center">{t.about.certsTitle}</h3>
            <div className="text-center space-y-6">
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> {t.about.certs[0].main}
                </div>
                <small>{t.about.certs[0].sub}</small>
              </div>
              
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> {t.about.certs[1].main}
                </div>
                <small>{t.about.certs[1].sub}</small>
              </div>
              
              <div className="text-secondary">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-swiss-red">✓</span> {t.about.certs[2].main}
                </div>
                <small>{t.about.certs[2].sub}</small>
              </div>
            </div>
          </div>

          <div className="card-swiss card-swiss-hover">
            <h3 className="text-primary text-xl font-semibold mb-6 text-center">{t.about.zoneTitle}</h3>
            
            <div className="text-center space-y-6">
              <p className="text-secondary">
                <strong>{t.about.zoneRomandie}</strong><br />
                {t.about.zoneCantons}
              </p>
              
              <p className="text-secondary">
                {t.about.zone48h}
              </p>
              
              <p className="text-secondary">
                {t.about.zoneQuote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSwiss 