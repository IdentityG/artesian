import VendorsManagement from '@/components/dashboard/admin/VendorsManagement'

export const metadata = {
  title: 'Vendors Management | Admin Dashboard',
  description: 'Manage all vendors on the platform',
}

export default function AdminVendorsPage() {
  return <VendorsManagement />
}