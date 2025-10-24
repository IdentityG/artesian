'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideCheckCircle, LucideHome, LucidePackage } from 'lucide-react'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderNumber = searchParams.get('orderNumber')

  useEffect(() => {
    if (!orderNumber) {
      router.push('/')
    }
  }, [orderNumber, router])

  if (!orderNumber) {
    return <Loading fullScreen />
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
            >
              <LucideCheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-primary-600">
                {orderNumber}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                What's Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">
                      1
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Order Confirmation
                    </p>
                    <p className="text-sm text-gray-600">
                      You'll receive a confirmation email with order details
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">
                      2
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Vendor Processing
                    </p>
                    <p className="text-sm text-gray-600">
                      Our artisans will start crafting your order
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-600 font-semibold text-sm">
                      3
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivery</p>
                    <p className="text-sm text-gray-600">
                      Your order will be delivered to your address
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                You can track your order status in your{' '}
                <Link
                  href="/orders"
                  className="text-primary-600 hover:underline font-medium"
                >
                  order history
                </Link>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                <LucideHome className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
            <Link href="/orders" className="flex-1">
              <Button variant="primary" className="w-full" size="lg">
                <LucidePackage className="w-5 h-5" />
                View Orders
              </Button>
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Need help?{' '}
              <Link
                href="/contact"
                className="text-primary-600 hover:underline font-medium"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}