'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideArrowRight, LucideSparkles, LucideTrendingUp } from 'lucide-react'
import ProductCard from '../products/ProductCard'
import productsData from '@/data/sampleProducts.json'
import Button from '../ui/Button'
import { Product } from '@/types/product'

const FeaturedProducts = () => {
  const [filter, setFilter] = useState<'all' | 'new' | 'trending'>('all')

  const featuredProducts = productsData.filter((product) => product.featured) as Product[]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-20 -z-10" />
      
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 px-4 py-2 rounded-full mb-6"
          >
            <LucideSparkles className="w-4 h-4 text-primary-600" />
            <span className="text-primary-700 font-medium text-sm">
              Handpicked For You
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4"
          >
            Featured Products
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Discover authentic Ethiopian handmade crafts from our talented artisans. 
            Each piece tells a story of tradition and craftsmanship.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:scale-105'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setFilter('new')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === 'new'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:scale-105'
              }`}
            >
              <LucideSparkles className="w-4 h-4" />
              New Arrivals
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                filter === 'trending'
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:scale-105'
              }`}
            >
              <LucideTrendingUp className="w-4 h-4" />
              Trending
            </button>
          </motion.div>
        </div>

        {/* Products Grid with Stagger Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {featuredProducts.slice(0, 8).map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="h-full"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <p className="text-gray-900 font-semibold mb-2 text-lg">
              Discover More Amazing Products
            </p>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Explore our full collection of authentic Ethiopian handmade crafts
            </p>
            <Link href="/products">
              <Button 
                variant="primary" 
                size="lg"
                className="group"
              >
                View All Products
                <LucideArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Products', value: '5000+', icon: '🎨' },
            { label: 'Artisans', value: '500+', icon: '👨‍🎨' },
            { label: 'Happy Customers', value: '10K+', icon: '😊' },
            { label: 'Satisfaction', value: '98%', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts