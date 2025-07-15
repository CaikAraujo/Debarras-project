import Image from 'next/image'
import Card from '@/components/ui/Card'
import { cantons } from '@/data/devisData'

interface CantonSelectorProps {
  onSelectCanton: (cantonId: string) => void
}

export default function CantonSelector({ onSelectCanton }: CantonSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-secondary text-lg">
          Sélectionnez votre canton pour obtenir des prix adaptés à votre région.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cantons.map((canton) => (
          <Card 
            key={canton.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 text-center p-6"
            onClick={() => onSelectCanton(canton.id)}
          >
            <div className="mb-4 flex justify-center">
              <Image 
                src={canton.image} 
                alt={`Escudo ${canton.name}`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{canton.name}</h3>
            <p className="text-sm text-secondary">Service de débarras professionnel</p>
          </Card>
        ))}
      </div>
    </div>
  )
} 