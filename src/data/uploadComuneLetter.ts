export default async function uploadComuneLetter(file: File) {
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload-comune-letter', {
      method: 'POST',
      body: form,
    })
    const json = await res.json()
    if (!json.success) throw new Error(json.error || 'Upload failed')
    return { success: true as const, path: json.path as string }
  } catch (error) {
    console.error('Erro ao fazer upload da carta de comune:', error)
    return { success: false as const, error: 'Falha no upload' }
  }
}


