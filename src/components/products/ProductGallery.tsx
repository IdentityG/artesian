'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideChevronLeft, LucideChevronRight, LucideX, LucideZoomIn, LucideImage } from 'lucide-react'
import { ImageType } from '@/types'

interface ProductGalleryProps {
  images: ImageType[]
  title: string
}

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
  }

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-xl flex flex-col items-center justify-center">
        <LucideImage className="w-16 h-16 text-gray-400 mb-2" />
        <span className="text-gray-500">No image available</span>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <motion.div
          className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-zoom-in"
          onClick={() => !imageErrors[selectedImage] && setIsLightboxOpen(true)}
        >
          {imageErrors[selectedImage] ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200">
              <LucideImage className="w-16 h-16 text-gray-400 mb-2" />
              <span className="text-gray-500 text-sm">Image not available</span>
            </div>
          ) : (
            <>
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt || title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                onError={() => handleImageError(selectedImage)}
                unoptimized={images[selectedImage].url.includes('unsplash')} // Bypass optimization for Unsplash
              />
              
              {/* Zoom Indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                  <LucideZoomIn className="w-6 h-6 text-gray-900" />
                </div>
              </div>
            </>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <LucideChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <LucideChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-primary-600 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {imageErrors[index] ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <LucideImage className="w-8 h-8 text-gray-400" />
                  </div>
                ) : (
                  <Image
                    src={image.url}
                    alt={image.alt || `${title} thumbnail ${index + 1}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                    onError={() => handleImageError(index)}
                    unoptimized={image.url.includes('unsplash')}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && !imageErrors[selectedImage] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <LucideX className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <LucideChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <LucideChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].url}
                alt={images[selectedImage].alt || title}
                fill
                sizes="100vw"
                className="object-contain"
                unoptimized={images[selectedImage].url.includes('unsplash')}
              />
            </motion.div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProductGallery