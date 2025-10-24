'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LucideMail, LucideLock, LucideShield } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'
import { Admin } from '@/types/user'

const AdminLoginForm = () => {
  const router = useRouter()
  const { login } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check admin credentials
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
      } else {
        toast.error('Invalid admin credentials')
      }
    } catch (error) {
      toast.error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Admin Email"
        type="email"
        placeholder="admin@artesian.et"
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

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full"
        leftIcon={<LucideShield className="w-5 h-5" />}
      >
        Access Admin Dashboard
      </Button>

      {/* Demo Credentials */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs font-medium text-gray-700 mb-1">Demo Credentials:</p>
        <p className="text-xs text-gray-600">Email: admin@artesian.et</p>
        <p className="text-xs text-gray-600">Password: admin123</p>
      </div>
    </form>
  )
}

export default AdminLoginForm