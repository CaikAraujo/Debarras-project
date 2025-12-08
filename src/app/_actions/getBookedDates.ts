'use server'

import { supabase } from '@/lib/supabase'
import { z } from 'zod'
import { VALID_CANTONS } from '@/lib/schemas'

const CantonSchema = z.enum(VALID_CANTONS)

export async function getBookedDates(cantonId: string) {
  try {
    const validatedCanton = CantonSchema.parse(cantonId)

    const { data, error } = await supabase
      .from('reservations')
      .select('selected_date')
      .eq('canton_id', validatedCanton)

    if (error) {
      console.error('Erro ao buscar datas reservadas:', error)
      return { success: false, error: error.message, dates: [] }
    }

    const bookedDates = data.map((item: { selected_date: string }) => new Date(item.selected_date))
    
    return { success: true, dates: bookedDates }

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Canton invalide', dates: [] };
    }
    console.error('Erro inesperado ao buscar datas:', error)
    return { success: false, error: 'Erreur inattendue du serveur', dates: [] }
  }
} 