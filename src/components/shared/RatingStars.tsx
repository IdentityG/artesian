'use client'

import { LucideStar } from 'lucide-react'
import { cn } from '@/lib/cn'

interface RatingStarsProps {
  rating: number
  totalStars?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  interactive?: boolean
  onRate?: (rating: number) => void
}

const RatingStars = ({
  rating,
  totalStars = 5,
  size = 'md',
  showNumber = false,
  interactive = false,
  onRate,
}: RatingStarsProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleClick = (index: number) => {
    if (interactive && onRate) {
      onRate(index + 1)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }).map((_, index) => {
        const isFilled = index < Math.floor(rating)
        const isPartial = index === Math.floor(rating) && rating % 1 !== 0

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            disabled={!interactive}
            className={cn(
              'relative',
              interactive && 'cursor-pointer hover:scale-110 transition-transform'
            )}
          >
            <LucideStar
              className={cn(
                sizes[size],
                isFilled || isPartial
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
            {isPartial && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }}
              >
                <LucideStar
                  className={cn(sizes[size], 'fill-yellow-400 text-yellow-400')}
                />
              </div>
            )}
          </button>
        )
      })}
      {showNumber && (
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default RatingStars