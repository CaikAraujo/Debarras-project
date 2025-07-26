import { Suspense } from 'react'
import DevisPageClient from './DevisPageClient'

export default function DevisPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DevisPageClient />
    </Suspense>
  )
} 