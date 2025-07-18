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
  cantonId: z.enum(VALID_CANTONS)
})

export const CheckoutSchema = PriceCalculationSchema.extend({
  customerEmail: z.string().email().optional()
})

export type Selection = z.infer<typeof SelectionSchema>
export type PriceCalculationData = z.infer<typeof PriceCalculationSchema>
export type CheckoutData = z.infer<typeof CheckoutSchema> 