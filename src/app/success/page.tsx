'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Stripe from 'stripe'
import { validateStripePayment } from '@/app/_actions/createStripeCheckout'
import { saveReservation } from '@/app/_actions/saveReservation'
import { sendOrderConfirmationEmail } from '@/app/_actions/sendOrderConfirmationEmail'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('validating')

  useEffect(() => {
    const handleValidation = async () => {
      if (!sessionId) {
        setStatus('error')
        return
      }

      const validation = await validateStripePayment(sessionId)
      if (!validation.success) {
        setStatus('error')
        return
      }

      // Extrair dados do metadata (precisa fetch session novamente ou passar)
      // Para simplicidade, assumir que salvamos com dados do metadata
      const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer_details']
      })

      if (!session.metadata || !session.amount_total) {
        setStatus('error')
        return
      }

      const reservationData = {
        cantonId: session.metadata.canton as 'geneve' | 'vaud' | 'valais' | 'fribourg' | 'neuchatel' | 'jura' | 'berne',
        selections: JSON.parse(session.metadata.selections),
        selectedDate: new Date(session.metadata.selectedDate),
        customerEmail: session.customer_email ?? '',
        sessionId
      }

      const saveResult = await saveReservation(reservationData)
      if (saveResult.success) {
        await sendOrderConfirmationEmail({
          customerName: session.customer_details?.name ?? 'Cliente',
          customerEmail: reservationData.customerEmail,
          orderId: sessionId,
          amountTotal: session.amount_total / 100,
          shippingAddress: session.customer_details?.address ?? null,
        })
        setStatus('success')
      } else {
        setStatus('error')
      }
    }

    handleValidation()
  }, [sessionId])

  if (status === 'validating') return <div>Validando pagamento...</div>
  if (status === 'error') return <div>Erro na validação</div>
  return <div>Pagamento confirmado! Reserva salva.</div>
} 