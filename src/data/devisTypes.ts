import { type LucideIcon } from 'lucide-react'

export interface Room {
  id: string
  name: string
  icon: LucideIcon
  description: string
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