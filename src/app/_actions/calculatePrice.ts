'use server'

import { PriceCalculationSchema, type PriceCalculationData } from '@/lib/schemas'

const PRICING = {
  rooms: {
    kitchen: { // Cozinha
      5: 580,
      10: 780,
      15: 980
    },
    bedroom: { // Quarto (Chambre)
      5: 580,
      10: 780,
      15: 980
    },
    living: { // Salon
      5: 580,
      10: 780,
      15: 980
    },
    office: { // Bureau
      5: 580,
      10: 780,
      15: 980
    },
    garage: { // Garage
      5: 350,
      10: 480,
      15: 690
    },
    basement: { // Cave
      5: 350,
      10: 480,
      15: 690
    },
    garden: { // Jardin
      5: 350,
      10: 480,
      15: 690
    },
    bathroom: { // Salle de bain
      5: 350,
      10: 480,
      15: 690
    }
  },
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

    const { selections, cantonId, selectedDate, hasComuneLetter } = PriceCalculationSchema.parse(data)
    const cantonBasePrice = PRICING.cantonBasePrices[cantonId]
    const seenNonBedroomRooms = new Set<string>()

    let total: number = cantonBasePrice // Começa com o valor base do cantão
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

      const roomPricing = PRICING.rooms[selection.roomId]
      if (!roomPricing) {
        return { success: false, error: `Quarto inválido: ${selection.roomId}` }
      }

      const itemPrice = roomPricing[selection.quantity as keyof typeof roomPricing]
      if (!itemPrice) {
        return { success: false, error: `Quantidade inválida: ${selection.quantity}` }
      }

      breakdown.push({ ...selection, basePrice: itemPrice, finalPrice: itemPrice })
      total += itemPrice
    }

    if (total <= 0 || total > 50000) {
      return { success: false, error: 'Total inválido' }
    }

    // Aplicar sobretaxa de 10% para amanhã ou fim de semana
    if (selectedDate) {
      const date = new Date(selectedDate)
      date.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      const isTomorrow = date.getTime() === tomorrow.getTime()
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      if (isTomorrow || isWeekend) {
        total = Math.round(total * 1.1)
      }
    }

    // Desconto de 10% se houver carta de commune
    if (hasComuneLetter) {
      total = Math.max(0, Math.round(total * 0.9))
    }

    return { success: true, totalPrice: total, breakdown, cantonBasePrice }

  } catch (error) {
    console.error('Erro ao calcular o preço:', error)
    return { success: false, error: 'Ocorreu um erro ao calcular o preço. Tente novamente.' }
  }
} 