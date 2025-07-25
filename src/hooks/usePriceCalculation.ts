import { useState, useEffect, useCallback, useRef } from 'react'
import { calculateSecurePrice } from '@/app/_actions/calculatePrice'
import { createStripeCheckout } from '@/app/_actions/createStripeCheckout'
import type { Selection, VALID_CANTONS } from '@/lib/schemas'

interface UsePriceCalculationProps {
  selections: Selection[]
  selectedCanton: string | null
  selectedDate: Date | undefined
}

export function usePriceCalculation({ selections, selectedCanton, selectedDate }: UsePriceCalculationProps) {
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateCalculatedPrice = useCallback(async () => {
    if (!selectedCanton || selections.length === 0) {
      setCalculatedPrice(0)
      return
    }

    // Verificar se todas as seleções têm selectionId
    const hasValidSelections = selections.every(s => 
      s.selectionId && 
      s.roomId && 
      typeof s.quantity === 'number'
    )

    if (!hasValidSelections) {
      setCalculatedPrice(0)
      return
    }

    setIsCalculating(true)
    try {
      const result = await calculateSecurePrice({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number]
      })
      
      if (result.success && typeof result.totalPrice === 'number' && result.totalPrice > 0) {
        setCalculatedPrice(result.totalPrice)
      } else {
        setCalculatedPrice(0)
      }
    } catch (error) {
      console.error('Error in price calculation:', error)
      setCalculatedPrice(0)
    } finally {
      setIsCalculating(false)
    }
  }, [selectedCanton, selections, selectedDate])

  // Debounced effect para evitar múltiplas chamadas
  useEffect(() => {
    // Clear timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set novo timeout para debounce
    timeoutRef.current = setTimeout(() => {
      updateCalculatedPrice()
    }, 1000) // 1000ms debounce para reduzir chamadas

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [updateCalculatedPrice])

  const handleSecureCheckout = useCallback(async () => {
    if (!selectedCanton || selections.length === 0 || !selectedDate) {
      alert('Sélectionnez un canton, au moins un espace et une date.')
      return
    }

    setIsProcessingCheckout(true)
    try {
      const result = await createStripeCheckout({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number],
        selectedDate: selectedDate as Date
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
  }, [selectedCanton, selections, selectedDate])

  return {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  }
} 