'use client'

import Image from 'next/image'
import NavSwiss from '@/components/sections/NavSwiss'
import FeedbackSwiss from '@/components/sections/FeedbackSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'
import useI18n from '@/components/i18n/useI18n'

export default function FeedbackPage() {
  const { t } = useI18n()
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      <FeedbackSwiss />
      
      {/* Seção Google Maps */}
      <section className="section-swiss bg-white border-b border-gray-200">
        <div className="container-swiss">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-primary text-center mb-12">{t.feedbackPage.locationTitle}</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {/* Linha Vermelha Superior */}
              <div className="h-2 bg-swiss-red"></div>
              <div className="flex flex-col lg:flex-row min-h-[550px]">
                                {/* Painel de Informações - Lado Esquerdo */}
                <div className="lg:w-80 bg-white p-8 border-r border-gray-200">
                  <div className="text-center space-y-6">
                    {/* Ícone de Localização */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 border-2 border-swiss-red rounded-full flex items-center justify-center bg-white">
                        <Image 
                          src="/images/icons/local.png" 
                          alt="Localização" 
                          width={32} 
                          height={32} 
                        />
                      </div>
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Suisse Débarras</h3>
                    
                    {/* Endereço */}
                    <div className="space-y-2">
                      <div className="text-swiss-red font-semibold text-lg">
                        Avenue des Communes-Réunies 43
                      </div>
                      <div className="text-swiss-red font-medium">
                        1212 Grand-Lancy
                      </div>
                    </div>
                    
                    {/* Telefone */}
                    <div className="py-4">
                      <div className="text-gray-700 font-medium">
                        Tél: +41 22 939 15 49
                      </div>
                    </div>
                    
                    {/* Informations */}
                    <div className="py-4 border-t border-gray-200">
                      <div className="text-gray-900 font-semibold mb-3">{t.feedbackPage.hqTitle}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">{t.feedbackPage.hqDesc}</p>
                    </div>
                    
                    {/* Horários */}
                    <div className="py-4 border-t border-gray-200">
                      <div className="text-gray-900 font-medium mb-2">{t.feedbackPage.weekday}</div>
                      <div className="text-gray-700">
                        08h00 - 18h00
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{t.feedbackPage.apptOnly}</div>
                    </div>
                  </div>
                </div>
                
                {/* Google Maps - Lado Direito */}
                <div className="flex-1 relative min-h-[400px] lg:min-h-[550px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.2!2d6.1227!3d46.1785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c650b7b0b7b0b%3A0x7b0b7b0b7b0b7b0b!2sAvenue%20des%20Communes-R%C3%A9unies%2043%2C%201212%20Grand-Lancy%2C%20Switzerland!5e0!3m2!1sen!2sch!4v1634567890123!5m2!1sen!2sch"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Suisse Débarras Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSwiss />
    </div>
  )
} 