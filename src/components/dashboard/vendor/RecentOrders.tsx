'use client'

import Link from 'next/link'
import Image from 'next/image'
import { LucideArrowRight, LucidePackage } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'

const RecentOrders = () => {
  // Show only recent 5 orders
  const recentOrders = ordersData.slice(0, 5)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
        <Link href="/vendor/orders">
          <Button variant="ghost" size="sm">
            View All
            <LucideArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Order
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Total
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                Status
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]
              return (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <LucidePackage className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-gray-600">
                          {order.items.length} items
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{order.customerName}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
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
                  <td className="py-4 px-4 text-right">
                    <Link href={`/vendor/orders/${order.id}`}>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentOrders