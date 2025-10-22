'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', children, ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const CardComponent = hover ? motion.div : 'div'
    const hoverProps = hover
      ? {
          whileHover: { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
          transition: { duration: 0.2 },
        }
      : {}

    return (
      <CardComponent
        ref={ref}
        className={cn(
          'bg-white rounded-xl shadow-sm border border-gray-200',
          paddings[padding],
          hover && 'cursor-pointer',
          className
        )}
        {...hoverProps}
        {...props}
      >
        {children}
      </CardComponent>
    )
  }
)

Card.displayName = 'Card'

export default Card