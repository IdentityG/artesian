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
} from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'

const RegisterForm = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
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
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock registration
    const newUser = {
      id: 'u' + Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50)}`,
      role: 'customer' as const,
      isEmailVerified: false,
      isPhoneVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    login(newUser)
    setIsLoading(false)
    toast.success('Account created successfully!')
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          leftIcon={<LucideUser className="w-5 h-5" />}
          placeholder="John"
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          leftIcon={<LucideUser className="w-5 h-5" />}
          placeholder="Doe"
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
        placeholder="you@example.com"
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
        placeholder="Create a strong password"
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
        placeholder="Confirm your password"
      />

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
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
        </span>
      </label>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Create Account
      </Button>
    </form>
  )
}

export default RegisterForm