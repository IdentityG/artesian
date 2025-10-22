import ProductForm from '@/components/dashboard/vendor/ProductForm'

export const metadata = {
  title: 'Add New Product | Vendor Dashboard',
  description: 'Add a new product to your store',
}

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Add New Product
        </h2>
        <p className="text-gray-600">
          Fill in the details below to create a new product listing
        </p>
      </div>

      <ProductForm mode="create" />
    </div>
  )
}