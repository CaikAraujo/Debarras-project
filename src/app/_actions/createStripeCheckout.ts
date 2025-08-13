'use server'

import Stripe from 'stripe'
import { CheckoutSchema, type CheckoutData, VALID_CANTONS } from '@/lib/schemas'
import { calculateSecurePrice } from './calculatePrice'
import { rooms } from '@/data/devisData'

export async function createStripeCheckout(data: CheckoutData) {
  try {
    const validated = CheckoutSchema.parse(data)

    if (!validated.selectedDate) {
      return { success: false, error: 'A data da reserva é obrigatória.' }
    }
    
    const priceResult = await calculateSecurePrice(validated)
    if (!priceResult.success || !priceResult.totalPrice || !priceResult.breakdown) {
      return { success: false, error: priceResult.error || 'Erro ao calcular o preço detalhado.' }
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    
    const lineItems = priceResult.breakdown.map(item => {
      const room = rooms.find(r => r.id === item.roomId)
      const roomTitle = item.roomId === 'bedroom' && item.roomNumber
        ? `${room?.name} ${item.roomNumber}`
        : room?.name || 'Espace'

      return {
        price_data: {
          currency: 'chf',
          product_data: {
            name: roomTitle,
            description: `${item.quantity} objets à enlever.`,
          },
          unit_amount: item.finalPrice * 100,
        },
        quantity: 1,
      }
    })
    
    // Adiciona uma linha separada para o valor base do cantão
    if (priceResult.cantonBasePrice) {
      lineItems.unshift({
        price_data: {
          currency: 'chf',
          product_data: { name: 'Frais de base du canton', description: 'Montant fixe requis par le canton sélectionné.' },
          unit_amount: priceResult.cantonBasePrice * 100,
        },
        quantity: 1,
      })
    }
    
    // Verificação de segurança: o total dos line items deve corresponder ao total calculado
    const totalFromLineItems = lineItems.reduce((acc, item) => acc + item.price_data.unit_amount, 0)
    if (totalFromLineItems !== priceResult.totalPrice * 100) {
        console.error('Divergência de preço entre o total e a soma dos itens.')
        return { success: false, error: 'Erro interno de cálculo de preço.' }
    }

    const session = await stripe.checkout.sessions.create({
      locale: 'fr',
      currency: 'chf',
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card', 'twint'],
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['CH'],
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/devis`,
      customer_email: validated.customerEmail,
      metadata: {
        canton: validated.cantonId,
        selections: JSON.stringify(validated.selections),
        selectedDate: validated.selectedDate.toISOString(),
        serverPrice: priceResult.totalPrice.toString(),
        timestamp: Date.now().toString()
      }
    })

    return { success: true, checkoutUrl: session.url, sessionId: session.id }

  } catch (error) {
    console.error('Erro ao criar checkout do Stripe:', error)
    return { success: false, error: 'Não foi possível iniciar o checkout. Tente novamente.' }
  }
}

export async function validateStripePayment(sessionId: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer_details']
    })
    
    if (session.payment_status !== 'paid') {
      return { success: false, error: 'Pagamento não confirmado' }
    }

    const { metadata } = session
    if (!metadata?.selections || !metadata?.canton || !metadata.selectedDate || !metadata.serverPrice) {
      return { success: false, error: 'Dados de validação ausentes nos metadados' }
    }

    const priceResult = await calculateSecurePrice({
      selections: JSON.parse(metadata.selections),
      cantonId: metadata.canton as typeof VALID_CANTONS[number],
    })

    const serverPriceNum = parseFloat(metadata.serverPrice)
    const isValid = priceResult.success && priceResult.totalPrice === serverPriceNum

    if (!isValid) {
      console.error('FRAUDE DETECTADA:', { sessionId, metadata, calculated: priceResult.totalPrice })
      return { success: false, error: 'Validação de preço falhou' }
    }

    // Retorna todos os dados da sessão necessários para a página de sucesso
    return { 
      success: true, 
      isValid: true,
      sessionData: {
        cantonId: metadata.canton as typeof VALID_CANTONS[number],
        selections: JSON.parse(metadata.selections),
        selectedDate: new Date(metadata.selectedDate),
        customerEmail: session.customer_email ?? '',
        customerName: session.customer_details?.name ?? 'Cliente',
        shippingAddress: session.customer_details?.address ?? null,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        sessionId,
      }
    }

  } catch (error) {
    console.error('Erro na validação do Stripe:', error)
    return { success: false, error: 'Erro de validação' }
  }
} 