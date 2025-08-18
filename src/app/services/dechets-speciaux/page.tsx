import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function DechetsSpeciauxPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-20 mt-4">
            Déchets Spéciaux
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Produits chimiques</h2>
              <p className="text-secondary text-lg">
                Collecte et élimination des produits chimiques selon des protocoles stricts. Conditionnement sécurisé, transport
                agréé et traçabilité complète jusqu’à la filière de traitement.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Déchets-Spéciaux/Produits chimiques (2).jpg"
                alt="Produits chimiques"
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
                <h2 className="text-xl font-bold text-primary mb-2">Matériaux dangereux</h2>
                <p className="text-secondary text-lg">
                  Prise en charge de matériaux à risques (amiante, solvants, peintures, etc.) par des équipes habilitées.
                  Interventions balisées, équipements adaptés et respect des normes en vigueur.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image
                  src="/images/services/Déchets-Spéciaux/Matériaux dangereux (2).jpg"
                  alt="Matériaux dangereux"
                  width={640}
                  height={360}
                  className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bloco 3: texto à esquerda, imagem à droite */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Traçabilité complète</h2>
              <p className="text-secondary text-lg">
                Chaque lot est tracé du retrait à l’élimination. Vous recevez un reporting clair et les justificatifs
                réglementaires nécessaires pour vos audits internes.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Déchets-Spéciaux/Traçabilité complète (2).jpg"
                alt="Traçabilité complète"
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