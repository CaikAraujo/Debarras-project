'use client'

import { useDevisState } from '@/hooks/useDevisState'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import ProgressStepper from '@/components/devis/ProgressStepper'
import CantonSelector from '@/components/devis/CantonSelector'
import RoomSelector from '@/components/devis/RoomSelector'
import QuantitySelector from '@/components/devis/QuantitySelector'
import OrderSummary from '@/components/devis/OrderSummary'
import SelectionsSummary from '@/components/devis/SelectionsSummary'

export default function DevisSwiss() {
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
    resetToRooms
  } = useDevisState()

  const {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  } = usePriceCalculation({ selections, selectedCanton })

  const handleQuantitySelect = (quantity: number) => {
    if (selectedRoom) {
      addSelection(selectedRoom, quantity)
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

          {currentStep === 0 && (
            <CantonSelector onSelectCanton={selectCanton} />
          )}

          {currentStep === 1 && selectedCanton && (
            <>
              <RoomSelector onSelectRoom={selectRoom} />
              {selections.length > 0 && (
                <SelectionsSummary
                  selectedCanton={selectedCanton}
                  selections={selections}
                  calculatedPrice={calculatedPrice}
                  isCalculating={isCalculating}
                  onRemoveSelection={removeSelection}
                  onContinue={() => goToStep(3)}
                  onChangeCanton={resetAll}
                />
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

          {currentStep === 3 && selectedCanton && selections.length > 0 && (
            <OrderSummary
              selectedCanton={selectedCanton}
              selections={selections}
              calculatedPrice={calculatedPrice}
              isCalculating={isCalculating}
              isProcessingCheckout={isProcessingCheckout}
              onCheckout={handleSecureCheckout}
              onBackToRooms={() => goToStep(1)}
              onChangeCanton={resetAll}
            />
          )}
        </div>
      </div>
    </section>
  )
} 