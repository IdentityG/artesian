'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LucideArrowRight } from 'lucide-react'
import ProductCard from '../products/ProductCard'
import productsData from '@/data/sampleProducts.json'
import Button from '../ui/Button'
import { Product } from '@/types'

gsap.registerPlugin(ScrollTrigger)

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const featuredProducts = productsData.filter((product) => product.featured) as Product[]

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card-wrapper')

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

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Handpicked selections from our talented artisans
            </motion.p>
          </div>

          <Link href="/products" className="hidden md:block">
            <Button variant="outline">
              View All
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {featuredProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link href="/products">
            <Button variant="primary">
              View All Products
              <LucideArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts