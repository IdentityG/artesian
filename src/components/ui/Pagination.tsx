'use client'

import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from './Button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        leftIcon={<LucideChevronLeft className="w-4 h-4" />}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                'min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all',
                currentPage === page
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {page}
            </button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        rightIcon={<LucideChevronRight className="w-4 h-4" />}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination