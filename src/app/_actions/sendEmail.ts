'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import React from 'react'

import ContactFormEmail from '@/emails/ContactFormEmail'
import { SecurityValidators, logSecurityEvent, SECURITY_CONSTANTS, hasCommandInjection } from '@/lib/security'

// 🔒 Schema de validação com limites de tamanho
const sendEmailSchema = z.object({
  name: z.string()
    .min(2, { message: 'Le nom est requis.' })
    .max(SECURITY_CONSTANTS.MAX_NAME_LENGTH, { message: 'Nom trop long.' }),
  senderEmail: z.string()
    .email({ message: 'Veuillez saisir une adresse e-mail valide.' })
    .max(254, { message: 'Email trop long.' }),
  phone: z.string()
    .max(20, { message: 'Numéro trop long.' })
    .optional(),
  service: z.string()
    .max(100, { message: 'Service trop long.' })
    .optional(),
  message: z.string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères.' })
    .max(SECURITY_CONSTANTS.MAX_NOTES_LENGTH, { message: 'Message trop long (max 1000 caractères).' }),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(formData: FormData) {
  // 🔒 Extrair e validar dados brutos
  const rawData = {
    name: formData.get('name'),
    senderEmail: formData.get('senderEmail'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    message: formData.get('message'),
  }

  // 🔒 Verificar tentativas de injeção antes do parse
  const allInputs = Object.values(rawData).filter(v => typeof v === 'string') as string[]
  for (const input of allInputs) {
    // Detectar command injection (curl, bash, etc.)
    if (hasCommandInjection(input)) {
      logSecurityEvent({
        type: 'command_injection',
        input,
        endpoint: '/contact'
      })
      return {
        success: false,
        error: 'Entrée invalide détectée.',
      }
    }
    
    // Detectar XSS e SQL injection
    if (!SecurityValidators.isSafeInput(input)) {
      logSecurityEvent({
        type: 'xss_attempt',
        input,
        endpoint: '/contact'
      })
      return {
        success: false,
        error: 'Entrée invalide détectée.',
      }
    }
  }

  const parsed = sendEmailSchema.safeParse(rawData)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    }
  }

  // 🔒 Sanitizar todos os campos após validação
  const name = SecurityValidators.sanitizeName(parsed.data.name) || parsed.data.name.trim()
  const senderEmail = parsed.data.senderEmail.trim().toLowerCase()
  const phone = parsed.data.phone ? SecurityValidators.sanitizeString(parsed.data.phone, 20) : undefined
  const service = parsed.data.service ? SecurityValidators.sanitizeString(parsed.data.service, 100) : undefined
  const message = SecurityValidators.sanitizeString(parsed.data.message, SECURITY_CONSTANTS.MAX_NOTES_LENGTH)

  // 🔒 Validação adicional de email
  if (!SecurityValidators.isValidEmail(senderEmail)) {
    return {
      success: false,
      error: { senderEmail: ['Adresse e-mail invalide'] },
    }
  }

  try {
    const { data } = await resend.emails.send({
      from: 'Demande de Devis <info@suisse-debarras.ch>',
      to: ['suissedebarras00@gmail.com'],
      // 🔒 Sanitizar valores usados no subject
      subject: `Nouvelle demande de ${name.slice(0, 50)} pour un service de ${(service || 'débarras').slice(0, 50)}`,
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
    return { success: false, error: 'Échec de l\'envoi de l\'e-mail.' }
  }
}