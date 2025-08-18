import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function FinChantierPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-20 mt-4">
            Nettoyage de Fin de Chantier
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Post-construction</h2>
              <p className="text-secondary text-lg">
                Nettoyage complet après chantier: poussières, résidus et traces sont supprimés pour une livraison impeccable de
                vos espaces.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Nettoyage-de-Fin-de-Chantier/Post-construction.jpg"
                alt="Post-construction"
                width={640}
                height={360}
                className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
              />
            </div>
          </div>

          {/* Bloco 2: texto à direita, imagem à esquerda, fundo escuro */}
          <div
            className="w-screen bg-gray-100 mb-24"
            style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
          >
            <div className="container-swiss flex flex-col md:flex-row-reverse items-center gap-20 p-12 min-h-[340px] md:min-h-[420px]">
              <div className="flex-1 max-w-2xl">
                <h2 className="text-xl font-bold text-primary mb-2">Élimination gravats</h2>
                <p className="text-secondary text-lg">
                  Évacuation sécurisée des gravats vers des centres agréés. Nous gérons la logistique et la traçabilité, du
                  chargement au dépôt.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image
                  src="/images/services/Nettoyage-de-Fin-de-Chantier/Élimination gravats.jpg"
                  alt="Élimination gravats"
                  width={640}
                  height={360}
                  className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bloco 3: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Remise en état</h2>
              <p className="text-secondary text-lg">
                Dernières finitions, dépoussiérage minutieux et contrôle qualité: nous préparons vos locaux pour une prise en
                main immédiate.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Nettoyage-de-Fin-de-Chantier/Remise en état.jpg"
                alt="Remise en état"
                width={640}
                height={360}
                className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/devis" className="admin-btn w-fit px-8 py-3 text-lg font-semibold">
              Demander un Devis
            </Link>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 