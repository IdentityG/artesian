'use client'

import { motion } from 'framer-motion'
import { LucideMessageSquare, LucideMail, LucidePhone, LucideMapPin } from 'lucide-react'

const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="absolute inset-0 ethiopian-pattern opacity-30" />
      
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 px-4 py-2 rounded-full mb-6">
              <LucideMessageSquare className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700 font-medium text-sm">
                We're Here to Help
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
              Get in Touch
              <span className="gradient-text block">
                With Us
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Have questions about our products, want to become a vendor, or need assistance? 
              We'd love to hear from you!
            </p>

            {/* Quick Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.a
                href="mailto:support@artesian.et"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LucideMail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Email Us</p>
                  <p className="text-sm text-primary-600">support@artesian.et</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:+251911000000"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-secondary-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-secondary-100 to-secondary-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LucidePhone className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Call Us</p>
                  <p className="text-sm text-secondary-600">+251 911 000 000</p>
                </div>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-secondary-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LucideMapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Visit Us</p>
                  <p className="text-sm text-gray-600">Addis Ababa, Ethiopia</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero