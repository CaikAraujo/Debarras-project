import Link from 'next/link'
import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'

export default function NotFound() {
  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <NavSwiss />
      
      <section className="section-swiss bg-white">
        <div className="container-swiss text-center">
          <div className="max-w-2xl mx-auto">
            {/* Code d'erreur */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-swiss-red mb-4">404</h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Page non trouvée
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
              </p>
            </div>

            {/* Liens utiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Link 
                href="/" 
                className="card-swiss card-swiss-hover p-6 text-center"
              >
                <div className="text-swiss-red text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-gray-900 mb-2">Accueil</h3>
                <p className="text-gray-600 text-sm">
                  Retourner à la page d'accueil
                </p>
              </Link>

              <Link 
                href="/services" 
                className="card-swiss card-swiss-hover p-6 text-center"
              >
                <div className="text-swiss-red text-3xl mb-3">🛠️</div>
                <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                <p className="text-gray-600 text-sm">
                  Découvrir nos services
                </p>
              </Link>

              <Link 
                href="/contact" 
                className="card-swiss card-swiss-hover p-6 text-center"
              >
                <div className="text-swiss-red text-3xl mb-3">📞</div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                <p className="text-gray-600 text-sm">
                  Nous contacter
                </p>
              </Link>

              <Link 
                href="/feedback" 
                className="card-swiss card-swiss-hover p-6 text-center"
              >
                <div className="text-swiss-red text-3xl mb-3">⭐</div>
                <h3 className="font-semibold text-gray-900 mb-2">Témoignages</h3>
                <p className="text-gray-600 text-sm">
                  Avis clients et localisation
                </p>
              </Link>
            </div>

            {/* Contact d'urgence */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Besoin d'aide immédiate ?
              </h3>
              <p className="text-gray-600 mb-4">
                Contactez Suisse Débarras directement pour votre projet de débarras
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="tel:+41229391549"
                  className="btn-swiss inline-flex items-center gap-2"
                >
                  📞 +41 22 939 15 49
                </a>
                <Link 
                  href="/contact"
                  className="btn-swiss-outline"
                >
                  Devis Gratuit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSwiss />
    </div>
  )
} 