import Image from 'next/image'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Trash2, Calendar, MapPin, PlusCircle, Edit, Package, Clock, Shield, Truck, Clock as ClockIcon } from 'lucide-react'
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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-primary mb-4">Votre Devis Personnalisé</h3>
        <p className="text-secondary text-base">Vérifiez les informations avant de finaliser votre réservation.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-primary">Espaces à débarrasser</h4>
            <div className="flex items-center gap-2 text-secondary">
              <Package className="w-4 h-4" />
              <span className="font-medium text-sm">{selections.length} espace{selections.length > 1 ? 's' : ''}</span>
            </div>
          </div>
          
          {selections.map((selection, index) => {
            const room = rooms.find(r => r.id === selection.roomId)
            const RoomIcon = room?.icon
            const roomTitle = selection.roomId === 'bedroom' && selection.roomNumber 
              ? `${room?.name} ${selection.roomNumber}`
              : room?.name

            return (
              <Card key={selection.selectionId} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                <Card.Content className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg">
                        {RoomIcon && <RoomIcon className="w-6 h-6 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-lg font-bold text-primary mb-1 truncate">{roomTitle}</h5>
                        <div className="flex items-center gap-3 text-secondary">
                          <span className="flex items-center gap-1 text-sm">
                            <Package className="w-3 h-3" />
                            {selection.quantity} objets
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            #{index + 1}
                          </span>
                        </div>
                        <p className="text-xs text-secondary mt-1 truncate">{room?.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveRoom(selection.selectionId)}
                      aria-label={`Supprimer ${roomTitle}`}
                      className="p-2 hover:bg-red-50 hover:border-red-200 transition-colors ml-2 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )
          })}
          
          <Card className="border-dashed border-2 border-gray-300 hover:border-red-300 transition-colors">
            <Card.Content className="p-4">
              <Button variant="outline" onClick={onAddRoom} className="w-full h-12 text-base">
                <PlusCircle className="w-5 h-5 mr-2" />
                Ajouter un autre espace
              </Button>
            </Card.Content>
          </Card>
        </div>

        <div className="sticky top-24 space-y-6">
          <Card className="shadow-xl">
            <Card.Header className="pb-3">
              <Card.Title className="text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-red-600" />
                Récapitulatif
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 items-center p-3 bg-gray-50 rounded-lg gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold text-primary text-sm">Canton</span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-6 h-6 flex-shrink-0">
                      <Image 
                        src={currentCanton?.image || ''} 
                        alt={currentCanton?.name || ''}
                        width={24} height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-primary text-sm truncate">{currentCanton?.name}</span>
                  </div>
                </div>

                {selectedDate && (
                  <div className="grid grid-cols-2 items-center p-3 bg-gray-50 rounded-lg gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="font-semibold text-primary text-sm">Date</span>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="font-bold text-primary text-sm">{format(selectedDate, 'd MMM yyyy', { locale: fr })}</span>
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-semibold text-primary">Total estimé</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      {isCalculating ? '...' : `CHF ${calculatedPrice}`}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      Prix final garanti
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Informações úteis */}
          <Card className="bg-blue-50 border-blue-200">
            <Card.Content className="p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Ce qui est inclus
              </h4>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex items-center gap-2">
                  <Truck className="w-3 h-3" />
                  <span>Transport et évacuation</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-3 h-3" />
                  <span>Intervention programmée</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>Équipe professionnelle</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          <div className="space-y-4">
            <Button 
              onClick={onCheckout}
              disabled={isProcessingCheckout || isCalculating || selections.length === 0}
              className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessingCheckout ? 'Traitement...' : 'Réserver maintenant'}
            </Button>
            
            <div className="space-y-3">
              <Button variant="outline" onClick={onChangeDate} className="w-full h-10 text-sm">
                <Edit className="w-4 h-4 mr-2" />
                Modifier la date ou le canton
              </Button>
              <Button variant="secondary" onClick={onChangeCanton} className="w-full h-10 text-sm">
                Recommencer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 