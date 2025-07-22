import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'

export default function EntreprisesPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main">
        <div className="container-swiss flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Texto à esquerda */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Débarras pour Entreprises</h1>
            <p className="text-secondary text-lg mb-6">
              Solutions spécialisées pour les entreprises, bureaux et espaces commerciaux de toute taille.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Bureaux et open-space</h2>
            <p className="text-secondary text-lg mb-6">
              Débarras rapide et discret de bureaux, open-spaces et espaces professionnels, avec respect de la confidentialité et des horaires d’activité.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Mobilier professionnel</h2>
            <p className="text-secondary text-lg mb-6">
              Gestion complète du mobilier usagé, démontage, évacuation et recyclage selon les normes suisses.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Archives et documents</h2>
            <p className="text-secondary text-lg">
              Prise en charge sécurisée des archives et documents confidentiels, avec possibilité de destruction certifiée.
            </p>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 