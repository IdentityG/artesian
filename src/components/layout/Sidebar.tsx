'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { LucideIcon } from 'lucide-react'

interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

interface SidebarProps {
  items: SidebarItem[]
  title?: string
}

const Sidebar = ({ items, title }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
      <div className="p-6">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        )}
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar