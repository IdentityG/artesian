'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LucideLayoutDashboard,
  LucideStore,
  LucideUsers,
  LucidePackage,
  LucideShoppingBag,
  LucideBarChart3,
  LucideSettings,
  LucideLogOut,
  LucideShield,
} from 'lucide-react'
import Loading from '@/components/ui/Loading'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        toast.error('Please login to continue')
        router.push('/login')
      } else if (user?.role !== 'admin') {
        toast.error('Access denied. Admin privileges required.')
        router.push('/')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated, user, router])

  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: LucideLayoutDashboard,
    },
    {
      label: 'Vendors',
      href: '/admin/vendors',
      icon: LucideStore,
    },
    {
      label: 'Customers',
      href: '/admin/customers',
      icon: LucideUsers,
    },
    {
      label: 'Products',
      href: '/admin/products',
      icon: LucidePackage,
    },
    {
      label: 'Orders',
      href: '/admin/orders',
      icon: LucideShoppingBag,
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: LucideBarChart3,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: LucideSettings,
    },
  ]

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  if (isLoading) {
    return <Loading fullScreen text="Loading admin dashboard..." />
  }

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="container-custom py-8">
            <div className="flex items-center gap-3 mb-2">
              <LucideShield className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-purple-100">
              Manage and monitor the entire marketplace
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      <LucideShield className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600">Administrator</p>
                    </div>
                  </div>
                </div>

                <nav className="p-4">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      typeof window !== 'undefined' &&
                      window.location.pathname === item.href

                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                          isActive
                            ? 'bg-purple-50 text-purple-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </a>
                    )
                  })}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full mt-4"
                  >
                    <LucideLogOut className="w-5 h-5" />
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            {/* Mobile Navigation */}
            <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="grid grid-cols-3 gap-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-purple-600 hover:bg-purple-50 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                      <span className="text-xs font-medium text-gray-900">
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}