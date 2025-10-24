import CheckoutContent from '@/components/checkout/CheckoutContent'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Checkout | Artesian',
  description: 'Complete your purchase',
}

export default function CheckoutPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <Breadcrumb
              items={[
                { label: 'Cart', href: '/cart' },
                { label: 'Checkout' },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Checkout
            </h1>
          </div>
        </div>

        <CheckoutContent />
      </main>
    </>
  )
}