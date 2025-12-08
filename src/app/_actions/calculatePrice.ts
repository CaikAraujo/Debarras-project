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
      return { success: false, error: 'Trop de tentatives. Veuillez patienter 1 minute.' }
    }

    const { selections, cantonId, selectedDate, hasComuneLetter, clientTzOffsetMin, extraCartons } = PriceCalculationSchema.parse(data)
    const cantonBasePrice = PRICING.cantonBasePrices[cantonId]
    const seenNonBedroomRooms = new Set<string>()

    let total: number = cantonBasePrice // Começa com o valor base do cantão
    const breakdown = []

    for (const selection of selections) {
      // Para quartos, permitir múltiplas seleções
      // Para outros cômodos, verificar duplicatas
      if (selection.roomId !== 'bedroom') {
        if (seenNonBedroomRooms.has(selection.roomId)) {
          return { success: false, error: `Pièce déjà sélectionnée : ${selection.roomId}` }
        }
        seenNonBedroomRooms.add(selection.roomId)
      }

      const roomPricing = PRICING.rooms[selection.roomId]
      if (!roomPricing) {
        return { success: false, error: `Pièce invalide : ${selection.roomId}` }
      }

      const itemPrice = roomPricing[selection.quantity as keyof typeof roomPricing]
      if (!itemPrice) {
        return { success: false, error: `Quantité invalide : ${selection.quantity}` }
      }

      breakdown.push({ ...selection, basePrice: itemPrice, finalPrice: itemPrice })
      total += itemPrice
    }

    if (total <= 0 || total > 50000) {
      return { success: false, error: 'Total invalide' }
    }

    // Aplicar sobretaxa de 10% para amanhã (D+1) ou fim de semana
    if (selectedDate) {
      const date = new Date(selectedDate)

      // Offsets
      const clientOffset = typeof clientTzOffsetMin === 'number' ? clientTzOffsetMin : new Date().getTimezoneOffset()
      const zurichOffsetGuess = isDst(date) ? -120 : -60 // minutos

      // Helpers
      const now = new Date()

      // Função de índice de dia para um dado offset de timezone (minutos como getTimezoneOffset)
      const dayIndex = (d: Date, offsetMin: number) => Math.floor((d.getTime() - offsetMin * 60 * 1000) / 86400000)

      // Dia civil no fuso do cliente
      const dayDiffClient = dayIndex(date, clientOffset) - dayIndex(now, clientOffset)
      const isTomorrowClient = dayDiffClient === 1

      // Dia civil no fuso de Zurich (para fins de fim de semana operacional)
      const dayDiffZurich = dayIndex(date, zurichOffsetGuess) - dayIndex(now, zurichOffsetGuess)
      const weekdayZurich = weekdayInOffset(date, zurichOffsetGuess)
      const isWeekendZurich = weekdayZurich === 0 || weekdayZurich === 6

      const applySurcharge = isTomorrowClient || isWeekendZurich

      if (applySurcharge) {
        total = Math.round(total * 1.1)
      }
    }

    function isDst(d: Date): boolean {
      // Heurística simples para Europa/Zurich: DST entre último domingo de março e último domingo de outubro
      const year = d.getUTCFullYear()
      const lastSunday = (month: number) => {
        const end = new Date(Date.UTC(year, month + 1, 0))
        const day = end.getUTCDay()
        return new Date(Date.UTC(year, month, 31 - day))
      }
      const dstStart = lastSunday(2) // Março (2)
      const dstEnd = lastSunday(9) // Outubro (9)
      return d >= dstStart && d < dstEnd
    }

    function weekdayInOffset(d: Date, offsetMin: number): number {
      // Converte para hora local do offset e usa getUTCDay para obter o dia da semana nesse fuso
      const shifted = new Date(d.getTime() - offsetMin * 60 * 1000)
      return shifted.getUTCDay()
    }

    // Cartons adicionais pagos: preço unitário (7 CHF por carton)
    const EXTRA_CARTON_UNIT_PRICE = 7
    if (typeof extraCartons === 'number' && extraCartons > 0) {
      total += EXTRA_CARTON_UNIT_PRICE * extraCartons
    }

    // Desconto de 10% se houver carta de commune (aplicado por último para garantir o desconto sobre o total)
    if (hasComuneLetter) {
      total = Math.max(0, Math.round(total * 0.9))
    }

    return { success: true, totalPrice: total, breakdown, cantonBasePrice }

  } catch (error) {
    console.error('Erro ao calcular o preço:', error)
    return { success: false, error: 'Une erreur est survenue lors du calcul du prix. Veuillez réessayer.' }
  }
} 