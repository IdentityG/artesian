import { Address } from './common'

export type UserRole = 'customer' | 'vendor' | 'admin'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  role: UserRole
  isEmailVerified: boolean
  isPhoneVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface Customer extends User {
  role: 'customer'
  addresses: Address[]
  wishlistCount: number
  ordersCount: number
}

export interface Vendor extends User {
  role: 'vendor'
  businessName: string
  businessDescription: string
  businessLogo?: string
  businessBanner?: string
  businessAddress: Address
  businessLicense?: string
  taxId?: string
  bankAccount?: {
    accountNumber: string
    bankName: string
    accountHolderName: string
  }
  status: 'pending' | 'approved' | 'suspended' | 'rejected'
  rating: number
  totalReviews: number
  totalProducts: number
  totalSales: number
  joinedAt: string
  verifiedAt?: string
}

export interface Admin extends User {
  role: 'admin'
  permissions: string[]
}