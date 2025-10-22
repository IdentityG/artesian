import Link from 'next/link'
import Button from '@/components/ui/Button'
import { LucideArrowLeft } from 'lucide-react'

export default function ProductNotFound() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Product Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link href="/vendor/products">
        <Button variant="primary">
          <LucideArrowLeft className="w-5 h-5" />
          Back to Products
        </Button>
      </Link>
    </div>
  )
}