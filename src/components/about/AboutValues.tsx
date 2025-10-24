'use client'

import { motion } from 'framer-motion'
import {
  LucideShield,
  LucideLeaf,
  LucideUsers,
  LucideAward,
  LucideHeart,
  LucideTrendingUp,
} from 'lucide-react'

const AboutValues = () => {
  const values = [
    {
      icon: LucideShield,
      title: 'Authenticity',
      description: 'Every product is verified to ensure genuine Ethiopian craftsmanship.',
    },
    {
      icon: LucideLeaf,
      title: 'Sustainability',
      description: 'We promote eco-friendly practices and sustainable artisan livelihoods.',
    },
    {
      icon: LucideUsers,
      title: 'Community',
      description: 'Building strong connections between artisans and customers worldwide.',
    },
    {
      icon: LucideAward,
      title: 'Quality',
      description: 'Maintaining the highest standards in craftsmanship and customer service.',
    },
    {
      icon: LucideHeart,
      title: 'Cultural Heritage',
      description: 'Preserving and celebrating Ethiopian traditional arts and crafts.',
    },
    {
      icon: LucideTrendingUp,
      title: 'Fair Trade',
      description: 'Ensuring artisans receive fair compensation for their work.',
    },
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide every decision we make and every relationship we build.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 h-full border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AboutValues