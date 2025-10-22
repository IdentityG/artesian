'use client'

import { useState } from 'react'
import { LucideSearch, LucideX } from 'lucide-react'
import { cn } from '@/lib/cn'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <LucideX className="w-5 h-5" />
        </button>
      )}
    </form>
  )
}

export default SearchBar