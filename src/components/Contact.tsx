'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="contact" className="section-spacing bg-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-main mb-6">
            Demandez Votre Devis
          </h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Contactez-nous pour un devis gratuit et personnalisé
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Formulaire avec design clean */}
          <div className="card-clean hover-shadow">
            <h3 className="text-2xl font-bold text-main mb-8">Remplissez le Formulaire</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-main font-semibold mb-3">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-main font-semibold mb-3">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  placeholder="+41 22 123 45 67"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-main font-semibold mb-3">
                  Type de Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="nettoyage-post-travaux">Nettoyage Post-Travaux</option>
                  <option value="nettoyage-pre-demenagement">Nettoyage Pré-Déménagement</option>
                  <option value="nettoyage-entrepot">Nettoyage d'Entrepôt</option>
                  <option value="nettoyage-post-incendie">Nettoyage Post-Incendie</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-main font-semibold mb-3">
                  Décrivez votre projet
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez votre projet en détail..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary"
              >
                Envoyer la Demande
              </button>
            </form>
          </div>

          {/* Contact rapide avec informations Genève */}
          <div className="card-clean hover-shadow">
            <h3 className="text-2xl font-bold text-main mb-8">
              Contact Rapide
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 icon-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary text-2xl">📞</span>
                </div>
                <div>
                  <h4 className="font-bold text-main text-lg mb-2">Téléphone</h4>
                  <a href="tel:+41221234567" className="text-link hover-text-accent transition-colors text-lg font-medium">
                    +41 22 123 45 67
                  </a>
                  <p className="text-secondary text-sm mt-1">Réponse immédiate</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 icon-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary text-2xl">📧</span>
                </div>
                <div>
                  <h4 className="font-bold text-main text-lg mb-2">Email</h4>
                  <a href="mailto:contact@debarraspro.ch" className="text-link hover-text-accent transition-colors text-lg font-medium">
                    contact@debarraspro.ch
                  </a>
                  <p className="text-secondary text-sm mt-1">Réponse sous 2h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 icon-orange rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-accent-orange text-2xl">🕒</span>
                </div>
                <div>
                  <h4 className="font-bold text-main text-lg mb-2">Horaires</h4>
                  <p className="text-secondary text-lg">Lun-Sam : 7h00 - 19h00</p>
                  <p className="text-accent-orange text-sm font-bold mt-1">⚡ Urgences 24h/24</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 icon-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-2xl">📍</span>
                </div>
                <div>
                  <h4 className="font-bold text-main text-lg mb-2">Zone de Service</h4>
                  <p className="text-secondary text-lg">Genève et canton</p>
                  <p className="text-secondary text-sm mt-1">Déplacement gratuit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 