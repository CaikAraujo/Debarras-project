'use server'

import Stripe from 'stripe'
import { CheckoutSchema, type CheckoutData, VALID_CANTONS } from '@/lib/schemas'
import { calculateSecurePrice } from './calculatePrice'

export async function createStripeCheckout(data: CheckoutData) {
  try {
    const validated = CheckoutSchema.parse(data)
    
    const priceResult = await calculateSecurePrice(validated)
    if (!priceResult.success || !priceResult.totalPrice) {
      return { success: false, error: priceResult.error }
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'chf',
          product_data: {
            name: `Débarras ${validated.cantonId}`,
            description: `${validated.selections.length} espaces sélectionnés`
          },
          unit_amount: priceResult.totalPrice * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      payment_method_types: ['card', 'twint'],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/devis`,
      customer_email: validated.customerEmail,
      metadata: {
        canton: validated.cantonId,
        selections: JSON.stringify(validated.selections),
        serverPrice: priceResult.totalPrice.toString(),
        timestamp: Date.now().toString()
      }
    })

    return { success: true, checkoutUrl: session.url, sessionId: session.id }

  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Erro no checkout' }
  }
}

export async function validateStripePayment(sessionId: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    if (session.payment_status !== 'paid') {
      return { success: false, error: 'Pagamento não confirmado' }
    }

    const { metadata } = session
    if (!metadata?.selections || !metadata?.canton) {
      return { success: false, error: 'Dados de validação ausentes' }
    }

    const priceResult = await calculateSecurePrice({
      selections: JSON.parse(metadata.selections),
      cantonId: metadata.canton as typeof VALID_CANTONS[number]
    })

    const isValid = priceResult.success && 
      priceResult.totalPrice === parseInt(metadata.serverPrice)

    if (!isValid) {
      console.error('FRAUDE DETECTADA:', { sessionId, metadata })
      return { success: false, error: 'Validação falhou' }
    }

    return { success: true, isValid: true }

  } catch {
    return { success: false, error: 'Erro de validação' }
  }
} 