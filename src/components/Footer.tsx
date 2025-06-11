export default function Footer() {
  const services = [
    "Nettoyage Post-Travaux",
    "Nettoyage Pré-Déménagement", 
    "Nettoyage d'Entrepôt",
    "Nettoyage Post-Incendie",
    "Nettoyage de Routine",
    "Hygiénisation de Tissus"
  ];

  const links = [
    { name: "Accueil", href: "#accueil" },
    { name: "Services", href: "#services" },
    { name: "À Propos", href: "#apropos" },
    { name: "Contact", href: "#contact" },
    { name: "Devis Gratuit", href: "#contact" }
  ];

  return (
    <footer className="footer-clean section-spacing">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo et description avec design clean - aligné à gauche */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <h2 className="text-3xl font-bold text-main">Débarras Pro</h2>
            </div>
            <p className="text-secondary leading-relaxed mb-8 text-lg max-w-md">
              Spécialistes en débarras et nettoyage professionnel à Genève. Plus de 10 ans d'expérience 
              au service de la propreté et de l'organisation de vos espaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a href="tel:+41221234567" className="btn-accent-orange">
                📞 Contacter Maintenant
              </a>
              <a href="mailto:contact@debarraspro.ch" className="text-link hover-text-accent transition-colors font-medium text-lg">
                ✉️ contact@debarraspro.ch
              </a>
            </div>
          </div>

          {/* Nos Services */}
          <div>
            <h3 className="text-xl font-bold text-main mb-6">Nos Services</h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-secondary hover-text-accent transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-xl font-bold text-main mb-6">Liens Rapides</h3>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-secondary hover-text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright avec design clean */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-secondary text-lg">
              © 2025 Débarras Pro Genève. Tous droits réservés.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-secondary hover-text-accent transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="text-secondary hover-text-accent transition-colors">
                Politique de Confidentialité
              </a>
              <a href="#" className="text-secondary hover-text-accent transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 