'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LucideShoppingCart,
  LucideHeart,
  LucideTruck,
  LucideShield,
  LucideRefreshCw,
  LucideMapPin,
  LucideClock,
  LucideMinus,
  LucidePlus,
  LucideShare2,
} from 'lucide-react'
import { Product } from '@/types'
import ProductGallery from './ProductGallery'
import RatingStars from '../shared/RatingStars'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')

  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const inWishlist = isInWishlist(product.id)
  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : 0

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      product,
      quantity,
      customization: selectedColor ? `Color: ${selectedColor}` : undefined,
      price: product.price,
      subtotal: product.price * quantity,
    })
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.shortDescription || product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <section className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Product Info */}
        <div>
          {/* Vendor */}
          <Link
            href={`/vendors/${product.vendorId}`}
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <span>by {product.vendorName}</span>
            <span>→</span>
          </Link>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.title}
          </h1>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={product.rating} size="lg" showNumber />
            <span className="text-gray-600">
              ({product.totalReviews} reviews)
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">
              {product.totalSales} sold
            </span>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <Badge variant="danger" size="lg">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-sm text-orange-600">
                Only {product.stock} left in stock - order soon!
              </p>
            )}
            {product.stock === 0 && (
              <p className="text-sm text-red-600 font-medium">
                Out of stock
              </p>
            )}
          </div>

          {/* Short Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.shortDescription || product.description.substring(0, 200)}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Color: <span className="text-gray-600">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <LucideMinus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <LucidePlus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              variant="primary"
              size="lg"
              className="flex-1"
            >
              <LucideShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button
              onClick={handleToggleWishlist}
              variant="outline"
              size="lg"
              className={inWishlist ? 'border-red-500 text-red-500' : ''}
            >
              <LucideHeart
                className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
              />
            </Button>
            <Button onClick={handleShare} variant="outline" size="lg">
              <LucideShare2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <LucideTruck className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Free Shipping
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  On orders over 1000 ETB
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <LucideShield className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <LucideRefreshCw className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Easy Returns
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  7-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <LucideClock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Production Time
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  {product.productionTime || '3-5 days'}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900">
                  {product.category.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">SKU</span>
                <span className="font-medium text-gray-900">{product.sku}</span>
              </div>
              {product.materials && product.materials.length > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Materials</span>
                  <span className="font-medium text-gray-900">
                    {product.materials.join(', ')}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Handmade In</span>
                <span className="font-medium text-gray-900 flex items-center gap-1">
                  <LucideMapPin className="w-4 h-4" />
                  {product.handmadeIn}
                </span>
              </div>
              {product.dimensions && (
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-medium text-gray-900">
                    {product.dimensions.length && product.dimensions.width
                      ? `${product.dimensions.length} × ${product.dimensions.width}`
                      : 'N/A'}{' '}
                    {product.dimensions.unit}
                  </span>
                </div>
              )}
              {product.customizable && (
                <div className="py-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Customizable:</strong>{' '}
                      {product.customizationNote || 'This product can be customized to your preferences'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductDetails