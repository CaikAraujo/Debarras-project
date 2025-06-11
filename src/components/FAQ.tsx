'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Quelle est la différence entre Débarras Post-Travaux et Nettoyage Pré-Déménagement ?",
      answer: "Le débarras post-travaux élimine les gravats et résidus de construction. Le nettoyage pré-déménagement prépare l'environnement pour les nouveaux occupants avec un nettoyage complet et une hygiénisation."
    },
    {
      question: "Fournissez-vous les équipements et produits de nettoyage ?",
      answer: "Oui ! Nous apportons tous les équipements professionnels et produits nécessaires. Aspirateurs industriels, cireuses et produits spécifiques sont inclus."
    },
    {
      question: "Combien de temps prend un service de débarras ?",
      answer: "Appartements : 4-8 heures. Maisons ou post-travaux : 1-2 jours. Nous évaluons chaque cas et fournissons un délai précis lors du devis."
    },
    {
      question: "Travaillez-vous les weekends et jours fériés ?",
      answer: "Oui, nous travaillons du lundi au samedi, avec service d'urgence 24h pour les situations critiques à Genève et dans le canton."
    },
    {
      question: "Comment calculez-vous le prix du service ?",
      answer: "Le prix dépend de la taille de l'environnement, du type de nettoyage et de la complexité. Nous offrons des devis gratuits et transparents sans frais cachés."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-spacing bg-main">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-main mb-8">
            Questions Fréquemment Posées
          </h2>
          <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
            Découvrez les réponses aux questions les plus courantes sur nos services de débarras et nettoyage
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-8 bg-card rounded-2xl hover-shadow transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-main pr-6 leading-relaxed">
                    {faq.question}
                  </h3>
                  <span className={`text-accent text-3xl font-bold transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </div>
                {openIndex === index && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-secondary leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Contact CTA avec design clean */}
        <div className="text-center mt-20">
          <div className="card-clean max-w-2xl mx-auto hover-shadow">
            <h3 className="text-2xl lg:text-3xl font-bold text-main mb-4">Plus de questions ?</h3>
            <p className="text-secondary mb-8 text-lg">Notre équipe est prête à vous aider avec toutes vos questions</p>
            <div className="flex justify-center">
              <button className="btn-primary">
                Contacter Maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 