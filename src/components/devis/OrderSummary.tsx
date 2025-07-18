import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Trash2, Calendar } from 'lucide-react'
import { rooms, cantons } from '@/data/devisData'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Selection } from '@/lib/schemas'

interface OrderSummaryProps {
  selectedCanton: string
  selections: Selection[]
  selectedDate: Date | undefined
  calculatedPrice: number
  isCalculating: boolean
  isProcessingCheckout: boolean
  onCheckout: () => void
  onAddRoom: () => void
  onRemoveRoom: (selectionId: string) => void
  onChangeCanton: () => void
  onChangeDate: () => void
}

export default function OrderSummary({
  selectedCanton,
  selections,
  selectedDate,
  calculatedPrice,
  isCalculating,
  isProcessingCheckout,
  onCheckout,
  onAddRoom,
  onRemoveRoom,
  onChangeCanton,
  onChangeDate
}: OrderSummaryProps) {
  const currentCanton = cantons.find(c => c.id === selectedCanton)

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-primary mb-8">Votre Devis Personnalisé</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-center space-x-3">
          <Image 
            src={currentCanton?.image || ''} 
            alt={currentCanton?.name || ''}
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-lg font-semibold text-primary">
            Canton de {currentCanton?.name}
          </span>
        </div>
        {selectedDate && (
          <div className="flex items-center justify-center space-x-2 text-lg">
            <Calendar size={20} className="text-gray-600" />
            <span className="font-semibold text-primary">
              {format(selectedDate, 'd MMMM yyyy', { locale: fr })}
            </span>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="space-y-4">
          {selections.map((selection) => {
            const room = rooms.find(r => r.id === selection.roomId)
            
            // Título do quarto com numeração se necessário
            const roomTitle = selection.roomId === 'bedroom' && selection.roomNumber 
              ? `${room?.name} ${selection.roomNumber}`
              : room?.name
            
            return (
              <div key={selection.selectionId} className="flex justify-between items-center">
                <span>{roomTitle} - {selection.quantity} objets</span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onRemoveRoom(selection.selectionId)}
                  aria-label={`Supprimer ${roomTitle}`}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            )
          })}
        </div>
        
        <div className="border-t mt-6 pt-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span className="text-red-600">
              {isCalculating ? 'Calcul...' : `CHF ${calculatedPrice}.-`}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          onClick={onCheckout}
          disabled={isProcessingCheckout || isCalculating || selections.length === 0}
          className="w-full h-12 text-lg font-semibold"
        >
          {isProcessingCheckout ? 'Traitement...' : 'Réserver maintenant'}
        </Button>
        
        <div className="flex space-x-4">
          <Button variant="outline" onClick={onAddRoom} className="flex-1">
            Ajouter un espace
          </Button>
          <Button variant="outline" onClick={onChangeDate} className="flex-1">
            Modifier la date
          </Button>
        </div>
        
        <Button variant="secondary" onClick={onChangeCanton} className="w-full">
          Changer de canton
        </Button>
      </div>
    </div>
  )
} 