import { useState, useCallback } from 'react'
import type { Selection } from '@/lib/schemas'
import { SelectionSchema } from '@/lib/schemas'
import { cantons } from '@/data/devisData'
import { SecurityValidators, generateSecureId } from '@/lib/security'

export function useDevisState() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCanton, setSelectedCanton] = useState<string | null>(null)
  const [selections, setSelections] = useState<Selection[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const selectCanton = useCallback((cantonId: string) => {
    // Validar se o cantão é válido usando o validador de segurança
    if (!SecurityValidators.isValidCantonId(cantonId)) {
      console.error('Cantão inválido:', cantonId)
      return
    }
    setSelectedCanton(cantonId)
    setCurrentStep(1)
  }, [])

  const selectDate = useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    setCurrentStep(4) // Go to final summary
  }, [])

  const addSelection = useCallback((selection: Omit<Selection, 'selectionId'>) => {
    try {
      // Validar a seleção antes de adicionar
      const validatedSelection = SelectionSchema.omit({ selectionId: true }).parse(selection)
      
      // Validação adicional usando os validadores de segurança
      if (!SecurityValidators.isValidRoomId(validatedSelection.roomId)) {
        console.error('RoomId inválido:', validatedSelection.roomId)
        return
      }
      
      if (!SecurityValidators.isValidQuantity(validatedSelection.quantity)) {
        console.error('Quantidade inválida:', validatedSelection.quantity)
        return
      }
      
      setSelections(prev => {
        // Para quartos, sempre adiciona nova instância
        if (validatedSelection.roomId === 'bedroom') {
          const bedroomCount = prev.filter(s => s.roomId === 'bedroom').length
          const newSelection: Selection = {
            ...validatedSelection,
            selectionId: generateSecureId(),
            roomNumber: bedroomCount + 1
          }
          return [...prev, newSelection]
        } else {
          // Para outros cômodos, substitui se já existe
          const existingIndex = prev.findIndex(s => s.roomId === validatedSelection.roomId)
          const newSelection: Selection = {
            ...validatedSelection,
            selectionId: generateSecureId()
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
    } catch (error) {
      console.error('Erro ao validar seleção:', error)
      // Não adiciona seleção inválida
    }
  }, [])

  const removeSelection = useCallback((selectionId: string) => {
    // Validar se o ID é válido usando o validador de segurança
    if (!SecurityValidators.isValidId(selectionId)) {
      console.error('ID de seleção inválido:', selectionId)
      return
    }

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
    // Validar se o step é válido usando o validador de segurança
    if (!SecurityValidators.isValidStep(step)) {
      console.error('Step inválido:', step)
      return
    }
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
    getCantonBasePrice
  }
} 