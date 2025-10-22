import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  LucideArrowLeft,
  LucideMapPin,
  LucideCreditCard,
  LucidePhone,
  LucideMail,
  LucidePackage,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import ordersData from '@/data/sampleOrders.json'
import UpdateOrderStatus from '@/components/dashboard/vendor/UpdateOrderStatus'

interface VendorOrderDetailProps {
  params: {
    orderId: string
  }
}

export async function generateMetadata({ params }: VendorOrderDetailProps) {
  const { orderId } = await Promise.resolve(params)
  const order = ordersData.find((o) => o.id === orderId)

  if (!order) {
    return {
      title: 'Order Not Found',
    }
  }

  return {
    title: `Order ${order.orderNumber} | Vendor Dashboard`,
    description: `Manage order ${order.orderNumber}`,
  }
}

export default async function VendorOrderDetailPage({ params }: VendorOrderDetailProps) {
  const { orderId } = await Promise.resolve(params)
  const order = ordersData.find((o) => o.id === orderId)

  if (!order) {
    notFound()
  }

  const statusConfig = ORDER_STATUSES[order.orderStatus as keyof typeof ORDER_STATUSES]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <Link href="/vendor/orders">
            <Button variant="ghost">
              <LucideArrowLeft className="w-5 h-5" />
              Back to Orders
            </Button>
          </Link>
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
            size="lg"
          >
            {statusConfig.label}
          </Badge>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order {order.orderNumber}
          </h2>
          <p className="text-gray-600">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Update Order Status */}
          <UpdateOrderStatus
            currentStatus={order.orderStatus}
            orderId={order.id}
          />

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
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.images?.[0]?.url || ''}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.product.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      SKU: {item.product.sku}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                    {item.customization && (
                      <p className="text-sm text-primary-600 mt-1">
                        Customization: {item.customization}
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

          {/* Order Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Customer Notes
              </h3>
              <p className="text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LucidePackage className="w-5 h-5" />
              Customer Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-medium text-gray-900">
                  {order.customerName}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <LucideMail className="w-4 h-4 text-gray-400" />
                <a
                  href={`mailto:${order.customerEmail}`}
                  className="text-primary-600 hover:underline"
                >
                  {order.customerEmail}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <LucidePhone className="w-4 h-4 text-gray-400" />
                <a
                  href={`tel:${order.customerPhone}`}
                  className="text-primary-600 hover:underline"
                >
                  {order.customerPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LucideMapPin className="w-5 h-5" />
              Shipping Address
            </h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.region}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <LucideCreditCard className="w-5 h-5" />
              Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Method</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {order.paymentMethod.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge
                  variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}
                  size="sm"
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {formatPrice(order.shippingCost)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">{formatPrice(order.tax)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">
                    -{formatPrice(order.discount)}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}