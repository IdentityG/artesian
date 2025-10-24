'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideSearch,
  LucideEye,
  LucideDownload,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'
import { OrderStatus } from '@/types'

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all')

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
    totalRevenue: ordersData.reduce((sum, o) => sum + o.total, 0),
    totalCommission: ordersData.reduce((sum, o) => sum + o.total * 0.15, 0),
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
              Monitor all orders across the platform
            </p>
          </div>
          <Button variant="outline">
            <LucideDownload className="w-5 h-5" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Total Orders</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              📦
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.all}</p>
          <p className="text-sm text-gray-600 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Total Revenue</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              💰
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(stats.totalRevenue)}
          </p>
          <p className="text-sm text-gray-600 mt-1">From all orders</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Platform Commission</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              💵
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(stats.totalCommission)}
          </p>
          <p className="text-sm text-gray-600 mt-1">15% of revenue</p>
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
                  ? 'bg-purple-600 text-white shadow-sm'
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

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Search by order number or customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<LucideSearch className="w-5 h-5" />}
        />
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Order Number
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Items
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Commission
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]
                  const commission = order.total * 0.15

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">
                          {order.orderNumber}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.items.slice(0, 3).map((item, idx) => (
                              <div
                                key={idx}
                                className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                              >
                                <Image
                                  src={item.product.images?.[0]?.url || ''}
                                  alt={item.product.title}
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(order.total)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-green-600">
                          {formatPrice(commission)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            statusConfig.color === 'green'
                              ? 'success'
                              : statusConfig.color === 'yellow'
                              ? 'warning'
                              : statusConfig.color === 'red'
                              ? 'danger'
                              : 'info'
                          }
                          size="sm"
                        >
                          {statusConfig.label}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link href={`/admin/orders/${order.id}`}>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            <LucideEye className="w-4 h-4" />
                          </button>
                        </Link>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucideSearch className="w-16 h-16" />}
            title="No orders found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : `No ${filterStatus} orders`
            }
          />
        </div>
      )}
    </div>
  )
}

export default AdminOrders