import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function EcopointsPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-20 mt-4">
            Écopoints d’Intérieur
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Tri écologique</h2>
              <p className="text-secondary text-lg">
                Installation d’écopoints ergonomiques et pédagogiques. Le tri devient simple et efficace pour vos équipes,
                avec des flux clairement identifiés.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Écopoints-d’Intérieur/Tri écologique.jpg"
                alt="Tri écologique"
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
                <h2 className="text-xl font-bold text-primary mb-2">Recyclage responsable</h2>
                <p className="text-secondary text-lg">
                  Collecte régulière et acheminement vers des filières locales agréées. Nous favorisons la valorisation et le
                  réemploi pour réduire l’impact global.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image 
                  src="/images/services/Écopoints-d’Intérieur/Recyclage responsable.jpg" 
                  alt="Recyclage responsable" 
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
              <h2 className="text-xl font-bold text-primary mb-2">Certification environnementale</h2>
              <p className="text-secondary text-lg">
                Nous vous accompagnons vers les labels et certifications (ISO 14001, etc.) par une organisation rigoureuse des
                flux et des preuves tangibles.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Écopoints-d’Intérieur/Certification environnementale.jpg"
                alt="Certification environnementale"
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