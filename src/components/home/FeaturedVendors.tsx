'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LucideArrowRight, LucideStar, LucidePackage } from 'lucide-react'
import vendorsData from '@/data/sampleVendors.json'
import Button from '../ui/Button'
import RatingStars from '../shared/RatingStars'

gsap.registerPlugin(ScrollTrigger)

const FeaturedVendors = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const vendorsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (vendorsRef.current) {
      const cards = vendorsRef.current.querySelectorAll('.vendor-card')

      gsap.from(cards, {
        scrollTrigger: {
          trigger: vendorsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
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
            Meet Our Artisans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Talented craftspeople preserving Ethiopian traditions through their
            beautiful handmade creations
          </motion.p>
        </div>

        <div
          ref={vendorsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {vendorsData.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
              className="vendor-card group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Banner */}
                <div className="relative h-32 bg-gradient-to-r from-primary-400 to-secondary-400">
                  {vendor.businessBanner && (
                    <Image
                      src={vendor.businessBanner}
                      alt={vendor.businessName}
                      fill
                      className="object-cover opacity-80"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-6 -mt-12">
                  {/* Logo */}
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <Image
                      src={vendor.businessLogo || vendor.avatar}
                      alt={vendor.businessName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-primary-600 transition-colors">
                    {vendor.businessName}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                    {vendor.businessDescription}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <RatingStars rating={vendor.rating} size="sm" />
                    <span className="text-sm text-gray-600">
                      ({vendor.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <LucidePackage className="w-4 h-4 text-primary-600" />
                        <span className="font-semibold text-gray-900">
                          {vendor.totalProducts}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Products</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <LucideStar className="w-4 h-4 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {vendor.totalSales}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Sales</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                      📍 {vendor.businessAddress.city}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/vendors">
            <Button variant="primary">
              View All Vendors
              <LucideArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedVendors