'use client'

import Link from 'next/link'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa'
import { LucideMail, LucidePhone, LucideMapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white">
                  Artesian
                </span>
                <span className="text-xs text-gray-400 -mt-1">
                  Ethiopian Crafts
                </span>
              </div>
            </div>
            <p className="text-sm mb-4">
              Discover authentic Ethiopian handmade crafts from talented local
              artisans. Supporting traditional craftsmanship and cultural
              heritage.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaTelegram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/vendors"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Our Vendors
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/vendor-register"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Become a Vendor
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <LucideMapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Bole Road, Addis Ababa
                  <br />
                  Ethiopia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <LucidePhone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+251911234567"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  +251 911 234 567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <LucideMail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@artesian.et"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  info@artesian.et
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="https://wa.me/251911234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Artesian. All rights reserved. Made with ❤️ in
              Ethiopia
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ethiopian Flag Decoration */}
      <div className="h-1 bg-gradient-to-r from-ethiopian-green via-ethiopian-yellow to-ethiopian-red" />
    </footer>
  )
}

export default Footer