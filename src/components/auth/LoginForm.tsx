'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LucideMail, LucideLock } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'
import { Admin, Vendor, Customer } from '@/types/user'
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for admin credentials
      if (formData.email === 'admin@artesian.et' && formData.password === 'admin123') {
        const adminUser: Admin = {
          id: 'admin-1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@artesian.et',
          phone: '+251911000000',
          avatar: 'https://i.pravatar.cc/150?img=33',
          role: 'admin',
          isEmailVerified: true,
          isPhoneVerified: true,
          permissions: [
            'manage_vendors',
            'manage_customers',
            'manage_products',
            'manage_orders',
            'view_analytics',
            'manage_settings',
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        login(adminUser)
        toast.success('Welcome back, Admin!')
        router.push('/admin/dashboard')
        return
      }

      // Check for vendor credentials
      if (formData.email === 'abeba@artisan.et' && formData.password === 'vendor123') {
        const vendorUser: Vendor = {
          id: 'v1',
          firstName: 'Abeba',
          lastName: 'Tadesse',
          email: 'abeba@artisan.et',
          phone: '+251911234567',
          avatar: 'https://i.pravatar.cc/150?img=1',
          role: 'vendor',
          isEmailVerified: true,
          isPhoneVerified: true,
          businessName: "Abeba's Traditional Crafts",
          businessDescription: 'Specializing in authentic Ethiopian traditional clothing and handwoven textiles.',
          businessLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
          businessBanner: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200',
          businessAddress: {
            id: 'a1',
            street: 'Bole Road',
            city: 'Addis Ababa',
            region: 'Addis Ababa',
            subCity: 'Bole',
            country: 'Ethiopia',
            isDefault: true,
          },
          status: 'approved',
          rating: 4.8,
          totalReviews: 127,
          totalProducts: 45,
          totalSales: 1250,
          joinedAt: '2022-03-15T10:30:00Z',
          verifiedAt: '2022-03-20T14:20:00Z',
          createdAt: '2022-03-15T10:30:00Z',
          updatedAt: new Date().toISOString(),
        }
        login(vendorUser)
        toast.success('Login successful!')
        router.push('/vendor/dashboard')
        return
      }

      // Regular customer login
      const customerUser: Customer = {
        id: 'user-' + Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        phone: '+251911000000',
        avatar: 'https://i.pravatar.cc/150?img=10',
        role: 'customer',
        isEmailVerified: true,
        isPhoneVerified: false,
        addresses: [],
        wishlistCount: 0,
        ordersCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      login(customerUser)
      toast.success('Login successful!')
      router.push('/')
      
    } catch (error) {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData({ ...formData, rememberMe: e.target.checked })
            }
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-700">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full">
        Sign In
      </Button>

      {/* Demo Credentials */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs font-medium text-blue-900 mb-2">Demo Accounts:</p>
        <div className="space-y-1">
          <p className="text-xs text-blue-700">
            <strong>Admin:</strong> admin@artesian.et / admin123
          </p>
          <p className="text-xs text-blue-700">
            <strong>Vendor:</strong> abeba@artisan.et / vendor123
          </p>
          <p className="text-xs text-blue-700">
            <strong>Customer:</strong> Any email / any password
          </p>
        </div>
      </div>
    </form>
  )
}

export default LoginForm