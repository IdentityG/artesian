'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LucideChevronDown, LucideChevronUp } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Button from '../ui/Button'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants'
import { toast } from 'react-hot-toast'
import { CheckoutStep } from './CheckoutContent'
import { Address } from '@/types'

interface OrderSummaryProps {
  currentStep: CheckoutStep
  shippingAddress: Address | null
  paymentMethod: string
}

const OrderSummary = ({ currentStep, shippingAddress, paymentMethod }: OrderSummaryProps) => {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [showItems, setShowItems] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMethod) {
      toast.error('Please complete all checkout steps')
      return
    }

    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderNumber = generateOrderNumber()
    
    // Clear cart
    clearCart()
    
    setIsProcessing(false)
    toast.success('Order placed successfully!')
    
    // Redirect to order confirmation
    router.push(`/order-confirmation?orderNumber=${orderNumber}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          Order Summary ({items.length} items)
        </h3>
        <button
          onClick={() => setShowItems(!showItems)}
          className="text-primary-600 hover:text-primary-700"
        >
          {showItems ? (
            <LucideChevronUp className="w-5 h-5" />
          ) : (
            <LucideChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Items List */}
      {showItems && (
        <div className="mb-4 space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={item.product.images[0]?.url || ''}
                  alt={item.product.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {item.product.title}
                </p>
                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="font-medium text-green-600">FREE</span>
          ) : (
            <span className="font-medium">{formatPrice(shipping)}</span>
          )}
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span>Tax (15%)</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span className="text-primary-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      {currentStep === 'review' && (
        <Button
          onClick={handlePlaceOrder}
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isProcessing}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      )}

      {/* Security Note */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-start gap-2 text-xs text-gray-600">
          <svg
            className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p>
            Your payment information is secure and encrypted. We never store your
            payment details.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary