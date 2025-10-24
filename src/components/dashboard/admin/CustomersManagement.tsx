'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideSearch,
  LucideMail,
  LucidePhone,
  LucideMapPin,
  LucideShoppingBag,
  LucideHeart,
  LucideCalendar,
  LucideEye,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import { formatDate, formatPrice } from '@/lib/utils'

const CustomersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock customers data
  const customers = [
    {
      id: 'c1',
      firstName: 'Hana',
      lastName: 'Mulugeta',
      email: 'hana@email.com',
      phone: '+251911111111',
      avatar: 'https://i.pravatar.cc/150?img=20',
      city: 'Addis Ababa',
      region: 'Addis Ababa',
      totalOrders: 12,
      totalSpent: 45600,
      wishlistItems: 8,
      lastOrder: '2024-01-15T10:00:00Z',
      createdAt: '2023-08-10T09:00:00Z',
      isVerified: true,
    },
    {
      id: 'c2',
      firstName: 'Michael',
      lastName: 'Haile',
      email: 'michael@email.com',
      phone: '+251922222222',
      avatar: 'https://i.pravatar.cc/150?img=33',
      city: 'Addis Ababa',
      region: 'Addis Ababa',
      totalOrders: 8,
      totalSpent: 32400,
      wishlistItems: 5,
      lastOrder: '2024-01-10T14:30:00Z',
      createdAt: '2023-09-15T11:00:00Z',
      isVerified: true,
    },
    {
      id: 'c3',
      firstName: 'Sara',
      lastName: 'Johnson',
      email: 'sara@email.com',
      phone: '+251933333333',
      avatar: 'https://i.pravatar.cc/150?img=47',
      city: 'Addis Ababa',
      region: 'Addis Ababa',
      totalOrders: 5,
      totalSpent: 18900,
      wishlistItems: 12,
      lastOrder: '2024-01-08T16:20:00Z',
      createdAt: '2023-10-20T13:00:00Z',
      isVerified: false,
    },
    {
      id: 'c4',
      firstName: 'David',
      lastName: 'Bekele',
      email: 'david@email.com',
      phone: '+251944444444',
      avatar: 'https://i.pravatar.cc/150?img=12',
      city: 'Bahir Dar',
      region: 'Amhara',
      totalOrders: 15,
      totalSpent: 67800,
      wishlistItems: 6,
      lastOrder: '2024-01-12T09:15:00Z',
      createdAt: '2023-07-05T10:30:00Z',
      isVerified: true,
    },
  ]

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: customers.length,
    verified: customers.filter((c) => c.isVerified).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue:
      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
      customers.reduce((sum, c) => sum + c.totalOrders, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Customers Management
            </h2>
            <p className="text-gray-600">
              Monitor and manage all customers
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Total Customers</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              👥
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600 mt-1">
            {stats.verified} verified
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Total Revenue</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              💰
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(stats.totalRevenue)}
          </p>
          <p className="text-sm text-gray-600 mt-1">From all customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Avg Order Value</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(stats.avgOrderValue)}
          </p>
          <p className="text-sm text-gray-600 mt-1">Per transaction</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Total Orders</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              📦
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">All time</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Search customers by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<LucideSearch className="w-5 h-5" />}
        />
      </div>

      {/* Customers Table */}
      {filteredCustomers.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Orders
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Total Spent
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Joined
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={customer.avatar}
                            alt={customer.firstName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </p>
                          <p className="text-sm text-gray-600">
                            ID: {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LucideMail className="w-4 h-4" />
                          <a
                            href={`mailto:${customer.email}`}
                            className="text-purple-600 hover:underline truncate max-w-xs"
                          >
                            {customer.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <LucidePhone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LucideMapPin className="w-4 h-4" />
                        <span>
                          {customer.city}, {customer.region}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">
                          {customer.totalOrders}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last: {formatDate(customer.lastOrder)}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(customer.totalSpent)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <LucideHeart className="w-3 h-3" />
                        {customer.wishlistItems} wishlist
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <LucideCalendar className="w-4 h-4" />
                        {formatDate(customer.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant={customer.isVerified ? 'success' : 'warning'}
                        size="sm"
                      >
                        {customer.isVerified ? 'Verified' : 'Unverified'}
                      </Badge>
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
            title="No customers found"
            description="Try adjusting your search"
          />
        </div>
      )}
    </div>
  )
}

export default CustomersManagement