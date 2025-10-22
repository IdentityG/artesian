'use client'

import { Product } from '@/types'
import ProductCard from './ProductCard'
import ProductListCard from './ProductListCard'

interface ProductGridProps {
  products: Product[]
  viewMode?: 'grid' | 'list'
}

const ProductGrid = ({ products, viewMode = 'grid' }: ProductGridProps) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid