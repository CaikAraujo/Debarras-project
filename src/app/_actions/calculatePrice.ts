'use server'

import { PriceCalculationSchema, type PriceCalculationData } from '@/lib/schemas'

const PRICING = {
  base: [
    { quantity: 5, price: 150 },
    { quantity: 10, price: 280 },
    { quantity: 15, price: 400 }
  ],
  multipliers: { geneve: 1.3, vaud: 1.2, valais: 1.0, fribourg: 1.1, neuchatel: 1.15, jura: 0.9, berne: 1.25 }
} as const

const requestCounts = new Map<string, { count: number, reset: number }>()

function checkRateLimit(ip: string = 'localhost'): boolean {
  const now = Date.now()
  const data = requestCounts.get(ip)
  
  if (!data || now - data.reset > 60000) {
    requestCounts.set(ip, { count: 1, reset: now })
    return true
  }
  
  if (data.count >= 10) return false
  data.count++
  return true
}

export async function calculateSecurePrice(data: PriceCalculationData) {
  try {
    if (!checkRateLimit()) {
      return { success: false, error: 'Muitas tentativas. Aguarde 1 minuto.' }
    }

    const validated = PriceCalculationSchema.parse(data)
    const multiplier = PRICING.multipliers[validated.cantonId]
    const seenRooms = new Set<string>()

    let total = 0
    const breakdown = []

    for (const selection of validated.selections) {
      if (seenRooms.has(selection.roomId)) {
        return { success: false, error: `Cômodo duplicado: ${selection.roomId}` }
      }
      seenRooms.add(selection.roomId)

      const priceConfig = PRICING.base.find(p => p.quantity === selection.quantity)!
      const finalPrice = Math.round(priceConfig.price * multiplier)
      
      breakdown.push({ ...selection, basePrice: priceConfig.price, finalPrice })
      total += finalPrice
    }

    if (total <= 0 || total > 50000) {
      return { success: false, error: 'Total inválido' }
    }

    return { success: true, totalPrice: total, breakdown }

  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Erro interno' }
  }
} 