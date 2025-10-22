'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import CheckoutSteps from './CheckoutSteps'
import ShippingForm from './ShippingForm'
import PaymentForm from './PaymentForm'
import OrderSummary from './OrderSummary'
import EmptyState from '../ui/EmptyState'
import { LucideShoppingBag } from 'lucide-react'
import { Address } from '@/types'

export type CheckoutStep = 'shipping' | 'payment' | 'review'

const CheckoutContent = () => {
  const router = useRouter()
  const { items } = useCartStore()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [billingAddress, setBillingAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [useSameAddress, setUseSameAddress] = useState(true)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={<LucideShoppingBag className="w-16 h-16" />}
          title="Your cart is empty"
          description="Add items to your cart before checking out"
          action={{
            label: 'Continue Shopping',
            onClick: () => router.push('/products'),
          }}
        />
      </div>
    )
  }

  const handleShippingSubmit = (address: Address, billing: Address | null, sameAddress: boolean) => {
    setShippingAddress(address)
    setBillingAddress(billing)
    setUseSameAddress(sameAddress)
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = (method: string) => {
    setPaymentMethod(method)
    setCurrentStep('review')
  }

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping')
    } else if (currentStep === 'review') {
      setCurrentStep('payment')
    }
  }

  return (
    <div className="container-custom py-8">
      <div className="max-w-5xl mx-auto">
        {/* Progress Steps */}
        <CheckoutSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShippingForm
                    onSubmit={handleShippingSubmit}
                    initialData={{
                      shippingAddress,
                      billingAddress,
                      useSameAddress,
                    }}
                  />
                </motion.div>
              )}

              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    onBack={handleBack}
                    initialPaymentMethod={paymentMethod}
                  />
                </motion.div>
              )}

              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Review Your Order
                    </h2>

                    {/* Shipping Address */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Shipping Address
                      </h3>
                      {shippingAddress && (
                        <div className="text-gray-700 text-sm">
                          <p>{shippingAddress.street}</p>
                          <p>
                            {shippingAddress.city}, {shippingAddress.region}
                          </p>
                          <p>{shippingAddress.country}</p>
                        </div>
                      )}
                      <button
                        onClick={() => setCurrentStep('shipping')}
                        className="text-primary-600 text-sm mt-2 hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Billing Address */}
                    {!useSameAddress && billingAddress && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Billing Address
                        </h3>
                        <div className="text-gray-700 text-sm">
                          <p>{billingAddress.street}</p>
                          <p>
                            {billingAddress.city}, {billingAddress.region}
                          </p>
                          <p>{billingAddress.country}</p>
                        </div>
                      </div>
                    )}

                    {/* Payment Method */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Payment Method
                      </h3>
                      <p className="text-gray-700 text-sm capitalize">
                        {paymentMethod.replace('_', ' ')}
                      </p>
                      <button
                        onClick={() => setCurrentStep('payment')}
                        className="text-primary-600 text-sm mt-2 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              currentStep={currentStep}
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutContent