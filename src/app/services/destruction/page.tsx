import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'

export default function DestructionPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-20 mt-4">
            Destruction de Matériel
          </h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">Documents confidentiels</h2>
              <p className="text-secondary text-lg">
                Prise en charge, transport et destruction de documents confidentiels avec certificat de destruction à l’appui.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/destruction-hero1.png" 
                alt="Documents confidentiels" 
                width={400} 
                height={260} 
                className="object-cover w-full h-full max-h-[260px] rounded-2xl"
              />
            </div>
          </div>

          {/* Bloco 2: texto à direita, imagem à gauche, fundo escuro */}
          <div
            className="w-screen bg-gray-100 mb-24"
            style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}
          >
            <div className="container-swiss flex flex-col md:flex-row-reverse items-center gap-20 p-12 min-h-[340px] md:min-h-[420px]">
              <div className="flex-1 max-w-2xl">
                <h2 className="text-xl font-bold text-primary mb-2">Matériel informatique</h2>
                <p className="text-secondary text-lg">
                  Effacement sécurisé des données et destruction physique de matériel informatique obsolète ou sensible.
                </p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image 
                  src="/images/services/destruction-hero2.png" 
                  alt="Matériel informatique" 
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
              <h2 className="text-xl font-bold text-primary mb-2">Certificat de destruction</h2>
              <p className="text-secondary text-lg">
                Remise d’un certificat officiel attestant la destruction conforme aux normes en vigueur.
              </p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image 
                src="/images/services/destruction-hero3.png" 
                alt="Certificat de destruction" 
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