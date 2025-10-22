import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/shared/ScrollToTop'
import ProductsContent from '@/components/products/ProductsContent'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Loading from '@/components/ui/Loading'

export const metadata = {
  title: 'Handmade Products | Artesian',
  description: 'Browse our collection of authentic Ethiopian handmade crafts',
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <Breadcrumb
              items={[
                { label: 'Products', href: '/products' },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Handmade Products
            </h1>
            <p className="text-gray-600 mt-2">
              Discover authentic Ethiopian crafts made by talented artisans
            </p>
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          <ProductsContent />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}