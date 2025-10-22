'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideHeart,
  LucideShoppingCart,
  LucideEye,
  LucideStar,
} from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
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

  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]?.url || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
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
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="warning" size="sm">
                Only {product.stock} left
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute top-3 right-3 flex flex-col gap-2"
          >
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <LucideHeart
                className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
              />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-primary-500 hover:text-white transition-colors">
              <LucideEye className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-primary-600 font-medium mb-2">
            {product.category.name}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.title}
          </h3>

          {/* Vendor */}
          <div className="flex items-center gap-2 mb-3">
            {product.vendorLogo && (
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={product.vendorLogo}
                  alt={product.vendorName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-xs text-gray-600">{product.vendorName}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <LucideStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.totalReviews})
            </span>
          </div>

          {/* Price */}
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

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            variant="primary"
            className="w-full"
            size="sm"
          >
            <LucideShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>

        {/* Handmade Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="text-xs bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700 font-medium">
            🇪🇹 Made in {product.handmadeIn}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductCard