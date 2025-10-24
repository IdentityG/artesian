'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern opacity-30" />
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
              <span className="text-primary-700 font-medium text-sm">
                Established 2020
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Connecting Ethiopian
              <span className="gradient-text block">
                Artisans to the World
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Artesian is Ethiopia's premier online marketplace dedicated to preserving 
              and promoting authentic handmade crafts and traditional artworks. We bridge 
              the gap between talented artisans and customers who appreciate quality craftsmanship.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Authentic</p>
                  <p className="text-sm text-gray-600">Verified Artisans</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fair Trade</p>
                  <p className="text-sm text-gray-600">Direct Support</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800"
                alt="Ethiopian Artisan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <p className="text-gray-900 font-medium mb-2">
                  "Artesian has transformed how we share our culture with the world."
                </p>
                <p className="text-sm text-gray-600">
                  - Abeba Tadesse, Traditional Crafts Vendor
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero