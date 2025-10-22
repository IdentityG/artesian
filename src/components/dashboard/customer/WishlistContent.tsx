'use client'

import { LucideHeart, LucideShoppingCart, LucideTrash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import RatingStars from '@/components/shared/RatingStars'
import { formatPrice } from '@/lib/utils'
import { toast } from 'react-hot-toast'

const WishlistContent = () => {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  const handleRemove = (productId: string) => {
    removeItem(productId)
    toast.success('Removed from wishlist')
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      price: product.price,
      subtotal: product.price,
    })
    toast.success('Added to cart!')
  }

  const handleAddAllToCart = () => {
    items.forEach((product) => {
      addToCart({
        id: `cart-${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        price: product.price,
        subtotal: product.price,
      })
    })
    toast.success(`Added ${items.length} items to cart!`)
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <EmptyState
          icon={<LucideHeart className="w-16 h-16" />}
          title="Your wishlist is empty"
          description="Save your favorite items to buy them later"
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
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              My Wishlist
            </h2>
            <p className="text-gray-600 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Button onClick={handleAddAllToCart} variant="primary">
            <LucideShoppingCart className="w-5 h-5" />
            Add All to Cart
          </Button>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <Link
              href={`/products/${product.slug}`}
              className="relative aspect-square bg-gray-100 block overflow-hidden"
            >
              <Image
                src={product.images[0]?.url || ''}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleRemove(product.id)
                }}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <LucideTrash2 className="w-5 h-5" />
              </button>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>
              </Link>

              <p className="text-sm text-gray-600 mb-3">
                by {product.vendorName}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <RatingStars rating={product.rating} size="sm" />
                <span className="text-sm text-gray-600">
                  ({product.totalReviews})
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              {product.stock === 0 ? (
                <p className="text-sm text-red-600 font-medium mb-3">
                  Out of Stock
                </p>
              ) : product.stock < 10 ? (
                <p className="text-sm text-orange-600 mb-3">
                  Only {product.stock} left
                </p>
              ) : null}

              {/* Add to Cart Button */}
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
                variant="primary"
                size="sm"
                className="w-full"
              >
                <LucideShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default WishlistContent