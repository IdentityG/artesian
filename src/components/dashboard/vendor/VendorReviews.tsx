'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  LucideStar,
  LucideThumbsUp,
  LucideMessageSquare,
  LucideFilter,
  LucideSearch,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import RatingStars from '@/components/shared/RatingStars'
import EmptyState from '@/components/ui/EmptyState'
import { formatRelativeTime } from '@/lib/utils'

const VendorReviews = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState<'all' | number>('all')

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      productId: 'p1',
      productName: 'Traditional Habesha Kemis - White with Gold Embroidery',
      productImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=100',
      customerName: 'Hana Mulugeta',
      customerAvatar: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      comment:
        'Absolutely beautiful! The craftsmanship is exceptional and the quality is outstanding. I love supporting local artisans and this purchase did not disappoint.',
      images: [],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 12,
      replied: true,
      reply: 'Thank you so much for your kind words! We are thrilled you love it.',
    },
    {
      id: '2',
      productId: 'p2',
      productName: 'Handcrafted Ethiopian Leather Messenger Bag',
      productImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
      customerName: 'Michael Haile',
      customerAvatar: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      comment:
        'The leather messenger bag I purchased exceeded my expectations. The craftsmanship is top-notch and it gets better with age. Supporting local artisans while getting quality products is amazing!',
      images: [],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 8,
      replied: false,
    },
    {
      id: '3',
      productId: 'p3',
      productName: 'Ethiopian Cross Pendant Necklace - Sterling Silver',
      productImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100',
      customerName: 'Sara Johnson',
      customerAvatar: 'https://i.pravatar.cc/150?img=47',
      rating: 4,
      comment:
        'Very nice quality. Took a bit longer than expected but totally worth the wait. The handmade quality really shows.',
      images: [],
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      helpful: 5,
      replied: false,
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRating =
      filterRating === 'all' || review.rating === filterRating

    return matchesSearch && matchesRating
  })

  const stats = {
    average: 4.8,
    total: reviews.length,
    distribution: {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    },
  }

  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const handleSubmitReply = (reviewId: string) => {
    // Simulate API call
    console.log('Reply to', reviewId, ':', replyText)
    setReplyingTo(null)
    setReplyText('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Customer Reviews
            </h2>
            <p className="text-gray-600">
              Manage and respond to customer feedback
            </p>
          </div>
        </div>
      </div>

      {/* Overall Rating */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {stats.average.toFixed(1)}
            </div>
            <RatingStars rating={stats.average} size="lg" />
            <p className="text-gray-600 mt-2">
              Based on {stats.total} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.distribution[rating as keyof typeof stats.distribution]
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0

              return (
                <div key={rating} className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterRating(rating)}
                    className="flex items-center gap-1 w-16 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-sm font-medium">{rating}</span>
                    <LucideStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </button>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<LucideSearch className="w-5 h-5" />}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterRating === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterRating === rating
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Product Info */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${review.productId}`}
                    className="font-medium text-gray-900 hover:text-primary-600 line-clamp-1"
                  >
                    {review.productName}
                  </Link>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={review.customerAvatar}
                    alt={review.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.customerName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <RatingStars rating={review.rating} size="sm" />
                        <span className="text-sm text-gray-500">
                          {formatRelativeTime(review.createdAt)}
                        </span>
                      </div>
                    </div>
                    {review.replied && (
                      <Badge variant="success" size="sm">
                        Replied
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-3">
                    {review.comment}
                  </p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-lg overflow-hidden"
                        >
                          <img
                            src={image}
                            alt={`Review image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LucideThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} people found this helpful</span>
                  </div>

                  {/* Vendor Reply */}
                  {review.replied && review.reply && (
                    <div className="mt-4 p-4 bg-primary-50 border border-primary-100 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          V
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">
                            Vendor Response
                          </p>
                          <p className="text-gray-700 text-sm">{review.reply}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reply Form */}
                  {!review.replied && (
                    <div className="mt-4">
                      {replyingTo === review.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your response..."
                            rows={3}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSubmitReply(review.id)}
                              variant="primary"
                              size="sm"
                            >
                              Submit Reply
                            </Button>
                            <Button
                              onClick={() => {
                                setReplyingTo(null)
                                setReplyText('')
                              }}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setReplyingTo(review.id)}
                          variant="outline"
                          size="sm"
                        >
                          <LucideMessageSquare className="w-4 h-4" />
                          Reply to Review
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucideStar className="w-16 h-16" />}
            title="No reviews found"
            description={
              searchQuery || filterRating !== 'all'
                ? 'Try adjusting your filters'
                : 'You have no reviews yet'
            }
          />
        </div>
      )}
    </div>
  )
}

export default VendorReviews