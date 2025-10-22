'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LucideMail,
  LucideLock,
  LucideUser,
  LucidePhone,
  LucideEye,
  LucideEyeOff,
  LucideStore,
  LucideMapPin,
} from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'

const VendorRegisterForm = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Business Info
    businessName: '',
    businessDescription: '',
    businessAddress: '',
    businessCity: '',
    businessRegion: '',
    // Agreement
    agreeToTerms: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions')
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock vendor registration
    const newVendor = {
      id: 'v' + Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
      role: 'vendor' as const,
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    login(newVendor)
    setIsLoading(false)
    toast.success('Vendor application submitted! We will review it shortly.')
    router.push('/vendor/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              leftIcon={<LucideUser className="w-5 h-5" />}
              placeholder="Abebe"
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              leftIcon={<LucideUser className="w-5 h-5" />}
              placeholder="Kebede"
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            leftIcon={<LucideMail className="w-5 h-5" />}
            placeholder="vendor@example.com"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            leftIcon={<LucidePhone className="w-5 h-5" />}
            placeholder="+251 911 234 567"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              leftIcon={<LucideLock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-primary-600"
                >
                  {showPassword ? (
                    <LucideEyeOff className="w-5 h-5" />
                  ) : (
                    <LucideEye className="w-5 h-5" />
                  )}
                </button>
              }
              placeholder="Create password"
            />

            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
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
              placeholder="Confirm password"
            />
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">
          Business Information
        </h3>
        <div className="space-y-4">
          <Input
            label="Business Name"
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            leftIcon={<LucideStore className="w-5 h-5" />}
            placeholder="Your Business Name"
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Business Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="businessDescription"
              value={formData.businessDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Tell us about your business and the crafts you make..."
            />
          </div>

          <Input
            label="Business Address"
            type="text"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            required
            leftIcon={<LucideMapPin className="w-5 h-5" />}
            placeholder="Street address"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                name="businessRegion"
                value={formData.businessRegion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Region</option>
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
              name="businessCity"
              value={formData.businessCity}
              onChange={handleChange}
              required
              placeholder="City"
            />
          </div>
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="pt-6 border-t border-gray-200">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5 text-primary-600 focus:ring-primary-500 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/vendor-terms" className="text-primary-600 hover:underline">
              Vendor Terms of Service
            </a>
            ,{' '}
            <a href="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
            . I understand that my application will be reviewed before approval.
          </span>
        </label>
      </div>

     {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Submit Application
      </Button>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>What happens next?</strong> Our team will review your application
          within 1-3 business days. You'll receive an email notification once your
          account is approved.
        </p>
      </div>
    </form>
  )
}

export default VendorRegisterForm