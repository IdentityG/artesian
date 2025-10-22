import { notFound } from 'next/navigation'
import ProductForm from '@/components/dashboard/vendor/ProductForm'
import productsData from '@/data/sampleProducts.json'

interface EditProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { productId } = await Promise.resolve(params)
  const product = productsData.find((p) => p.id === productId)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `Edit ${product.title} | Vendor Dashboard`,
    description: `Edit product: ${product.title}`,
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { productId } = await Promise.resolve(params)
  const product = productsData.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Edit Product
        </h2>
        <p className="text-gray-600">
          Update product information and settings
        </p>
      </div>

      <ProductForm mode="edit" initialData={product} />
    </div>
  )
}