'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideChevronLeft, LucideChevronRight, LucideQuote } from 'lucide-react'
import RatingStars from '../shared/RatingStars'

const testimonials = [
  {
    id: 1,
    name: 'Sara Johnson',
    role: 'Customer',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    text: "I absolutely love my Habesha Kemis! The quality is exceptional and the embroidery work is stunning. It's clear that these are made with love and care. I'll definitely be ordering more!",
    location: 'Addis Ababa',
  },
  {
    id: 2,
    name: 'Michael Haile',
    role: 'Customer',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'The leather messenger bag I purchased exceeded my expectations. The craftsmanship is top-notch and it gets better with age. Supporting local artisans while getting quality products is amazing!',
    location: 'Dire Dawa',
  },
  {
    id: 3,
    name: 'Ruth Bekele',
    role: 'Customer',
    avatar: 'https://i.pravatar.cc/150?img=20',
    rating: 5,
    text: 'The Ethiopian cross pendant is absolutely beautiful! The detail in the filigree work is incredible. Fast shipping and excellent customer service. Highly recommend Artesian!',
    location: 'Bahir Dar',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(handleNext, 5000)
    return () => clearInterval(timer)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Real experiences from people who love Ethiopian handmade crafts
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg z-10">
            <LucideQuote className="w-8 h-8 text-white" />
          </div>

          <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl p-12 min-h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-12 flex flex-col items-center justify-center text-center"
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-primary-100">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <RatingStars
                    rating={testimonials[currentIndex].rating}
                    size="lg"
                  />
                </div>

                {/* Testimonial Text */}
                <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed max-w-2xl">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-primary-600 hover:text-white transition-colors z-20"
            >
              <LucideChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-primary-600 hover:text-white transition-colors z-20"
            >
              <LucideChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-primary-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials