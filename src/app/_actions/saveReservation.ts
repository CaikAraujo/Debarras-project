'use server'

import { supabase } from '@/lib/supabase'

import type { CheckoutData } from '@/lib/schemas'

export async function saveReservation(data: CheckoutData & { sessionId: string }) {
  try {
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        canton_id: data.cantonId,
        selected_date: data.selectedDate?.toISOString(),
        selections: data.selections,
        customer_email: data.customerEmail,
        stripe_session_id: data.sessionId,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, reservation }
  } catch (error) {
    console.error('Erro ao salvar reserva:', error)
    return { success: false, error: 'Falha ao salvar reserva' }
  }
} 