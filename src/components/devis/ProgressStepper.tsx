import { stepTitles } from '@/data/devisData'

interface ProgressStepperProps {
  currentStep: number
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <>
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center space-x-3">
          {[0, 1, 2, 3].map(step => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step + 1}
              </div>
              {step < 3 && <div className={`w-12 h-1 ${currentStep > step ? 'bg-red-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-primary">{stepTitles[currentStep]?.title}</h2>
      </div>
    </>
  )
} 