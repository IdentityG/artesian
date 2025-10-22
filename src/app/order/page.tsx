'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EmptyState from '@/components/ui/EmptyState'
import { LucidePackage } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <EmptyState
            icon={<LucidePackage className="w-16 h-16" />}
            title="Orders Page Coming Soon"
            description="The full customer dashboard with order history is currently being built"
            action={{
              label: 'Continue Shopping',
              onClick: () => router.push('/products'),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}