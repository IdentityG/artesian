'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LucideStar, LucideThumbsUp } from 'lucide-react'
import { Product } from '@/types'
import RatingStars from '../shared/RatingStars'
import Button from '../ui/Button'
import { formatRelativeTime } from '@/lib/utils'

interface ProductReviewsProps {
  product: Product
}

// Sample reviews data
const sampleReviews = [
  {
    id: '1',
    userId: 'u1',
    userName: 'Hana Mulugeta',
    userAvatar: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    comment:
      'Absolutely beautiful! The craftsmanship is exceptional and the quality is outstanding. I love supporting local artisans and this purchase did not disappoint.',
    images: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 12,
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Michael Haile',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    comment:
      'Great product and fast shipping! The attention to detail is incredible. Highly recommend!',
    images: [],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 8,
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Sara Johnson',
    userAvatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4,
    comment:
      'Very nice quality. Took a bit longer than expected but totally worth the wait. The handmade quality really shows.',
    images: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: 5,
  },
]

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const [showAllReviews, setShowAllReviews] = useState(false)

  const reviews = product.reviews || sampleReviews
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <section className="bg-white border-y border-gray-200">
      <div className="container-custom py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {product.rating.toFixed(1)}
                </div>
                <RatingStars rating={product.rating} size="lg" />
                <p className="text-gray-600 mt-2">
                  Based on {product.totalReviews} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-gray-700">
                        {rating}
                      </span>
                      <LucideStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="primary" className="w-full mt-6">
                Write a Review
              </Button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                {/* Reviewer Info */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={review.userAvatar}
                      alt={review.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {review.userName}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {formatRelativeTime(review.createdAt)}
                      </span>
                    </div>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`Review image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  <LucideThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </motion.div>
            ))}

            {/* Show More Button */}
            {reviews.length > 3 && !showAllReviews && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAllReviews(true)}
                >
                  Show All {reviews.length} Reviews
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductReviews