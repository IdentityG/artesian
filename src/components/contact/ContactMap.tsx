'use client'

import { motion } from 'framer-motion'
import {
  LucideMapPin,
  LucideClock,
  LucidePhone,
  LucideMail,
} from 'lucide-react'

const ContactMap = () => {
  const locations = [
    {
      name: 'Main Office',
      address: 'Bole Road, Addis Ababa',
      region: 'Addis Ababa, Ethiopia',
      phone: '+251 911 000 000',
      email: 'addis@artesian.et',
      hours: 'Mon-Fri: 9AM-6PM',
    },
    {
      name: 'Warehouse',
      address: 'Merkato Area',
      region: 'Addis Ababa, Ethiopia',
      phone: '+251 922 000 000',
      email: 'warehouse@artesian.et',
      hours: 'Mon-Sat: 8AM-5PM',
    },
  ]

  return (
    <section className="section-padding bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 ethiopian-pattern opacity-10" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Visit Our Locations
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stop by our offices or warehouse to see our collection in person.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LucideMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                  <p className="text-gray-300">{location.address}</p>
                  <p className="text-gray-400 text-sm">{location.region}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <LucidePhone className="w-5 h-5 text-primary-400" />
                  <a
                    href={`tel:${location.phone}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <LucideMail className="w-5 h-5 text-primary-400" />
                  <a
                    href={`mailto:${location.email}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {location.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <LucideClock className="w-5 h-5 text-primary-400" />
                  <span>{location.hours}</span>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 h-48 bg-gray-800 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-900/20 to-secondary-900/20 flex items-center justify-center">
                  <div className="text-center">
                    <LucideMapPin className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      Map integration coming soon
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <p className="text-gray-300 mb-2">
              📍 Looking for a specific artisan's workshop?
            </p>
            <p className="text-gray-400">
              Contact us and we'll help you connect directly with our vendors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactMap