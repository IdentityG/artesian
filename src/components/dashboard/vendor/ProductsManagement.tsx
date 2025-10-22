'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucidePlus,
  LucideSearch,
  LucideFilter,
  LucideEdit,
  LucideTrash2,
  LucideEye,
  LucideEyeOff,
  LucideMoreVertical,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { formatPrice } from '@/lib/utils'
import productsData from '@/data/sampleProducts.json'
import { toast } from 'react-hot-toast'
import { Product } from '@/types'

const ProductsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'out_of_stock'>('all')
  const [products, setProducts] = useState<Product[]>(productsData as Product[])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'out_of_stock' && product.stock === 0) ||
      product.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
      toast.success('Product deleted successfully')
    }
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

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === 'active').length,
    draft: products.filter((p) => p.status === 'draft').length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Products Management
            </h2>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <Link href="/vendor/products/new">
            <Button variant="primary" size="lg">
              <LucidePlus className="w-5 h-5" />
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'all'
              ? 'border-primary-600 bg-primary-50'
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
              ? 'border-primary-600 bg-primary-50'
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
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div
          onClick={() => setFilterStatus('out_of_stock')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            filterStatus === 'out_of_stock'
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<LucideSearch className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline">
            <LucideFilter className="w-5 h-5" />
            More Filters
          </Button>
        </div>
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
                    SKU
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Sales
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
                          <p className="font-medium text-gray-900 truncate max-w-xs">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.category.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900 font-mono">
                        {product.sku}
                      </p>
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
                        <span className="text-sm text-gray-900">
                          {product.stock}
                        </span>
                      )}
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
                      <Badge
                        variant={
                          product.status === 'active'
                            ? 'success'
                            : 'default'
                        }
                        size="sm"
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">
                        {product.totalSales}
                      </p>
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
                        <Link href={`/vendor/products/${product.id}/edit`}>
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <LucideEdit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
            icon={<LucidePlus className="w-16 h-16" />}
            title="No products found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : 'Start by adding your first product'
            }
            action={
              !searchQuery
                ? {
                    label: 'Add Product',
                    onClick: () => (window.location.href = '/vendor/products/new'),
                  }
                : undefined
            }
          />
        </div>
      )}
    </div>
  )
}

export default ProductsManagement