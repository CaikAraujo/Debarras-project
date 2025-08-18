import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function EntreprisesPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-20 mt-4">
            Débarras pour Entreprises
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Bureaux et open-space</h2>
              <p className="text-secondary text-lg">
                Intervention rapide et discrète dans vos bureaux et open-spaces, sans perturber l’activité. Nous organisons le
                tri, l’évacuation et la remise en ordre des postes de travail avec le plus grand soin et confidentialité.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Débarras-pour-Entreprises/Bureaux et open-space.jpg"
                alt="Bureaux et open-space"
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
                <h2 className="text-xl font-bold text-primary mb-2">Mobilier professionnel</h2>
                <p className="text-secondary text-lg">
                  Démontage sécurisé, reprise et valorisation de votre mobilier professionnel. Acheminement vers des filières
                  agréées, avec traçabilité et objectif de réemploi lorsque c’est possible.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image
                  src="/images/services/Débarras-pour-Entreprises/Mobilier professionnel.jpg"
                  alt="Mobilier professionnel"
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
              <h2 className="text-xl font-bold text-primary mb-2">Archives et documents</h2>
              <p className="text-secondary text-lg">
                Prise en charge et acheminement des archives en toute confidentialité. Sur demande, destruction certifiée et
                attestation fournie pour vos conformités internes.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Débarras-pour-Entreprises/Archives et documents.jpg"
                alt="Archives et documents"
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