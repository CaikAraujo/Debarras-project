import { useState, useEffect, useCallback, useRef } from 'react'
import { calculateSecurePrice } from '@/app/_actions/calculatePrice'
import { createStripeCheckout } from '@/app/_actions/createStripeCheckout'
import type { Selection, VALID_CANTONS } from '@/lib/schemas'
import { SecurityValidators, SECURITY_CONSTANTS } from '@/lib/security'

interface UsePriceCalculationProps {
  selections: Selection[]
  selectedCanton: string | null
  selectedDate: Date | undefined
  hasComuneLetter?: boolean
  customerInfo?: { name: string; email: string; phone: string; address: string; notes?: string } | null
}

export function usePriceCalculation({ selections, selectedCanton, selectedDate, hasComuneLetter, customerInfo }: UsePriceCalculationProps) {
  
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

    // Validação adicional: verificar se as quantidades são válidas
    const hasValidQuantities = selections.every(s => 
      SecurityValidators.isValidQuantity(s.quantity)
    )

    if (!hasValidQuantities) {
      console.error('Quantidades inválidas detectadas')
      setCalculatedPrice(0)
      return
    }

    // Validação adicional: verificar se os roomIds são válidos
    const hasValidRoomIds = selections.every(s => 
      SecurityValidators.isValidRoomId(s.roomId)
    )

    if (!hasValidRoomIds) {
      console.error('RoomIds inválidos detectados')
      setCalculatedPrice(0)
      return
    }

    // Validação adicional: verificar se não excede o limite máximo de seleções
    if (selections.length > SECURITY_CONSTANTS.MAX_SELECTIONS) {
      console.error('Número máximo de seleções excedido')
      setCalculatedPrice(0)
      return
    }

    setIsCalculating(true)
    try {
      const result = await calculateSecurePrice({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number],
        selectedDate,
        hasComuneLetter
      })
      
      if (result.success && typeof result.totalPrice === 'number' && result.totalPrice > 0) {
        // Validação adicional: verificar se o preço não excede o limite máximo
        if (result.totalPrice > SECURITY_CONSTANTS.MAX_TOTAL_PRICE) {
          console.error('Preço total excede o limite máximo')
          setCalculatedPrice(0)
          return
        }
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
  }, [selectedCanton, selections, selectedDate, hasComuneLetter])

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

    // Garantir dados obrigatórios do cliente antes de prosseguir
    if (!customerInfo || !customerInfo.email || !customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Veuillez renseigner nom, e-mail, téléphone et adresse avant de continuer.')
      return
    }

    setIsProcessingCheckout(true)
    try {
      const result = await createStripeCheckout({ 
        selections, 
        cantonId: selectedCanton as typeof VALID_CANTONS[number],
        selectedDate: selectedDate as Date,
        hasComuneLetter,
        customerEmail: customerInfo.email,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerAddress: customerInfo.address,
        customerNotes: customerInfo.notes ?? '',
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
  }, [selectedCanton, selections, selectedDate, hasComuneLetter, customerInfo])

  return {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  }
} 