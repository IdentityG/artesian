'use client'

import { useState } from 'react'
import { LucideCheck, LucidePackage } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { toast } from 'react-hot-toast'

interface UpdateOrderStatusProps {
  currentStatus: string
  orderId: string
}

const UpdateOrderStatus = ({ currentStatus, orderId }: UpdateOrderStatusProps) => {
  const [status, setStatus] = useState(currentStatus)
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const statusFlow = [
    { id: 'pending', label: 'Pending', description: 'Order received' },
    { id: 'processing', label: 'Processing', description: 'Preparing order' },
    { id: 'shipped', label: 'Shipped', description: 'Order in transit' },
    { id: 'delivered', label: 'Delivered', description: 'Order completed' },
  ]

  const currentIndex = statusFlow.findIndex((s) => s.id === currentStatus)

  const handleUpdateStatus = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    toast.success('Order status updated successfully!')
  }

  const canProgress = currentIndex < statusFlow.length - 1

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Update Order Status</h3>

      {/* Status Progress */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary-600 transition-all duration-500"
            style={{
              width: `${(currentIndex / (statusFlow.length - 1)) * 100}%`,
            }}
          />
          <div className="relative flex justify-between">
            {statusFlow.map((step, index) => {
              const isCompleted = index <= currentIndex
              const isCurrent = index === currentIndex

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
                  >
                    {isCompleted ? (
                      <LucideCheck className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p
                      className={`text-sm font-medium ${
                        isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {canProgress && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Next Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {statusFlow.slice(currentIndex + 1).map((step) => (
                  <option key={step.id} value={step.id}>
                    {step.label}
                  </option>
                ))}
              </select>
            </div>

            {status === 'shipped' && (
              <Input
                label="Tracking Number (Optional)"
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                leftIcon={<LucidePackage className="w-5 h-5" />}
              />
            )}

            <Button
              onClick={handleUpdateStatus}
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Update to {statusFlow.find((s) => s.id === status)?.label}
            </Button>
          </>
        )}

        {currentStatus === 'delivered' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <LucideCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-green-800 font-medium">Order Completed</p>
            <p className="text-sm text-green-700 mt-1">
              This order has been successfully delivered
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdateOrderStatus