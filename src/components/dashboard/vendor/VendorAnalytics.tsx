'use client'

import { useState } from 'react'
import {
  LucideTrendingUp,
  LucideTrendingDown,
  LucideUsers,
  LucideEye,
  LucideShoppingCart,
  LucidePackage,
  LucideDollarSign,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

const VendorAnalytics = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')

  // Mock data
  const stats = {
    revenue: {
      current: 45780,
      previous: 38920,
      change: 17.6,
    },
    orders: {
      current: 89,
      previous: 76,
      change: 17.1,
    },
    customers: {
      current: 67,
      previous: 54,
      change: 24.1,
    },
    views: {
      current: 12450,
      previous: 9870,
      change: 26.1,
    },
    conversionRate: {
      current: 3.2,
      previous: 2.8,
      change: 14.3,
    },
    averageOrderValue: {
      current: 514.4,
      previous: 512.1,
      change: 0.4,
    },
  }

  const revenueData = [
    { month: 'Jan', revenue: 28500, orders: 65 },
    { month: 'Feb', revenue: 32100, orders: 71 },
    { month: 'Mar', revenue: 29800, orders: 68 },
    { month: 'Apr', revenue: 35600, orders: 78 },
    { month: 'May', revenue: 38900, orders: 82 },
    { month: 'Jun', revenue: 45780, orders: 89 },
  ]

  const categoryData = [
    { name: 'Traditional Clothing', value: 35, color: '#f07617' },
    { name: 'Jewelry', value: 25, color: '#22c55e' },
    { name: 'Leather Goods', value: 20, color: '#3b82f6' },
    { name: 'Home Decor', value: 15, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#8b5cf6' },
  ]

  const topProducts = [
    {
      id: '1',
      name: 'Traditional Habesha Kemis',
      sales: 45,
      revenue: 157500,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=100',
    },
    {
      id: '2',
      name: 'Leather Messenger Bag',
      sales: 32,
      revenue: 89600,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100',
    },
    {
      id: '3',
      name: 'Ethiopian Cross Pendant',
      sales: 28,
      revenue: 51800,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100',
    },
  ]

  const trafficSources = [
    { source: 'Direct', visits: 4250, percentage: 34 },
    { source: 'Search', visits: 3125, percentage: 25 },
    { source: 'Social Media', visits: 2500, percentage: 20 },
    { source: 'Referral', visits: 1875, percentage: 15 },
    { source: 'Email', visits: 750, percentage: 6 },
  ]

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: any) => {
    const isPositive = change >= 0

    return (
      <Card hover padding="md" className="border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isPositive ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <Icon className={`w-6 h-6 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <Badge variant={isPositive ? 'success' : 'danger'} size="sm">
            {isPositive ? <LucideTrendingUp className="w-3 h-3" /> : <LucideTrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </Badge>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">
          {prefix}{typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}{suffix}
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
              Analytics & Insights
            </h2>
            <p className="text-gray-600">
              Track your store performance and growth
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.revenue.current}
          change={stats.revenue.change}
          icon={LucideDollarSign}
          prefix="ETB "
        />
        <StatCard
          title="Total Orders"
          value={stats.orders.current}
          change={stats.orders.change}
          icon={LucideShoppingCart}
        />
        <StatCard
          title="Customers"
          value={stats.customers.current}
          change={stats.customers.change}
          icon={LucideUsers}
        />
        <StatCard
          title="Store Views"
          value={stats.views.current}
          change={stats.views.change}
          icon={LucideEye}
        />
        <StatCard
          title="Conversion Rate"
          value={stats.conversionRate.current}
          change={stats.conversionRate.change}
          icon={LucideTrendingUp}
          suffix="%"
        />
        <StatCard
          title="Avg Order Value"
          value={stats.averageOrderValue.current.toFixed(2)}
          change={stats.averageOrderValue.change}
          icon={LucidePackage}
          prefix="ETB "
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Orders Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Revenue & Orders Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f07617"
                strokeWidth={2}
                dot={{ fill: '#f07617' }}
                name="Revenue (ETB)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.sales} sales
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatPrice(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {source.source}
                  </span>
                  <span className="text-sm text-gray-600">
                    {source.visits.toLocaleString()} visits ({source.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorAnalytics