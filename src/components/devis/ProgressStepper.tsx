import { CheckCircle } from 'lucide-react'
import { SecurityValidators } from '@/lib/security'

interface ProgressStepperProps {
  currentStep: number
  onStepClick: (stepId: number) => void
}

export default function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  const steps = [
    { id: 0, title: 'Sélection du canton', description: 'Choisissez votre canton' },
    { id: 1, title: 'Sélection des objets', description: 'Sélectionnez les objets à débarrasser' },
    { id: 2, title: 'Résumé', description: 'Vérifiez vos sélections' },
    { id: 3, title: 'Date de réservation', description: 'Choisissez la date' },
    { id: 4, title: 'Confirmation', description: 'Confirmez votre commande' }
  ]

  const handleStepClick = (stepId: number) => {
    // Validar se o stepId é válido usando o validador de segurança
    if (!SecurityValidators.isValidStep(stepId)) {
      console.error('StepId inválido:', stepId)
      return
    }
    
    if (stepId <= currentStep) {
      onStepClick(stepId)
    } else {
      console.error('Step não acessível ainda:', stepId)
    }
  }

  // Teste simples para verificar se a função está sendo passada
  console.log('ProgressStepper: onStepClick function:', typeof onStepClick)

  return (
    <>
      <div className="flex items-center justify-center mb-8 md:mb-12 px-4">
        <div className="flex items-center space-x-2 md:space-x-3">
          {steps.map((step, index) => {
            const isCompleted = currentStep >= step.id
            const isClickable = isCompleted
            
            return (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-base font-medium transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  } ${
                    isClickable 
                      ? 'cursor-pointer hover:scale-110 hover:shadow-lg' 
                      : 'cursor-not-allowed'
                  }`}
                  style={{
                    pointerEvents: isClickable ? 'auto' : 'none',
                    zIndex: 10,
                    position: 'relative'
                  }}
                  onClick={() => handleStepClick(step.id)}
                  title={isClickable ? `Cliquez pour revenir à l'étape: ${step.title}` : 'Étape non encore accessible'}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-12 h-1 transition-colors duration-200 ${
                    currentStep > step.id ? 'bg-red-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
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