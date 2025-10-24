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
  LucideImage,
} from 'lucide-react'
import { Product } from '@/types/product'
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
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice && product.discount
    ? product.discount
    : product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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
    e.stopPropagation()
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast('Quick view coming soon!')
  }

  const getImageSrc = () => {
    return product.images && product.images.length > 0 
      ? product.images[0].url 
      : 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&h=800&fit=crop'
  }

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <motion.div
        initial={{ opacity: 1 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500 overflow-hidden border border-gray-100 h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageError ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600" />
                </div>
              )}
              
              <Image
                src={getImageSrc()}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'scale-110' : 'scale-100'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={product.featured}
                quality={85}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <LucideImage className="w-16 h-16 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 font-medium">No image available</p>
            </div>
          )}

          {/* Gradient Overlay on Hover */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {product.featured && (
              <Badge variant="warning" size="sm" className="shadow-lg">
                ⭐ Featured
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="danger" size="sm" className="shadow-lg">
                {discount}% OFF
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="warning" size="sm" className="shadow-lg">
                Only {product.stock} left
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-3 right-3 flex flex-col gap-2 z-20"
          >
            <button
              onClick={handleToggleWishlist}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 shadow-lg ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/95 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <LucideHeart
                className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={handleQuickView}
              className="p-2.5 bg-white/95 backdrop-blur-md rounded-full text-gray-700 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
              aria-label="Quick view"
            >
              <LucideEye className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20 backdrop-blur-sm">
              <div className="text-center">
                <span className="text-white font-bold text-xl mb-2 block">
                  Out of Stock
                </span>
                <span className="text-white/80 text-sm">
                  Check back soon
                </span>
              </div>
            </div>
          )}

          {/* Handmade Badge */}
          {product.handmadeIn && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 z-20"
            >
              <div className="text-xs bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-gray-900 font-semibold shadow-lg border border-white/50">
                🇪🇹 Made in {product.handmadeIn}
              </div>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
              {product.category.name}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3rem]">
            {product.title}
          </h3>

          {/* Vendor */}
          <div className="flex items-center gap-2 mb-3">
            {product.vendorLogo && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                <Image
                  src={product.vendorLogo}
                  alt={product.vendorName}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-xs text-gray-600 truncate font-medium">
              {product.vendorName}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <LucideStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              ({product.totalReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4 mt-auto">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
                {discount > 0 && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    Save {discount}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            variant="primary"
            className="w-full group/btn"
            size="md"
          >
            <LucideShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductCard