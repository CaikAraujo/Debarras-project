import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'

export default function EcopointsPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main">
        <div className="container-swiss flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Texto à esquerda */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Écopoints d’Intérieur</h1>
            <p className="text-secondary text-lg mb-6">
              Gestion et évacuation des déchets via nos écopoints d’intérieur certifiés.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Tri écologique</h2>
            <p className="text-secondary text-lg mb-6">
              Mise en place de solutions de tri sélectif pour optimiser le recyclage et réduire l’empreinte environnementale de votre entreprise.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Recyclage responsable</h2>
            <p className="text-secondary text-lg mb-6">
              Acheminement des déchets vers des filières de recyclage agréées, avec traçabilité et reporting sur demande.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Certification environnementale</h2>
            <p className="text-secondary text-lg">
              Accompagnement pour l’obtention de certifications environnementales grâce à une gestion exemplaire des déchets.
            </p>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 