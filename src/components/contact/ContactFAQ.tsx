'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucidePlus, LucideMinus } from 'lucide-react'

const ContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'Our customer support team is available Monday through Friday, 9:00 AM to 6:00 PM East Africa Time (EAT). We respond to emails within 24 hours during business days.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 14-day return policy for most items. Products must be unused and in original condition. Custom or personalized items may not be eligible for returns. Contact our support team to initiate a return.',
    },
    {
      question: 'How do I become a vendor?',
      answer: 'Visit our Vendor Registration page and fill out the application form. Our team will review your application and contact you within 3-5 business days. You\'ll need to provide business information and samples of your work.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we primarily ship within Ethiopia. However, we are working on expanding our international shipping options. Contact our sales team for bulk international orders.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, mobile money (M-Pesa, Telebirr), and bank transfers. Payment options may vary depending on your location.',
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions. Can't find what you're looking for? 
            Send us a message above.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-6 text-left transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <LucideMinus className="w-5 h-5 text-primary-600" />
                    ) : (
                      <LucidePlus className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6">
            <p className="text-gray-900 font-medium mb-2">
              Still have questions?
            </p>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you
            </p>
            <a
              href="mailto:support@artesian.et"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Contact Support
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactFAQ