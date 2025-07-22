'use client'

import Link from 'next/link'

const ServicesSwiss = () => {
  return (
    <section className="section-swiss bg-main">
      <div className="container-swiss">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-primary text-3xl font-bold mb-6">Nos Services Spécialisés</h1>
          <p className="text-lg text-secondary max-w-4xl mx-auto leading-relaxed">
            Débarras Pro propose des services spécialisés et techniques conformes aux normes suisses les plus strictes. 
            De la désinfection aux déchets spéciaux, en passant par la destruction sécurisée, nous maîtrisons les interventions complexes.
          </p>
        </div>

                          {/* Services Grid */}
         <div className="grid-swiss-2 mb-16 items-stretch">
           
           <Link href="/services/nettoyage" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Nettoyage et Désinfection</h3>
               <p className="text-secondary mb-4">
                 Nettoyage et désinfection de vos locaux selon les normes 
                 sanitaires suisses les plus strictes.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Désinfection complète
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Protocoles sanitaires
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Locaux professionnels
               </div>
             </div>
           </Link>
           
                      <Link href="/services/entreprises" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Débarras pour Entreprises</h3>
               <p className="text-secondary mb-4">
                 Solutions spécialisées pour les entreprises, bureaux et 
                 espaces commerciaux de toute taille.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Bureaux et open-space
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Mobilier professionnel
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Archives et documents
               </div>
             </div>
           </Link>
           
                      <Link href="/services/fin-chantier" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Nettoyage de Fin de Chantier</h3>
               <p className="text-secondary mb-4">
                 Nettoyage professionnel après travaux de construction 
                 ou rénovation.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Post-construction
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Élimination gravats
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Remise en état
               </div>
             </div>
           </Link>
           
                      <Link href="/services/ecopoints" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Écopoints d&apos;Intérieur</h3>
               <p className="text-secondary mb-4">
                 Gestion et évacuation des déchets via nos écopoints 
                 d&apos;intérieur certifiés.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Tri écologique
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Recyclage responsable
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Certification environnementale
               </div>
             </div>
           </Link>
           
                      <Link href="/services/destruction" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Destruction de Matériel</h3>
               <p className="text-secondary mb-4">
                 Destruction sécurisée de matériel sensible et documents 
                 confidentiels selon normes suisses.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Documents confidentiels
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Matériel informatique
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Certificat de destruction
               </div>
             </div>
           </Link>
           
                      <Link href="/services/dechets-speciaux" className="card-swiss card-swiss-hover text-center h-full flex flex-col justify-between" style={{textDecoration:'none'}}>
             <div>
               <h3 className="text-primary text-xl font-semibold mb-4">Déchets Spéciaux</h3>
               <p className="text-secondary mb-4">
                 Prise en charge et élimination de déchets spéciaux 
                 conformément à la réglementation suisse.
               </p>
             </div>
             <div className="space-y-1 mt-auto">
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Produits chimiques
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Matériaux dangereux
               </div>
               <div className="text-sm text-[#8b9190] flex items-center justify-center gap-1">
                 <span className="text-swiss-red">✓</span> Traçabilité complète
               </div>
             </div>
           </Link>
           
         </div>
        
        {/* Statistiques */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h3 className="text-primary text-xl font-semibold text-center mb-8">Nos Performances</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="metric-card">
              <div className="metric-number">10+</div>
              <div className="metric-label">Années d&apos;expérience</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">6</div>
              <div className="metric-label">Services spécialisés</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">500+</div>
              <div className="metric-label">Projets réalisés</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">48h</div>
              <div className="metric-label">Délai maximum</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="metric-card">
              <div className="metric-number">95%</div>
              <div className="metric-label">Matériaux recyclés</div>
            </div>
            <div className="metric-card">
              <div className="metric-number">98%</div>
              <div className="metric-label">Clients satisfaits</div>
            </div>
          </div>
        </div>





      </div>
    </section>
  )
}

export default ServicesSwiss 