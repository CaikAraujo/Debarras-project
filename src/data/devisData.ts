import { ChefHat, Sofa, Bed, ShowerHead, Monitor, Car, Home, TreePine } from 'lucide-react'
import type { Room, Canton, QuantityOption, DevisStep } from './devisTypes'

export const rooms: Room[] = [
  { id: 'kitchen', name: 'Cuisine', icon: ChefHat, description: 'Électroménager, vaisselle, mobilier', imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f' },
  { id: 'living', name: 'Salon', icon: Sofa, description: 'Canapés, tables, télévision, décorations', imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb' },
  { id: 'bedroom', name: 'Chambre', icon: Bed, description: 'Lit, armoires, commodes, vêtements', imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9de5a74e' },
  { id: 'bathroom', name: 'Salle de bain', icon: ShowerHead, description: 'Mobilier, appareils, accessoires', imageUrl: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501' },
  { id: 'office', name: 'Bureau', icon: Monitor, description: 'Ordinateurs, meubles, documents', imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174' },
  { id: 'garage', name: 'Garage', icon: Car, description: 'Outils, équipements, stockage', imageUrl: 'https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1' },
  { id: 'basement', name: 'Cave', icon: Home, description: 'Objets stockés, équipements divers', imageUrl: 'https://images.unsplash.com/photo-1590354176492-23bce3636a0f' },
  { id: 'garden', name: 'Jardin', icon: TreePine, description: 'Mobilier extérieur, outils jardinage', imageUrl: 'https://images.unsplash.com/photo-1558386377-3722a4d33a67' }
]

export const cantons: Canton[] = [
  { id: 'geneve', name: 'Genève', image: '/images/escudos/geneve.png', basePrice: 180 },
  { id: 'vaud', name: 'Vaud', image: '/images/escudos/vaud.png', basePrice: 280 },
  { id: 'valais', name: 'Valais', image: '/images/escudos/valais.png', basePrice: 540 },
  { id: 'fribourg', name: 'Fribourg', image: '/images/escudos/fribourg.svg', basePrice: 540 },
  { id: 'neuchatel', name: 'Neuchâtel', image: '/images/escudos/neuchatel.png', basePrice: 480 },
  { id: 'jura', name: 'Jura', image: '/images/escudos/jura.svg', basePrice: 620 },
  { id: 'berne', name: 'Berne', image: '/images/escudos/berne.svg', basePrice: 600 }
]

export const quantities: QuantityOption[] = [
  { value: 5, label: '1-5 objets' },
  { value: 10, label: '6-10 objets' },
  { value: 15, label: '11-15 objets' }
]

export const stepTitles: DevisStep[] = [
  { id: 0, title: 'Choisissez votre canton' },
  { id: 1, title: 'Choisissez une pièce' },
  { id: 2, title: 'Sélectionnez la quantité' },
  { id: 3, title: 'Choisissez une date' },
  { id: 4, title: 'Confirmez votre devis' }
] 