'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideHeart,
  LucideShoppingCart,
  LucideStar,
  LucideImage,
} from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatPrice, calculateDiscount, truncateText } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface ProductListCardProps {
  product: Product
}

const ProductListCard = ({ product }: ProductListCardProps) => {
  const [imageError, setImageError] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      price: product.price,
      subtotal: product.price,
    })
    toast.success('Added to cart!')
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  const productImage = product.images && product.images.length > 0 
    ? product.images[0]?.url 
    : null

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          {/* Image */}
          <div className="relative w-full sm:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            {productImage && !imageError ? (
              <Image
                src={productImage}
                alt={product.title}
                fill
                sizes="192px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <LucideImage className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.featured && (
                <Badge variant="warning" size="sm">
                  Featured
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="danger" size="sm">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

            {/* Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Category & Vendor */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary-600 font-medium">
                  {product.category.name}
                </span>
                <span className="text-xs text-gray-500">
                  by {product.vendorName}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {product.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.shortDescription || truncateText(product.description, 120)}
              </p>

              {/* Rating & Location */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <LucideStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.totalReviews})
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  🇪🇹 {product.handmadeIn}
                </span>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between">
              {/* Price */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {product.stock < 10 && product.stock > 0 && (
                  <p className="text-xs text-orange-600 mt-1">
                    Only {product.stock} left in stock
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2 rounded-lg transition-colors ${
                    inWishlist
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <LucideHeart
                    className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
                  />
                </button>
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  variant="primary"
                  size="sm"
                >
                  <LucideShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductListCard