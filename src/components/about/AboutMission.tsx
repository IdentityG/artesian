'use client'

import { motion } from 'framer-motion'
import { LucideTarget, LucideEye, LucideHeart } from 'lucide-react'

const AboutMission = () => {
  const items = [
    {
      icon: LucideTarget,
      title: 'Our Mission',
      description: 'To empower Ethiopian artisans by providing a digital platform that showcases their craftsmanship to a global audience, ensuring fair compensation and sustainable growth.',
      color: 'primary',
    },
    {
      icon: LucideEye,
      title: 'Our Vision',
      description: 'To become the leading marketplace for authentic African crafts, preserving cultural heritage while creating economic opportunities for artisans across the continent.',
      color: 'secondary',
    },
    {
      icon: LucideHeart,
      title: 'Our Values',
      description: 'Authenticity, sustainability, fair trade, cultural preservation, and community empowerment are at the core of everything we do.',
      color: 'ethiopian',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            What Drives Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're more than just a marketplace - we're a movement to preserve 
            Ethiopian cultural heritage and empower artisans.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow duration-300">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-${item.color}-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutMission