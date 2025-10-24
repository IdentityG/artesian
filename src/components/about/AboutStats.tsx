'use client'

import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const AboutStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      value: 500,
      suffix: '+',
      label: 'Verified Artisans',
      color: 'from-primary-600 to-primary-400',
    },
    {
      value: 5000,
      suffix: '+',
      label: 'Unique Products',
      color: 'from-secondary-600 to-secondary-400',
    },
    {
      value: 10000,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-ethiopian-green to-secondary-500',
    },
    {
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'from-ethiopian-yellow to-primary-500',
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ethiopian-pattern opacity-10" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Together, we're making a difference in the lives of Ethiopian artisans 
            and preserving our cultural heritage.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-block bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-3`}>
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </span>
              </div>
              <p className="text-gray-300 font-medium text-lg">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutStats