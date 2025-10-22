import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/cn'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Artesian - Ethiopian Handmade Crafts Marketplace',
  description: 'Discover authentic Ethiopian handmade crafts, traditional clothing, jewelry, and more from local artisans.',
  keywords: 'Ethiopian crafts, handmade, traditional clothing, habesha kemis, jewelry, leather goods, coffee',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)}>
      <body className="font-sans antialiased bg-gray-50">
        {children}
        <CartDrawer />
      </body>
    </html>
  )
}