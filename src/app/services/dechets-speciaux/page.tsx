import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'

export default function DechetsSpeciauxPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main">
        <div className="container-swiss flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Texto à esquerda */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Déchets Spéciaux</h1>
            <p className="text-secondary text-lg mb-6">
              Prise en charge et élimination de déchets spéciaux conformément à la réglementation suisse.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Produits chimiques</h2>
            <p className="text-secondary text-lg mb-6">
              Collecte, transport et élimination sécurisée de produits chimiques dangereux, avec respect total des normes environnementales.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Matériaux dangereux</h2>
            <p className="text-secondary text-lg mb-6">
              Gestion des matériaux dangereux (amiante, solvants, etc.) par des équipes formées et équipées.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Traçabilité complète</h2>
            <p className="text-secondary text-lg">
              Suivi et reporting de chaque étape pour garantir une traçabilité complète et une conformité réglementaire.
            </p>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 