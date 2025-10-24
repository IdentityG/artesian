'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  LucideSearch,
  LucideFilter,
  LucideCheck,
  LucideX,
  LucideBan,
  LucideEye,
  LucideMail,
  LucidePhone,
  LucideMapPin,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import RatingStars from '@/components/shared/RatingStars'
import EmptyState from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'
import vendorsData from '@/data/sampleVendors.json'
import { toast } from 'react-hot-toast'

const VendorsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'suspended'>('all')
  const [vendors, setVendors] = useState(vendorsData)

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === 'all' || vendor.status === filterStatus

    return matchesSearch && matchesStatus
  })

  const stats = {
    all: vendors.length,
    approved: vendors.filter((v) => v.status === 'approved').length,
    pending: vendors.filter((v) => v.status === 'pending').length,
    suspended: vendors.filter((v) => v.status === 'suspended').length,
  }

  const handleApprove = (vendorId: string) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, status: 'approved' as const, verifiedAt: new Date().toISOString() } : v
      )
    )
    toast.success('Vendor approved successfully!')
  }

  const handleReject = (vendorId: string) => {
    if (window.confirm('Are you sure you want to reject this vendor?')) {
      setVendors((prev) => prev.filter((v) => v.id !== vendorId))
      toast.success('Vendor rejected')
    }
  }

  const handleSuspend = (vendorId: string) => {
    if (window.confirm('Are you sure you want to suspend this vendor?')) {
        setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId ? { ...v, status: 'suspended' as const } : v
        )
      )
      toast.success('Vendor suspended')
    }
  }

  const statusTabs = [
    { id: 'all', label: 'All Vendors', count: stats.all },
    { id: 'approved', label: 'Approved', count: stats.approved },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'suspended', label: 'Suspended', count: stats.suspended },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vendors Management
            </h2>
            <p className="text-gray-600">
              Manage and monitor all vendors on the platform
            </p>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex overflow-x-auto gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                filterStatus === tab.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  filterStatus === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Search vendors by name, email, or business..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<LucideSearch className="w-5 h-5" />}
        />
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Vendor Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                      {vendor.logo ? (
                        <img
                          src={vendor.logo}
                          alt={vendor.businessName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl">
                          {vendor.businessName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 line-clamp-1">
                        {vendor.businessName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vendor.firstName} {vendor.lastName}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      vendor.status === 'approved'
                        ? 'success'
                        : vendor.status === 'pending'
                        ? 'warning'
                        : 'danger'
                    }
                    size="sm"
                  >
                    {vendor.status}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <RatingStars rating={vendor.rating} size="sm" />
                  <span className="text-sm text-gray-600">
                    ({vendor.totalReviews} reviews)
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Products</p>
                    <p className="text-lg font-bold text-gray-900">
                      {vendor.totalProducts}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Sales</p>
                    <p className="text-lg font-bold text-gray-900">
                      {vendor.totalSales}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vendor Details */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LucideMail className="w-4 h-4" />
                  <a
                    href={`mailto:${vendor.email}`}
                    className="text-purple-600 hover:underline truncate"
                  >
                    {vendor.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LucidePhone className="w-4 h-4" />
                  <a href={`tel:${vendor.phone}`} className="text-purple-600 hover:underline">
                    {vendor.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LucideMapPin className="w-4 h-4" />
                  <span className="truncate">
                    {vendor.businessCity}, {vendor.businessRegion}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Joined {formatDate(vendor.createdAt)}
                  </p>
                  {vendor.status === 'approved' && vendor.verifiedAt && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Verified {formatDate(vendor.verifiedAt)}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex gap-2">
                  {vendor.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(vendor.id)}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        <LucideCheck className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(vendor.id)}
                        variant="danger"
                        size="sm"
                        className="flex-1"
                      >
                        <LucideX className="w-4 h-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  {vendor.status === 'approved' && (
                    <>
                      <Link href={`/admin/vendors/${vendor.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <LucideEye className="w-4 h-4" />
                          View
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleSuspend(vendor.id)}
                        variant="danger"
                        size="sm"
                      >
                        <LucideBan className="w-4 h-4" />
                        Suspend
                      </Button>
                    </>
                  )}
                  {vendor.status === 'suspended' && (
                    <Button
                      onClick={() => handleApprove(vendor.id)}
                      variant="primary"
                      size="sm"
                      className="w-full"
                    >
                      <LucideCheck className="w-4 h-4" />
                      Reactivate
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <EmptyState
            icon={<LucideSearch className="w-16 h-16" />}
            title="No vendors found"
            description={
              searchQuery
                ? 'Try adjusting your search'
                : `No ${filterStatus} vendors`
            }
          />
        </div>
      )}
    </div>
  )
}

export default VendorsManagement