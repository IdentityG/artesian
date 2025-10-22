import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Login | Artesian',
  description: 'Login to your Artesian account',
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-2xl text-gray-900">
            Artesian
          </span>
          <span className="text-xs text-gray-500 -mt-1">
            Ethiopian Crafts
          </span>
        </div>
      </Link>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <LoginForm />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Links */}
        <div className="space-y-3">
          <Link href="/register">
            <button className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Sign up as Customer
            </button>
          </Link>
          <Link href="/vendor-register">
            <button className="w-full px-4 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Register as Vendor
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600 mt-6">
        <Link href="/" className="hover:text-primary-600">
          ← Back to Home
        </Link>
      </p>
    </div>
  )
}