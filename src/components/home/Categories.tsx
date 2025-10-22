'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import categoriesData from '@/data/categories.json'
import { LucideArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Categories = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (categoriesRef.current) {
      const cards = categoriesRef.current.querySelectorAll('.category-card')

      gsap.from(cards, {
        scrollTrigger: {
          trigger: categoriesRef.current,
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
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated collection of traditional Ethiopian handmade
            products
          </motion.p>
        </div>

        <div
          ref={categoriesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categoriesData.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/category/${category.slug}`}
              className="category-card group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {category.productsCount} Products
                    </span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      Explore
                      <LucideArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary-400 rounded-2xl transition-all duration-300" />
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
            >
              View All Products
              <LucideArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories