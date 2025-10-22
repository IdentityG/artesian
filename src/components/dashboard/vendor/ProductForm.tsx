'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LucideImage,
  LucideX,
  LucideUpload,
  LucideSave,
  LucideArrowLeft,
} from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { ETHIOPIAN_REGIONS } from '@/lib/constants'
import categoriesData from '@/data/categories.json'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface ProductFormProps {
  mode: 'create' | 'edit'
  initialData?: any
}

const ProductForm = ({ mode, initialData }: ProductFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    shortDescription: initialData?.shortDescription || '',
    category: initialData?.category?.id || '',
    price: initialData?.price || '',
    compareAtPrice: initialData?.compareAtPrice || '',
    stock: initialData?.stock || '',
    sku: initialData?.sku || '',
    materials: initialData?.materials?.join(', ') || '',
    colors: initialData?.colors?.join(', ') || '',
    length: initialData?.dimensions?.length || '',
    width: initialData?.dimensions?.width || '',
    height: initialData?.dimensions?.height || '',
    weight: initialData?.dimensions?.weight || '',
    handmadeIn: initialData?.handmadeIn || '',
    productionTime: initialData?.productionTime || '',
    customizable: initialData?.customizable || false,
    customizationNote: initialData?.customizationNote || '',
    tags: initialData?.tags?.join(', ') || '',
    status: initialData?.status || 'draft',
  })

  const [images, setImages] = useState<string[]>(
    initialData?.images?.map((img: any) => img.url) || []
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // In real app, upload to server and get URLs
      // For now, create temporary URLs
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setImages((prev) => [...prev, ...newImages].slice(0, 5))
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      toast.error('Please add at least one product image')
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    toast.success(
      mode === 'create'
        ? 'Product created successfully!'
        : 'Product updated successfully!'
    )
    router.push('/vendor/products')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Images */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Images
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Add up to 5 images. First image will be the cover image.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {index === 0 && (
                <div className="absolute top-2 left-2">
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <LucideX className="w-4 h-4" />
              </button>
            </div>
          ))}

          {images.length < 5 && (
            <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-600 hover:bg-primary-50 transition-all">
              <LucideUpload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Upload Image</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>

        <div className="space-y-4">
          <Input
            label="Product Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Traditional Habesha Kemis"
          />

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Brief description for product listings"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Detailed product description including materials, craftsmanship, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categoriesData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing & Inventory */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pricing & Inventory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price (ETB)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />

          <Input
            label="Compare at Price (Optional)"
            type="number"
            name="compareAtPrice"
            value={formData.compareAtPrice}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="0.00"
          />

          <Input
            label="Stock Quantity"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            placeholder="0"
          />

          <Input
            label="SKU"
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            placeholder="e.g., HK-001"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Details
        </h3>

        <div className="space-y-4">
          <Input
            label="Materials (comma separated)"
            type="text"
            name="materials"
            value={formData.materials}
            onChange={handleChange}
            placeholder="e.g., Cotton, Gold Thread, Leather"
          />

          <Input
            label="Available Colors (comma separated)"
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
            placeholder="e.g., White, Cream, Ivory"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              label="Length (cm)"
              type="number"
              name="length"
              value={formData.length}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
            <Input
              label="Width (cm)"
              type="number"
              name="width"
              value={formData.width}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
            <Input
              label="Height (cm)"
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
            <Input
              label="Weight (g)"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                Handmade In <span className="text-red-500">*</span>
              </label>
              <select
                name="handmadeIn"
                value={formData.handmadeIn}
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
              label="Production Time"
              type="text"
              name="productionTime"
              value={formData.productionTime}
              onChange={handleChange}
              placeholder="e.g., 3-5 days"
            />
          </div>

          <Input
            label="Tags (comma separated)"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., traditional, handwoven, wedding"
          />
        </div>
      </div>

      {/* Customization */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Customization Options
        </h3>

        <div className="space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="customizable"
              checked={formData.customizable}
              onChange={handleChange}
              className="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
            />
            <span className="text-sm text-gray-700">
              This product can be customized
            </span>
          </label>

          {formData.customizable && (
            <Input
              label="Customization Note"
              type="text"
              name="customizationNote"
              value={formData.customizationNote}
              onChange={handleChange}
              placeholder="e.g., Can be customized for size and color"
            />
          )}
        </div>
      </div>

      {/* Product Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Publishing
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
          </select>
          <p className="text-sm text-gray-600 mt-2">
            {formData.status === 'draft'
              ? 'Product will not be visible to customers'
              : 'Product will be visible in your store'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link href="/vendor/products" className="flex-1">
          <Button type="button" variant="outline" className="w-full">
            <LucideArrowLeft className="w-5 h-5" />
            Cancel
          </Button>
        </Link>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1"
        >
          <LucideSave className="w-5 h-5" />
          {mode === 'create' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </form>
  )
}

export default ProductForm