'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LucideSearch,
  LucideShoppingCart,
  LucidePackage,
  LucideSmile,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: LucideSearch,
    title: 'Discover',
    description:
      'Browse our curated collection of authentic Ethiopian handmade products from talented artisans',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: LucideShoppingCart,
    title: 'Order',
    description:
      'Select your favorite items and place your order securely with multiple payment options',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: LucidePackage,
    title: 'Receive',
    description:
      'Get your handcrafted treasures delivered safely to your doorstep anywhere in Ethiopia',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: LucideSmile,
    title: 'Enjoy',
    description:
      'Cherish unique pieces while supporting local artisans and preserving Ethiopian heritage',
    color: 'from-yellow-500 to-yellow-600',
  },
]

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (stepsRef.current) {
      const stepCards = stepsRef.current.querySelectorAll('.step-card')

      gsap.from(stepCards, {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Your journey to owning authentic Ethiopian crafts in four simple steps
          </motion.p>
        </div>

        <div ref={stepsRef} className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-primary-200 to-yellow-200 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="step-card relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center font-bold text-primary-600 shadow-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks