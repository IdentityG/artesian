'use client'

import { LucideCheck } from 'lucide-react'
import { CheckoutStep } from './CheckoutContent'

interface CheckoutStepsProps {
  currentStep: CheckoutStep
}

const steps = [
  { id: 'shipping', label: 'Shipping', number: 1 },
  { id: 'payment', label: 'Payment', number: 2 },
  { id: 'review', label: 'Review', number: 3 },
]

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex
          const isCurrent = step.id === currentStep

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isCompleted
                      ? 'bg-green-600 text-white'
                      : isCurrent
                      ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <LucideCheck className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium hidden sm:block ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded" />
                  <div
                    className={`absolute inset-0 bg-primary-600 rounded transition-all duration-500 ${
                      index < currentStepIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckoutSteps