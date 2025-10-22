import { cn } from '@/lib/cn'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

const Loading = ({ size = 'md', text, fullScreen = false }: LoadingProps) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200 border-t-primary-600',
          sizes[size]
        )}
      />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>
}

export default Loading