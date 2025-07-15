import { ChefHat, Sofa, Bed, ShowerHead, Monitor, Car, Home, TreePine } from 'lucide-react'
import type { Room, Canton, QuantityOption, DevisStep } from './devisTypes'

export const rooms: Room[] = [
  { id: 'kitchen', name: 'Cuisine', icon: ChefHat, description: 'Électroménager, vaisselle, mobilier' },
  { id: 'living', name: 'Salon', icon: Sofa, description: 'Canapés, tables, télévision, décorations' },
  { id: 'bedroom', name: 'Chambre', icon: Bed, description: 'Lit, armoires, commodes, vêtements' },
  { id: 'bathroom', name: 'Salle de bain', icon: ShowerHead, description: 'Mobilier, appareils, accessoires' },
  { id: 'office', name: 'Bureau', icon: Monitor, description: 'Ordinateurs, meubles, documents' },
  { id: 'garage', name: 'Garage', icon: Car, description: 'Outils, équipements, stockage' },
  { id: 'basement', name: 'Cave', icon: Home, description: 'Objets stockés, équipements divers' },
  { id: 'garden', name: 'Jardin', icon: TreePine, description: 'Mobilier extérieur, outils jardinage' }
]

export const cantons: Canton[] = [
  { id: 'geneve', name: 'Genève', image: '/images/escudos/geneve.png' },
  { id: 'vaud', name: 'Vaud', image: '/images/escudos/vaud.png' },
  { id: 'valais', name: 'Valais', image: '/images/escudos/valais.png' },
  { id: 'fribourg', name: 'Fribourg', image: '/images/escudos/fribourg.svg' },
  { id: 'neuchatel', name: 'Neuchâtel', image: '/images/escudos/neuchatel.png' },
  { id: 'jura', name: 'Jura', image: '/images/escudos/jura.svg' },
  { id: 'berne', name: 'Berne', image: '/images/escudos/berne.svg' }
]

export const quantities: QuantityOption[] = [
  { value: 5, label: '5 pièces' },
  { value: 10, label: '10 pièces' },
  { value: 15, label: '15 pièces' }
]

export const stepTitles: DevisStep[] = [
  { id: 0, title: 'Choisissez votre canton' },
  { id: 1, title: 'Choisissez une pièce' },
  { id: 2, title: 'Sélectionnez la quantité' },
  { id: 3, title: 'Confirmez votre devis' }
] 