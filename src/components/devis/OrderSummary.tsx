import Image from 'next/image'
import { useState } from 'react'
import uploadComuneLetter from '@/data/uploadComuneLetter'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Trash2, Calendar, MapPin, PlusCircle, Edit, Package, Clock, Shield, Truck, Clock as ClockIcon } from 'lucide-react'
import { rooms, cantons } from '@/data/devisData'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Selection } from '@/lib/schemas'
import useI18n from '@/components/i18n/useI18n'

interface OrderSummaryProps {
  selectedCanton: string
  selections: Selection[]
  selectedDate: Date | undefined
  calculatedPrice: number
  isCalculating: boolean
  isProcessingCheckout: boolean
  onCheckout: (comuneLetterUrl?: string) => void
  onAddRoom: () => void
  onRemoveRoom: (selectionId: string) => void
  onChangeCanton: () => void
  onChangeDate: () => void
  onComuneLetterFlagChange?: (has: boolean) => void
}

export default function OrderSummary({
  selectedCanton,
  selections,
  selectedDate,
  calculatedPrice,
  isCalculating,
  isProcessingCheckout,
  onCheckout,
  onAddRoom,
  onRemoveRoom,
  onChangeCanton,
  onChangeDate,
  onComuneLetterFlagChange
}: OrderSummaryProps) {
  const currentCanton = cantons.find(c => c.id === selectedCanton)
  const [uploading, setUploading] = useState(false)
  const [comuneLetterPath, setComuneLetterPath] = useState<string | undefined>(undefined)
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { t } = useI18n()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    const previewUrl = URL.createObjectURL(file)
    setPreview(previewUrl)
    const res = await uploadComuneLetter(file)
    if (res.success) {
      setComuneLetterPath(res.path)
      onComuneLetterFlagChange?.(true)
    }
    else setUploadError(t.devis.summary.uploadFail)
    setUploading(false)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-primary mb-4">{t.devis.summary.yourQuote}</h3>
        <p className="text-secondary text-base">{t.devis.summary.checkInfo}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-xl font-bold text-primary">{t.devis.summary.spacesTitle}</h4>
            <div className="flex items-center gap-2 text-secondary">
              <Package className="w-4 h-4" />
              <span className="font-medium text-sm">{selections.length} {t.devis.summary.items}</span>
            </div>
          </div>
          
          {selections.map((selection, index) => {
            const room = rooms.find(r => r.id === selection.roomId)
            const RoomIcon = room?.icon
            const roomTitle = selection.roomId === 'bedroom' && selection.roomNumber 
              ? `${room?.name} ${selection.roomNumber}`
              : room?.name

            return (
              <Card key={selection.selectionId} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                <Card.Content className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg">
                        {RoomIcon && <RoomIcon className="w-6 h-6 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-lg font-bold text-primary mb-1 truncate">{roomTitle}</h5>
                        <div className="flex items-center gap-3 text-secondary">
                          <span className="flex items-center gap-1 text-sm">
                            <Package className="w-3 h-3" />
                            {selection.quantity} {t.devis.summary.items}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">#{index + 1}</span>
                        </div>
                        <p className="text-xs text-secondary mt-1 truncate">{room?.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveRoom(selection.selectionId)}
                      aria-label={`Supprimer ${roomTitle}`}
                      className="p-2 hover:bg-red-50 hover:border-red-200 transition-colors ml-2 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )
          })}
          
          <Card className="border-dashed border-2 border-gray-300 hover:border-red-300 transition-colors">
            <Card.Content className="p-4">
              <Button variant="outline" onClick={onAddRoom} className="w-full h-12 text-base">
                <PlusCircle className="w-5 h-5 mr-2" />
                {t.devis.summary.addAnother}
              </Button>
            </Card.Content>
          </Card>
        </div>

        <div className="sticky top-24 space-y-6">
          <Card className="shadow-xl">
            <Card.Header className="pb-3">
              <Card.Title className="text-xl flex items-center gap-2">
                <Package className="w-5 h-5 text-red-600" />
                {t.devis.summary.recap}
              </Card.Title>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-primary">{t.devis.summary.comuneLabel}</label>
                <p className="text-xs text-green-700">{t.devis.summary.comuneBenefit}</p>
                <div className="border-2 border-dashed rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {preview ? (
                        <Image src={preview} alt="Prévisualisation" width={56} height={56} className="rounded border w-14 h-14 object-cover" />
                      ) : (
                        <div className="w-14 h-14 bg-white border rounded flex items-center justify-center text-gray-400 text-xs">IMG</div>
                      )}
                      <div>
                        <p className="text-sm text-primary font-medium">
                          {preview ? t.devis.summary.fileAdded : t.devis.summary.chooseOrDrop}
                        </p>
                        <p className="text-xs text-secondary">{t.devis.summary.formats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center px-3 py-2 text-sm bg-white border rounded cursor-pointer hover:bg-gray-50">
                        {t.devis.summary.choose}
                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      </label>
                      {preview && (
                        <button type="button" className="text-xs text-red-600 hover:underline" onClick={() => { setPreview(undefined); setComuneLetterPath(undefined); onComuneLetterFlagChange?.(false) }}>{t.devis.summary.remove}</button>
                      )}
                    </div>
                  </div>
                  {uploading && <p className="text-xs text-secondary mt-2">{t.devis.summary.uploading}</p>}
                  {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
                </div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 items-center p-3 bg-gray-50 rounded-lg gap-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="font-semibold text-primary text-sm">{t.devis.summary.canton}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <div className="w-6 h-6 flex-shrink-0">
                      <Image 
                        src={currentCanton?.image || ''} 
                        alt={currentCanton?.name || ''}
                        width={24} height={24}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-primary text-sm truncate">{currentCanton?.name}</span>
                  </div>
                </div>

                {selectedDate && (
                  <div className="grid grid-cols-2 items-center p-3 bg-gray-50 rounded-lg gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-600 flex-shrink-0" />
                      <span className="font-semibold text-primary text-sm">{t.devis.summary.date}</span>
                    </div>
                    <div className="flex items-center gap-3 justify-end">
                      <span className="font-bold text-primary text-sm">{format(selectedDate, 'd MMM yyyy', { locale: fr })}</span>
                      <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-semibold text-primary">{t.devis.summary.total}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">
                      {isCalculating ? '...' : `CHF ${calculatedPrice}`}
                    </div>
                    <div className="text-xs text-secondary mt-1">
                      {t.devis.summary.guaranteed}
                    </div>
                    {comuneLetterPath && (
                      <div className="text-xs text-green-700 mt-1">{t.devis.summary.discount}</div>
                    )}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Informações úteis */}
          <Card className="bg-blue-50 border-blue-200">
            <Card.Content className="p-4">
              <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t.devis.summary.includedTitle}
              </h4>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex items-center gap-2">
                  <Truck className="w-3 h-3" />
                  <span>{t.devis.summary.included[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-3 h-3" />
                  <span>{t.devis.summary.included[1]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>{t.devis.summary.included[2]}</span>
                </div>
              </div>
            </Card.Content>
          </Card>

          <div className="space-y-4">
            <Button 
              onClick={() => onCheckout(comuneLetterPath)}
              disabled={isProcessingCheckout || isCalculating || selections.length === 0}
              className="w-full h-12 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isProcessingCheckout ? t.devis.summary.processing : t.devis.summary.reserveNow}
            </Button>
            
            <div className="space-y-3">
              <Button variant="outline" onClick={onChangeDate} className="w-full h-10 text-sm">
                <Edit className="w-4 h-4 mr-2" />
                {t.devis.summary.editDateCanton}
              </Button>
              <Button variant="secondary" onClick={onChangeCanton} className="w-full h-10 text-sm">
                {t.devis.summary.restart}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 