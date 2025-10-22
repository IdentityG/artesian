'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucidePackage,
  LucideMapPin,
  LucideClock,
  LucideChevronRight,
} from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'

const OrdersContent = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all')

  // In real app, filter based on user's orders
  const orders = ordersData

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true
    if (activeTab === 'pending')
      return ['pending', 'processing', 'shipped'].includes(order.orderStatus)
    if (activeTab === 'completed')
      return ['delivered', 'cancelled', 'returned'].includes(order.orderStatus)
    return true
  })

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    {
      id: 'pending',
      label: 'Pending',
      count: orders.filter((o) =>
        ['pending', 'processing', 'shipped'].includes(o.orderStatus)
      ).length,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: orders.filter((o) =>
        ['delivered', 'cancelled', 'returned'].includes(o.orderStatus)
      ).length,
    },
  ]

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <EmptyState
          icon={<LucidePackage className="w-16 h-16" />}
          title="No orders yet"
          description="Start shopping to see your orders here"
          action={{
            label: 'Browse Products',
            onClick: () => (window.location.href = '/products'),
          }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Number</p>
                      <p className="font-semibold text-gray-900">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-300" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-300" />
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={
                      statusConfig.color === 'green'
                        ? 'success'
                        : statusConfig.color === 'yellow'
                        ? 'warning'
                        : statusConfig.color === 'red'
                        ? 'danger'
                        : statusConfig.color === 'blue'
                        ? 'info'
                        : 'default'
                    }
                    size="lg"
                  >
                    {statusConfig.label}
                  </Badge>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4 mb-4">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.images?.[0]?.url || ''}
                          alt={item.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.subtotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-600">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <LucideMapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Shipping Address
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.shippingAddress.street}
                        <br />
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.region}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <LucideClock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Estimated Delivery
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.orderStatus === 'delivered'
                          ? `Delivered on ${formatDate(order.deliveredAt!)}`
                          : order.orderStatus === 'shipped'
                          ? '2-3 business days'
                          : order.orderStatus === 'processing'
                          ? '5-7 business days'
                          : 'Processing'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                  <Link href={`/orders/${order.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                      <LucideChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  {order.orderStatus === 'delivered' && (
                    <Button variant="primary" className="flex-1">
                      Write Review
                    </Button>
                  )}
                  {['pending', 'processing'].includes(order.orderStatus) && (
                    <Button variant="danger" className="flex-1">
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucidePackage className="w-16 h-16" />}
            title={`No ${activeTab} orders`}
            description="You don't have any orders in this category"
          />
        </div>
      )}
    </div>
  )
}

export default OrdersContent