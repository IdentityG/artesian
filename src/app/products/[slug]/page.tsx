import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/shared/ScrollToTop'
import ProductDetails from '@/components/products/ProductDetails'
import ProductReviews from '@/components/products/ProductReviews'
import RelatedProducts from '@/components/products/RelatedProducts'
import Breadcrumb from '@/components/ui/Breadcrumb'
import productsData from '@/data/sampleProducts.json'
import { Product } from '@/types'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  // Await params in Next.js 15+
  const { slug } = await Promise.resolve(params)
  
  const product = productsData.find((p) => p.slug === slug) as Product | undefined

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.title} | Artesian`,
    description: product.shortDescription || product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params in Next.js 15+
  const { slug } = await Promise.resolve(params)
  
  console.log('Looking for product with slug:', slug) // Debug log
  console.log('Available slugs:', productsData.map(p => p.slug)) // Debug log
  
  const product = productsData.find((p) => p.slug === slug) as Product | undefined

  if (!product) {
    console.log('Product not found for slug:', slug) // Debug log
    notFound()
  }

  const relatedProducts = productsData
    .filter(
      (p) =>
        p.category.id === product.category.id &&
        p.id !== product.id
    )
    .slice(0, 4) as Product[]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <Breadcrumb
              items={[
                { label: 'Products', href: '/products' },
                { label: product.category.name, href: `/products/category/${product.category.slug}` },
                { label: product.title },
              ]}
            />
          </div>
        </div>

        <ProductDetails product={product} />
        <ProductReviews product={product} />
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}