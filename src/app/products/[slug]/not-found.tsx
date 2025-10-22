import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { LucideHome, LucideSearch } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="text-9xl font-bold text-gray-200">404</div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
              Product Not Found
            </h1>
            <p className="text-gray-600">
              Sorry, we couldn't find the product you're looking for.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary">
                <LucideHome className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">
                <LucideSearch className="w-4 h-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}