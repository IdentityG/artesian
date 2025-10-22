import ProductsManagement from '@/components/dashboard/vendor/ProductsManagement'

export const metadata = {
  title: 'Manage Products | Vendor Dashboard',
  description: 'Manage your product listings',
}

export default function VendorProductsPage() {
  return <ProductsManagement />
}