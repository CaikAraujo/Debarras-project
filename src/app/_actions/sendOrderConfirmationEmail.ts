'use server'

import { Resend } from 'resend'
import React from 'react'
import OrderConfirmationEmail from '@/emails/OrderConfirmationEmail'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabaseAdmin'


interface EmailPayload {
  customerName: string
  customerEmail: string
  orderId: string
  amountTotal: number
  shippingAddress: Stripe.Address | null
  comuneLetterUrl?: string
  customerPhone?: string
  customerAddress?: string
  customerNotes?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(payload: EmailPayload) {
  const { customerName, customerEmail, orderId, amountTotal, shippingAddress, comuneLetterUrl, customerPhone, customerAddress, customerNotes } = payload


  try {
    let attachments: { filename: string; content: string }[] | undefined
    if (comuneLetterUrl) {
      try {
        if (comuneLetterUrl.startsWith('http')) {
          const res = await fetch(comuneLetterUrl)
          const arrayBuf = await res.arrayBuffer()
          const base64 = Buffer.from(arrayBuf).toString('base64')
          const ext = comuneLetterUrl.split('.').pop()?.split('?')[0] || 'png'
          attachments = [{ filename: `lettre-commune.${ext}`, content: base64 }]
        } else {
          const path = comuneLetterUrl
          const { data, error } = await supabaseAdmin.storage.from('uploads').download(path)
          if (error) throw error
          const arrayBuf = await data.arrayBuffer()
          const base64 = Buffer.from(arrayBuf).toString('base64')
          const ext = path.split('.').pop() || 'png'
          attachments = [{ filename: `lettre-commune.${ext}`, content: base64 }]
        }
      } catch (e) {
        console.error('Falha ao obter a carta de comune para anexo:', e)
      }
    }

    // Envia o e-mail para o dono do negócio
    const sendResult = await resend.emails.send({
      from: 'Confirmation de Commande <info@suisse-debarras.ch>',
      to: ['suissedebarras00@gmail.com'], // Seu e-mail
      subject: `Nouvelle commande confirmée de ${customerName} !`,
      react: React.createElement(OrderConfirmationEmail, {
        customerName,
        orderId,
        amountTotal,
        customerEmail,
        shippingAddress,
        customerPhone,
        customerAddress,
        customerNotes,
      }),
      attachments,
    })
    // Opcional: inspecione sendResult no dashboard do Resend, não logamos em prod

    // Opcional: Enviar um e-mail de confirmação para o cliente
    // await resend.emails.send({ ... })

    return { success: true }
  } catch (error) {
    console.error('[Email] Erro ao enviar e-mail de confirmação de pedido:', error)
    return { success: false, error: 'Falha ao enviar o e-mail.' }
  }
} 