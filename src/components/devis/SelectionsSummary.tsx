import Image from 'next/image'
import Button from '@/components/ui/Button'
import { rooms, quantities, cantons } from '@/data/devisData'
import type { Selection } from '@/lib/schemas'
import { ArrowRight, CheckCircle, Truck, Users, MapPin, FileText } from 'lucide-react'
import useI18n from '@/components/i18n/useI18n'

interface SelectionsSummaryProps {
  selectedCanton: string
  selections: Selection[]
  calculatedPrice: number
  isCalculating: boolean
  onRemoveSelection: (selectionId: string) => void
  onContinue: () => void
  onChangeCanton: () => void
  extraCartons?: number
  onChangeExtraCartons?: (n: number) => void
}

export default function SelectionsSummary({
  selectedCanton,
  selections,
  calculatedPrice,
  isCalculating,
  onRemoveSelection,
  onContinue,
  onChangeCanton,
  extraCartons = 0,
  onChangeExtraCartons
}: SelectionsSummaryProps) {
  const currentCanton = cantons.find(c => c.id === selectedCanton)
  const { t } = useI18n()

  // Função para calcular o preço individual de cada seleção
  // Mostra preços baseados na quantidade para exibição
  // NOTA: Estes preços são apenas para exibição. O preço real final
  // é calculado pelo servidor e mostrado no total geral.
  const calculateItemPrice = (selection: Selection) => {
    // Preços baseados na quantidade (apenas para exibição)
    const basePrices = {
      kitchen: { 5: 580, 10: 780, 15: 980 },
      bedroom: { 5: 580, 10: 780, 15: 980 },
      living: { 5: 580, 10: 780, 15: 980 },
      office: { 5: 580, 10: 780, 15: 980 },
      garage: { 5: 350, 10: 480, 15: 690 },
      basement: { 5: 350, 10: 480, 15: 690 },
      garden: { 5: 350, 10: 480, 15: 690 },
      bathroom: { 5: 350, 10: 480, 15: 690 }
    } as const
    
    const roomPricing = basePrices[selection.roomId]
    if (roomPricing && roomPricing[selection.quantity as keyof typeof roomPricing]) {
      const price = roomPricing[selection.quantity as keyof typeof roomPricing]
      return price
    }
    return 0
  }

  const cartonsIncludedForQuantity = (q: number) => {
    if (q <= 5) return 5
    if (q <= 10) return 10
    return 15
  }

  const totalIncludedCartons = selections.reduce((acc, s) => acc + cartonsIncludedForQuantity(s.quantity), 0)

  return (
    <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-2">
        <h3 className="text-lg md:text-xl font-semibold text-primary">{t.devis.summary.spacesTitle}</h3>
        <div className="flex items-center space-x-2 text-xs md:text-sm text-secondary">
          <Image 
            src={currentCanton?.image || ''} 
            alt={currentCanton?.name || ''}
            width={20}
            height={20}
            className="object-contain"
          />
          <span>{t.devis.summary.canton}: {currentCanton?.name}</span>
        </div>
      </div>

      {/* HUD de valores: base do cantão + total estimé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">{t.devis.summary.baseValue}</p>
            <div className="text-3xl font-bold text-gray-900">
              {currentCanton?.basePrice} <span className="text-lg font-medium text-gray-500">CHF</span>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <Truck size={16} className="text-swiss-red" />
              </div>
              <span className="font-medium">{t.devis.summary.includes.truck}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <Users size={16} className="text-swiss-red" />
              </div>
              <span className="font-medium">{t.devis.summary.includes.movers(selections.length <= 3 ? 2 : selections.length === 4 ? 3 : 4)}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <MapPin size={16} className="text-swiss-red" />
              </div>
              <span className="font-medium">{t.devis.summary.includes.travel}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-700 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                <FileText size={16} className="text-swiss-red" />
              </div>
              <span className="font-medium">{t.devis.summary.includes.fees}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm" aria-live="polite">
          <div className="text-center">
            <p className="text-sm text-red-700 mb-1">{t.devis.summary.total}</p>
            <div className="text-2xl font-bold text-red-700">
              {isCalculating ? '...' : `${calculatedPrice} CHF`}
            </div>
            <p className="text-xs text-red-600 mt-1">{t.devis.summary.checkInfo}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        {selections.map((selection) => {
          const room = rooms.find(r => r.id === selection.roomId)
          const IconComponent = room?.icon
          const itemPrice = calculateItemPrice(selection)
          
          // Título do quarto com numeração se necessário
          const roomTitle = selection.roomId === 'bedroom' && selection.roomNumber 
            ? `${room?.name} ${selection.roomNumber}`
            : room?.name
          
          return (
            <div key={selection.selectionId} className="relative flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg">
              <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                <div className="flex items-center justify-center flex-shrink-0">
                  {IconComponent && <IconComponent size={20} className="text-red-600 md:w-6 md:h-6" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-800 text-sm md:text-base truncate">{roomTitle}</div>
                  <div className="text-sm font-bold text-gray-700">{itemPrice} CHF</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                <div className="text-xs md:text-sm text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">
                  {t.devis.summary.cartons.badge(cartonsIncludedForQuantity(selection.quantity))}
                </div>
                <button 
                  onClick={() => onRemoveSelection(selection.selectionId)}
                  className="text-red-500 hover:text-red-700 w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors"
                  title={`Remove ${roomTitle}`}
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="flex flex-col space-y-3 md:space-y-4">
        {/* Cartons info e extras */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-center">
              <p className="text-sm text-gray-700 mb-1">{t.devis.summary.cartons.included}</p>
              <div className="text-xl font-bold text-gray-800">{totalIncludedCartons}</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm text-gray-700">{t.devis.summary.cartons.extra}</p>
                <p className="text-xs text-gray-700">{t.devis.summary.cartons.unit}</p>
              </div>
              <div className="flex items-center gap-2">
                <button aria-label="decrease" className="px-2 py-1 border border-gray-300 rounded text-gray-700" onClick={() => onChangeExtraCartons && onChangeExtraCartons(Math.max(0, extraCartons - 1))}>-</button>
                <div className="w-10 text-center font-semibold text-gray-800">{extraCartons}</div>
                <button aria-label="increase" className="px-2 py-1 border border-gray-300 rounded text-gray-700" onClick={() => onChangeExtraCartons && onChangeExtraCartons(extraCartons + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-lg md:text-xl font-bold text-gray-800 text-center sm:text-left">
            {isCalculating ? t.devis.summary.processing : `Total: CHF ${calculatedPrice}.-`}
          </div>
          <div className="w-full sm:w-auto flex flex-col items-stretch gap-2">
            <Button onClick={onContinue} className="w-full sm:w-auto flex items-center justify-center gap-2">
              {t.devis.date.confirmContinue}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="h-9 text-sm"
            >
              {t.devis.summary.addAnother}
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="secondary" onClick={onChangeCanton} className="w-full sm:w-auto">
            {t.devis.quantity.changeCanton}
          </Button>
        </div>

        {/* Dica visual */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">
              {selections.length === 1 
                ? t.devis.summary.checkInfo
                : `${selections.length} ${t.devis.summary.items}`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 