'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LucideMail, LucideLock, LucideUser, LucidePhone } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'
import { Customer } from '@/types/user'

const RegisterForm = () => {
  const router = useRouter()
  const { login } = useAuthStore()
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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newCustomer: Customer = {
        id: 'customer-' + Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: 'customer',
        isEmailVerified: false,
        isPhoneVerified: false,
        addresses: [],
        wishlistCount: 0,
        ordersCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      login(newCustomer)
      toast.success('Account created successfully!')
      router.push('/')
    } catch (error) {
      toast.error('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="John"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          leftIcon={<LucideUser className="w-5 h-5" />}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Doe"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          leftIcon={<LucideUser className="w-5 h-5" />}
          required
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
        leftIcon={<LucideMail className="w-5 h-5" />}
        required
      />

      <Input
        label="Phone"
        type="tel"
        placeholder="+251911234567"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
        leftIcon={<LucidePhone className="w-5 h-5" />}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
        leftIcon={<LucideLock className="w-5 h-5" />}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        leftIcon={<LucideLock className="w-5 h-5" />}
        required
      />

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeToTerms: e.target.checked })
          }
          className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          required
        />
        <span className="text-sm text-gray-700">
          I agree to the{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
        </span>
      </label>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Create Account
      </Button>
    </form>
  )
}

export default RegisterForm