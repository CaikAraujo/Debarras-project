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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        {selections.map((selection) => {
          const room = rooms.find(r => r.id === selection.roomId)
          const quantityData = quantities.find(q => q.value === selection.quantity)
          const IconComponent = room?.icon
          
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
                ? 'Parfait ! Vous pouvez continuer ou ajouter d\'autres pièces.'
                : `Excellent ! ${selections.length} pièces sélectionnées. Prêt pour la prochaine étape.`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 