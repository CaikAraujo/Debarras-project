import { stepTitles } from '@/data/devisData'

interface ProgressStepperProps {
  currentStep: number
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  // Mapear os steps para o novo fluxo simplificado
  const steps = [
    { id: 0, title: 'Choisissez votre canton' },
    { id: 1, title: 'Choisissez vos pièces' },
    { id: 3, title: 'Choisissez une date' },
    { id: 4, title: 'Confirmez votre devis' }
  ]

  return (
    <>
      <div className="flex items-center justify-center mb-8 md:mb-12 px-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-medium ${
                currentStep >= step.id ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && <div className={`w-8 md:w-12 h-1 ${currentStep > step.id ? 'bg-red-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-6 md:mb-8 px-4">
        <h2 className="text-lg md:text-2xl font-semibold text-primary">
          {steps.find(s => s.id === currentStep)?.title || 'Étape'}
        </h2>
      </div>
    </>
  )
} 