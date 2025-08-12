import { useState, useCallback } from 'react'
import type { Selection } from '@/lib/schemas'
import { cantons } from '@/data/devisData'

export function useDevisState() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCanton, setSelectedCanton] = useState<string | null>(null)
  const [selections, setSelections] = useState<Selection[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  // Função para calcular o preço total incluindo o valor base do cantão
  const calculateTotalPrice = useCallback(() => {
    if (!selectedCanton) return 0
    
    const canton = cantons.find(c => c.id === selectedCanton)
    if (!canton) return 0
    
    let total = canton.basePrice // Começa com o valor base do cantão
    
    // Adiciona o preço de cada seleção
    selections.forEach(selection => {
      const quantityConfig = { 5: 150, 10: 280, 15: 400 }[selection.quantity]
      if (quantityConfig) {
        total += Math.round(quantityConfig * 0.5)
      }
    })
    
    return total
  }, [selectedCanton, selections])

  const selectCanton = useCallback((cantonId: string) => {
    setSelectedCanton(cantonId)
    setCurrentStep(1)
  }, [])

  const selectDate = useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    setCurrentStep(4) // Go to final summary
  }, [])

  const addSelection = useCallback((selection: Omit<Selection, 'selectionId'>) => {
    setSelections(prev => {
      // Para quartos, sempre adiciona nova instância
      if (selection.roomId === 'bedroom') {
        const bedroomCount = prev.filter(s => s.roomId === 'bedroom').length
        const newSelection: Selection = {
          ...selection,
          selectionId: `bedroom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          roomNumber: bedroomCount + 1
        }
        return [...prev, newSelection]
      } else {
        // Para outros cômodos, substitui se já existe
        const existingIndex = prev.findIndex(s => s.roomId === selection.roomId)
        const newSelection: Selection = {
          ...selection,
          selectionId: `${selection.roomId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        }
        
        if (existingIndex > -1) {
          const newSelections = [...prev]
          newSelections[existingIndex] = newSelection
          return newSelections
        } else {
          return [...prev, newSelection]
        }
      }
    })
  }, [])

  const removeSelection = useCallback((selectionId: string) => {
    setSelections(prev => {
      const newSelections = prev.filter(s => s.selectionId !== selectionId)
      
      // Renumerar quartos após remoção
      const bedrooms = newSelections.filter(s => s.roomId === 'bedroom')
      const otherRooms = newSelections.filter(s => s.roomId !== 'bedroom')
      
      const renumberedBedrooms = bedrooms.map((bedroom, index) => ({
        ...bedroom,
        roomNumber: index + 1
      }))
      
      return [...otherRooms, ...renumberedBedrooms]
    })
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const resetAll = useCallback(() => {
    setSelectedCanton(null)
    setSelections([])
    setCurrentStep(0)
  }, [])

  // Função auxiliar para verificar se um cômodo não-quarto já foi selecionado
  const isRoomSelected = useCallback((roomId: Selection['roomId']) => {
    if (roomId === 'bedroom') return false // Quartos sempre podem ser adicionados
    return selections.some(s => s.roomId === roomId)
  }, [selections])

  // Função para obter o número de quartos selecionados
  const getBedroomCount = useCallback(() => {
    return selections.filter(s => s.roomId === 'bedroom').length
  }, [selections])

  // Função para obter o valor base do cantão selecionado
  const getCantonBasePrice = useCallback(() => {
    if (!selectedCanton) return 0
    const canton = cantons.find(c => c.id === selectedCanton)
    return canton?.basePrice || 0
  }, [selectedCanton])

  return {
    currentStep,
    selectedCanton,
    selections,
    selectCanton,
    addSelection,
    removeSelection,
    goToStep,
    resetAll,
    selectedDate,
    selectDate,
    isRoomSelected,
    getBedroomCount,
    calculateTotalPrice,
    getCantonBasePrice
  }
} 