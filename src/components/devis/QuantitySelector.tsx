import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { rooms, quantities } from '@/data/devisData'

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

  if (!room) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Erreur : Pièce non sélectionnée.</p>
        <Button onClick={onBackToRooms} variant="outline" className="mt-4">
          Retour à la sélection des pièces
        </Button>
      </div>
    )
  }

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        Combien d&apos;objets dans : <span className="text-red-600">{room.name}</span> ?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quantities.map(q => (
          <Button 
            key={q.value}
            variant="outline"
            onClick={() => onSelectQuantity(q.value)}
            className="w-full h-16 text-lg"
          >
            {q.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button onClick={onBackToRooms} variant="secondary">
          Changer de pièce
        </Button>
        <Button onClick={onChangeCanton} variant="secondary">
          Changer de canton
        </Button>
      </div>
    </Card>
  )
} 