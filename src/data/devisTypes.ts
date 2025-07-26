import { type LucideIcon } from 'lucide-react'
import { type Selection } from '@/lib/schemas'

export interface Room {
  id: Selection['roomId']
  name: string
  icon: LucideIcon
  description: string
  imageUrl?: string // Imagem para o checkout da Stripe
}

export interface Canton {
  id: string
  name: string
  image: string
}

export interface QuantityOption {
  value: number
  label: string
}

export interface DevisStep {
  id: number
  title: string
} 