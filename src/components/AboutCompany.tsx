export default function AboutCompany() {
  const stats = [
    { number: "+500", label: "Clients Satisfaits" },
    { number: "98%", label: "Taux de Satisfaction" },
    { number: "24h", label: "Service Express" },
    { number: "10+", label: "Ans d'Expérience" }
  ];

  return (
    <section className="section-spacing bg-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-main mb-6">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Plus de 10 ans d'expérience en services de débarras et nettoyage professionnel à Genève
          </p>
        </div>

        {/* Statistiques avec design clean */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="card-clean text-center hover-shadow">
              <div className="text-4xl lg:text-5xl font-bold text-accent mb-3">
                {stat.number}
              </div>
              <div className="text-lg font-medium text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Informations principales avec design clean */}
        <div className="max-w-4xl mx-auto">
          <div className="card-clean text-center hover-shadow">
            <h3 className="text-2xl lg:text-3xl font-bold text-main mb-6">
              Débarras Pro - Votre Partenaire de Confiance à Genève
            </h3>
            <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
              Entreprise suisse spécialisée en débarras et nettoyage avec une équipe qualifiée et des équipements professionnels. 
              Nous garantissons un service rapide, efficace et respectueux de l'environnement dans toute la région genevoise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-primary">
                Demander un Devis
              </button>
              <button className="btn-secondary">
                Nous Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 