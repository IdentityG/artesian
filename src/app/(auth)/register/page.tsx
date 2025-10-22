import RegisterForm from '@/components/auth/RegisterForm'
import Link from 'next/link'

export const metadata = {
  title: 'Register | Artesian',
  description: 'Create your Artesian account',
}

export default function RegisterPage() {
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

      {/* Register Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Join our community of craft lovers
          </p>
        </div>

        <RegisterForm />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Sign In Link */}
        <Link href="/login">
          <button className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Sign In
          </button>
        </Link>
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