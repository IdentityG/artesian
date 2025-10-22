export interface VendorStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  activeProducts: number
  pendingOrders: number
  completedOrders: number
  averageRating: number
  totalReviews: number
  totalViews: number
  conversionRate: number
}

export interface SalesData {
  date: string
  sales: number
  orders: number
  revenue: number
}

export interface TopProduct {
  id: string
  title: string
  image: string
  sales: number
  revenue: number
}