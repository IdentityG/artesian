'use client'

import { useState } from 'react'
import Link from 'next/link'
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
  LucideShield,
  LucideShieldCheck,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import RatingStars from '@/components/shared/RatingStars'
import EmptyState from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/utils'
import vendorsData from '@/data/sampleVendors.json'
import { toast } from 'react-hot-toast'

type VendorStatus = 'approved' | 'pending' | 'suspended'

interface Vendor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  role: string
  businessName: string
  businessDescription: string
  businessLogo: string
  businessBanner: string
  businessAddress: {
    id: string
    street: string
    city: string
    region: string
    subCity: string
    country: string
    isDefault: boolean
  }
  status: VendorStatus
  rating: number
  totalReviews: number
  totalProducts: number
  totalSales: number
  joinedAt: string
  verifiedAt: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  createdAt: string
  updatedAt: string
}

const VendorsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | VendorStatus>('all')
  const [vendors, setVendors] = useState<Vendor[]>(vendorsData as Vendor[])

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        v.id === vendorId
          ? {
              ...v,
              status: 'approved' as VendorStatus,
              verifiedAt: new Date().toISOString(),
            }
          : v
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
          v.id === vendorId ? { ...v, status: 'suspended' as VendorStatus } : v
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
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Vendors</p>
              <p className="text-2xl font-bold text-purple-600">
                {vendors.length}
              </p>
            </div>
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
          placeholder="Search vendors by name, business name, or email..."
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
              {/* Business Banner */}
              <div className="relative h-32 bg-gradient-to-r from-purple-600 to-pink-600">
                {vendor.businessBanner && (
                  <img
                    src={vendor.businessBanner}
                    alt={vendor.businessName}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-3 right-3">
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
              </div>

              {/* Vendor Header */}
              <div className="px-6 -mt-8 mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
                  {vendor.businessLogo ? (
                    <img
                      src={vendor.businessLogo}
                      alt={vendor.businessName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                      {vendor.businessName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                      {vendor.businessName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {vendor.firstName} {vendor.lastName}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {vendor.isEmailVerified && (
                      <div className="text-green-600" title="Email Verified">
                        <LucideShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                    {vendor.isPhoneVerified && (
                      <div className="text-blue-600" title="Phone Verified">
                        <LucideShield className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {vendor.businessDescription}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <RatingStars rating={vendor.rating} size="sm" />
                  <span className="text-sm text-gray-600">
                    {vendor.rating} ({vendor.totalReviews} reviews)
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-600">Products</p>
                    <p className="text-xl font-bold text-purple-600">
                      {vendor.totalProducts}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-600">Total Sales</p>
                    <p className="text-xl font-bold text-green-600">
                      {vendor.totalSales}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LucideMail className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`mailto:${vendor.email}`}
                      className="text-purple-600 hover:underline truncate"
                    >
                      {vendor.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LucidePhone className="w-4 h-4 flex-shrink-0" />
                    <a
                      href={`tel:${vendor.phone}`}
                      className="text-purple-600 hover:underline"
                    >
                      {vendor.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <LucideMapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">
                      {vendor.businessAddress.subCity},{' '}
                      {vendor.businessAddress.city}
                    </span>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="pt-3 border-t border-gray-200 space-y-1">
                  <p className="text-xs text-gray-500">
                    Joined {formatDate(vendor.joinedAt)}
                  </p>
                  {vendor.status === 'approved' && vendor.verifiedAt && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <LucideCheck className="w-3 h-3" />
                      Verified {formatDate(vendor.verifiedAt)}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
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
                      <Link
                        href={`/admin/vendors/${vendor.id}`}
                        className="flex-1"
                      >
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
                ? 'Try adjusting your search query'
                : `No ${filterStatus} vendors available`
            }
          />
        </div>
      )}
    </div>
  )
}

export default VendorsManagement