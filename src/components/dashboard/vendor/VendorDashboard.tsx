'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LucidePackage,
  LucideShoppingBag,
  LucideTrendingUp,
  LucideStar,
  LucidePlus,
  LucideArrowRight,
  LucideEye,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'
import SalesChart from './SalesChart'
import RecentOrders from './RecentOrders'

const VendorDashboard = () => {
  // Mock data - replace with real data from API
  const stats = {
    totalRevenue: 45780,
    totalOrders: 89,
    totalProducts: 24,
    activeProducts: 20,
    pendingOrders: 5,
    averageRating: 4.8,
    totalViews: 12450,
    conversionRate: 3.2,
  }

  const recentActivity = [
    {
      id: '1',
      type: 'order',
      message: 'New order #ART-123456 received',
      time: '5 minutes ago',
      status: 'pending',
    },
    {
      id: '2',
      type: 'review',
      message: 'New 5-star review on "Habesha Kemis"',
      time: '1 hour ago',
      status: 'success',
    },
    {
      id: '3',
      type: 'product',
      message: 'Product "Leather Bag" is running low on stock',
      time: '2 hours ago',
      status: 'warning',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-gray-600">
              Here's what's happening with your store today
            </p>
          </div>
          <Link href="/vendor/products/new">
            <Button variant="primary">
              <LucidePlus className="w-5 h-5" />
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <Card hover padding="md" className="border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <LucideTrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <Badge variant="success" size="sm">
              +12%
            </Badge>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Total Revenue
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(stats.totalRevenue)}
          </p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </Card>

        {/* Total Orders */}
        <Card hover padding="md" className="border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LucideShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            {stats.pendingOrders > 0 && (
              <Badge variant="warning" size="sm">
                {stats.pendingOrders} pending
              </Badge>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Total Orders
          </h3>
          <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          <p className="text-xs text-gray-500 mt-2">All time</p>
        </Card>

        {/* Products */}
        <Card hover padding="md" className="border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <LucidePackage className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-xs text-gray-600">
              {stats.activeProducts} active
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Total Products
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalProducts}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {stats.totalProducts - stats.activeProducts} drafts
          </p>
        </Card>

        {/* Rating */}
        <Card hover padding="md" className="border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LucideStar className="w-6 h-6 text-yellow-600" />
            </div>
            <Badge variant="success" size="sm">
              Excellent
            </Badge>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            Average Rating
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {stats.averageRating.toFixed(1)} ★
          </p>
          <p className="text-xs text-gray-500 mt-2">Based on all reviews</p>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/vendor/analytics" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vendor/products/new">
            <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all w-full text-left">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <LucidePlus className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-xs text-gray-600">Create new listing</p>
              </div>
            </button>
          </Link>

          <Link href="/vendor/orders">
            <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all w-full text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <LucideShoppingBag className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Orders</p>
                <p className="text-xs text-gray-600">
                  {stats.pendingOrders} pending
                </p>
              </div>
            </button>
          </Link>

          <Link href="/vendor/analytics">
            <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all w-full text-left">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <LucideEye className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-xs text-gray-600">
                  {stats.totalViews} views
                </p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VendorDashboard