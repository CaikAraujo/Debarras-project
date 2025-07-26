'use server'

import { supabase } from '@/lib/supabase'

import { CheckoutSchema, type CheckoutData } from '@/lib/schemas'

export async function saveReservation(data: CheckoutData & { sessionId: string }) {
  try {
    // Validação dos dados recebidos do cliente
    const validatedData = CheckoutSchema.parse(data)

    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        canton_id: validatedData.cantonId,
        selected_date: validatedData.selectedDate?.toISOString(),
        selections: validatedData.selections,
        customer_email: validatedData.customerEmail,
        stripe_session_id: data.sessionId, // sessionId não faz parte do CheckoutSchema
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