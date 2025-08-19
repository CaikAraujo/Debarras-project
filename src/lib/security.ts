// Constantes de segurança para validação
export const SECURITY_CONSTANTS = {
  MAX_SELECTIONS: 10,
  MAX_TOTAL_PRICE: 50000,
  VALID_QUANTITIES: [5, 10, 15] as const,
  VALID_ROOMS: ['kitchen', 'living', 'bedroom', 'bathroom', 'office', 'garage', 'basement', 'garden'] as const,
  VALID_CANTONS: ['geneve', 'vaud', 'valais', 'fribourg', 'neuchatel', 'jura', 'berne'] as const,
  RATE_LIMIT_MAX: 1000,
  RATE_LIMIT_WINDOW: 60000, // 1 minuto em ms
} as const

// Funções de validação de segurança
export const SecurityValidators = {
  // Validar se uma string é um ID seguro
  isValidId: (id: unknown): id is string => {
    return typeof id === 'string' && id.length >= 10 && /^[a-zA-Z0-9\-_]+$/.test(id)
  },

  // Validar se um número é uma quantidade válida
  isValidQuantity: (quantity: unknown): quantity is 5 | 10 | 15 => {
    return typeof quantity === 'number' && SECURITY_CONSTANTS.VALID_QUANTITIES.includes(quantity as any)
  },

  // Validar se uma string é um roomId válido
  isValidRoomId: (roomId: unknown): roomId is typeof SECURITY_CONSTANTS.VALID_ROOMS[number] => {
    return typeof roomId === 'string' && SECURITY_CONSTANTS.VALID_ROOMS.includes(roomId as any)
  },

  // Validar se uma string é um cantonId válido
  isValidCantonId: (cantonId: unknown): cantonId is typeof SECURITY_CONSTANTS.VALID_CANTONS[number] => {
    return typeof cantonId === 'string' && SECURITY_CONSTANTS.VALID_CANTONS.includes(cantonId as any)
  },

  // Validar se um step é válido
  isValidStep: (step: unknown): step is number => {
    return typeof step === 'number' && step >= 0 && step <= 4
  },

  // Sanitizar string de entrada
  sanitizeString: (input: unknown): string => {
    if (typeof input !== 'string') return ''
    return input.trim().replace(/[<>]/g, '') // Remove caracteres potencialmente perigosos
  },

  // Validar email
  isValidEmail: (email: unknown): email is string => {
    if (typeof email !== 'string') return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

// Função para gerar ID único e seguro
export const generateSecureId = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 9)
  const cryptoRandom = Array.from(crypto.getRandomValues(new Uint8Array(4)))
    .map(b => b.toString(36))
    .join('')
  
  return `${timestamp}-${random}-${cryptoRandom}`
}
