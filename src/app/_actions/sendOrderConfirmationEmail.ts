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
  customerFloor?: string
  customerDoorCode?: string
}

const resend = new Resend(process.env.RESEND_API_KEY)

// 🔒 SEGURANÇA: Lista de domínios permitidos para download de arquivos (evita SSRF)
const ALLOWED_EXTERNAL_DOMAINS = new Set<string>([
  // Adicione aqui domínios confiáveis se necessário
  // Por segurança, preferimos usar apenas storage interno
])

// 🔒 SEGURANÇA: Validar se o path é seguro (evita path traversal)
function isValidStoragePath(path: string): boolean {
  // Deve começar com o folder esperado e não conter path traversal
  const normalized = path.replace(/\\/g, '/')
  if (normalized.includes('..') || normalized.includes('//')) return false
  if (!normalized.startsWith('comune_letters/')) return false
  // Deve ter apenas caracteres seguros
  if (!/^[a-zA-Z0-9_\-./]+$/.test(normalized)) return false
  return true
}

// 🔒 SEGURANÇA: Validar URL externa (proteção contra SSRF)
function isAllowedExternalUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    
    // Bloquear protocolos perigosos
    if (!['http:', 'https:'].includes(url.protocol)) return false
    
    // Bloquear IPs internos e localhost
    const hostname = url.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal') ||
      hostname === '[::1]' ||
      // AWS metadata endpoint
      hostname === '169.254.169.254' ||
      // Google Cloud metadata
      hostname === 'metadata.google.internal'
    ) {
      console.warn('[Security] Tentativa de SSRF bloqueada:', urlString)
      return false
    }
    
    // Verificar se o domínio está na whitelist
    if (!ALLOWED_EXTERNAL_DOMAINS.has(hostname)) {
      console.warn('[Security] Domínio externo não permitido:', hostname)
      return false
    }
    
    return true
  } catch {
    return false
  }
}

export async function sendOrderConfirmationEmail(payload: EmailPayload) {
  const { customerName, customerEmail, orderId, amountTotal, shippingAddress, comuneLetterUrl, customerPhone, customerAddress, customerNotes, customerFloor, customerDoorCode } = payload


  try {
    let attachments: { filename: string; content: string }[] | undefined
    if (comuneLetterUrl) {
      try {
        if (comuneLetterUrl.startsWith('http')) {
          // 🔒 SEGURANÇA: Validar URL externa para prevenir SSRF
          if (!isAllowedExternalUrl(comuneLetterUrl)) {
            console.warn('[Security] URL externa bloqueada por política de segurança')
            // Não anexamos arquivo de URLs não confiáveis, mas continuamos o envio do email
          } else {
            const res = await fetch(comuneLetterUrl, {
              signal: AbortSignal.timeout(10000), // Timeout de 10s
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const arrayBuf = await res.arrayBuffer()
            // Limitar tamanho do anexo (5MB)
            if (arrayBuf.byteLength > 5 * 1024 * 1024) {
              throw new Error('Anexo muito grande')
            }
            const base64 = Buffer.from(arrayBuf).toString('base64')
            const ext = comuneLetterUrl.split('.').pop()?.split('?')[0] || 'png'
            const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'png'
            attachments = [{ filename: `lettre-commune.${safeExt}`, content: base64 }]
          }
        } else {
          // 🔒 SEGURANÇA: Validar path interno para prevenir path traversal
          if (!isValidStoragePath(comuneLetterUrl)) {
            console.warn('[Security] Path de storage inválido:', comuneLetterUrl)
          } else {
            const path = comuneLetterUrl
            const { data, error } = await supabaseAdmin.storage.from('uploads').download(path)
            if (error) throw error
            const arrayBuf = await data.arrayBuffer()
            const base64 = Buffer.from(arrayBuf).toString('base64')
            const ext = path.split('.').pop() || 'png'
            const safeExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext) ? ext : 'png'
            attachments = [{ filename: `lettre-commune.${safeExt}`, content: base64 }]
          }
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
        customerFloor,
        customerDoorCode,
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