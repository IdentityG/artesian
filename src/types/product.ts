import { ImageType, Review } from './common'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  productsCount: number
}

export interface Product {
  id: string
  vendorId: string
  vendorName: string
  vendorLogo?: string
  title: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  compareAtPrice?: number
  discount?: number
  images: ImageType[]
  category: Category
  subCategory?: Category
  stock: number
  sku: string
  materials?: string[]
  dimensions?: {
    length?: number
    width?: number
    height?: number
    weight?: number
    unit: 'cm' | 'inch' | 'kg' | 'g'
  }
  colors?: string[]
  customizable: boolean
  customizationNote?: string
  handmadeIn: string // Ethiopian region
  productionTime?: string // e.g., "3-5 days"
  featured: boolean
  status: 'active' | 'draft' | 'out_of_stock'
  rating: number
  totalReviews: number
  totalSales: number
  views: number
  tags: string[]
  reviews?: Review[]
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  region?: string
  rating?: number
  inStock?: boolean
  handmade?: boolean
  search?: string
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'popular' | 'rating'
}