import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const BUCKET = 'uploads'
const FOLDER = 'comune_letters'
const MAX_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ success: false, error: 'Arquivo ausente' }, { status: 400 })

    // Validações de segurança
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, error: 'Tipo de arquivo não permitido' }, { status: 415 })
    }
    // Alguns ambientes não preenchem size; se faltar, leia o buffer e cheque o length
    let bytes = new Uint8Array()
    if (typeof (file as any).size === 'number') {
      if ((file as any).size > MAX_SIZE_BYTES) {
        return NextResponse.json({ success: false, error: 'Arquivo muito grande (máx 5MB)' }, { status: 413 })
      }
      const arrayBuffer = await file.arrayBuffer()
      bytes = new Uint8Array(arrayBuffer)
    } else {
      const arrayBuffer = await file.arrayBuffer()
      bytes = new Uint8Array(arrayBuffer)
      if (bytes.byteLength > MAX_SIZE_BYTES) {
        return NextResponse.json({ success: false, error: 'Arquivo muito grande (máx 5MB)' }, { status: 413 })
      }
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
    const name = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const path = `${FOLDER}/${name}`

    const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, bytes, {
      contentType: file.type || 'image/png',
      upsert: false,
    })
    if (error) throw error

    return NextResponse.json({ success: true, path })
  } catch (e) {
    console.error('Upload comune letter error:', e)
    return NextResponse.json({ success: false, error: 'Falha no upload' }, { status: 500 })
  }
}



