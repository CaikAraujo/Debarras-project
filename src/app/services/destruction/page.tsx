import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'

export default function DestructionPage() {
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main">
        <div className="container-swiss flex flex-col md:flex-row items-center gap-12 py-12">
          {/* Texto à esquerda */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Destruction de Matériel</h1>
            <p className="text-secondary text-lg mb-6">
              Destruction sécurisée de matériel sensible et documents confidentiels selon normes suisses.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Documents confidentiels</h2>
            <p className="text-secondary text-lg mb-6">
              Prise en charge, transport et destruction de documents confidentiels avec certificat de destruction à l’appui.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Matériel informatique</h2>
            <p className="text-secondary text-lg mb-6">
              Effacement sécurisé des données et destruction physique de matériel informatique obsolète ou sensible.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-3 mt-8">Certificat de destruction</h2>
            <p className="text-secondary text-lg">
              Remise d’un certificat officiel attestant la destruction conforme aux normes en vigueur.
            </p>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
} 