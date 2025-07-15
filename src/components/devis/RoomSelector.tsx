import Card from '@/components/ui/Card'
import { rooms } from '@/data/devisData'

interface RoomSelectorProps {
  onSelectRoom: (roomId: string) => void
}

export default function RoomSelector({ onSelectRoom }: RoomSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {rooms.map((room) => (
        <Card 
          key={room.id}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200 text-center p-6"
          onClick={() => onSelectRoom(room.id)}
        >
          <div className="mb-4 flex justify-center">
            <room.icon size={48} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">{room.name}</h3>
          <p className="text-sm text-secondary">{room.description}</p>
        </Card>
      ))}
    </div>
  )
} 