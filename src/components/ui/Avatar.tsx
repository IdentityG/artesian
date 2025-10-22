'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'

interface AvatarProps {
  src?: string
  alt: string
  initials?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Avatar = ({
  src,
  alt,
  initials,
  size = 'md',
  className,
}: AvatarProps) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold',
        sizes[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  )
}

export default Avatar