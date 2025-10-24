'use client'

import { motion } from 'framer-motion'
import {
  LucideHeadphones,
  LucideShoppingBag,
  LucideStore,
  LucideHelpCircle,
  LucideUsers,
  LucideTruck,
} from 'lucide-react'

const ContactInfo = () => {
  const departments = [
    {
      icon: LucideHeadphones,
      title: 'Customer Support',
      description: 'Get help with orders, returns, and general inquiries.',
      email: 'support@artesian.et',
      hours: 'Mon-Fri: 9AM-6PM EAT',
      color: 'primary',
    },
    {
      icon: LucideStore,
      title: 'Vendor Support',
      description: 'Questions about selling on Artesian? We can help.',
      email: 'vendors@artesian.et',
      hours: 'Mon-Fri: 9AM-6PM EAT',
      color: 'secondary',
    },
    {
      icon: LucideShoppingBag,
      title: 'Sales & Partnerships',
      description: 'Interested in bulk orders or partnerships?',
      email: 'sales@artesian.et',
      hours: 'Mon-Fri: 9AM-5PM EAT',
      color: 'primary',
    },
    {
      icon: LucideUsers,
      title: 'Press & Media',
      description: 'Media inquiries and press information.',
      email: 'press@artesian.et',
      hours: 'Mon-Fri: 9AM-5PM EAT',
      color: 'secondary',
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
            How Can We Help?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the department that best fits your inquiry for the fastest response.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {departments.map((dept, index) => {
            const Icon = dept.icon
            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 h-full hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br from-${dept.color}-100 to-${dept.color}-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 text-${dept.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {dept.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {dept.description}
                      </p>
                      <div className="space-y-2">
                        <a
                          href={`mailto:${dept.email}`}
                          className={`text-${dept.color}-600 hover:text-${dept.color}-700 font-medium inline-flex items-center gap-2 group/link`}
                        >
                          <span>{dept.email}</span>
                          <svg
                            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                        <p className="text-sm text-gray-500">
                          {dept.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactInfo