'use client'

import { useState } from 'react'
import { LucideArrowLeft } from 'lucide-react'
import Button from '../ui/Button'
import { PAYMENT_METHODS } from '@/lib/constants'

interface PaymentFormProps {
  onSubmit: (paymentMethod: string) => void
  onBack: () => void
  initialPaymentMethod: string
}

const PaymentForm = ({ onSubmit, onBack, initialPaymentMethod }: PaymentFormProps) => {
  const [selectedMethod, setSelectedMethod] = useState(initialPaymentMethod || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMethod) {
      onSubmit(selectedMethod)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Payment Method
      </h2>

      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedMethod === method.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-5 h-5 text-primary-600 focus:ring-primary-500"
            />
            <div className="flex items-center gap-3 flex-1">
              <span className="text-2xl">{method.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{method.name}</div>
                {method.id === 'cash_on_delivery' && (
                  <div className="text-sm text-gray-600">
                    Pay when you receive your order
                  </div>
                )}
                {method.id === 'telebirr' && (
                  <div className="text-sm text-gray-600">
                    Fast and secure mobile payment
                  </div>
                )}
                {method.id === 'cbe_birr' && (
                  <div className="text-sm text-gray-600">
                    Commercial Bank of Ethiopia
                  </div>
                )}
                {method.id === 'bank_transfer' && (
                  <div className="text-sm text-gray-600">
                    Direct bank transfer
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Additional Info for Selected Method */}
      {selectedMethod === 'telebirr' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            You will be redirected to TeleBirr to complete your payment securely.
          </p>
        </div>
      )}

      {selectedMethod === 'cbe_birr' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            You will be redirected to CBE Birr to complete your payment securely.
          </p>
        </div>
      )}

      {selectedMethod === 'bank_transfer' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Bank Account Details:</strong>
          </p>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Bank: Commercial Bank of Ethiopia</p>
            <p>Account Name: Artesian Marketplace</p>
            <p>Account Number: 1000123456789</p>
            <p className="mt-2 text-xs">
              Please include your order number in the transfer description
            </p>
          </div>
        </div>
      )}

      {selectedMethod === 'cash_on_delivery' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-800">
            Pay with cash when your order is delivered. Please have the exact amount ready.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          <LucideArrowLeft className="w-5 h-5" />
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!selectedMethod}
          className="flex-1"
        >
          Review Order
        </Button>
      </div>
    </form>
  )
}

export default PaymentForm