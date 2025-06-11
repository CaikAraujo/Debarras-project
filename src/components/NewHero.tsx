export default function NewHero() {
  return (
    <section className="hero-gradient section-spacing-large relative overflow-hidden">
      <div className="container mx-auto px-6 z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">Débarras et</span> <span className="text-accent">Nettoyage</span>
            <br />
            <span className="text-gray-800">Professionnel</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-12 text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
            Spécialistes du nettoyage après travaux, débarras résidentiel et 
            commercial à Genève. Nous transformons votre espace avec 
            rapidité et efficacité suisse.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-primary uppercase font-bold">
              EMBAUCHER MAINTENANT
            </button>
            <button className="btn-outline">
              Devis Gratuit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 
