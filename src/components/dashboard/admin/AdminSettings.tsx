'use client'

import { useState } from 'react'
import {
  LucideSettings,
  LucideDollarSign,
  LucideBell,
  LucideShield,
  LucideSave,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState<'general' | 'commission' | 'notifications' | 'security'>('general')
  const [isLoading, setIsLoading] = useState(false)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Artesian',
    platformEmail: 'admin@artesian.et',
    platformPhone: '+251911000000',
    supportEmail: 'support@artesian.et',
    maintenanceMode: false,
  })

  // Commission Settings
  const [commissionSettings, setCommissionSettings] = useState({
    platformCommission: 15,
    minWithdrawal: 1000,
    payoutSchedule: 'monthly',
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    newVendorRegistration: true,
    newOrderPlaced: true,
    lowStockAlerts: true,
    productReported: true,
    systemAlerts: true,
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
  })

  const handleGeneralUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('General settings updated successfully!')
  }

  const handleCommissionUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Commission settings updated successfully!')
  }

  const handleNotificationUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Notification settings updated successfully!')
  }

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success('Security settings updated successfully!')
  }

  const sections = [
    { id: 'general', label: 'General', icon: LucideSettings },
    { id: 'commission', label: 'Commission', icon: LucideDollarSign },
    { id: 'notifications', label: 'Notifications', icon: LucideBell },
    { id: 'security', label: 'Security', icon: LucideShield },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Platform Settings
        </h2>
        <p className="text-gray-600">
          Configure platform-wide settings and preferences
        </p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {section.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* General Settings */}
        {activeSection === 'general' && (
          <form onSubmit={handleGeneralUpdate} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Platform Name"
                  type="text"
                  value={generalSettings.platformName}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      platformName: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Platform Email"
                  type="email"
                  value={generalSettings.platformEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      platformEmail: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Platform Phone"
                  type="tel"
                  value={generalSettings.platformPhone}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      platformPhone: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Support Email"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) =>
                    setGeneralSettings({
                      ...generalSettings,
                      supportEmail: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generalSettings.maintenanceMode}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        maintenanceMode: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Maintenance Mode
                    </span>
                    <p className="text-sm text-gray-500">
                      Enable to put the platform in maintenance mode
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                isLoading={isLoading}
                leftIcon={<LucideSave className="w-5 h-5" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}

        {/* Commission Settings */}
        {activeSection === 'commission' && (
          <form onSubmit={handleCommissionUpdate} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Commission & Payout Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Platform Commission (%)"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={commissionSettings.platformCommission}
                  onChange={(e) =>
                    setCommissionSettings({
                      ...commissionSettings,
                      platformCommission: parseFloat(e.target.value),
                    })
                  }
                  required
                />
                <Input
                  label="Minimum Withdrawal (ETB)"
                  type="number"
                  min="0"
                  step="100"
                  value={commissionSettings.minWithdrawal}
                  onChange={(e) =>
                    setCommissionSettings({
                      ...commissionSettings,
                      minWithdrawal: parseFloat(e.target.value),
                    })
                  }
                  required
                />
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Payout Schedule
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={commissionSettings.payoutSchedule}
                    onChange={(e) =>
                      setCommissionSettings({
                        ...commissionSettings,
                        payoutSchedule: e.target.value,
                      })
                    }
                    className="block w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-900">
                  <strong>Note:</strong> Commission changes will only affect new orders.
                  Existing orders will maintain their original commission rate.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                isLoading={isLoading}
                leftIcon={<LucideSave className="w-5 h-5" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}

        {/* Notification Settings */}
        {activeSection === 'notifications' && (
          <form onSubmit={handleNotificationUpdate} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Email Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium text-gray-900 block">
                        {key
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, (str) => str.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getNotificationDescription(key)}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                isLoading={isLoading}
                leftIcon={<LucideSave className="w-5 h-5" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}

        {/* Security Settings */}
        {activeSection === 'security' && (
          <form onSubmit={handleSecurityUpdate} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security & Authentication
              </h3>
              <div className="space-y-6">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div>
                    <span className="text-sm font-medium text-gray-900 block">
                      Two-Factor Authentication
                    </span>
                    <span className="text-sm text-gray-500">
                      Require 2FA for admin accounts
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Session Timeout (minutes)"
                    type="number"
                    min="5"
                    max="1440"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                  <Input
                    label="Password Expiry (days)"
                    type="number"
                    min="30"
                    max="365"
                    value={securitySettings.passwordExpiry}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordExpiry: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                  <Input
                    label="Max Login Attempts"
                    type="number"
                    min="3"
                    max="10"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        maxLoginAttempts: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-900">
                    <strong>Warning:</strong> Changing security settings may require
                    all users to re-authenticate.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button
                type="submit"
                isLoading={isLoading}
                leftIcon={<LucideSave className="w-5 h-5" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// Helper function for notification descriptions
const getNotificationDescription = (key: string): string => {
  const descriptions: Record<string, string> = {
    newVendorRegistration: 'Get notified when a new vendor registers',
    newOrderPlaced: 'Get notified when a new order is placed',
    lowStockAlerts: 'Get notified when products are low in stock',
    productReported: 'Get notified when a product is reported',
    systemAlerts: 'Get notified about critical system events',
  }
  return descriptions[key] || ''
}

export default AdminSettings