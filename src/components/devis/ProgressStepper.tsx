import { stepTitles } from '@/data/devisData'

interface ProgressStepperProps {
  currentStep: number
  onStepClick: (stepId: number) => void
}

export default function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  // Mapear os steps para o novo fluxo simplificado
  const steps = [
    { id: 0, title: 'Choisissez votre canton' },
    { id: 1, title: 'Choisissez vos objets' },
    { id: 3, title: 'Choisissez une date' },
    { id: 4, title: 'Confirmez votre devis' }
  ]

  const handleStepClick = (stepId: number) => {
    console.log('ProgressStepper: Step clicked:', stepId, 'Current step:', currentStep)
    
    // Só permite navegar para steps já completados (marcados de vermelho)
    if (stepId <= currentStep) {
      console.log('ProgressStepper: Calling onStepClick with stepId:', stepId)
      onStepClick(stepId)
    } else {
      console.log('ProgressStepper: Step not accessible yet:', stepId)
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