import { CheckCircle } from "lucide-react";


export default function Steps({ steps, activeStep, nextStep }: { steps: any, activeStep: number, nextStep: (step: any) => void }) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 overflow-auto">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-start sm:items-start sm:space-y-0 sm:space-x-6">
        {steps.map((step: any, index: number) => (
          <button
            key={index}
            onClick={() => nextStep(index)}
            className={`flex items-center text-md font-medium ${
              index <= activeStep ? 'text-indigo-600' : 'text-gray-800'
            }`}
          >
            {index < activeStep ? (
              <CheckCircle className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            ) : (
              <div className={`h-5 w-5 rounded-full ${index === activeStep ? 'bg-indigo-200 border border-indigo-500' : 'bg-gray-300'}`} />
            )}
            <span className="ml-2">{step.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}