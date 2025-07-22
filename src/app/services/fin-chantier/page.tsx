import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'

export default function FinChantierPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main">
        <div className="container-swiss flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Texto à esquerda */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Nettoyage de Fin de Chantier</h1>
            <p className="text-secondary text-lg mb-6">
              Nettoyage professionnel après travaux de construction ou rénovation.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Post-construction</h2>
            <p className="text-secondary text-lg mb-6">
              Élimination des poussières, résidus et gravats pour livrer un espace propre et prêt à l’emploi.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Élimination gravats</h2>
            <p className="text-secondary text-lg mb-6">
              Prise en charge de l’évacuation des gravats et déchets de chantier dans le respect des normes environnementales.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Remise en état</h2>
            <p className="text-secondary text-lg">
              Remise en état des lieux pour une réception sans défaut, avec finitions soignées et contrôle qualité.
            </p>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 