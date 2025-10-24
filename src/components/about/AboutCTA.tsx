'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { LucideArrowRight, LucideStore } from 'lucide-react'

const AboutCTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ethiopian-pattern opacity-20" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-500 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full blur-3xl opacity-20" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
              Whether you're an artisan looking to share your craft or a customer 
              seeking authentic Ethiopian products, we'd love to have you.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary-600 hover:bg-gray-100"
                  rightIcon={<LucideArrowRight className="w-5 h-5" />}
                >
                  Start Shopping
                </Button>
              </Link>
              <Link href="/vendor-register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                  leftIcon={<LucideStore className="w-5 h-5" />}
                >
                  Become a Vendor
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div>
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-primary-100">Artisans</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">5000+</p>
                <p className="text-primary-100">Products</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-primary-100">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutCTA