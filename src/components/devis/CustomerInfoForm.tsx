'use client'

import { useState, useEffect } from 'react'

type CustomerInfo = {
  name: string
  email: string
  phone?: string
  address?: string
  notes?: string
}

interface Props {
  initial?: CustomerInfo
  onSubmit: (info: CustomerInfo) => void
  onBack: () => void
}

export default function CustomerInfoForm({ initial, onSubmit, onBack }: Props) {
  const [name, setName] = useState(initial?.name || '')
  const [email, setEmail] = useState(initial?.email || '')
  const [phone, setPhone] = useState(initial?.phone || '')
  const [address, setAddress] = useState(initial?.address || '')
  const [notes, setNotes] = useState(initial?.notes || '')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const ok = name.trim().length >= 2 && /.+@.+\..+/.test(email)
    setIsValid(ok)
  }, [name, email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit({ name: name.trim(), email: email.trim(), phone: phone?.trim() || undefined, address: address?.trim() || undefined, notes: notes?.trim() || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 px-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Votre nom" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="vous@email.com" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="+41 79 000 00 00" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Rue, numéro, ville" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" rows={4} placeholder="Informations supplémentaires" />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-md border hover:bg-gray-50">Retour</button>
        <button type="submit" disabled={!isValid} className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-50">Continuer</button>
      </div>
    </form>
  )
}



