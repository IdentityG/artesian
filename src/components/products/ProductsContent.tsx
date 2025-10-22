'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideLayoutGrid, LucideList, LucideSlidersHorizontal, LucideX } from 'lucide-react'
import ProductGrid from './ProductGrid'
import ProductFilter from './ProductFilter'
import ProductSort from './ProductSort'
import productsData from '@/data/sampleProducts.json'
import categoriesData from '@/data/categories.json'
import { Product, ProductFilters } from '@/types'
import Pagination from '../ui/Pagination'
import EmptyState from '../ui/EmptyState'
import Button from '../ui/Button'
import { ITEMS_PER_PAGE } from '@/lib/constants'

const ProductsContent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    inStock: undefined,
    sortBy: 'newest',
  })

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData] as Product[]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category.slug === filters.category
      )
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= filters.minPrice!)
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= filters.maxPrice!)
    }

    // Rating filter
    if (filters.rating !== undefined) {
      filtered = filtered.filter((product) => product.rating >= filters.rating!)
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.stock > 0)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        filtered.sort((a, b) => b.totalSales - a.totalSales)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
    }

    return filtered
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-full lg:w-64 flex-shrink-0">
          <ProductFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categoriesData}
            totalProducts={filteredProducts.length}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Results count */}
              <p className="text-gray-600">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                  {paginatedProducts.length}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{' '}
                products
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <LucideSlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort */}
                <div className="flex-1 sm:flex-initial">
                  <ProductSort
                    value={filters.sortBy || 'newest'}
                    onChange={(sortBy) => handleFilterChange({ sortBy })}
                  />
                </div>

                {/* View mode toggle */}
                <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LucideLayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white shadow-sm text-primary-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LucideList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            {paginatedProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProductGrid products={paginatedProducts} viewMode={viewMode} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <EmptyState
                  icon={
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  title="No products found"
                  description="Try adjusting your filters or search criteria"
                  action={{
                    label: 'Clear Filters',
                    onClick: () => {
                      setFilters({
                        search: '',
                        category: '',
                        minPrice: undefined,
                        maxPrice: undefined,
                        rating: undefined,
                        inStock: undefined,
                        sortBy: 'newest',
                      })
                    },
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Filter Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LucideX className="w-5 h-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="p-6">
                <ProductFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  categories={categoriesData}
                  totalProducts={filteredProducts.length}
                />
              </div>

              {/* Apply Button */}
              <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white">
                <Button
                  onClick={() => setShowMobileFilters(false)}
                  variant="primary"
                  className="w-full"
                >
                  Show {filteredProducts.length} Products
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductsContent