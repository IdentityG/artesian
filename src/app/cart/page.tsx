import CartContent from '@/components/cart/CartContent'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Shopping Cart | Artesian',
  description: 'Review your cart and proceed to checkout',
}

export default function CartPage() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <Breadcrumb
              items={[
                { label: 'Cart' },
              ]}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
              Shopping Cart
            </h1>
          </div>
        </div>

        <CartContent />
      </main>
    </>
  )
}