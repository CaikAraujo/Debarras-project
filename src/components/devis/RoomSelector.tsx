import Card from '@/components/ui/Card'
import { rooms, quantities } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'
import { Plus, Check } from 'lucide-react'
import { useState } from 'react'

interface RoomSelectorProps {
  onSelectRoom: (roomId: Selection['roomId'], quantity: number) => void
  selections: Selection[]
  isRoomSelected: (roomId: Selection['roomId']) => boolean
  getBedroomCount: () => number
}

export default function RoomSelector({ onSelectRoom, selections, isRoomSelected, getBedroomCount }: RoomSelectorProps) {
  const [expandedRoom, setExpandedRoom] = useState<Selection['roomId'] | null>(null)

  const handleRoomClick = (roomId: Selection['roomId']) => {
    if (roomId === expandedRoom) {
      setExpandedRoom(null)
    } else {
      setExpandedRoom(roomId)
    }
  }

  const handleQuantitySelect = (roomId: Selection['roomId'], quantity: number) => {
    onSelectRoom(roomId, quantity)
    setExpandedRoom(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
      {rooms.map((room) => {
        const isSelected = isRoomSelected(room.id)
        const isBedroom = room.id === 'bedroom'
        const bedroomCount = getBedroomCount()
        const isExpanded = expandedRoom === room.id
        
        return (
          <Card 
            key={room.id}
            className={`
              text-center p-4 md:p-6 transition-all duration-200 relative cursor-pointer
              ${isSelected && !isBedroom
                ? 'bg-gray-100 cursor-not-allowed opacity-50 pointer-events-none' 
                : 'hover:shadow-lg hover:scale-105'
              }
              ${isBedroom && bedroomCount > 0 ? 'ring-2 ring-green-200 bg-green-50' : ''}
              ${isExpanded ? `${isBedroom ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500'} shadow-lg` : ''}
            `}
            onClick={() => (!isSelected || isBedroom) && handleRoomClick(room.id)}
          >
            {/* Badge para quartos múltiplos */}
            {isBedroom && bedroomCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold">
                {bedroomCount}
              </div>
            )}
            
            <div className="mb-3 md:mb-4 flex justify-center">
              {isBedroom && bedroomCount > 0 ? (
                <div className="relative">
                  <room.icon size={40} className="text-green-600 md:w-12 md:h-12" />
                  <Plus size={16} className="absolute -bottom-1 -right-1 bg-green-600 text-white rounded-full p-1 md:w-5 md:h-5" />
                </div>
              ) : (
                <room.icon 
                  size={40} 
                  className={`${isSelected && !isBedroom ? 'text-gray-400' : 'text-red-600'} md:w-12 md:h-12`} 
                />
              )}
            </div>
            
            <h3 className={`text-base md:text-lg font-semibold mb-2 ${
              isSelected && !isBedroom ? 'text-gray-500' : 'text-primary'
            }`}>
              {room.name}
              {isBedroom && bedroomCount > 0 && (
                <span className="text-xs md:text-sm font-normal text-green-600 block">
                  {bedroomCount} sélectionné{bedroomCount > 1 ? 's' : ''}
                </span>
              )}
            </h3>
            
            <p className={`text-xs md:text-sm ${
              isSelected && !isBedroom ? 'text-gray-400' : 'text-secondary'
            }`}>
              {room.description}
              {isBedroom && (
                <span className="block mt-1 text-xs text-red-600 font-medium">
                  Cliquez pour ajouter un autre quarto
                </span>
              )}
            </p>

            {/* Seletor de quantidade expandido */}
            {isExpanded && !isSelected && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-3">Choisissez la quantité :</p>
                <div className="grid grid-cols-3 gap-2">
                  {quantities.map(q => (
                    <button
                      key={q.value}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleQuantitySelect(room.id, q.value)
                      }}
                      className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {isSelected && !isBedroom && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                <span className="text-green-600 font-semibold text-sm md:text-base flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Sélectionné
                </span>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
} 