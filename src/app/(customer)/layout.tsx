'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LucideUser,
  LucidePackage,
  LucideHeart,
  LucideSettings,
  LucideLogOut,
} from 'lucide-react'
import Loading from '@/components/ui/Loading'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Give time for the store to hydrate from localStorage
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isAuthenticated) {
        toast.error('Please login to continue')
        router.push('/login')
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  const sidebarItems = [
    {
      label: 'Profile',
      href: '/profile',
      icon: LucideUser,
    },
    {
      label: 'My Orders',
      href: '/orders',
      icon: LucidePackage,
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: LucideHeart,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: LucideSettings,
    },
  ]

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  // Show loading while checking auth
  if (isLoading) {
    return <Loading fullScreen text="Loading..." />
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="container-custom py-8">
            <h1 className="text-3xl font-bold mb-2">My Account</h1>
            <p className="text-primary-100">
              Welcome back, {user.firstName}!
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt={user.firstName}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-gray-600 truncate max-w-[150px]">
                        {user.email}
                      </p>
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
                            ? 'bg-primary-50 text-primary-700 font-medium'
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
              <div className="grid grid-cols-2 gap-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-gray-700" />
                      <span className="text-sm font-medium text-gray-900">
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