'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { validateStripePayment } from '@/app/_actions/createStripeCheckout'
import NavSwiss from '@/components/sections/NavSwiss'
import FooterSwiss from '@/components/sections/FooterSwiss'

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  
  const [status, setStatus] = useState('validating')
  const [message, setMessage] = useState('Finalisation de votre commande...')
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setMessage("ID de session manquant.")
      return
    }

    // Apenas para mostrar o ID do pedido ao cliente.
    // A lógica de negócio está no webhook.
    setOrderId(sessionId)
    setStatus('success')
    setMessage('Paiement réussi ! Votre commande est en cours de traitement.')

    // Iniciar o redirecionamento
    setTimeout(() => {
      router.push('/')
    }, 4000) // Aumentado para 4s para dar tempo de ler a mensagem

  }, [sessionId, router])

  return (
    <section className="section-swiss bg-white flex-grow flex items-center justify-center">
      <div className="container-swiss text-center max-w-2xl">
        {status === 'validating' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-6"></div>
            <h1 className="text-2xl font-semibold text-primary">{message}</h1>
            <p className="text-secondary mt-2">Veuillez patienter, nous finalisons votre réservation.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">{message}</h1>
            <p className="text-secondary text-lg mb-2">
              Vous recevrez un e-mail de confirmation d&apos;ici quelques instants.
            </p>
            {orderId && (
              <p className="text-sm text-gray-500 mb-6">Référence de la commande : {orderId}</p>
            )}
            <p className="text-secondary">
              Vous allez être redirigé vers la page d&apos;accueil dans 4 secondes...
            </p>
          </>
        )}
        {status === 'error' && (
           <>
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              !
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">Erreur de Paiement</h1>
            <p className="text-secondary text-lg">{message}</p>
          </>
        )}
      </div>
    </section>
  )
}

export default function SuccessPage() {
  return (
    <div style={{ background: 'var(--background)' }} className="min-h-screen flex flex-col">
      <NavSwiss />
      <Suspense fallback={
        <section className="section-swiss flex-grow flex items-center justify-center">
          <div className="container-swiss text-center">
            <h1 className="text-2xl font-semibold text-primary">Chargement...</h1>
          </div>
        </section>
      }>
        <SuccessContent />
      </Suspense>
      <FooterSwiss />
    </div>
  )
} 