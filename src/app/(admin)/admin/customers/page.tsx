import CustomersManagement from '@/components/dashboard/admin/CustomersManagement'

export const metadata = {
  title: 'Customers Management | Admin Dashboard',
  description: 'Manage all customers on the platform',
}

export default function AdminCustomersPage() {
  return <CustomersManagement />
}