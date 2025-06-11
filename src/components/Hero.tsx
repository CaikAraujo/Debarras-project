export default function Hero() {
  return (
    <section id="inicio" className="hero-gradient text-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Serviços Profissionais de <span className="text-orange-200">Debarras</span>
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white leading-relaxed opacity-95">
          Especialistas em limpeza, organização e remoção de entulhos. 
          Transformamos seu espaço com eficiência e cuidado.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a href="#contato" className="btn-primary text-lg px-8 py-4">
            Solicitar Orçamento Gratuito
          </a>
          <a href="#servicos" className="btn-outline text-lg">
            Conhecer Nossos Serviços
          </a>
        </div>
      </div>
    </section>
  );
} 