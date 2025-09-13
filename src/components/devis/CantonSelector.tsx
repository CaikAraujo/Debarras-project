import Image from 'next/image'
import Card from '@/components/ui/Card'
import { cantons } from '@/data/devisData'
import useI18n from '@/components/i18n/useI18n'

interface CantonSelectorProps {
  onSelectCanton: (cantonId: string) => void
}

export default function CantonSelector({ onSelectCanton }: CantonSelectorProps) {
  const { t } = useI18n()

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-6 md:mb-8">
        <p className="text-secondary text-base md:text-lg">{t.devis.cantonSelector.prompt}</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 place-items-center">
        {cantons.map((canton) => (
          <Card 
            key={canton.id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200 text-center p-3 md:p-4 flex flex-col items-center justify-center w-full max-w-[120px]"
            onClick={() => onSelectCanton(canton.id)}
          >
            <div className="mb-3 md:mb-4 flex justify-center">
              <Image 
                src={canton.image} 
                alt={`Escudo ${canton.name}`}
                width={40}
                height={40}
                className="object-contain w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            <h3 className="text-sm md:text-base font-semibold text-primary mb-0 leading-tight">{canton.name}</h3>
          </Card>
        ))}
      </div>
    </div>
  )
} 