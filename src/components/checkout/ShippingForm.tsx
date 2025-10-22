'use client'

import { useState } from 'react'
import { LucideMapPin, LucidePhone, LucideMail } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Address } from '@/types'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'

interface ShippingFormProps {
  onSubmit: (shipping: Address, billing: Address | null, sameAddress: boolean) => void
  initialData: {
    shippingAddress: Address | null
    billingAddress: Address | null
    useSameAddress: boolean
  }
}

const ShippingForm = ({ onSubmit, initialData }: ShippingFormProps) => {
  const [useSameAddress, setUseSameAddress] = useState(initialData.useSameAddress)
  const [formData, setFormData] = useState({
    // Shipping
    shippingStreet: initialData.shippingAddress?.street || '',
    shippingCity: initialData.shippingAddress?.city || '',
    shippingRegion: initialData.shippingAddress?.region || '',
    shippingSubCity: initialData.shippingAddress?.subCity || '',
    // Billing
    billingStreet: initialData.billingAddress?.street || '',
    billingCity: initialData.billingAddress?.city || '',
    billingRegion: initialData.billingAddress?.region || '',
    billingSubCity: initialData.billingAddress?.subCity || '',
    // Contact
    email: 'customer@email.com',
    phone: '+251911111111',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const shippingAddress: Address = {
      id: 'shipping-1',
      street: formData.shippingStreet,
      city: formData.shippingCity,
      region: formData.shippingRegion,
      subCity: formData.shippingSubCity,
      country: 'Ethiopia',
      isDefault: true,
    }

    const billingAddress: Address | null = useSameAddress
      ? null
      : {
          id: 'billing-1',
          street: formData.billingStreet,
          city: formData.billingCity,
          region: formData.billingRegion,
          subCity: formData.billingSubCity,
          country: 'Ethiopia',
        }

    onSubmit(shippingAddress, billingAddress, useSameAddress)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Shipping Information
      </h2>

      {/* Contact Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            leftIcon={<LucideMail className="w-5 h-5" />}
          />
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            leftIcon={<LucidePhone className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <Input
            label="Street Address"
            type="text"
            name="shippingStreet"
            value={formData.shippingStreet}
            onChange={handleChange}
            required
            leftIcon={<LucideMapPin className="w-5 h-5" />}
            placeholder="e.g., Bole Road, Near Edna Mall"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Region <span className="text-red-500">*</span>
              </label>
              <select
                name="shippingRegion"
                value={formData.shippingRegion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Region</option>
                {ETHIOPIAN_REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="City"
              type="text"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              required
              placeholder="e.g., Addis Ababa"
            />
          </div>
          <Input
            label="Sub City / Wereda (Optional)"
            type="text"
            name="shippingSubCity"
            value={formData.shippingSubCity}
            onChange={handleChange}
            placeholder="e.g., Bole"
          />
        </div>
      </div>

      {/* Same as Shipping Checkbox */}
      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => setUseSameAddress(e.target.checked)}
            className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
          />
          <span className="text-sm text-gray-700">
            Billing address is the same as shipping address
          </span>
        </label>
      </div>

      {/* Billing Address */}
      {!useSameAddress && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Billing Address</h3>
          <div className="space-y-4">
            <Input
              label="Street Address"
              type="text"
              name="billingStreet"
              value={formData.billingStreet}
              onChange={handleChange}
              required
              leftIcon={<LucideMapPin className="w-5 h-5" />}
              placeholder="e.g., Bole Road, Near Edna Mall"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">
                  Region <span className="text-red-500">*</span>
                </label>
                <select
                  name="billingRegion"
                  value={formData.billingRegion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Region</option>
                  {ETHIOPIAN_REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="City"
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
                required
                placeholder="e.g., Addis Ababa"
              />
            </div>
            <Input
              label="Sub City / Wereda (Optional)"
              type="text"
              name="billingSubCity"
              value={formData.billingSubCity}
              onChange={handleChange}
              placeholder="e.g., Bole"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="primary" size="lg" className="w-full">
        Continue to Payment
      </Button>
    </form>
  )
}

export default ShippingForm