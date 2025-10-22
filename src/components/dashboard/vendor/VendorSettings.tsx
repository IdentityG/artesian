'use client'

import { useState } from 'react'
import {
  LucideStore,
  LucideLock,
  LucideBell,
  LucideCreditCard,
  LucideSave,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'

const VendorSettings = () => {
  const [activeSection, setActiveSection] = useState<'store' | 'password' | 'notifications' | 'payment'>('store')
  const [isLoading, setIsLoading] = useState(false)

  // Store Settings
  const [storeData, setStoreData] = useState({
    businessName: "Abeba's Traditional Crafts",
    businessDescription: 'Specializing in authentic Ethiopian traditional clothing and handwoven textiles.',
    businessEmail: 'abeba@artisan.et',
    businessPhone: '+251911234567',
    businessAddress: 'Bole Road',
    businessCity: 'Addis Ababa',
    businessRegion: 'Addis Ababa',
  })

  // Password Settings
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newReviews: true,
    promotions: false,
  })

  // Payment Settings
  const [paymentData, setPaymentData] = useState({
    accountHolderName: 'Abeba Tadesse',
    bankName: 'Commercial Bank of Ethiopia',
    accountNumber: '1000123456789',
    taxId: 'TIN-123456789',
  })

  const handleStoreUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Store settings updated successfully!')
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Password changed successfully!')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handlePaymentUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Payment settings updated successfully!')
  }

  const sections = [
    { id: 'store', label: 'Store Information', icon: LucideStore },
    { id: 'password', label: 'Password', icon: LucideLock },
    { id: 'notifications', label: 'Notifications', icon: LucideBell },
    { id: 'payment', label: 'Payment Details', icon: LucideCreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Settings
        </h2>
        <p className="text-gray-600">
          Manage your vendor account settings and preferences
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Store Information */}
        {activeSection === 'store' && (
          <form onSubmit={handleStoreUpdate} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Store Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  type="text"
                  value={storeData.businessName}
                  onChange={(e) =>
                    setStoreData({ ...storeData, businessName: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Business Description
                  </label>
                  <textarea
                    value={storeData.businessDescription}
                    onChange={(e) =>
                      setStoreData({ ...storeData, businessDescription: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Business Email"
                    type="email"
                    value={storeData.businessEmail}
                    onChange={(e) =>
                      setStoreData({ ...storeData, businessEmail: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Business Phone"
                    type="tel"
                    value={storeData.businessPhone}
                    onChange={(e) =>
                      setStoreData({ ...storeData, businessPhone: e.target.value })
                    }
                    required
                  />
                </div>

                <Input
                  label="Business Address"
                  type="text"
                  value={storeData.businessAddress}
                  onChange={(e) =>
                    setStoreData({ ...storeData, businessAddress: e.target.value })
                  }
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Region
                    </label>
                    <select
                      value={storeData.businessRegion}
                      onChange={(e) =>
                        setStoreData({ ...storeData, businessRegion: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {ETHIOPIAN_REGIONS.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="City"
                    type="text"
                    value={storeData.businessCity}
                    onChange={(e) =>
                      setStoreData({ ...storeData, businessCity: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                >
                  <LucideSave className="w-5 h-5" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Password */}
        {activeSection === 'password' && (
          <form onSubmit={handlePasswordChange} className="space-y-6 max-w-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Change Password
            </h3>
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              required
            />
            <Button type="submit" variant="primary" isLoading={isLoading}>
              <LucideSave className="w-5 h-5" />
              Update Password
            </Button>
          </form>
        )}

        {/* Notifications */}
        {activeSection === 'notifications' && (
          <div className="space-y-6 max-w-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {key === 'newOrders' && 'New Orders'}
                      {key === 'lowStock' && 'Low Stock Alerts'}
                      {key === 'newReviews' && 'New Reviews'}
                      {key === 'promotions' && 'Promotional Emails'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {key === 'newOrders' && 'Get notified when you receive new orders'}
                      {key === 'lowStock' && 'Alerts when products are running low'}
                      {key === 'newReviews' && 'Notification for new customer reviews'}
                      {key === 'promotions' && 'Marketing and promotional updates'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setNotifications({ ...notifications, [key]: !value })
                    }
                    className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                  />
                </label>
              ))}
            </div>
            <Button
              onClick={() => toast.success('Notification preferences updated!')}
              variant="primary"
            >
              <LucideSave className="w-5 h-5" />
              Save Preferences
            </Button>
          </div>
        )}

        {/* Payment Details */}
        {activeSection === 'payment' && (
          <form onSubmit={handlePaymentUpdate} className="space-y-6 max-w-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Payment & Banking Information
            </h3>
            <Input
              label="Account Holder Name"
              type="text"
              value={paymentData.accountHolderName}
              onChange={(e) =>
                setPaymentData({ ...paymentData, accountHolderName: e.target.value })
              }
              required
            />
            <Input
              label="Bank Name"
              type="text"
              value={paymentData.bankName}
              onChange={(e) =>
                setPaymentData({ ...paymentData, bankName: e.target.value })
              }
              required
            />
            <Input
              label="Account Number"
              type="text"
              value={paymentData.accountNumber}
              onChange={(e) =>
                setPaymentData({ ...paymentData, accountNumber: e.target.value })
              }
              required
            />
            <Input
              label="Tax ID / TIN"
              type="text"
              value={paymentData.taxId}
              onChange={(e) =>
                setPaymentData({ ...paymentData, taxId: e.target.value })
              }
              required
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Your payment information is securely stored and will be used for monthly payouts.
              </p>
            </div>
            <Button type="submit" variant="primary" isLoading={isLoading}>
              <LucideSave className="w-5 h-5" />
              Update Payment Details
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default VendorSettings