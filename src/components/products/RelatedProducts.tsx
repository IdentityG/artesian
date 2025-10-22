'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Product } from '@/types'
import ProductCard from './ProductCard'

gsap.registerPlugin(ScrollTrigger)

interface RelatedProductsProps {
  products: Product[]
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.related-product-card')

      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }, [])

  if (!products || products.length === 0) return null

  return (
    <section ref={sectionRef} className="bg-gray-50 py-12">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
        >
          You May Also Like
        </motion.h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <div key={product.id} className="related-product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts