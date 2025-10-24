'use client'

import { useState } from 'react'
import {
  LucideTrendingUp,
  LucideUsers,
  LucideStore,
  LucideShoppingBag,
  LucideDollarSign,
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
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

const AdminAnalytics = () => {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month')

  // Mock data
  const revenueData = [
    { month: 'Jan', revenue: 185000, commission: 27750, vendors: 145, customers: 2800 },
    { month: 'Feb', revenue: 198000, commission: 29700, vendors: 148, customers: 2950 },
    { month: 'Mar', revenue: 212000, commission: 31800, vendors: 152, customers: 3100 },
    { month: 'Apr', revenue: 225000, commission: 33750, vendors: 154, customers: 3250 },
    { month: 'May', revenue: 232000, commission: 34800, vendors: 155, customers: 3380 },
    { month: 'Jun', revenue: 245780, commission: 36867, vendors: 156, customers: 3421 },
  ]

  const categoryData = [
    { name: 'Traditional Clothing', value: 35, color: '#8b5cf6' },
    { name: 'Jewelry', value: 25, color: '#22c55e' },
    { name: 'Leather Goods', value: 20, color: '#3b82f6' },
    { name: 'Coffee & Spices', value: 12, color: '#f59e0b' },
    { name: 'Home Decor', value: 8, color: '#ef4444' },
  ]

  const regionData = [
    { region: 'Addis Ababa', orders: 567, revenue: 142000 },
    { region: 'Oromia', orders: 234, revenue: 58500 },
    { region: 'Amhara', orders: 189, revenue: 47250 },
    { region: 'Tigray', orders: 123, revenue: 30750 },
    { region: 'SNNPR', orders: 98, revenue: 24500 },
    { region: 'Others', orders: 36, revenue: 9000 },
  ]

  const stats = {
    totalRevenue: 245780,
    revenueGrowth: 18.2,
    totalCommission: 36867,
    commissionGrowth: 18.2,
    totalOrders: 1247,
    ordersGrowth: 12.5,
    activeVendors: 156,
    vendorsGrowth: 8.3,
    totalCustomers: 3421,
    customersGrowth: 22.1,
    conversionRate: 3.8,
  }

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => {
    const isPositive = change >= 0

    return (
      <Card hover padding="md" className="border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant={isPositive ? 'success' : 'danger'} size="sm">
            {isPositive ? <LucideTrendingUp className="w-3 h-3" /> : '↓'}
            {Math.abs(change)}%
          </Badge>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
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
              Platform Analytics
            </h2>
            <p className="text-gray-600">
              Comprehensive insights and performance metrics
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
          value={formatPrice(stats.totalRevenue)}
          change={stats.revenueGrowth}
          icon={LucideDollarSign}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Platform Commission"
          value={formatPrice(stats.totalCommission)}
          change={stats.commissionGrowth}
          icon={LucideTrendingUp}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersGrowth}
          icon={LucideShoppingBag}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Active Vendors"
          value={stats.activeVendors}
          change={stats.vendorsGrowth}
          icon={LucideStore}
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={stats.customersGrowth}
          icon={LucideUsers}
          color="bg-pink-100 text-pink-600"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change={12.5}
          icon={LucideTrendingUp}
          color="bg-indigo-100 text-indigo-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Commission Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Revenue & Commission Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue (ETB)"
              />
              <Area
                type="monotone"
                dataKey="commission"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorCommission)"
                name="Commission (ETB)"
              />
            </AreaChart>
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
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Platform Growth
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
                dataKey="vendors"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b' }}
                name="Vendors"
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
                name="Customers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Regional Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#6b7280" fontSize={12} />
              <YAxis dataKey="region" type="category" stroke="#6b7280" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="orders" fill="#8b5cf6" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Details Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Regional Revenue Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Region
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Orders
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Revenue
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Commission
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody>
              {regionData.map((region, index) => {
                const commission = region.revenue * 0.15
                const avgOrderValue = region.revenue / region.orders

                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{region.region}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{region.orders}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(region.revenue)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-green-600">
                        {formatPrice(commission)}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{formatPrice(avgOrderValue)}</p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics