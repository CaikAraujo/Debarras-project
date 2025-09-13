import Card from '@/components/ui/Card'
import { rooms, quantities } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'
import { Plus, Check, Edit } from 'lucide-react'
import { useState } from 'react'
import { SecurityValidators } from '@/lib/security'
import useI18n from '@/components/i18n/useI18n'

interface RoomSelectorProps {
  onSelectRoom: (roomId: Selection['roomId'], quantity: number) => void
  onEditRoom: (roomId: Selection['roomId']) => void
  selections: Selection[]
  isRoomSelected: (roomId: Selection['roomId']) => boolean
  getBedroomCount: () => number
}

export default function RoomSelector({ onSelectRoom, onEditRoom, selections, isRoomSelected, getBedroomCount }: RoomSelectorProps) {
  const [expandedRoom, setExpandedRoom] = useState<Selection['roomId'] | null>(null)
  const { t } = useI18n()

  const handleRoomClick = (roomId: Selection['roomId']) => {
    // Validar se o roomId é válido usando o validador de segurança
    if (!SecurityValidators.isValidRoomId(roomId)) {
      console.error('RoomId inválido:', roomId)
      return
    }

    if (roomId === expandedRoom) {
      setExpandedRoom(null)
    } else {
      setExpandedRoom(roomId)
    }
  }

  const handleQuantitySelect = (roomId: Selection['roomId'], quantity: number) => {
    // Validar se a quantidade é válida usando o validador de segurança
    if (!SecurityValidators.isValidQuantity(quantity)) {
      console.error('Quantidade inválida:', quantity)
      return
    }

    onSelectRoom(roomId, quantity)
    setExpandedRoom(null)
  }

  const handleEditClick = (e: React.MouseEvent, roomId: Selection['roomId']) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Validar se o roomId é válido usando o validador de segurança
    if (!SecurityValidators.isValidRoomId(roomId)) {
      console.error('RoomId inválido para edição:', roomId)
      return
    }
    
    onEditRoom(roomId)
    // Expande o cômodo para seleção de quantidade
    setExpandedRoom(roomId)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
      {rooms.map((room) => {
        const isSelected = isRoomSelected(room.id)
        const isBedroom = room.id === 'bedroom'
        const bedroomCount = getBedroomCount()
        const isExpanded = expandedRoom === room.id

        const label = (t.devis.roomsLabels as any)[room.id]
        const roomName = label?.name ?? room.name
        const roomDesc = label?.desc ?? room.description
        
        return (
          <Card 
            key={room.id}
            className={`
              text-center p-4 md:p-6 transition-all duration-200 relative cursor-pointer
              ${isSelected && !isBedroom
                ? 'bg-gray-100' 
                : 'hover:shadow-lg hover:scale-105'
              }
              ${isBedroom && bedroomCount > 0 ? 'ring-2 ring-green-200 bg-green-50' : ''}
              ${isExpanded ? `${isBedroom ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500'} shadow-lg` : ''}
            `}
            onClick={() => (!isSelected || isBedroom || isExpanded) && handleRoomClick(room.id)}
            style={{ 
              pointerEvents: (isSelected && !isBedroom && !isExpanded) ? 'none' : 'auto'
            }}
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
              {roomName}
              {isBedroom && bedroomCount > 0 && (
                <span className="text-xs md:text-sm font-normal text-green-600 block">
                  {bedroomCount} {t.devis.rooms.selectedCount}{bedroomCount > 1 ? 's' : ''}
                </span>
              )}
            </h3>
            
            <p className={`text-xs md:text-sm ${
              isSelected && !isBedroom ? 'text-gray-400' : 'text-secondary'
            }`}>
              {roomDesc}
              {isBedroom && (
                <span className="block mt-1 text-xs text-red-600 font-medium">
                  {t.devis.rooms.addAnotherBedroom}
                </span>
              )}
            </p>

            {/* Seletor de quantidade expandido */}
            {isExpanded && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-3">
                  {isSelected ? t.devis.rooms.qtySelect.edit : t.devis.rooms.qtySelect.choose}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {quantities.map((q, idx) => (
                    <button
                      key={q.value}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleQuantitySelect(room.id, q.value)
                      }}
                      className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      {(t.devis.quantityLabels as any)[idx] ?? q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Overlay para cômodos selecionados com botão de edição */}
            {isSelected && !isBedroom && !isExpanded && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-lg"
                style={{ zIndex: 50 }}
              >
                <span className="text-green-600 font-semibold text-sm md:text-base flex items-center gap-1 mb-3">
                  <Check className="w-4 h-4" />
                  {t.devis.rooms.selected}
                </span>
                <button
                  type="button"
                  onClick={(e) => handleEditClick(e, room.id)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium border border-blue-200 hover:border-blue-300 bg-white"
                  title={`${t.devis.rooms.editTitle} ${roomName}`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Edit className="w-4 h-4" />
                  {t.devis.rooms.edit}
                </button>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
} 