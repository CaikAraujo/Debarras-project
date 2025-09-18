import { z } from 'zod'

export const VALID_ROOMS = ['kitchen', 'living', 'bedroom', 'bathroom', 'office', 'garage', 'basement', 'garden'] as const
export const VALID_CANTONS = ['geneve', 'vaud', 'valais', 'fribourg', 'neuchatel', 'jura', 'berne'] as const
export const VALID_QUANTITIES = [5, 10, 15] as const

export const SelectionSchema = z.object({
  selectionId: z.string(), // ID único para cada seleção (permite múltiplos quartos)
  roomId: z.enum(VALID_ROOMS),
  quantity: z.number().refine(val => VALID_QUANTITIES.includes(val as 5 | 10 | 15)),
  roomNumber: z.number().optional() // Para identificar qual quarto (ex: Quarto 1, Quarto 2)
})

export const PriceCalculationSchema = z.object({
  selections: z.array(SelectionSchema).min(1).max(10),
  cantonId: z.enum(VALID_CANTONS),
  selectedDate: z.date().optional(),  // Tornando a data opcional
  hasComuneLetter: z.boolean().optional(),
  // Offset de timezone do cliente em minutos (getTimezoneOffset)
  clientTzOffsetMin: z.number().optional()
})

export const CheckoutSchema = PriceCalculationSchema.extend({
  customerEmail: z.string().email(),
  // Aceita URL pública ou caminho no storage
  comuneLetterUrl: z.string().min(1).optional(),
  // Informações básicas do cliente para e-mail/webhook
  customerName: z.string().min(2),
  customerPhone: z.string().min(6),
  customerAddress: z.string().min(5),
  customerNotes: z.string().optional(),
  // Campos adicionais separados
  customerFloor: z.string().min(1).optional(),
  customerDoorCode: z.string().min(1).optional()
})

export type Selection = z.infer<typeof SelectionSchema>
export type PriceCalculationData = z.infer<typeof PriceCalculationSchema>
export type CheckoutData = z.infer<typeof CheckoutSchema>