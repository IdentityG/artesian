export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: PaginationMeta
}

export interface ImageType {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
}

export interface Address {
  id: string
  street: string
  city: string
  region: string
  subCity?: string
  wereda?: string
  postalCode?: string
  country: string
  isDefault?: boolean
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  images?: string[]
  createdAt: string
  helpful: number
}

export type Status = 'active' | 'inactive' | 'pending' | 'suspended'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'cash_on_delivery' | 'telebirr' | 'cbe_birr' | 'bank_transfer'