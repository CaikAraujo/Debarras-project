// Constantes de segurança para validação
export const SECURITY_CONSTANTS = {
  MAX_SELECTIONS: 10,
  MAX_TOTAL_PRICE: 50000,
  VALID_QUANTITIES: [5, 10, 15] as const,
  VALID_ROOMS: ['kitchen', 'living', 'bedroom', 'bathroom', 'office', 'garage', 'basement', 'garden'] as const,
  VALID_CANTONS: ['geneve', 'vaud', 'valais', 'fribourg', 'neuchatel', 'jura', 'berne'] as const,
  // Rate limiting agora é gerenciado no middleware (src/middleware.ts)
  RATE_LIMIT_MAX: 100,
  RATE_LIMIT_WINDOW: 60000, // 1 minuto em ms
  // Limites de tamanho para inputs
  MAX_STRING_LENGTH: 500,
  MAX_NAME_LENGTH: 100,
  MAX_ADDRESS_LENGTH: 300,
  MAX_NOTES_LENGTH: 1000,
} as const

// Caracteres perigosos para diferentes contextos
const DANGEROUS_HTML_CHARS = /[<>"'`]/g
const DANGEROUS_SQL_PATTERNS = /('|--|;|\/\*|\*\/|xp_|sp_|exec\s|execute\s|union\s|select\s|insert\s|update\s|delete\s|drop\s|create\s|alter\s)/gi
const DANGEROUS_PATH_PATTERNS = /(\.\.|\/\/|\\\\|%2e%2e|%252e)/gi

// Funções de validação de segurança
export const SecurityValidators = {
  // Validar se uma string é um ID seguro
  isValidId: (id: unknown): id is string => {
    if (typeof id !== 'string') return false
    if (id.length < 10 || id.length > 100) return false
    return /^[a-zA-Z0-9\-_]+$/.test(id)
  },

  // Validar se um número é uma quantidade válida
  isValidQuantity: (quantity: unknown): quantity is 5 | 10 | 15 => {
    return typeof quantity === 'number' && SECURITY_CONSTANTS.VALID_QUANTITIES.includes(quantity as 5 | 10 | 15)
  },

  // Validar se uma string é um roomId válido
  isValidRoomId: (roomId: unknown): roomId is typeof SECURITY_CONSTANTS.VALID_ROOMS[number] => {
    return typeof roomId === 'string' && SECURITY_CONSTANTS.VALID_ROOMS.includes(roomId as typeof SECURITY_CONSTANTS.VALID_ROOMS[number])
  },

  // Validar se uma string é um cantonId válido
  isValidCantonId: (cantonId: unknown): cantonId is typeof SECURITY_CONSTANTS.VALID_CANTONS[number] => {
    return typeof cantonId === 'string' && SECURITY_CONSTANTS.VALID_CANTONS.includes(cantonId as typeof SECURITY_CONSTANTS.VALID_CANTONS[number])
  },

  // Validar se um step é válido
  isValidStep: (step: unknown): step is number => {
    return typeof step === 'number' && Number.isInteger(step) && step >= 0 && step <= 4
  },

  // 🔒 Sanitizar string de entrada - proteção contra XSS
  sanitizeString: (input: unknown, maxLength: number = SECURITY_CONSTANTS.MAX_STRING_LENGTH): string => {
    if (typeof input !== 'string') return ''
    
    let sanitized = input
      .trim()
      // Limitar tamanho
      .slice(0, maxLength)
      // Remover caracteres de controle (exceto espaço, tab, newline)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Escapar caracteres HTML perigosos
      .replace(DANGEROUS_HTML_CHARS, (char) => {
        const escapeMap: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '`': '&#x60;',
        }
        return escapeMap[char] || char
      })
    
    return sanitized
  },

  // 🔒 Sanitizar para contexto de nome (mais restritivo)
  sanitizeName: (input: unknown): string => {
    if (typeof input !== 'string') return ''
    return input
      .trim()
      .slice(0, SECURITY_CONSTANTS.MAX_NAME_LENGTH)
      // Permite apenas letras, espaços, hífens e apóstrofes
      .replace(/[^a-zA-ZÀ-ÿ\s\-']/g, '')
  },

  // 🔒 Sanitizar para uso em paths/URLs
  sanitizePath: (input: unknown): string => {
    if (typeof input !== 'string') return ''
    return input
      .trim()
      .replace(DANGEROUS_PATH_PATTERNS, '')
      .replace(/[^a-zA-Z0-9_\-./]/g, '')
  },

  // 🔒 Detectar tentativa de SQL injection
  hasSqlInjection: (input: unknown): boolean => {
    if (typeof input !== 'string') return false
    return DANGEROUS_SQL_PATTERNS.test(input)
  },

  // 🔒 Validar email (mais robusto)
  isValidEmail: (email: unknown): email is string => {
    if (typeof email !== 'string') return false
    if (email.length > 254) return false // RFC 5321
    // Regex mais completa para validação de email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return emailRegex.test(email)
  },

  // 🔒 Validar telefone
  isValidPhone: (phone: unknown): phone is string => {
    if (typeof phone !== 'string') return false
    // Remove espaços e caracteres de formatação para validar
    const cleaned = phone.replace(/[\s\-\(\)\+\.]/g, '')
    // Deve ter entre 6 e 15 dígitos
    return /^\d{6,15}$/.test(cleaned)
  },

  // 🔒 Validar URL segura
  isValidUrl: (url: unknown): url is string => {
    if (typeof url !== 'string') return false
    try {
      const parsed = new URL(url)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  },

  // 🔒 Verificar se o input é seguro para uso geral
  isSafeInput: (input: unknown): boolean => {
    if (typeof input !== 'string') return true
    // Verificar padrões perigosos
    if (DANGEROUS_SQL_PATTERNS.test(input)) return false
    if (DANGEROUS_PATH_PATTERNS.test(input)) return false
    // Verificar por possíveis tentativas de XSS via eventos JavaScript
    if (/on\w+\s*=/i.test(input)) return false
    if (/javascript:/i.test(input)) return false
    if (/data:/i.test(input)) return false
    return true
  }
}

// Função para gerar ID único e seguro
export const generateSecureId = (): string => {
  const timestamp = Date.now().toString(36)
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
  
  return `${timestamp}-${random}`
}

// 🔒 Log de tentativas suspeitas (para monitoramento)
export const logSecurityEvent = (event: {
  type: 'sql_injection' | 'xss_attempt' | 'path_traversal' | 'rate_limit' | 'invalid_input'
  input?: string
  ip?: string
  endpoint?: string
}) => {
  // Em produção, envie para um serviço de logging/monitoramento
  console.warn('[SECURITY EVENT]', {
    ...event,
    timestamp: new Date().toISOString(),
    // Truncar input para não logar dados sensíveis extensos
    input: event.input?.slice(0, 100)
  })
}
