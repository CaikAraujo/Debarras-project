'use client'

import { useState, useEffect } from 'react'
import useI18n from '@/components/i18n/useI18n'

type CustomerInfo = {
  name: string
  email: string
  phone: string
  address: string
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
  const { t } = useI18n()

  useEffect(() => {
    const emailOk = /.+@.+\..+/.test(email)
    const nameOk = name.trim().length >= 2
    const phoneOk = phone.trim().length >= 6
    const addressOk = address.trim().length >= 5
    setIsValid(nameOk && emailOk && phoneOk && addressOk)
  }, [name, email, phone, address])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit({ 
      name: name.trim(), 
      email: email.trim(), 
      phone: phone.trim(), 
      address: address.trim(), 
      notes: notes?.trim() || undefined 
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 px-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.devis.customer.name}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t.devis.customer.namePh} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.devis.customer.email}</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t.devis.customer.emailPh} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.devis.customer.phone}</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t.devis.customer.phonePh} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.devis.customer.address}</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={t.devis.customer.addressPh} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.devis.customer.notes}</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500" rows={4} placeholder={t.devis.customer.notesPh} />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-md border hover:bg-gray-50">{t.devis.customer.back}</button>
        <button type="submit" disabled={!isValid} className="px-4 py-2 rounded-md bg-red-600 text-white disabled:opacity-50">{t.devis.customer.continue}</button>
      </div>
    </form>
  )
}



