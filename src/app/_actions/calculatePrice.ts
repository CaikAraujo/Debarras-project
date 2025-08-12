'use server'

import { PriceCalculationSchema, type PriceCalculationData } from '@/lib/schemas'

const PRICING = {
  base: [
    { quantity: 5, price: 150 },
    { quantity: 10, price: 280 },
    { quantity: 15, price: 400 }
  ],
  cantonBasePrices: { 
    geneve: 180, 
    vaud: 280, 
    valais: 540, 
    fribourg: 540, 
    neuchatel: 480, 
    jura: 620, 
    berne: 600 
  }
} as const

const requestCounts = new Map<string, { count: number, reset: number }>()

function checkRateLimit(ip: string = 'localhost'): boolean {
  const now = Date.now()
  const data = requestCounts.get(ip)
  
  if (!data || now - data.reset > 60000) {
    requestCounts.set(ip, { count: 1, reset: now })
    return true
  }
  
  // Rate limit generoso para desenvolvimento
  if (data.count >= 1000) return false
  data.count++
  return true
}

export async function calculateSecurePrice(data: PriceCalculationData) {
  try {
    if (!checkRateLimit()) {
      return { success: false, error: 'Muitas tentativas. Aguarde 1 minuto.' }
    }

    const { selections, cantonId } = PriceCalculationSchema.parse(data)
    const cantonBasePrice = PRICING.cantonBasePrices[cantonId]
    const seenNonBedroomRooms = new Set<string>()

    let total = 0
    const breakdown = []

    for (const selection of selections) {
      // Para quartos, permitir múltiplas seleções
      // Para outros cômodos, verificar duplicatas
      if (selection.roomId !== 'bedroom') {
        if (seenNonBedroomRooms.has(selection.roomId)) {
          return { success: false, error: `Cômodo já selecionado: ${selection.roomId}` }
        }
        seenNonBedroomRooms.add(selection.roomId)
      }

      const priceConfig = PRICING.base.find(p => p.quantity === selection.quantity)
      if (!priceConfig) {
        return { success: false, error: `Quantidade inválida: ${selection.quantity}` }
      }

      // Calcular preço baseado no valor do cantão + quantidade
      const finalPrice = Math.round(cantonBasePrice + (priceConfig.price * 0.5))
      breakdown.push({ ...selection, basePrice: cantonBasePrice, finalPrice })
      total += finalPrice
    }

    if (total <= 0 || total > 50000) {
      return { success: false, error: 'Total inválido' }
    }

    return { success: true, totalPrice: total, breakdown }

  } catch (error) {
    console.error('Erro ao calcular o preço:', error)
    return { success: false, error: 'Ocorreu um erro ao calcular o preço. Tente novamente.' }
  }
} 