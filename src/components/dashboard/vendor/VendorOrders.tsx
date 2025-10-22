'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideSearch,
  LucideFilter,
  LucideDownload,
  LucidePackage,
  LucideEye,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'
import { Order, OrderStatus } from '@/types'

const VendorOrders = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all')

  // Filter orders
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === 'all' || order.orderStatus === filterStatus

    return matchesSearch && matchesFilter
  })

  const stats = {
    all: ordersData.length,
    pending: ordersData.filter((o) => o.orderStatus === 'pending').length,
    processing: ordersData.filter((o) => o.orderStatus === 'processing').length,
    shipped: ordersData.filter((o) => o.orderStatus === 'shipped').length,
    delivered: ordersData.filter((o) => o.orderStatus === 'delivered').length,
  }

  const statusTabs = [
    { id: 'all', label: 'All Orders', count: stats.all },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'processing', label: 'Processing', count: stats.processing },
    { id: 'shipped', label: 'Shipped', count: stats.shipped },
    { id: 'delivered', label: 'Delivered', count: stats.delivered },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Orders Management
            </h2>
            <p className="text-gray-600">
              Manage and track your customer orders
            </p>
          </div>
          <Button variant="outline">
            <LucideDownload className="w-5 h-5" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex overflow-x-auto gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  filterStatus === tab.id
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

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by order number or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<LucideSearch className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline">
            <LucideFilter className="w-5 h-5" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium text-gray-900">
                          {order.customerName}
                        </p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-gray-300" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
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
                </div>

                {/* Order Content */}
                <div className="p-6">
                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-3">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={item.product.images?.[0]?.url || ''}
                              alt={item.product.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm line-clamp-1">
                              {item.product.title}
                            </p>
                            <p className="text-sm text-gray-600">
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
                  </div>

                  {/* Order Summary */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment</p>
                        <Badge
                          variant={
                            order.paymentStatus === 'paid'
                              ? 'success'
                              : 'warning'
                          }
                          size="sm"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <Link href={`/vendor/orders/${order.id}`}>
                      <Button variant="outline">
                        <LucideEye className="w-4 h-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucidePackage className="w-16 h-16" />}
            title="No orders found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : filterStatus === 'all'
                ? 'You have no orders yet'
                : `No ${filterStatus} orders`
            }
          />
        </div>
      )}
    </div>
  )
}

export default VendorOrders