import { useState, useEffect, useCallback } from 'react'
import { calculateSecurePrice } from '@/app/_actions/calculatePrice'
import { createStripeCheckout } from '@/app/_actions/createStripeCheckout'
import type { Selection, VALID_CANTONS } from '@/lib/schemas'

interface UsePriceCalculationProps {
  selections: Selection[]
  selectedCanton: string | null
}

export function usePriceCalculation({ selections, selectedCanton }: UsePriceCalculationProps) {
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false)

  const updateCalculatedPrice = useCallback(async () => {
    if (!selectedCanton || selections.length === 0) {
      setCalculatedPrice(0)
      return
    }

    setIsCalculating(true)
    try {
      const result = await calculateSecurePrice({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number]
      })
      setCalculatedPrice(result.success && result.totalPrice ? result.totalPrice : 0)
    } finally {
      setIsCalculating(false)
    }
  }, [selectedCanton, selections])

  useEffect(() => {
    updateCalculatedPrice()
  }, [updateCalculatedPrice])

  const handleSecureCheckout = useCallback(async () => {
    if (!selectedCanton || selections.length === 0) {
      alert('Sélectionnez un canton et au moins un espace.')
      return
    }

    setIsProcessingCheckout(true)
    try {
      const result = await createStripeCheckout({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number] 
      })
      if (result.success && result.checkoutUrl) {
        window.location.href = result.checkoutUrl
      } else {
        alert(`Erreur: ${result.error}`)
      }
    } catch {
      alert('Erreur inattendue. Réessayez.')
    } finally {
      setIsProcessingCheckout(false)
    }
  }, [selectedCanton, selections])

  return {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  }
} 