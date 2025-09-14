import Stripe from 'stripe'
import { headers } from 'next/headers'
import { saveReservation } from '@/app/_actions/saveReservation'
import { sendOrderConfirmationEmail } from '@/app/_actions/sendOrderConfirmationEmail'
import type { VALID_CANTONS } from '@/lib/schemas'
import { calculateSecurePrice } from '@/app/_actions/calculatePrice'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`❌ Erro na verificação do webhook: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Lidar com o evento checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Aumentar o timeout para ter certeza que os detalhes do cliente estão disponíveis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Recuperar a sessão com os detalhes expandidos
    const sessionWithDetails = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['customer_details']
    });

    const { metadata, customer_details, customer_email, amount_total } = sessionWithDetails

    if (!metadata || !customer_details) {
      console.error('[Webhook] Error: Metadados ou detalhes do cliente ausentes na sessão.')
      return new Response('Webhook Error: Missing metadata or customer details.', { status: 400 })
    }

    // Recomputar preço e validar montante cobrado
    try {
      const recomputed = await calculateSecurePrice({
        selections: JSON.parse(metadata.selections || '[]'),
        cantonId: metadata.canton as typeof VALID_CANTONS[number],
        selectedDate: metadata.selectedDate ? new Date(metadata.selectedDate) : undefined,
        hasComuneLetter: Boolean(metadata.comuneLetterUrl)
      })

      const charged = amount_total ? amount_total / 100 : 0
      if (!recomputed.success || typeof recomputed.totalPrice !== 'number' || recomputed.totalPrice !== charged) {
        console.error('[Webhook] Divergência de preço', {
          recomputed: recomputed.totalPrice,
          charged
        })
        return new Response('Webhook Error: Price validation failed', { status: 400 })
      }
    } catch (err) {
      console.error('[Webhook] Erro ao recomputar preço:', err)
      return new Response('Webhook Error: Recompute failed', { status: 400 })
    }

    try {
      // Usar o e-mail de customer_details como fonte principal
      const finalCustomerEmail = customer_details.email ?? customer_email ?? ''

      // Formatar endereço vindo do Stripe se necessário
      const formatStripeAddress = (addr: Stripe.Address | null | undefined) => {
        if (!addr) return ''
        const parts = [addr.line1, addr.line2, addr.postal_code, addr.city, addr.country].filter(Boolean)
        return parts.join(', ')
      }

      const reservationData = {
        sessionId: session.id,
        cantonId: metadata.canton as typeof VALID_CANTONS[number],
        selections: JSON.parse(metadata.selections),
        selectedDate: new Date(metadata.selectedDate),
        customerEmail: finalCustomerEmail,
        customerName: (metadata.customerName && metadata.customerName.length > 1) ? metadata.customerName : (customer_details.name ?? 'Client'),
        customerPhone: metadata.customerPhone || customer_details.phone || '000000',
        customerAddress: metadata.customerAddress || formatStripeAddress(customer_details.address) || 'Adresse',
      }

      // 1. Salvar a reserva
      const saveResult = await saveReservation(reservationData)
      if (!saveResult.success) {
        // Se a reserva falhar, não enviar email e logar o erro
        console.error(`[Webhook] Error: Falha ao salvar reserva para a sessão ${session.id}. Erro: ${saveResult.error}`)
        return new Response(`Webhook Error: Failed to save reservation for session ${session.id}`, { status: 500 })
      }
      
      // 2. Enviar o email de confirmação
      await sendOrderConfirmationEmail({
        customerName: (metadata.customerName && metadata.customerName.length > 1) ? metadata.customerName : (customer_details.name ?? 'Cliente'),
        customerEmail: finalCustomerEmail,
        orderId: session.id,
        amountTotal: amount_total ? amount_total / 100 : 0,
        shippingAddress: customer_details.address,
        comuneLetterUrl: metadata.comuneLetterUrl || undefined,
        customerPhone: metadata.customerPhone || undefined,
        customerAddress: metadata.customerAddress || undefined,
        customerNotes: metadata.customerNotes || undefined,
      })
      
      console.log(`✅ Reserva salva e e-mail enviado para a sessão: ${session.id}`)

    } catch (error: any) {
      console.error(`Webhook Error ao processar a sessão ${session.id}:`, error)
      return new Response(`Webhook Error: Internal processing error for session ${session.id}`, { status: 500 })
    }
  }

  return new Response('Webhook recebido com sucesso!', { status: 200 })
} 