export default function Header() {
  return (
    <header className="header-gradient sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Débarras Pro</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#accueil" className="text-gray-200 hover:text-white transition-colors font-medium">Accueil</a>
          <a href="#services" className="text-gray-200 hover:text-white transition-colors font-medium">Services</a>
          <a href="#apropos" className="text-gray-200 hover:text-white transition-colors font-medium">À propos</a>
          <a href="#contact" className="text-gray-200 hover:text-white transition-colors font-medium">Contact</a>
        </nav>
        <a href="tel:+41221234567" className="btn-accent-orange">
          Appeler Maintenant
        </a>
      </div>
    </header>
  );
} 