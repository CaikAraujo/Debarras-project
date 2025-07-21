'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDevisState } from '@/hooks/useDevisState'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import ProgressStepper from '@/components/devis/ProgressStepper'
import CantonSelector from '@/components/devis/CantonSelector'
import RoomSelector from '@/components/devis/RoomSelector'
import QuantitySelector from '@/components/devis/QuantitySelector'
import OrderSummary from '@/components/devis/OrderSummary'
import SelectionsSummary from '@/components/devis/SelectionsSummary'
import AddRoomModal from '@/components/devis/AddRoomModal'
import DateSelector from '@/components/devis/DateSelector'

export default function DevisSwiss() {
  const searchParams = useSearchParams();
  const {
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
    resetToRooms,
    selectedDate,
    selectDate,
    isRoomSelected,
    getBedroomCount
  } = useDevisState()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const stepContentRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  // Selecionar automaticamente o cantão se vier via URL
  useEffect(() => {
    const cantonParam = searchParams.get('canton');
    if (cantonParam && !selectedCanton) {
      selectCanton(cantonParam);
    }
  }, [searchParams, selectedCanton, selectCanton]);

  useEffect(() => {
    if (currentStep >= 3 && selections.length === 0) {
      goToStep(1)
    }
  }, [selections, currentStep, goToStep])

  // Scroll to top of step content when step changes
  useEffect(() => {
    stepContentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [currentStep])
  
  // Scroll to summary when it first appears
  useEffect(() => {
    if (selections.length === 1 && currentStep === 1) {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [selections, currentStep])

  const {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  } = usePriceCalculation({ selections, selectedCanton })

  const handleQuantitySelect = (quantity: number) => {
    if (selectedRoom) {
      addSelection({ 
        roomId: selectedRoom, 
        quantity,
        roomNumber: selectedRoom === 'bedroom' ? getBedroomCount() + 1 : undefined
      })
    }
  }

  return (
    <section className="section-swiss bg-white">
      <div className="container-swiss">
        <div className="max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-primary mb-4">Calculateur de Devis Personnalisé</h1>
            <p className="text-secondary text-lg">
              Sélectionnez les pièces de votre logement et le nombre d&apos;objets à débarrasser pour obtenir votre devis instantané.
            </p>
          </div>

          <ProgressStepper currentStep={currentStep} />

          <div ref={stepContentRef}>
            {currentStep === 0 && (
              <CantonSelector onSelectCanton={selectCanton} />
            )}

            {currentStep === 1 && selectedCanton && (
              <>
                <RoomSelector 
                  onSelectRoom={selectRoom} 
                  selections={selections} 
                  isRoomSelected={isRoomSelected}
                  getBedroomCount={getBedroomCount}
                />
                {selections.length > 0 && (
                  <div ref={summaryRef}>
                    <SelectionsSummary
                      selectedCanton={selectedCanton}
                      selections={selections}
                      calculatedPrice={calculatedPrice}
                      isCalculating={isCalculating}
                      onRemoveSelection={removeSelection}
                      onContinue={() => goToStep(3)}
                      onChangeCanton={resetAll}
                    />
                  </div>
                )}
              </>
            )}

            {currentStep === 2 && selectedRoom && (
              <QuantitySelector
                selectedRoom={selectedRoom}
                onSelectQuantity={handleQuantitySelect}
                onBackToRooms={resetToRooms}
                onChangeCanton={resetAll}
              />
            )}

            {currentStep === 3 && selectedCanton && (
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  selectDate(date)
                  if (date) {
                    goToStep(4)
                  }
                }}
                onBack={() => goToStep(1)}
              />
            )}

            {currentStep === 4 && selectedCanton && selections.length > 0 && (
              <OrderSummary
                selectedCanton={selectedCanton}
                selections={selections}
                selectedDate={selectedDate}
                calculatedPrice={calculatedPrice}
                isCalculating={isCalculating}
                isProcessingCheckout={isProcessingCheckout}
                onCheckout={handleSecureCheckout}
                onAddRoom={() => setIsModalOpen(true)}
                onRemoveRoom={removeSelection}
                onChangeCanton={resetAll}
                onChangeDate={() => goToStep(3)}
              />
            )}
          </div>
        </div>
      </div>

      <AddRoomModal
        isOpen={isModalOpen}
        selections={selections}
        onClose={() => setIsModalOpen(false)}
        onAddRoom={(selection) => {
          addSelection(selection)
          setIsModalOpen(false)
        }}
      />
    </section>
  )
} 