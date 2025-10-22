'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LucideX, LucideShoppingBag, LucideTrash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import Button from '../ui/Button'
import { formatPrice } from '@/lib/utils'
import EmptyState from '../ui/EmptyState'

const CartDrawer = () => {
  const { isCartDrawerOpen, toggleCartDrawer } = useUIStore()
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  const total = getTotal()

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCartDrawer}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Shopping Cart ({items.length})
              </h2>
              <button
                onClick={toggleCartDrawer}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LucideX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <EmptyState
                  icon={<LucideShoppingBag className="w-16 h-16" />}
                  title="Your cart is empty"
                  description="Add some amazing handmade products to get started!"
                  action={{
                    label: 'Continue Shopping',
                    onClick: toggleCartDrawer,
                  }}
                />
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]?.url || ''}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <LucideTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" onClick={toggleCartDrawer}>
                  <Button variant="primary" className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/cart" onClick={toggleCartDrawer}>
                  <Button variant="outline" className="w-full">
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer