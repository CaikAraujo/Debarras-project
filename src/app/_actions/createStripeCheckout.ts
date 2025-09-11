'use server'

import Stripe from 'stripe'
import { CheckoutSchema, type CheckoutData, VALID_CANTONS } from '@/lib/schemas'
import { calculateSecurePrice } from './calculatePrice'
import { rooms } from '@/data/devisData'
import { SecurityValidators, SECURITY_CONSTANTS } from '@/lib/security'

export async function createStripeCheckout(data: CheckoutData) {
  try {
    const validated = CheckoutSchema.parse(data)

    if (!validated.selectedDate) {
      return { success: false, error: 'A data da reserva é obrigatória.' }
    }
    
    // Validação adicional de segurança
    if (!validated.selections || validated.selections.length === 0) {
      return { success: false, error: 'Nenhuma seleção válida encontrada.' }
    }

    // Verificar se todas as seleções têm dados válidos
    const hasValidSelections = validated.selections.every(s => 
      SecurityValidators.isValidId(s.selectionId) &&
      SecurityValidators.isValidRoomId(s.roomId) &&
      SecurityValidators.isValidQuantity(s.quantity)
    )

    if (!hasValidSelections) {
      return { success: false, error: 'Dados de seleção inválidos.' }
    }

    // Verificar se não excede o limite máximo de seleções
    if (validated.selections.length > SECURITY_CONSTANTS.MAX_SELECTIONS) {
      return { success: false, error: 'Número máximo de seleções excedido.' }
    }
    
    const priceResult = await calculateSecurePrice(validated)
    if (!priceResult.success || !priceResult.totalPrice || !priceResult.breakdown) {
      return { success: false, error: priceResult.error || 'Erro ao calcular o preço detalhado.' }
    }

    // Verificar se o preço não excede o limite máximo
    if (priceResult.totalPrice > SECURITY_CONSTANTS.MAX_TOTAL_PRICE) {
      return { success: false, error: 'Preço total excede o limite máximo permitido.' }
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
    
    // Ajustar para sobretaxas/descontos (amanhã/fim de semana e carta de commune)
    let totalFromLineItems = lineItems.reduce((acc, item) => acc + item.price_data.unit_amount, 0)
    let targetTotal = priceResult.totalPrice * 100

    if (targetTotal > totalFromLineItems) {
      // Sobretaxa: adicionar item de ajuste positivo
      lineItems.push({
        price_data: {
          currency: 'chf',
          product_data: { name: 'Ajuste de data', description: 'Sobretaxe (demain/week-end) 10%' },
          unit_amount: targetTotal - totalFromLineItems,
        },
        quantity: 1,
      })
      totalFromLineItems = targetTotal
    } else if (targetTotal < totalFromLineItems) {
      // Desconto: reduzir valores dos itens até atingir o total alvo (sem valores negativos)
      let remainingDiscount = totalFromLineItems - targetTotal

      // Priorizar reduzir o item de base do cantão se existir (foi adicionado com unshift)
      const startIndex = priceResult.cantonBasePrice ? 0 : 1
      for (let i = 0; i < lineItems.length && remainingDiscount > 0; i++) {
        const idx = i // ordem natural já tem base no início quando existe
        const item = lineItems[idx]
        const current = item.price_data.unit_amount
        const reducible = Math.min(current, remainingDiscount)
        item.price_data.unit_amount = current - reducible
        remainingDiscount -= reducible
      }

      totalFromLineItems = lineItems.reduce((acc, item) => acc + item.price_data.unit_amount, 0)
    }

    // Segurança final
    if (totalFromLineItems !== targetTotal) {
      console.error('Divergência de preço entre o total e a soma dos itens após ajuste.')
      return { success: false, error: 'Erro interno de cálculo de preço (ajuste).' }
    }

    const hasComune = Boolean(validated.comuneLetterUrl || validated.hasComuneLetter)
    const couponId = process.env.STRIPE_COMUNE_COUPON_ID

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
      discounts: couponId && hasComune ? [{ coupon: couponId }] : undefined,
      metadata: {
        canton: validated.cantonId,
        selections: JSON.stringify(validated.selections),
        selectedDate: validated.selectedDate.toISOString(),
        serverPrice: priceResult.totalPrice.toString(),
        timestamp: Date.now().toString(),
        comuneLetterUrl: validated.comuneLetterUrl || '',
        customerName: validated.customerName || '',
        customerPhone: validated.customerPhone || '',
        customerAddress: validated.customerAddress || '',
        customerNotes: validated.customerNotes || ''
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