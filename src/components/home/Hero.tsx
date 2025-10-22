'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { LucideArrowRight, LucideShoppingBag, LucideUsers } from 'lucide-react'
import Button from '../ui/Button'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current && imageRef.current) {
      const tl = gsap.timeline()

      tl.from(heroRef.current.querySelector('.hero-title'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          heroRef.current.querySelector('.hero-description'),
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          heroRef.current.querySelector('.hero-buttons'),
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .from(
          heroRef.current.querySelector('.hero-stats'),
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ethiopian-pattern opacity-30" />

      <div className="container-custom py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={heroRef}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
            >
              🇪🇹 Authentic Ethiopian Crafts
            </motion.div>

            <h1 className="hero-title font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Unique{' '}
              <span className="gradient-text">Handmade Treasures</span> from
              Ethiopia
            </h1>

            <p className="hero-description text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Shop directly from talented Ethiopian artisans. Each piece tells a
              story of tradition, culture, and exceptional craftsmanship.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/products">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <LucideShoppingBag className="w-5 h-5" />
                  Shop Now
                  <LucideArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/vendors">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <LucideUsers className="w-5 h-5" />
                  Meet Our Artisans
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-stats grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  100+
                </div>
                <div className="text-sm text-gray-600">Artisans</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  4.9★
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1200"
                alt="Ethiopian traditional crafts"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-8 -left-4 bg-white rounded-xl shadow-xl p-4 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    100% Handmade
                  </div>
                  <div className="text-sm text-gray-600">
                    Authentic Craftsmanship
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-8 -right-4 bg-white rounded-xl shadow-xl p-4 max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-2xl">🇪🇹</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    Made in Ethiopia
                  </div>
                  <div className="text-sm text-gray-600">
                    Supporting Local Artisans
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-50" />
    </section>
  )
}

export default Hero