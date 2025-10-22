export const ETHIOPIAN_REGIONS = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'SNNPR',
  'Somali',
  'Tigray',
]

export const PRODUCT_CATEGORIES = [
  {
    id: '1',
    name: 'Traditional Clothing',
    slug: 'traditional-clothing',
    subcategories: ['Habesha Kemis', 'Netela', 'Gabi', 'Kuta'],
  },
  {
    id: '2',
    name: 'Home Decor',
    slug: 'home-decor',
    subcategories: ['Wall Art', 'Baskets', 'Pottery', 'Textiles'],
  },
  {
    id: '3',
    name: 'Jewelry',
    slug: 'jewelry',
    subcategories: ['Necklaces', 'Bracelets', 'Earrings', 'Rings'],
  },
  {
    id: '4',
    name: 'Leather Goods',
    slug: 'leather-goods',
    subcategories: ['Bags', 'Wallets', 'Shoes', 'Accessories'],
  },
  {
    id: '5',
    name: 'Coffee & Spices',
    slug: 'coffee-spices',
    subcategories: ['Ethiopian Coffee', 'Berbere', 'Mitmita', 'Gift Sets'],
  },
  {
    id: '6',
    name: 'Art & Crafts',
    slug: 'art-crafts',
    subcategories: ['Paintings', 'Sculptures', 'Carvings', 'Handwoven Items'],
  },
]

export const ORDER_STATUSES = {
  pending: { label: 'Pending', color: 'yellow' },
  processing: { label: 'Processing', color: 'blue' },
  shipped: { label: 'Shipped', color: 'purple' },
  delivered: { label: 'Delivered', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
  returned: { label: 'Returned', color: 'orange' },
}

export const PAYMENT_METHODS = [
  { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵' },
  { id: 'telebirr', name: 'TeleBirr', icon: '📱' },
  { id: 'cbe_birr', name: 'CBE Birr', icon: '🏦' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏧' },
]

export const SHIPPING_COST = 50 // ETB
export const TAX_RATE = 0.15 // 15%
export const FREE_SHIPPING_THRESHOLD = 1000 // ETB

export const ITEMS_PER_PAGE = 12
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']