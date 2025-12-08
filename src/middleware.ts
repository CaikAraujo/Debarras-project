import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting em memória para Edge Runtime
// NOTA: Em serverless, cada instância tem sua própria memória
// Para rate limiting mais robusto em produção, use Vercel KV ou Upstash Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 100 // máximo de requests por IP por minuto
const MAX_MAP_SIZE = 10000 // Limite de entradas para evitar memory leak

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown'
  return `ratelimit:${ip}`
}

function cleanupOldEntries() {
  // Limpar entradas expiradas quando o mapa fica grande
  if (rateLimitMap.size > MAX_MAP_SIZE) {
    const now = Date.now()
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  
  // Limpar entradas antigas ocasionalmente
  cleanupOldEntries()
  
  const record = rateLimitMap.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 }
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }
  
  record.count++
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // 🔒 Rate limiting para APIs
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const key = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(key)
    
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    
    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Muitas requisições. Tente novamente em breve.' }),
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '60'
          } 
        }
      )
    }
  }

  // 🔒 Headers de Segurança
  
  // Previne clickjacking (site não pode ser carregado em iframes de outros domínios)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  
  // Previne MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Ativa proteção XSS do navegador
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Controla informações de referrer
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Permissions Policy (limita APIs do navegador)
  response.headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(self), payment=(self)'
  )

  // Content Security Policy
  // Usando Report-Only primeiro para testar sem quebrar nada
  // Depois de testar, mude para 'Content-Security-Policy' para bloquear de verdade
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://www.googletagmanager.com https://*.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://api.stripe.com https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://*.analytics.google.com",
    "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://checkout.stripe.com",
    "frame-ancestors 'self'"
  ]
  // 🔒 MODO SEGURO: Report-Only não bloqueia, só avisa no console do navegador
  // Após testar em produção por alguns dias sem erros, mude para 'Content-Security-Policy'
  response.headers.set('Content-Security-Policy-Report-Only', cspDirectives.join('; '))

  // Strict Transport Security (força HTTPS)
  // Apenas em produção
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security', 
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  return response
}

// Configurar em quais rotas o middleware será executado
export const config = {
  matcher: [
    // Aplicar a todas as rotas exceto arquivos estáticos
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
}

