'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideSearch,
  LucideFilter,
  LucideEye,
  LucideEyeOff,
  LucideTrash2,
  LucideAlertCircle,
  LucideCheck,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import RatingStars from '@/components/shared/RatingStars'
import EmptyState from '@/components/ui/EmptyState'
import { formatPrice } from '@/lib/utils'
import productsData from '@/data/sampleProducts.json'
import { toast } from 'react-hot-toast'
import { Product } from '@/types'

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'flagged'>('all')
  const [products, setProducts] = useState<Product[]>(productsData as Product[])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === 'all' || product.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    flagged: 3, // Mock flagged products
    outOfStock: products.filter((p) => p.stock === 0).length,
  }

  const handleToggleStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === 'active' ? ('draft' as const) : ('active' as const) }
          : p
      )
    )
    toast.success('Product status updated')
  }

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
      toast.success('Product deleted successfully')
    }
  }

  const handleApprove = (productId: string) => {
    toast.success('Product approved and published')
  }

  const statusTabs = [
    { id: 'all', label: 'All Products', count: stats.total },
    { id: 'active', label: 'Active', count: stats.active },
    { id: 'draft', label: 'Draft', count: stats.draft },
    { id: 'flagged', label: 'Flagged', count: stats.flagged },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Products Management
            </h2>
            <p className="text-gray-600">
              Monitor and manage all products on the platform
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'all'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div
          onClick={() => setFilterStatus('active')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'active'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div
          onClick={() => setFilterStatus('draft')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'draft'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div
          onClick={() => setFilterStatus('flagged')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'flagged'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Flagged</p>
          <p className="text-2xl font-bold text-red-600">{stats.flagged}</p>
        </div>
        <div className="p-4 rounded-xl border-2 border-gray-200 bg-white">
          <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-orange-600">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Search products by name, vendor, or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<LucideSearch className="w-5 h-5" />}
        />
      </div>

      {/* Products Table */}
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Vendor
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    SKU
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.images[0]?.url || ''}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-medium text-gray-900 hover:text-purple-600 line-clamp-1"
                          >
                            {product.title}
                          </Link>
                          <p className="text-sm text-gray-600">
                            {product.category.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{product.vendorName}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900 font-mono">{product.sku}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      {product.compareAtPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {product.stock === 0 ? (
                        <Badge variant="danger" size="sm">
                          Out of Stock
                        </Badge>
                      ) : product.stock < 10 ? (
                        <Badge variant="warning" size="sm">
                          {product.stock} left
                        </Badge>
                      ) : (
                        <span className="text-sm text-gray-900">{product.stock}</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <RatingStars rating={product.rating} size="sm" />
                        <span className="text-sm text-gray-600">
                          ({product.totalReviews})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={product.status === 'active' ? 'success' : 'default'}
                        size="sm"
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title={
                            product.status === 'active'
                              ? 'Set to Draft'
                              : 'Set to Active'
                          }
                        >
                          {product.status === 'active' ? (
                            <LucideEye className="w-4 h-4" />
                          ) : (
                            <LucideEyeOff className="w-4 h-4" />
                          )}
                        </button>
                        {filterStatus === 'flagged' && (
                          <button
                            onClick={() => handleApprove(product.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve Product"
                          >
                            <LucideCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <LucideTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucideSearch className="w-16 h-16" />}
            title="No products found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : `No ${filterStatus} products`
            }
          />
        </div>
      )}
    </div>
  )
}

export default AdminProducts