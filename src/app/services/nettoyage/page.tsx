import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function NettoyagePage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-40 mt-4">
            Nettoyage et Désinfection
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Désinfection complète</h2>
              <p className="text-secondary text-lg">
                Intervention approfondie de tous vos espaces (sols, surfaces, aérations) pour éliminer bactéries, virus et moisissures. Idéal après des incidents sanitaires ou en prévention d’épidémies, pour garantir un environnement sain et sécurisé.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/nettoyage-hero1.png" 
                alt="Désinfection complète" 
                width={400} 
                height={260} 
                className="object-cover w-full h-full max-h-[260px] rounded-2xl"
              />
            </div>
          </div>

          {/* Bloco 2: texto à direita, imagem à esquerda, fundo escuro ocupando toda a largura */}
          <div
            className="w-screen bg-gray-100 mb-24"
            style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
          >
            <div className="container-swiss flex flex-col md:flex-row-reverse items-center gap-20 p-12 min-h-[340px] md:min-h-[420px]">
              <div className="flex-1 max-w-2xl">
                <h2 className="text-xl font-bold text-primary mb-2">Protocoles sanitaires</h2>
                <p className="text-secondary text-lg">
                  Mise en place de procédures sur mesure (fréquence, produits, zones sensibles) afin de standardiser et d’optimiser vos opérations de nettoyage. Chaque protocole est ajusté à votre activité pour une efficacité maximale.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image 
                  src="/images/services/nettoyage-hero2.png" 
                  alt="Protocoles sanitaires" 
                  width={400} 
                  height={260} 
                  className="object-cover w-full h-full max-h-[260px]"
                />
              </div>
            </div>
          </div>

          {/* Bloco 3: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Locaux professionnels</h2>
              <p className="text-secondary text-lg">
                Nettoyage régulier et entretien courant de vos bureaux, ateliers et showrooms. Nous adaptons nos prestations à la configuration de vos locaux pour un rendu irréprochable, jour après jour.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/nettoyage-hero3.png" 
                alt="Locaux professionnels" 
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
