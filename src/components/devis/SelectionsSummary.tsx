import Image from 'next/image'
import Button from '@/components/ui/Button'
import { rooms, quantities, cantons } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface SelectionsSummaryProps {
  selectedCanton: string
  selections: Selection[]
  calculatedPrice: number
  isCalculating: boolean
  onRemoveSelection: (selectionId: string) => void
  onContinue: () => void
  onChangeCanton: () => void
}

export default function SelectionsSummary({
  selectedCanton,
  selections,
  calculatedPrice,
  isCalculating,
  onRemoveSelection,
  onContinue,
  onChangeCanton
}: SelectionsSummaryProps) {
  const currentCanton = cantons.find(c => c.id === selectedCanton)

  // Função para calcular o preço individual de cada seleção
  // Mostra preços baseados na quantidade para exibição
  // NOTA: Estes preços são apenas para exibição. O preço real final
  // é calculado pelo servidor e mostrado no total geral.
  const calculateItemPrice = (selection: Selection) => {
    // Preços baseados na quantidade (apenas para exibição)
    const basePrices = {
      kitchen: { 5: 580, 10: 780, 15: 980 },
      bedroom: { 5: 580, 10: 780, 15: 980 },
      living: { 5: 580, 10: 780, 15: 980 },
      office: { 5: 580, 10: 780, 15: 980 },
      garage: { 5: 350, 10: 480, 15: 690 },
      basement: { 5: 350, 10: 480, 15: 690 },
      garden: { 5: 350, 10: 480, 15: 690 },
      bathroom: { 5: 350, 10: 480, 15: 690 }
    } as const
    
    const roomPricing = basePrices[selection.roomId]
    if (roomPricing && roomPricing[selection.quantity as keyof typeof roomPricing]) {
      const price = roomPricing[selection.quantity as keyof typeof roomPricing]
      console.log(`Preço calculado para ${selection.roomId} (${selection.quantity}): ${price} CHF`)
      return price
    }
    
    console.log(`Preço não encontrado para ${selection.roomId} (${selection.quantity})`)
    return 0
  }

  return (
    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-2">
        <h3 className="text-lg md:text-xl font-semibold text-primary">Vos sélections</h3>
        <div className="flex items-center space-x-2 text-xs md:text-sm text-secondary">
          <Image 
            src={currentCanton?.image || ''} 
            alt={currentCanton?.name || ''}
            width={20}
            height={20}
            className="object-contain"
          />
          <span>Canton: {currentCanton?.name}</span>
        </div>
      </div>

      {/* HUD de valores: base do cantão + total estimé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-blue-700 mb-1">Valeur de base du canton</p>
            <div className="text-2xl font-bold text-blue-800">
              {currentCanton?.basePrice} CHF
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Prix de base pour {currentCanton?.name} (déjà inclus dans le total)
            </p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" aria-live="polite">
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">Total estimé</p>
            <div className="text-2xl font-bold text-red-700">
              {isCalculating ? '...' : `${calculatedPrice} CHF`}
            </div>
            <p className="text-xs text-red-600 mt-1">Mise à jour selon vos sélections</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        {selections.map((selection) => {
          const room = rooms.find(r => r.id === selection.roomId)
          const quantityData = quantities.find(q => q.value === selection.quantity)
          const IconComponent = room?.icon
          const itemPrice = calculateItemPrice(selection)
          
          // Título do quarto com numeração se necessário
          const roomTitle = selection.roomId === 'bedroom' && selection.roomNumber 
            ? `${room?.name} ${selection.roomNumber}`
            : room?.name
          
          return (
            <div key={selection.selectionId} className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                <div className="flex items-center justify-center flex-shrink-0">
                  {IconComponent && <IconComponent size={20} className="text-red-600 md:w-6 md:h-6" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-primary text-sm md:text-base truncate">{roomTitle}</div>
                  <div className="text-xs md:text-sm text-secondary truncate">{quantityData?.label}</div>
                  <div className="text-sm font-bold text-blue-600">{itemPrice} CHF</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                <span className="font-semibold text-red-600 text-xs md:text-sm hidden sm:block">Inclus dans le total</span>
                <button 
                  onClick={() => onRemoveSelection(selection.selectionId)}
                  className="text-red-500 hover:text-red-700 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                  title={`Supprimer ${roomTitle}`}
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex flex-col space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-lg md:text-xl font-bold text-primary text-center sm:text-left">
            {isCalculating ? 'Calcul en cours...' : `Total: CHF ${calculatedPrice}.-`}
          </div>
          <Button onClick={onContinue} className="w-full sm:w-auto flex items-center gap-2">
            Continuer vers la date
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex justify-center">
          <Button variant="secondary" onClick={onChangeCanton} className="w-full sm:w-auto">
            Changer de canton
          </Button>
        </div>

        {/* Dica visual */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">
              {selections.length === 1 
                ? 'Parfait ! Vous pouvez continuer ou ajouter d\'autres objets.'
                : `Excellent ! ${selections.length} objets sélectionnés. Prêt pour la prochaine étape.`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 