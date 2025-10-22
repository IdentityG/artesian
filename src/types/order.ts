import { Address, OrderStatus, PaymentStatus, PaymentMethod } from './common'
import { Product } from './product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  customization?: string
  price: number
  subtotal: number
}

export interface OrderItem extends CartItem {
  vendorId: string
  vendorName: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  orderStatus: OrderStatus
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
  cancelledAt?: string
}

export interface VendorOrder extends Order {
  commission: number
  vendorEarnings: number
}