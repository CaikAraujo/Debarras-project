'use server'

import { Resend } from 'resend'
import React from 'react'
import OrderConfirmationEmail from '@/emails/OrderConfirmationEmail'
import Stripe from 'stripe'


interface EmailPayload {
  customerName: string
  customerEmail: string
  orderId: string
  amountTotal: number
  shippingAddress: Stripe.Address | null
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(payload: EmailPayload) {
  const { customerName, customerEmail, orderId, amountTotal, shippingAddress } = payload

  try {
    // Envia o e-mail para o dono do negócio
    await resend.emails.send({
      from: 'Confirmation de Commande <info@suisse-debarras.ch>',
      to: ['suissedebarras00@gmail.com'], // Seu e-mail
      subject: `Nouvelle commande confirmée de ${customerName} !`,
      react: React.createElement(OrderConfirmationEmail, {
        customerName,
        orderId,
        amountTotal,
        customerEmail,
        shippingAddress
      }),
    })

    // Opcional: Enviar um e-mail de confirmação para o cliente
    // await resend.emails.send({ ... })

    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar e-mail de confirmação de pedido:', error)
    return { success: false, error: 'Falha ao enviar o e-mail.' }
  }
} 