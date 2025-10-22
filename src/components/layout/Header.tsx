'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LucideShoppingCart,
  LucideHeart,
  LucideUser,
  LucideMenu,
  LucideX,
  LucideSearch,
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import Button from '../ui/Button'
import SearchBar from '../ui/SearchBar'
import { cn } from '@/lib/cn'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const cartItemsCount = useCartStore((state) => state.getItemsCount())
  const wishlistItems = useWishlistStore((state) => state.items)
  const { isAuthenticated, user } = useAuthStore()
  const { isMobileMenuOpen, toggleMobileMenu, toggleCartDrawer } = useUIStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (query: string) => {
    console.log('Searching for:', query)
    // Implement search logic
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red h-1" />
      
      <div className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">A</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">
                  Artesian
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Ethiopian Crafts
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/products"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Products
              </Link>
              <Link
                href="/vendors"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Vendors
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all lg:hidden"
              >
                <LucideSearch className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <LucideHeart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCartDrawer}
                className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <LucideShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </button>

              {/* User Menu */}
              {isAuthenticated ? (
                <Link
                  href={
                    user?.role === 'vendor'
                      ? '/vendor/dashboard'
                      : user?.role === 'admin'
                      ? '/admin/dashboard'
                      : '/profile'
                  }
                  className="hidden lg:flex items-center gap-2 p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <LucideUser className="w-5 h-5" />
                  <span className="font-medium">{user?.firstName}</span>
                </Link>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                {isMobileMenuOpen ? (
                  <LucideX className="w-6 h-6" />
                ) : (
                  <LucideMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar - Desktop */}
      <div className="hidden lg:block border-b border-gray-200 bg-gray-50">
        <div className="container-custom py-3">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for handmade crafts, traditional clothing, jewelry..."
          />
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b border-gray-200 bg-gray-50 overflow-hidden"
          >
            <div className="container-custom py-3">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search products..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b border-gray-200 bg-white overflow-hidden"
          >
            <nav className="container-custom py-4 flex flex-col space-y-3">
              <Link
                href="/products"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={toggleMobileMenu}
              >
                Products
              </Link>
              <Link
                href="/vendors"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={toggleMobileMenu}
              >
                Vendors
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium py-2 transition-colors"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>

              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <Link
                    href={
                      user?.role === 'vendor'
                        ? '/vendor/dashboard'
                        : user?.role === 'admin'
                        ? '/admin/dashboard'
                        : '/profile'
                    }
                    onClick={toggleMobileMenu}
                  >
                    <Button variant="primary" className="w-full">
                      <LucideUser className="w-4 h-4" />
                      My Account
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={toggleMobileMenu}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={toggleMobileMenu}>
                      <Button variant="primary" className="w-full">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header