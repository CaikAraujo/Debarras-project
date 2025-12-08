import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const BUCKET = 'uploads'
const FOLDER = 'comune_letters'
const MAX_SIZE_BYTES = 5 * 1024 * 1024

// Magic bytes para validação real do tipo de arquivo
const FILE_SIGNATURES = {
  'image/jpeg': [
    [0xFF, 0xD8, 0xFF, 0xE0],
    [0xFF, 0xD8, 0xFF, 0xE1],
    [0xFF, 0xD8, 0xFF, 0xE2],
    [0xFF, 0xD8, 0xFF, 0xE8],
    [0xFF, 0xD8, 0xFF, 0xDB],
  ],
  'image/png': [
    [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  ],
  'image/webp': [
    // RIFF....WEBP
    [0x52, 0x49, 0x46, 0x46],
  ],
} as const

// Extensões permitidas (whitelist estrita)
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp'])

function detectFileType(bytes: Uint8Array): string | null {
  // Verificar PNG (8 bytes)
  const pngSig = FILE_SIGNATURES['image/png'][0]
  if (bytes.length >= 8 && pngSig.every((b, i) => bytes[i] === b)) {
    return 'image/png'
  }

  // Verificar JPEG (4 bytes - múltiplas variantes)
  for (const sig of FILE_SIGNATURES['image/jpeg']) {
    if (bytes.length >= sig.length && sig.every((b, i) => bytes[i] === b)) {
      return 'image/jpeg'
    }
  }

  // Verificar WebP (RIFF + WEBP nos bytes 8-11)
  const riffSig = FILE_SIGNATURES['image/webp'][0]
  if (
    bytes.length >= 12 &&
    riffSig.every((b, i) => bytes[i] === b) &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return 'image/webp'
  }

  return null
}

function getExtensionFromMime(mime: string): string {
  switch (mime) {
    case 'image/jpeg': return 'jpg'
    case 'image/png': return 'png'
    case 'image/webp': return 'webp'
    default: return 'bin'
  }
}

function sanitizeFilename(original: string): string {
  // Remove caracteres perigosos e limita o tamanho
  return original
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 50)
}

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'Fichier manquant' }, { status: 400 })
    }

    // Validar extensão do nome original (primeira camada)
    const originalExt = file.name.split('.').pop()?.toLowerCase() || ''
    if (!ALLOWED_EXTENSIONS.has(originalExt)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Extension de fichier non autorisée. Utilisez : jpg, jpeg, png ou webp' 
      }, { status: 415 })
    }

    // Ler o conteúdo do arquivo
    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)

    // Validar tamanho
    if (bytes.byteLength > MAX_SIZE_BYTES) {
      return NextResponse.json({ success: false, error: 'Fichier trop volumineux (max 5 Mo)' }, { status: 413 })
    }

    if (bytes.byteLength < 8) {
      return NextResponse.json({ success: false, error: 'Fichier invalide ou corrompu' }, { status: 400 })
    }

    // 🔒 SEGURANÇA: Validar magic bytes - verifica o conteúdo REAL do arquivo
    const detectedType = detectFileType(bytes)
    if (!detectedType) {
      console.warn('[Security] Tentativa de upload com magic bytes inválidos:', {
        claimedType: file.type,
        originalName: sanitizeFilename(file.name),
        firstBytes: Array.from(bytes.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' ')
      })
      return NextResponse.json({ 
        success: false, 
        error: 'Type de fichier non reconnu. Envoyez une image valide (JPG, PNG ou WebP)' 
      }, { status: 415 })
    }

    // Usar a extensão baseada no tipo REAL detectado (não no que o usuário informou)
    const safeExtension = getExtensionFromMime(detectedType)
    
    // Gerar nome seguro com timestamp + random + extensão baseada no conteúdo real
    const timestamp = Date.now().toString(36)
    const random = crypto.randomUUID().slice(0, 8)
    const safeName = `${timestamp}_${random}.${safeExtension}`
    const path = `${FOLDER}/${safeName}`

    const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, bytes, {
      contentType: detectedType, // Usar o tipo DETECTADO, não o informado
      upsert: false,
    })
    
    if (error) throw error

    return NextResponse.json({ success: true, path })
  } catch (e) {
    console.error('Upload comune letter error:', e)
    return NextResponse.json({ success: false, error: 'Échec du téléchargement' }, { status: 500 })
  }
}



