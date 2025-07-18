import Card from '@/components/ui/Card'
import { rooms } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'
import { Plus } from 'lucide-react'

interface RoomSelectorProps {
  onSelectRoom: (roomId: Selection['roomId']) => void
  selections: Selection[]
  isRoomSelected: (roomId: Selection['roomId']) => boolean
  getBedroomCount: () => number
}

export default function RoomSelector({ onSelectRoom, selections, isRoomSelected, getBedroomCount }: RoomSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {rooms.map((room) => {
        const isSelected = isRoomSelected(room.id)
        const isBedroom = room.id === 'bedroom'
        const bedroomCount = getBedroomCount()
        
        return (
          <Card 
            key={room.id}
            className={`
              text-center p-6 transition-all duration-200 relative
              ${isSelected && !isBedroom
                ? 'bg-gray-100 cursor-not-allowed opacity-50 pointer-events-none' 
                : 'cursor-pointer hover:shadow-lg hover:scale-105'
              }
              ${isBedroom && bedroomCount > 0 ? 'ring-2 ring-red-200 bg-red-50' : ''}
            `}
            onClick={() => (!isSelected || isBedroom) && onSelectRoom(room.id)}
          >
            {/* Badge para quartos múltiplos */}
            {isBedroom && bedroomCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {bedroomCount}
              </div>
            )}
            
            <div className="mb-4 flex justify-center">
              {isBedroom && bedroomCount > 0 ? (
                <div className="relative">
                  <room.icon size={48} className="text-red-600" />
                  <Plus size={20} className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1" />
                </div>
              ) : (
                <room.icon 
                  size={48} 
                  className={isSelected && !isBedroom ? 'text-gray-400' : 'text-red-600'} 
                />
              )}
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              isSelected && !isBedroom ? 'text-gray-500' : 'text-primary'
            }`}>
              {room.name}
              {isBedroom && bedroomCount > 0 && (
                <span className="text-sm font-normal text-red-600 block">
                  {bedroomCount} sélectionné{bedroomCount > 1 ? 's' : ''}
                </span>
              )}
            </h3>
            
            <p className={`text-sm ${
              isSelected && !isBedroom ? 'text-gray-400' : 'text-secondary'
            }`}>
              {room.description}
              {isBedroom && (
                <span className="block mt-1 text-xs text-red-600 font-medium">
                  Cliquez pour ajouter un autre quarto
                </span>
              )}
            </p>
            
            {isSelected && !isBedroom && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                <span className="text-green-600 font-semibold">✓ Sélectionné</span>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
} 