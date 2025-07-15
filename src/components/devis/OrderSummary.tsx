import Image from 'next/image'
import Button from '@/components/ui/Button'
import { rooms, quantities, cantons } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'

interface OrderSummaryProps {
  selectedCanton: string
  selections: Selection[]
  calculatedPrice: number
  isCalculating: boolean
  isProcessingCheckout: boolean
  onCheckout: () => void
  onBackToRooms: () => void
  onChangeCanton: () => void
}

export default function OrderSummary({
  selectedCanton,
  selections,
  calculatedPrice,
  isCalculating,
  isProcessingCheckout,
  onCheckout,
  onBackToRooms,
  onChangeCanton
}: OrderSummaryProps) {
  const currentCanton = cantons.find(c => c.id === selectedCanton)

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-primary mb-8">Votre Devis Personnalisé</h3>
      
      <div className="flex items-center justify-center space-x-3 mb-8">
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
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="space-y-4">
          {selections.map((selection) => {
            const room = rooms.find(r => r.id === selection.roomId)
            const quantityData = quantities.find(q => q.value === selection.quantity)
            return (
              <div key={selection.roomId} className="flex justify-between">
                <span>{room?.name} - {quantityData?.label}</span>
                <span className="font-semibold">Inclus</span>
              </div>
            )
          })}
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold text-primary">
              <span>Total</span>
              <span>{isCalculating ? 'Calcul...' : `CHF ${calculatedPrice}.-`}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          size="lg" 
          className="w-full md:w-auto"
          onClick={onCheckout}
          disabled={isProcessingCheckout || calculatedPrice === 0}
        >
          {isProcessingCheckout ? 'Redirection vers Stripe...' : 'Confirmer et Payer'}
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="secondary" onClick={onBackToRooms}>
            Modifier les pièces
          </Button>
          <Button variant="secondary" onClick={onChangeCanton}>
            Changer de canton
          </Button>
        </div>
      </div>
    </div>
  )
} 