import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LucideArrowLeft,
  LucideMapPin,
  LucideCreditCard,
  LucideDownload,
} from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'

interface OrderDetailPageProps {
  params: {
    orderId: string
  }
}

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { orderId } = await Promise.resolve(params)
  const order = ordersData.find((o) => o.id === orderId)

  if (!order) {
    return {
      title: 'Order Not Found',
    }
  }

  return {
    title: `Order ${order.orderNumber} | Artesian`,
    description: `Order details for ${order.orderNumber}`,
  }
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await Promise.resolve(params)
  const order = ordersData.find((o) => o.id === orderId)

  if (!order) {
    notFound()
  }

  const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Orders', href: '/orders' },
          { label: order.orderNumber },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order {order.orderNumber}
                </h2>
                <p className="text-gray-600 mt-1">
                  Placed on {formatDate(order.createdAt)}
                </p>
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

            {/* Order Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {order.createdAt && (
                  <div className="relative flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Placed</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                )}

                {order.paidAt && (
                  <div className="relative flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Payment Confirmed
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.paidAt)}
                      </p>
                    </div>
                  </div>
                )}

                {order.shippedAt && (
                  <div className="relative flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Shipped</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.shippedAt)}
                      </p>
                      {order.trackingNumber && (
                        <p className="text-sm text-primary-600 mt-1">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {order.deliveredAt ? (
                  <div className="relative flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white z-10">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.deliveredAt)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex gap-4">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white z-10">
                      ○
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">
                        Out for Delivery
                      </p>
                      <p className="text-sm text-gray-500">
                        Estimated: 2-3 days
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                >
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={item.product.images?.[0]?.url || ''}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      by {item.vendorName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                    {item.customization && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.customization}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">
              <LucideDownload className="w-5 h-5" />
              Download Invoice
            </Button>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LucideMapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p className="font-medium">{order.customerName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.region}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-2">{order.customerPhone}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LucideCreditCard className="w-5 h-5" />
              Payment Method
            </h3>
            <div className="text-gray-700 text-sm">
              <p className="capitalize font-medium">
                {order.paymentMethod.replace('_', ' ')}
              </p>
              <Badge
                variant={
                  order.paymentStatus === 'paid'
                    ? 'success'
                    : order.paymentStatus === 'pending'
                    ? 'warning'
                    : 'danger'
                }
                className="mt-2"
              >
                {order.paymentStatus.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          {order.orderStatus === 'delivered' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full">
                  Write a Review
                </Button>
                <Button variant="outline" className="w-full">
                  Request Return
                </Button>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}