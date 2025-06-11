export default function Specialties() {
  const specialties = [
    {
      title: "Nettoyage Post-Travaux",
      icon: "🏗️",
      description: "Élimination complète des gravats et résidus de construction après travaux et rénovations."
    },
    {
      title: "Nettoyage Pré-Déménagement", 
      icon: "📦",
      description: "Nettoyage intensif et minutieux avant d'emménager dans un nouveau logement."
    },
    {
      title: "Nettoyage d'Entrepôt",
      icon: "🏭",
      description: "Nettoyage spécialisé pour entrepôts industriels et commerciaux."
    },
    {
      title: "Nettoyage Post-Incendie",
      icon: "🚨",
      description: "Élimination de la suie et restauration d'environnements post-incendie."
    },
    {
      title: "Nettoyage de Routine",
      icon: "🧹",
      description: "Entretien régulier pour résidences et établissements commerciaux."
    },
    {
      title: "Hygiénisation de Tissus",
      icon: "🛋️",
      description: "Nettoyage professionnel de canapés, matelas et tissus d'ameublement."
    }
  ];

  return (
    <section className="section-spacing bg-main">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-main mb-8">
            Nos Spécialités
          </h2>
          <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
            Nous offrons une gamme complète de services de nettoyage et d'organisation, 
            avec des équipements professionnels et une équipe spécialisée.
          </p>
        </div>

        {/* Grid de spécialités avec design clean */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
          {specialties.map((specialty, index) => (
            <div key={index} className="text-center group cursor-pointer p-6">
              {/* Icône avec design clean */}
              <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto mb-6 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center text-4xl lg:text-5xl group-hover:scale-105 transition-all duration-300 shadow-lg">
                <span className="filter drop-shadow-lg">
                  {specialty.icon}
                </span>
              </div>
              
              {/* Titre clean */}
              <h3 className="text-lg font-bold text-main mb-4 leading-tight">
                {specialty.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-secondary leading-relaxed">
                {specialty.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 