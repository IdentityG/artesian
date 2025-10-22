'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LucideChevronDown,
  LucideChevronUp,
  LucideX,
  LucideSlidersHorizontal,
} from 'lucide-react'
import { ProductFilters } from '@/types'
import Input from '../ui/Input'
import Button from '../ui/Button'
import RatingStars from '../shared/RatingStars'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'

interface ProductFilterProps {
  filters: ProductFilters
  onFilterChange: (filters: Partial<ProductFilters>) => void
  categories: any[]
  totalProducts: number
}

const ProductFilter = ({
  filters,
  onFilterChange,
  categories,
  totalProducts,
}: ProductFilterProps) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    region: false,
    availability: true,
  })

  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice?.toString() || '',
    max: filters.maxPrice?.toString() || '',
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceChange = () => {
    onFilterChange({
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    })
  }

  const clearAllFilters = () => {
    setPriceRange({ min: '', max: '' })
    onFilterChange({
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      inStock: undefined,
    })
  }

  const hasActiveFilters =
    filters.category ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.rating !== undefined ||
    filters.inStock !== undefined

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <LucideSlidersHorizontal className="w-5 h-5 text-gray-700" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            leftIcon={
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            rightIcon={
              filters.search ? (
                <button onClick={() => onFilterChange({ search: '' })}>
                  <LucideX className="w-4 h-4" />
                </button>
              ) : null
            }
          />
        </div>

        {/* Categories */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h4 className="font-medium text-gray-900">Categories</h4>
            {expandedSections.category ? (
              <LucideChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <LucideChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={!filters.category}
                    onChange={() => onFilterChange({ category: '' })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-primary-600">
                    All Categories
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {totalProducts}
                  </span>
                </label>
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.slug}
                      onChange={() =>
                        onFilterChange({ category: category.slug })
                      }
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary-600">
                      {category.name}
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      {category.productsCount}
                    </span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h4 className="font-medium text-gray-900">Price Range</h4>
            {expandedSections.price ? (
              <LucideChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <LucideChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                    }
                    className="text-sm"
                  />
                  <span className="text-gray-500">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                    }
                    className="text-sm"
                  />
                </div>
                <Button
                  onClick={handlePriceChange}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  Apply
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rating */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h4 className="font-medium text-gray-900">Rating</h4>
            {expandedSections.rating ? (
              <LucideChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <LucideChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.rating && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => onFilterChange({ rating })}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <RatingStars rating={rating} size="sm" />
                    <span className="text-sm text-gray-600">& up</span>
                  </label>
                ))}
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === undefined}
                    onChange={() => onFilterChange({ rating: undefined })}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">All Ratings</span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Availability */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection('availability')}
            className="flex items-center justify-between w-full mb-4"
          >
            <h4 className="font-medium text-gray-900">Availability</h4>
            {expandedSections.availability ? (
              <LucideChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <LucideChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <AnimatePresence>
            {expandedSections.availability && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.inStock || false}
                    onChange={(e) =>
                      onFilterChange({ inStock: e.target.checked || undefined })
                    }
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-primary-600">
                    In Stock Only
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default ProductFilter