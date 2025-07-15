import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { rooms, quantities } from '@/data/devisData'

interface QuantitySelectorProps {
  selectedRoom: string
  onSelectQuantity: (quantity: number) => void
  onBackToRooms: () => void
  onChangeCanton: () => void
}

export default function QuantitySelector({ selectedRoom, onSelectQuantity, onBackToRooms, onChangeCanton }: QuantitySelectorProps) {
  const currentRoom = rooms.find(r => r.id === selectedRoom)
  
  if (!currentRoom) return null

  const IconComponent = currentRoom.icon

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <IconComponent size={48} className="text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">{currentRoom.name}</h3>
        <p className="text-secondary">{currentRoom.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quantities.map((quantity) => (
          <Card 
            key={quantity.value}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 text-center p-6"
            onClick={() => onSelectQuantity(quantity.value)}
          >
            <div className="text-2xl font-bold text-primary mb-2">{quantity.label}</div>
            <div className="text-lg text-red-600 font-semibold">Prix calculé au final</div>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button variant="secondary" onClick={onBackToRooms}>
          Retour aux pièces
        </Button>
        <Button variant="secondary" onClick={onChangeCanton}>
          Changer de canton
        </Button>
      </div>
    </div>
  )
} 