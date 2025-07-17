import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendOrderConfirmationEmail } from '@/app/_actions/sendOrderConfirmationEmail'

// Inicializa o Stripe com sua chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// O segredo do webhook, para verificar se a requisição veio do Stripe
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  // Verifique a assinatura do webhook para garantir que é uma requisição válida
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error(`❌ Erro na verificação do webhook: ${errorMessage}`)
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }

  // Lida com o evento específico
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session

      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name
      const amountTotal = session.amount_total ? session.amount_total / 100 : 0

      // Garante que temos um e-mail para enviar a notificação
      if (customerEmail) {
        await sendOrderConfirmationEmail({
          customerName: customerName || 'Cliente',
          customerEmail,
          orderId: session.id,
          amountTotal,
        })
      } else {
        console.error('E-mail do cliente não encontrado na sessão do Stripe.')
      }
      break
    default:
      // console.log(`Evento não tratado: ${event.type}`)
  }

  // Responde ao Stripe que o evento foi recebido com sucesso
  return NextResponse.json({ received: true })
} 