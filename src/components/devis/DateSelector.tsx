'use client'

import { useState } from 'react'
import { fr } from 'date-fns/locale'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, isSameMonth, isToday, addMonths, subMonths } from 'date-fns'
import Button from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, Loader } from 'lucide-react'

interface DateSelectorProps {
  selectedDate: Date | undefined
  bookedDates: Date[]
  isLoading: boolean
  onSelectDate: (date: Date | undefined) => void
  onBack: () => void
}

export default function DateSelector({ selectedDate, bookedDates, isLoading, onSelectDate, onBack }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatSelectedDate = (date: Date) => {
    return format(date, "EEEE dd MMMM yyyy", { locale: fr })
  }

  const handleContinue = () => {
    if (selectedDate) {
      onSelectDate(selectedDate)
    }
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }) // Lundi = 1
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const dateFormat = "d"
  const rows = []
  let days = []
  let day = startDate
  let formattedDate = ""

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat)
      const cloneDay = day
      const isCurrentMonth = isSameMonth(day, monthStart)
      const isSelected = selectedDate && isSameDay(day, selectedDate)
      const isCurrentDay = isToday(day)
      const isWeekend = day.getDay() === 0 || day.getDay() === 6
      const isPast = day < new Date(new Date().setHours(0, 0, 0, 0))
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(0, 0, 0, 0)
      const isTomorrow = isSameDay(day, tomorrow)
      const isReserved = bookedDates.some(reserved => isSameDay(day, reserved))
      // Permitir amanhã e fins de semana (com sinalização visual). Bloquear apenas passados, hoje e reservados.
      const isDisabled = isPast || isCurrentDay || isReserved

      days.push(
        <div
          key={day.toString()}
          className={`
            h-8 md:h-12 flex items-center justify-center cursor-pointer rounded-lg text-xs md:text-sm font-medium transition-colors duration-150
            ${isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
            ${isSelected 
              ? 'bg-red-500 text-white shadow-md ring-1 ring-red-200' 
              : isCurrentDay 
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : isTomorrow
                  ? 'bg-orange-50 text-orange-700 border border-orange-200'
                  : isWeekend
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'hover:bg-gray-50 hover:text-red-600'
            }
            ${isDisabled 
              ? 'cursor-not-allowed opacity-50 line-through hover:bg-transparent hover:text-gray-300' 
              : ''
            }
          `}
          onClick={() => !isDisabled && onSelectDate(cloneDay)}
        >
          <span>{formattedDate}</span>
        </div>
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    )
    days = []
  }

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 md:p-3 rounded-xl shadow-lg">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-primary">Choisissez votre date</h2>
        </div>
        <p className="text-secondary text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
          Sélectionnez la date souhaitée pour votre débarras. Nos équipes interviennent du lundi au vendredi de 8h à 17h avec un délai minimum de 48h.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 items-start">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Loader className="h-6 w-6 md:h-8 md:w-8 text-red-500 animate-spin" />
                <p className="mt-3 md:mt-4 text-primary font-semibold text-sm md:text-base">Chargement des disponibilités...</p>
              </div>
            )}
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 p-3 md:p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-base md:text-lg font-bold">Disponibilités</span>
                </div>
                <div className="text-xs md:text-sm bg-white/20 px-2 md:px-3 py-1 rounded-full">
                  Lundi - Vendredi
                </div>
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <button
                  onClick={prevMonth}
                  className="h-8 w-8 md:h-10 md:w-10 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </button>
                
                <h3 className="text-lg md:text-2xl font-bold text-gray-800 capitalize">
                  {format(currentMonth, "MMMM yyyy", { locale: fr })}
                </h3>
                
                <button
                  onClick={nextMonth}
                  className="h-8 w-8 md:h-10 md:w-10 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                  <div
                    key={day}
                    className="h-8 md:h-10 flex items-center justify-center text-gray-600 font-semibold text-xs md:text-sm bg-gray-50 rounded-lg"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                {rows}
              </div>
              
              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-md"></div>
                    <span className="text-gray-700 text-xs md:text-sm font-medium">Date sélectionnée</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-100 rounded-md border border-blue-300"></div>
                    <span className="text-gray-700 text-xs md:text-sm font-medium">Aujourd'hui</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-300 rounded-md border border-orange-400"></div>
                    <span className="text-gray-700 text-xs md:text-sm font-medium">Demain (+10%)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-300 rounded-md border border-purple-400"></div>
                    <span className="text-gray-700 text-xs md:text-sm font-medium">Week-ends (+10%)</span>
                  </div>
                </div>
                <div className="mt-3 p-2 md:p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <p className="text-yellow-800 text-xs">
                    ⚠️ Week-ends et réservations pour le lendemain entraînent une majoration de 10%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Painel de confirmação */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-6 space-y-4 md:space-y-5">
            {/* Date sélectionnée */}
            {selectedDate ? (
              <div className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 rounded-2xl p-4 md:p-6 border-2 border-green-200 shadow-lg">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-md">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-green-800">Date confirmée</h3>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 border border-green-200 shadow-sm">
                  <p className="text-green-700 text-base md:text-lg font-bold capitalize mb-2 md:mb-3">
                    {formatSelectedDate(selectedDate)}
                  </p>
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="font-semibold text-xs md:text-sm">8h00 - 17h00</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 md:p-6 border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Calendar className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-2 md:mb-3" />
                  <h3 className="text-base md:text-lg font-bold text-gray-600 mb-2">Sélectionnez une date</h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    Cliquez sur une date disponible dans le calendrier pour planifier votre intervention
                  </p>
                </div>
              </div>
            )}

            {/* Informations supplémentaires */}
            <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 rounded-2xl p-4 md:p-6 border-2 border-blue-200 shadow-lg">
              <h4 className="text-base md:text-lg font-bold text-blue-800 mb-3 md:mb-4">Informations importantes</h4>
              <div className="space-y-2 md:space-y-3">
                {[
                  "Interventions du lundi au vendredi uniquement",
                  "Délai minimum de 48h pour planifier",
                  "Possibilité de reporter si nécessaire",
                  "Équipe professionnelle et assurée"
                ].map((info, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-blue-200">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-500 rounded-full mt-1.5 md:mt-2 flex-shrink-0"></div>
                    <span className="text-blue-700 text-xs md:text-sm font-medium leading-relaxed">{info}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col gap-3">
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={onBack}
                className="h-10 md:h-12 text-sm md:text-base font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Retour aux sélections
              </Button>
              <Button 
                size="lg"
                onClick={handleContinue}
                disabled={!selectedDate}
                className="h-10 md:h-12 text-sm md:text-base font-semibold rounded-xl bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 disabled:from-gray-300 disabled:to-gray-400 hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Confirmer et continuer
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 