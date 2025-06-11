export default function About() {
  const advantages = [
    {
      title: "Equipe Profissional",
      description: "Funcionários treinados e equipamentos profissionais"
    },
    {
      title: "Atendimento Rápido",
      description: "Disponibilidade para atendimento em até 24h"
    },
    {
      title: "Preços Justos",
      description: "Orçamentos transparentes sem custos ocultos"
    },
    {
      title: "Garantia de Qualidade",
      description: "100% de satisfação garantida em todos os serviços"
    }
  ];

  const statistics = [
    { number: "500+", label: "Clientes Atendidos" },
    { number: "10+", label: "Anos de Experiência" },
    { number: "24h", label: "Tempo de Resposta" },
    { number: "100%", label: "Satisfação" }
  ];

  return (
    <section id="sobre" className="py-24 bg-main">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">Por que escolher a Debarras Pro?</h2>
            <p className="text-xl text-main mb-10 leading-relaxed">
              Com mais de 10 anos de experiência no mercado, somos especialistas em transformar 
              espaços através de serviços profissionais de limpeza e organização.
            </p>
            
            <div className="space-y-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-2">{advantage.title}</h4>
                    <p className="text-main leading-relaxed">{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-3xl p-10 shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-primary mb-8 text-center">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm">
                  <div className="text-4xl font-bold text-accent mb-3">{stat.number}</div>
                  <div className="text-primary font-bold text-base uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 