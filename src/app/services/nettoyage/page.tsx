'use client'

import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import Image from 'next/image'
import Link from 'next/link'
import useI18n from '@/components/i18n/useI18n'

export default function NettoyagePage() {
  const { t } = useI18n()
  return (
    <>
      <NavSwiss />
      <section className="section-swiss bg-main min-h-[70vh] flex flex-col justify-center">
        <div className="container-swiss">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-40 mt-4">{t.services.nettoyage.title}</h1>

          {/* Bloco 1: texto à esquerda, imagem à direita */}
          <div className="flex flex-col md:flex-row items-center gap-20 mb-24 min-h-[340px] md:min-h-[420px]">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-xl font-bold text-primary mb-2">{t.services.nettoyage.blocks[0].h}</h2>
              <p className="text-secondary text-lg">{t.services.nettoyage.blocks[0].p}</p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Nettoyage-et-Désinfection/Désinfection complète.jpg"
                alt="Désinfection complète"
                width={640}
                height={360}
                className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
              />
            </div>
          </div>

          {/* Bloco 2: texto à direita, imagem à esquerda, fundo escuro ocupando toda a largura */}
          <div
            className="w-screen bg-gray-100 mb-24"
            style={{ position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflowX: 'hidden' }}
          >
            <div className="container-swiss flex flex-col md:flex-row-reverse items-center gap-20 p-12 min-h-[340px] md:min-h-[420px]">
              <div className="flex-1 max-w-2xl">
                <h2 className="text-xl font-bold text-primary mb-2">{t.services.nettoyage.blocks[1].h}</h2>
                <p className="text-secondary text-lg">{t.services.nettoyage.blocks[1].p}</p>
              </div>
              <div className="flex-1 flex justify-center max-w-2xl">
                <Image
                  src="/images/services/Nettoyage-et-Désinfection/Protocoles sanitaires.jpg"
                  alt="Protocoles sanitaires"
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
              <h2 className="text-xl font-bold text-primary mb-2">{t.services.nettoyage.blocks[2].h}</h2>
              <p className="text-secondary text-lg">{t.services.nettoyage.blocks[2].p}</p>
            </div>
            <div className="flex-1 flex justify-center max-w-2xl">
              <Image
                src="/images/services/Nettoyage-et-Désinfection/Locaux professionnels.jpg"
                alt="Locaux professionnels"
                width={640}
                height={360}
                className="object-cover w-full h-auto max-h-[360px] rounded-2xl"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/devis" className="admin-btn w-fit px-8 py-3 text-lg font-semibold">{t.common.requestQuote}</Link>
          </div>
        </div>
      </section>
      <FooterSwiss />
    </>
  )
}
