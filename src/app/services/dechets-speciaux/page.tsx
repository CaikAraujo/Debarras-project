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
                Collecte, transport et élimination sécurisée de produits chimiques dangereux, avec respect total des normes environnementales.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/dechets-speciaux-hero1.png" 
                alt="Produits chimiques" 
                width={400} 
                height={260} 
                className="object-cover w-full h-full max-h-[260px] rounded-2xl"
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
                  Gestion des matériaux dangereux (amiante, solvants, etc.) par des équipes formées et équipées.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image 
                  src="/images/services/dechets-speciaux-hero2.png" 
                  alt="Matériaux dangereux" 
                  width={400} 
                  height={260} 
                  className="object-cover w-full h-full max-h-[260px] rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Bloco 3: texto à esquerda, imagem à droite */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Traçabilité complète</h2>
              <p className="text-secondary text-lg">
                Suivi et reporting de chaque étape pour garantir une traçabilité complète et une conformité réglementaire.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/dechets-speciaux-hero3.png" 
                alt="Traçabilité complète" 
                width={400} 
                height={260} 
                className="object-cover w-full h-full max-h-[260px] rounded-2xl"
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