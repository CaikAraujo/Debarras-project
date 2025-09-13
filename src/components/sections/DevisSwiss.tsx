'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDevisState } from '@/hooks/useDevisState'
import { usePriceCalculation } from '@/hooks/usePriceCalculation'
import ProgressStepper from '@/components/devis/ProgressStepper'
import CantonSelector from '@/components/devis/CantonSelector'
import RoomSelector from '@/components/devis/RoomSelector'
import OrderSummary from '@/components/devis/OrderSummary'
import SelectionsSummary from '@/components/devis/SelectionsSummary'
import AddRoomModal from '@/components/devis/AddRoomModal'
import DateSelector from '@/components/devis/DateSelector'
import CustomerInfoForm from '@/components/devis/CustomerInfoForm'
import { getBookedDates } from '@/app/_actions/getBookedDates'
import type { VALID_CANTONS } from '@/lib/schemas'
import { SecurityValidators } from '@/lib/security'
import useI18n from '@/components/i18n/useI18n'

export default function DevisSwiss() {
  const searchParams = useSearchParams();
  const { t } = useI18n()
  const [customerInfo, setCustomerInfo] = useState<{ name: string; email: string; phone?: string; address?: string; notes?: string } | null>(null)
  const {
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
  } = useDevisState()

  // Cálculo e checkout seguros (server actions)
  const [hasComuneLetter, setHasComuneLetter] = useState(false)
  const {
    calculatedPrice,
    isCalculating,
    isProcessingCheckout,
    handleSecureCheckout
  } = usePriceCalculation({ selections, selectedCanton, selectedDate, hasComuneLetter, customerInfo })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookedDates, setBookedDates] = useState<Date[]>([])
  const [isLoadingDates, setIsLoadingDates] = useState(false)
  const stepContentRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)

  // Selecionar automaticamente o cantão se vier via URL
  useEffect(() => {
    const cantonParam = searchParams.get('canton');
    if (cantonParam && !selectedCanton) {
      // Validar o parâmetro da URL antes de usar
      if (SecurityValidators.isValidCantonId(cantonParam)) {
        selectCanton(cantonParam);
      } else {
        console.error('Parâmetro de cantão inválido na URL:', cantonParam)
      }
    }
  }, [searchParams, selectedCanton, selectCanton]);

  // Buscar datas reservadas quando o passo 3 é ativado
  useEffect(() => {
    if (currentStep === 3 && selectedCanton) {
      const fetchBookedDates = async () => {
        setIsLoadingDates(true)
        const result = await getBookedDates(selectedCanton as typeof VALID_CANTONS[number])
        if (result.success) {
          setBookedDates(result.dates)
        }
        setIsLoadingDates(false)
      }
      fetchBookedDates()
    }
  }, [currentStep, selectedCanton])

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

  const handleRoomSelect = (roomId: string, quantity: number) => {
    // Validação adicional antes de adicionar
    if (!SecurityValidators.isValidRoomId(roomId) || !SecurityValidators.isValidQuantity(quantity)) {
      console.error('Dados inválidos para seleção de cômodo:', { roomId, quantity })
      return
    }

    addSelection({ 
      roomId: roomId as any, 
      quantity,
      roomNumber: roomId === 'bedroom' ? getBedroomCount() + 1 : undefined
    })
  }

  // Função para editar um cômodo diretamente do card
  const handleEditRoom = (roomId: string) => {
    // Validar se o roomId é válido usando o validador de segurança
    if (!SecurityValidators.isValidRoomId(roomId)) {
      console.error('RoomId inválido:', roomId)
      return
    }
    
    // Remove todas as seleções deste cômodo (exceto quartos)
    if (roomId !== 'bedroom') {
      const selectionsToRemove = selections.filter(s => s.roomId === roomId)
      selectionsToRemove.forEach(selection => removeSelection(selection.selectionId))
    }
    // O usuário pode agora clicar novamente no cômodo para selecionar nova quantidade
  }

  // Função para navegar entre steps já completados
  const handleStepClick = (stepId: number) => {
    // Validar se o stepId é válido usando o validador de segurança
    if (!SecurityValidators.isValidStep(stepId)) {
      console.error('StepId inválido:', stepId)
      return
    }
    
    // Validações específicas para cada step
    if (stepId === 0) {
      // Sempre pode voltar para seleção de cantão
      goToStep(stepId)
    } else if (stepId === 1) {
      // Só pode ir para seleção de objetos se tiver cantão selecionado
      if (selectedCanton) {
        goToStep(stepId)
      } else {
        console.error('Cannot navigate to room selection: no canton selected')
      }
    } else if (stepId === 2) {
      if (selectedCanton && selections.length > 0) {
        goToStep(stepId)
      } else {
        console.error('Cannot navigate to customer info: missing canton or selections')
      }
    } else if (stepId === 3) {
      // Só pode ir para seleção de data se tiver objetos selecionados
      if (selectedCanton && selections.length > 0) {
        goToStep(stepId)
      } else {
        console.error('Cannot navigate to date selection: missing canton or selections')
      }
    } else if (stepId === 4) {
      // Só pode ir para confirmação se tiver tudo selecionado
      if (selectedCanton && selections.length > 0 && selectedDate) {
        goToStep(stepId)
      } else {
        console.error('Cannot navigate to confirmation: missing required data')
      }
    }
  }

  return (
    <section className="section-swiss bg-white">
      <div className="container-swiss">
        <div className="max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-primary mb-4">{t.devis.landing.title}</h1>
            <p className="text-secondary text-lg">
              {t.devis.landing.subtitle}
            </p>
          </div>

          <ProgressStepper currentStep={currentStep} onStepClick={handleStepClick} />

          <div ref={stepContentRef}>
            {currentStep === 0 && (
              <CantonSelector onSelectCanton={selectCanton} />
            )}

            {currentStep === 1 && selectedCanton && (
              <>
                <div className="mb-6 text-center">
                  <p className="text-secondary text-sm md:text-base">
                    {t.devis.hints.selectObjects}
                  </p>
                </div>
                <RoomSelector 
                  onSelectRoom={handleRoomSelect} 
                  onEditRoom={handleEditRoom}
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
                      onContinue={() => goToStep(2)}
                      onChangeCanton={resetAll}
                    />
                  </div>
                )}
              </>
            )}

            {currentStep === 2 && selectedCanton && selections.length > 0 && (
              <CustomerInfoForm
                initial={customerInfo || undefined}
                onSubmit={(info) => {
                  setCustomerInfo(info)
                  // manter também o e-mail para checkout
                  // avanço para seleção de data
                  goToStep(3)
                }}
                onBack={() => goToStep(1)}
              />
            )}

            {currentStep === 3 && selectedCanton && (
              <DateSelector
                selectedDate={selectedDate}
                bookedDates={bookedDates}
                isLoading={isLoadingDates}
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
                onCheckout={() => handleSecureCheckout()}
                onAddRoom={() => setIsModalOpen(true)}
                onRemoveRoom={removeSelection}
                onChangeCanton={resetAll}
                onChangeDate={() => goToStep(3)}
                onComuneLetterFlagChange={(has) => setHasComuneLetter(has)}
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