'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LucideMail, LucideLock, LucideEye, LucideEyeOff } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock login - in real app, validate with backend
    const mockUser = {
      id: 'u1',
      firstName: 'John',
      lastName: 'Doe',
      email: formData.email,
      phone: '+251911234567',
      avatar: 'https://i.pravatar.cc/150?img=33',
      role: 'customer' as const,
      isEmailVerified: true,
      isPhoneVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    login(mockUser)
    setIsLoading(false)
    toast.success('Login successful!')
    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Enter your password"
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
          />
          <span className="text-sm text-gray-700">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  )
}

export default LoginForm