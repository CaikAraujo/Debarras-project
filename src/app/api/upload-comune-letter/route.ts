import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const BUCKET = 'uploads'
const FOLDER = 'comune_letters'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ success: false, error: 'Arquivo ausente' }, { status: 400 })

    // Garantir bucket
    await supabaseAdmin.storage.createBucket(BUCKET, { public: false }).catch(() => {})

    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
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



