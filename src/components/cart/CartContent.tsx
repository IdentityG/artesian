'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideTrash2,
  LucideMinus,
  LucidePlus,
  LucideShoppingBag,
  LucideArrowRight,
  LucideTag,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Button from '../ui/Button'
import Input from '../ui/Input'
import EmptyState from '../ui/EmptyState'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import { SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from '@/lib/constants'

const CartContent = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')

  const subtotal = getTotal()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(itemId, newQuantity)
    toast.success('Cart updated')
  }

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId)
    toast.success('Item removed from cart')
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast.error('Invalid coupon code')
      // Implement coupon logic here
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <EmptyState
          icon={<LucideShoppingBag className="w-16 h-16" />}
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet"
          action={{
            label: 'Continue Shopping',
            onClick: () => (window.location.href = '/products'),
          }}
        />
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex gap-6">
                {/* Product Image */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={item.product.images[0]?.url || ''}
                    alt={item.product.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        by {item.product.vendorName}
                      </p>
                      {item.customization && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.customization}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LucideTrash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <LucideMinus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold text-gray-900 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.stock}
                        className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <LucidePlus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {formatPrice(item.subtotal)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(item.price)} each
                      </div>
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.product.stock < 10 && (
                    <p className="text-sm text-orange-600 mt-2">
                      Only {item.product.stock} left in stock
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart()
                  toast.success('Cart cleared')
                }
              }}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  leftIcon={<LucideTag className="w-4 h-4" />}
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="outline"
                  size="sm"
                  disabled={!couponCode.trim()}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal ({items.length} items)</span>
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
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-gray-600">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for
                  free shipping!
                </p>
              )}
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

            {/* Checkout Button */}
            <Link href="/checkout">
              <Button variant="primary" size="lg" className="w-full mb-3">
                Proceed to Checkout
                <LucideArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link href="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>7-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Support local artisans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartContent