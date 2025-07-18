'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { rooms, quantities } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'

interface AddRoomModalProps {
  isOpen: boolean
  selections: Selection[]
  onClose: () => void
  onAddRoom: (selection: Omit<Selection, 'selectionId'>) => void
}

export default function AddRoomModal({ isOpen, selections, onClose, onAddRoom }: AddRoomModalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<Selection['roomId'] | null>(null)
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null)

  // Filtrar cômodos disponíveis - quartos sempre disponíveis, outros apenas se não selecionados
  const availableRooms = rooms.filter(room => {
    if (room.id === 'bedroom') return true // Quartos sempre disponíveis
    return !selections.some(s => s.roomId === room.id) // Outros cômodos apenas se não selecionados
  })

  // Contar quantos quartos já foram selecionados
  const bedroomCount = selections.filter(s => s.roomId === 'bedroom').length

  const handleAdd = () => {
    if (selectedRoomId && selectedQuantity) {
      onAddRoom({ 
        roomId: selectedRoomId, 
        quantity: selectedQuantity,
        roomNumber: selectedRoomId === 'bedroom' ? bedroomCount + 1 : undefined
      })
      onClose()
      setSelectedRoomId(null)
      setSelectedQuantity(null)
    }
  }

  const handleClose = () => {
    onClose()
    setSelectedRoomId(null)
    setSelectedQuantity(null)
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-2xl font-bold text-primary mb-6">Ajouter une pièce</h2>
      
      {bedroomCount > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 Vous avez déjà {bedroomCount} chambre{bedroomCount > 1 ? 's' : ''} sélectionnée{bedroomCount > 1 ? 's' : ''}. 
            Vous pouvez en ajouter d'autres si nécessaire.
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">1. Choisissez la pièce</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableRooms.map(room => {
              const isBedroom = room.id === 'bedroom'
              const isAlreadySelected = !isBedroom && selections.some(s => s.roomId === room.id)
              
              return (
                <Button
                  key={room.id}
                  variant={selectedRoomId === room.id ? 'primary' : 'outline'}
                  onClick={() => setSelectedRoomId(room.id)}
                  disabled={isAlreadySelected}
                  className={`flex flex-col h-24 justify-center relative ${
                    isBedroom && bedroomCount > 0 ? 'ring-2 ring-red-200' : ''
                  }`}
                >
                  <room.icon size={32} className="mb-2" />
                  <span className="text-center text-sm">
                    {room.name}
                    {isBedroom && bedroomCount > 0 && (
                      <span className="block text-xs text-red-600 font-medium">
                        +{bedroomCount} déjà
                      </span>
                    )}
                  </span>
                </Button>
              )
            })}
          </div>
          
          {availableRooms.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Tous les cômodos disponibles ont été sélectionnés.
            </p>
          )}
        </div>

        {selectedRoomId && (
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              2. Choisissez la quantité
              {selectedRoomId === 'bedroom' && bedroomCount > 0 && (
                <span className="text-sm font-normal text-red-600 block">
                  Pour la {bedroomCount + 1}ème chambre
                </span>
              )}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {quantities.map(q => (
                <Button
                  key={q.value}
                  variant={selectedQuantity === q.value ? 'primary' : 'outline'}
                  onClick={() => setSelectedQuantity(q.value)}
                  className="h-16"
                >
                  {q.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button variant="secondary" onClick={handleClose}>Annuler</Button>
        <Button 
          onClick={handleAdd} 
          disabled={!selectedRoomId || !selectedQuantity}
        >
          {selectedRoomId === 'bedroom' && bedroomCount > 0 
            ? `Ajouter chambre ${bedroomCount + 1}`
            : 'Ajouter la pièce'
          }
        </Button>
      </div>
    </Modal>
  )
} 