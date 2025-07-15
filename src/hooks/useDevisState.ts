import { useState, useCallback } from 'react'
import type { Selection } from '@/lib/schemas'

export function useDevisState() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCanton, setSelectedCanton] = useState<string | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selections, setSelections] = useState<Selection[]>([])

  const selectCanton = useCallback((cantonId: string) => {
    setSelectedCanton(cantonId)
    setCurrentStep(1)
  }, [])

  const selectRoom = useCallback((roomId: string) => {
    if (!selectedCanton) return
    setSelectedRoom(roomId)
    setCurrentStep(2)
  }, [selectedCanton])

  const addSelection = useCallback((roomId: string, quantity: number) => {
    if (!selectedRoom) return
    
    const newSelection: Selection = { 
      roomId: selectedRoom as Selection['roomId'], 
      quantity 
    }
    
    setSelections(prev => {
      const existing = prev.findIndex(s => s.roomId === selectedRoom)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = newSelection
        return updated
      }
      return [...prev, newSelection]
    })
    
    setSelectedRoom(null)
    setCurrentStep(1)
  }, [selectedRoom])

  const removeSelection = useCallback((roomId: string) => {
    setSelections(prev => prev.filter(s => s.roomId !== roomId))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const resetAll = useCallback(() => {
    setSelectedCanton(null)
    setSelections([])
    setSelectedRoom(null)
    setCurrentStep(0)
  }, [])

  const resetToRooms = useCallback(() => {
    setSelectedRoom(null)
    setCurrentStep(1)
  }, [])

  return {
    currentStep,
    selectedCanton,
    selectedRoom,
    selections,
    selectCanton,
    selectRoom,
    addSelection,
    removeSelection,
    goToStep,
    resetAll,
    resetToRooms
  }
} 