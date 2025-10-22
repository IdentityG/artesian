'use client'

import { useState } from 'react'
import {
  LucideLock,
  LucideBell,
  LucideShield,
  LucideTrash2,
  LucideEye,
  LucideEyeOff,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const SettingsContent = () => {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)
  const [activeSection, setActiveSection] = useState<'password' | 'notifications' | 'security' | 'account'>('password')

  // Password Change
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Notifications
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    productRecommendations: false,
  })

  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsChangingPassword(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsChangingPassword(false)

    toast.success('Password changed successfully!')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast.success('Notification preferences updated')
  }

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      logout()
      toast.success('Account deleted successfully')
      router.push('/')
    }
  }

  const sections = [
    { id: 'password', label: 'Change Password', icon: LucideLock },
    { id: 'notifications', label: 'Notifications', icon: LucideBell },
    { id: 'security', label: 'Security', icon: LucideShield },
    { id: 'account', label: 'Account', icon: LucideTrash2 },
  ]

  return (
    <div className="space-y-6">
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
        {/* Change Password */}
        {activeSection === 'password' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
              <Input
                label="Current Password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                required
                leftIcon={<LucideLock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="hover:text-primary-600"
                  >
                    {showCurrentPassword ? (
                      <LucideEyeOff className="w-5 h-5" />
                    ) : (
                      <LucideEye className="w-5 h-5" />
                    )}
                  </button>
                }
              />

              <Input
                label="New Password"
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                required
                leftIcon={<LucideLock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="hover:text-primary-600"
                  >
                    {showNewPassword ? (
                      <LucideEyeOff className="w-5 h-5" />
                    ) : (
                      <LucideEye className="w-5 h-5" />
                    )}
                  </button>
                }
              />

              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
                leftIcon={<LucideLock className="w-5 h-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="hover:text-primary-600"
                  >
                    {showConfirmPassword ? (
                      <LucideEyeOff className="w-5 h-5" />
                    ) : (
                      <LucideEye className="w-5 h-5" />
                    )}
                  </button>
                }
              />

              <Button
                type="submit"
                variant="primary"
                isLoading={isChangingPassword}
              >
                Change Password
              </Button>
            </form>
          </div>
        )}

        {/* Notifications */}
        {activeSection === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Notification Preferences
            </h2>
            <div className="space-y-4 max-w-lg">
              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Order Updates</p>
                  <p className="text-sm text-gray-600">
                    Get notified about your order status
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={() => handleNotificationChange('orderUpdates')}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Promotions</p>
                  <p className="text-sm text-gray-600">
                    Receive special offers and discounts
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={() => handleNotificationChange('promotions')}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">Newsletter</p>
                  <p className="text-sm text-gray-600">
                    Get the latest news and updates
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.newsletter}
                  onChange={() => handleNotificationChange('newsletter')}
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">
                    Product Recommendations
                  </p>
                  <p className="text-sm text-gray-600">
                    Personalized product suggestions
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.productRecommendations}
                  onChange={() =>
                    handleNotificationChange('productRecommendations')
                  }
                  className="w-5 h-5 text-primary-600 focus:ring-primary-500 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {/* Security */}
        {activeSection === 'security' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Security</h2>
            <div className="space-y-6 max-w-lg">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={() => {
                        setTwoFactorEnabled(!twoFactorEnabled)
                        toast.success(
                          twoFactorEnabled
                            ? '2FA disabled'
                            : '2FA enabled successfully!'
                        )
                      }}
                      className="sr-only peer"
                    />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                {twoFactorEnabled && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      Two-factor authentication is enabled. You'll receive a code
                      via SMS or email when you log in.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Login Sessions
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Manage your active sessions and devices
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        💻
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Current Device
                        </p>
                        <p className="text-xs text-gray-600">
                          Windows · Chrome · Active now
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Management */}
        {activeSection === 'account' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Account Management
            </h2>
            <div className="space-y-6 max-w-lg">
              <div className="p-6 border border-yellow-300 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Export Your Data
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Download a copy of your account data including orders, wishlist,
                  and profile information.
                </p>
                <Button variant="outline">Download Data</Button>
              </div>

              <div className="p-6 border border-red-300 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <LucideTrash2 className="w-5 h-5" />
                  Delete Account
                </h3>
                <p className="text-sm text-red-700 mb-4">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <Button variant="danger" onClick={handleDeleteAccount}>
                  Delete My Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsContent