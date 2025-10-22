'use client'

import { useState } from 'react'
import { LucideUser, LucideMail, LucidePhone, LucideCamera } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

const ProfileContent = () => {
  const { user, updateUser } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateUser(formData)
    setIsLoading(false)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Profile Information
        </h2>

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="relative">
            {user?.avatar ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </div>
            )}
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
              <LucideCamera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <div className="flex gap-2 mt-2">
              {user?.isEmailVerified ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✓ Email Verified
                </span>
              ) : (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Email Not Verified
                </span>
              )}
              {user?.isPhoneVerified ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✓ Phone Verified
                </span>
              ) : (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Phone Not Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<LucideUser className="w-5 h-5" />}
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                leftIcon={<LucideUser className="w-5 h-5" />}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              leftIcon={<LucideMail className="w-5 h-5" />}
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              leftIcon={<LucidePhone className="w-5 h-5" />}
            />
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="flex gap-3">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="flex-1"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </form>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Total Orders</h3>
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              📦
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-1">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Wishlist Items</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              ❤️
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
          <p className="text-sm text-gray-600 mt-1">Saved items</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Total Spent</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              💰
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">0 ETB</p>
          <p className="text-sm text-gray-600 mt-1">All time</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent