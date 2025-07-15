import Image from 'next/image'
import Button from '@/components/ui/Button'
import { rooms, quantities, cantons } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'

interface SelectionsSummaryProps {
  selectedCanton: string
  selections: Selection[]
  calculatedPrice: number
  isCalculating: boolean
  onRemoveSelection: (roomId: string) => void
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
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Vos sélections</h3>
        <div className="flex items-center space-x-2 text-sm text-secondary">
          <Image 
            src={currentCanton?.image || ''} 
            alt={currentCanton?.name || ''}
            width={24}
            height={24}
            className="object-contain"
          />
          <span>Canton: {currentCanton?.name}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {selections.map((selection) => {
          const room = rooms.find(r => r.id === selection.roomId)
          const quantityData = quantities.find(q => q.value === selection.quantity)
          const IconComponent = room?.icon
          
          return (
            <div key={selection.roomId} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center">
                  {IconComponent && <IconComponent size={24} className="text-red-600" />}
                </div>
                <div>
                  <div className="font-semibold text-primary">{room?.name}</div>
                  <div className="text-sm text-secondary">{quantityData?.label}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-red-600">Inclus dans le total</span>
                <button 
                  onClick={() => onRemoveSelection(selection.roomId)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            {isCalculating ? 'Calcul en cours...' : `Total: CHF ${calculatedPrice}.-`}
          </div>
          <Button onClick={onContinue}>
            Continuer vers le devis
          </Button>
        </div>
        <div className="flex justify-center">
          <Button variant="secondary" onClick={onChangeCanton}>
            Changer de canton
          </Button>
        </div>
      </div>
    </div>
  )
} 