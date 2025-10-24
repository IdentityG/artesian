'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LucideUsers,
  LucideStore,
  LucidePackage,
  LucideShoppingBag,
  LucideTrendingUp,
  LucideDollarSign,
  LucideAlertCircle,
  LucideArrowRight,
  LucideCheckCircle,
  LucideXCircle,
  LucideClock,
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'

const AdminDashboard = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')

  // Mock stats
  const stats = {
    totalRevenue: 245780,
    revenueChange: 18.2,
    totalOrders: 1247,
    ordersChange: 12.5,
    totalVendors: 156,
    vendorsChange: 8.3,
    totalCustomers: 3421,
    customersChange: 22.1,
    pendingVendors: 12,
    activeProducts: 1089,
    platformCommission: 36867, // 15% of revenue
  }

  const revenueData = [
    { month: 'Jan', revenue: 185000, commission: 27750 },
    { month: 'Feb', revenue: 198000, commission: 29700 },
    { month: 'Mar', revenue: 212000, commission: 31800 },
    { month: 'Apr', revenue: 225000, commission: 33750 },
    { month: 'May', revenue: 232000, commission: 34800 },
    { month: 'Jun', revenue: 245780, commission: 36867 },
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'vendor',
      message: 'New vendor registration: Tigist Jewelry',
      time: '5 minutes ago',
      status: 'pending',
      icon: LucideStore,
    },
    {
      id: '2',
      type: 'order',
      message: 'High-value order placed: ETB 12,500',
      time: '15 minutes ago',
      status: 'success',
      icon: LucideShoppingBag,
    },
    {
      id: '3',
      type: 'product',
      message: 'Product reported: Requires review',
      time: '1 hour ago',
      status: 'warning',
      icon: LucideAlertCircle,
    },
    {
      id: '4',
      type: 'vendor',
      message: 'Vendor approved: Dawit Leather Workshop',
      time: '2 hours ago',
      status: 'success',
      icon: LucideCheckCircle,
    },
  ]

  const topVendors = [
    {
      id: 'v1',
      name: "Abeba's Traditional Crafts",
      sales: 45,
      revenue: 157500,
      commission: 23625,
    },
    {
      id: 'v2',
      name: "Dawit's Leather Workshop",
      sales: 38,
      revenue: 106400,
      commission: 15960,
    },
    {
      id: 'v3',
      name: "Tigist's Jewelry Collection",
      sales: 52,
      revenue: 96200,
      commission: 14430,
    },
  ]

  const StatCard = ({ title, value, change, icon: Icon, color = 'purple' }: any) => {
    const isPositive = change >= 0
    const colorClasses = {
      purple: 'bg-purple-100 text-purple-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
    }

    return (
      <Card hover padding="md" className="border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant={isPositive ? 'success' : 'danger'} size="sm">
            {isPositive ? <LucideTrendingUp className="w-3 h-3" /> : '↓'}
            {Math.abs(change)}%
          </Badge>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
        </p>
        <p className="text-xs text-gray-500 mt-2">vs. previous {period}</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-gray-600">
              Here's what's happening on your platform today
            </p>
          </div>

          {/* Period Selector */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            {['week', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={LucideDollarSign}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={stats.ordersChange}
          icon={LucideShoppingBag}
          color="blue"
        />
        <StatCard
          title="Active Vendors"
          value={stats.totalVendors}
          change={stats.vendorsChange}
          icon={LucideStore}
          color="purple"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          change={stats.customersChange}
          icon={LucideUsers}
          color="orange"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Platform Commission</h3>
            <LucideDollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {formatPrice(stats.platformCommission)}
          </p>
          <p className="text-sm text-gray-600">15% of total sales</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Pending Vendors</h3>
            <LucideClock className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.pendingVendors}
          </p>
          <Link href="/admin/vendors/pending">
            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 -ml-2">
              Review Now
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Active Products</h3>
            <LucidePackage className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {stats.activeProducts.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Across all vendors</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Revenue & Commission Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#8b5cf6" name="Total Revenue (ETB)" />
              <Bar dataKey="commission" fill="#22c55e" name="Commission (ETB)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'success'
                        ? 'bg-green-100 text-green-600'
                        : activity.status === 'warning'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <Link href="/admin/vendors" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full">
              View All Activity
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Top Performing Vendors</h3>
          <Link href="/admin/vendors">
            <Button variant="ghost" size="sm">
              View All
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Vendor
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Sales
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Commission
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {topVendors.map((vendor, index) => (
                <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0
                          ? 'bg-yellow-100 text-yellow-600'
                          : index === 1
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{vendor.name}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-900">{vendor.sales}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(vendor.revenue)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-green-600">
                      {formatPrice(vendor.commission)}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link href={`/admin/vendors/${vendor.id}`}>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/vendors/pending">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all w-full">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <LucideStore className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Review Vendors</p>
                <p className="text-xs text-gray-600">{stats.pendingVendors} pending</p>
              </div>
            </button>
          </Link>

          <Link href="/admin/orders">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all w-full">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <LucideShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Manage Orders</p>
                <p className="text-xs text-gray-600">View all orders</p>
              </div>
            </button>
          </Link>

          <Link href="/admin/products">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all w-full">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <LucidePackage className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Products</p>
                <p className="text-xs text-gray-600">{stats.activeProducts} active</p>
              </div>
            </button>
          </Link>

          <Link href="/admin/analytics">
            <button className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-orange-50 transition-all w-full">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <LucideTrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-xs text-gray-600">View insights</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard