import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { rooms, quantities } from '@/data/devisData'
import useI18n from '@/components/i18n/useI18n'

interface QuantitySelectorProps {
  selectedRoom: string
  onSelectQuantity: (quantity: number) => void
  onBackToRooms: () => void
  onChangeCanton: () => void
}

export default function QuantitySelector({ 
  selectedRoom, 
  onSelectQuantity,
  onBackToRooms,
  onChangeCanton
}: QuantitySelectorProps) {
  const room = rooms.find(r => r.id === selectedRoom)
  const { t } = useI18n()

  if (!room) {
    return (
      <div className="text-center p-6 md:p-8 px-4">
        <p className="text-red-600 text-sm md:text-base">{t.devis.quantity.error}</p>
        <Button onClick={onBackToRooms} variant="outline" className="mt-4">
          {t.devis.quantity.backToRooms}
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4">
      <Card className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4 md:mb-6 text-center">
          {t.devis.quantity.howMany} <span className="text-red-600">{room.name}</span> ?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          {quantities.map(q => (
            <Button 
              key={q.value}
              variant="outline"
              onClick={() => onSelectQuantity(q.value)}
              className="w-full h-12 md:h-16 text-base md:text-lg"
            >
              {q.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 md:mt-8">
          <Button onClick={onBackToRooms} variant="secondary" className="w-full sm:w-auto">
            {t.devis.quantity.changeRoom}
          </Button>
          <Button onClick={onChangeCanton} variant="secondary" className="w-full sm:w-auto">
            {t.devis.quantity.changeCanton}
          </Button>
        </div>
      </Card>
    </div>
  )
} 