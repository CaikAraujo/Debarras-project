'use server'

import { supabase } from '@/lib/supabase' // Corrigido para importar a instância
import type { VALID_CANTONS } from '@/lib/schemas'

export async function getBookedDates(cantonId: typeof VALID_CANTONS[number]) {
  // Não precisa criar cliente, usa a instância importada
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('selected_date')
      .eq('canton_id', cantonId) // Nome da coluna corrigido

    if (error) {
      console.error('Erro ao buscar datas reservadas:', error)
      return { success: false, error: error.message, dates: [] }
    }

    const bookedDates = data.map((item: { selected_date: string }) => new Date(item.selected_date))
    
    return { success: true, dates: bookedDates }

  } catch (error: any) {
    console.error('Erro inesperado ao buscar datas:', error)
    return { success: false, error: 'Erro inesperado no servidor', dates: [] }
  }
} 