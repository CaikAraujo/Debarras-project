'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import React from 'react' // Importa o React

// Importa o nosso novo componente de e-mail
import ContactFormEmail from '@/emails/ContactFormEmail'

const sendEmailSchema = z.object({
  name: z.string().min(2, { message: 'Le nom est requis.' }),
  senderEmail: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    senderEmail: formData.get('senderEmail'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
  }

  const parsed = sendEmailSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, senderEmail, phone, service, message } = parsed.data

  try {
    // Agora enviamos um componente React em vez de texto
    const { data, error } = await resend.emails.send({
      from: 'Demande de Devis <info@suisse-debarras.ch>',
      to: ['pablo.farina28@outlook.com'],
      subject: `Nouvelle demande de ${name} pour un service de ${service || 'débarras'}`,
      replyTo: [senderEmail],
      
      react: React.createElement(ContactFormEmail, {
        name,
        senderEmail,
        phone,
        service,
        message,
      }),
    })

    return { success: true, data }
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    return { success: false, error: 'Falha ao enviar o e-mail.' }
  }
}