'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LucideMail, LucideSend } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMessage('Thank you for subscribing!')
    setEmail('')
    setIsLoading(false)

    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <LucideMail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-white/90">
              Subscribe to our newsletter and get the latest updates on new
              products, special offers, and artisan stories delivered to your inbox.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={isLoading}
              className="whitespace-nowrap"
            >
              <LucideSend className="w-5 h-5" />
              Subscribe
            </Button>
          </motion.form>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-white/90 font-medium"
            >
              ✓ {message}
            </motion.p>
          )}

          <p className="mt-6 text-sm text-white/70">
            By subscribing, you agree to receive marketing emails. Unsubscribe
            anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter