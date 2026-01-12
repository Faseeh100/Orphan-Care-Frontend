'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, ImageIcon, Tag, FileText, Check } from 'lucide-react'

export default function AddImagePage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const [formData, setFormData] = useState({
    description: '',
    altText: '',
    category: 'children',
  })

  
  const categories = [
    'children',
    'activities',
    'events',
    'facilities',
    'volunteers',
    'general'
  ]

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)')
        return
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      // Auto-fill alt text if empty
      if (!formData.altText.trim()) {
        setFormData(prev => ({
          ...prev,
          altText: file.name.replace(/\.[^/.]+$/, "") // Remove extension
        }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      alert('Please select an image to upload')
      return
    }

    const data = new FormData()
    data.append('image', selectedFile)
    data.append('description', formData.description)
    data.append('altText', formData.altText)
    data.append('category', formData.category)

    try {
      setUploading(true)
      setUploadProgress(30)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
        method: 'POST',
        body: data,
      })

      setUploadProgress(70)
      const result = await response.json()

      setUploadProgress(100)

      if (result.success) {
        setTimeout(() => {
          router.push('/admin/gallery')
        }, 1000)
      } else {
        alert(`Upload failed: ${result.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <X className="w-5 h-5" />
            Back to Gallery
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-linear-to-br from-blue-100 to-purple-100 rounded-xl">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upload New Image</h1>
              <p className="text-gray-600 mt-1">Add images to your gallery collection</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Upload */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  Image Selection
                </h2>
                
                <div className="border-3 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                  {preview ? (
                    <div className="space-y-4">
                      <div className="relative h-64 w-full bg-linear-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedFile?.name} ({Math.round((selectedFile?.size || 0) / 1024)} KB)
                      </p>
                    </div>
                  ) : (
                    <div className="py-12">
                      <div className="mx-auto w-20 h-20 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-gray-900 font-medium mb-2">Drag & drop or click to browse</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                  
                  <label
                    htmlFor="image-upload"
                    className={`mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer transition-all ${
                      uploading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    } text-white`}
                  >
                    <Upload className="w-5 h-5" />
                    {preview ? 'Change Image' : 'Select Image'}
                  </label>
                </div>
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Uploading...</span>
                    <span className="font-bold text-blue-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  {uploadProgress === 100 && (
                    <div className="flex items-center gap-2 mt-4 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Upload complete! Redirecting...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Form Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Image Details
                </h2>
                
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={4}
                      placeholder="Describe this image (optional)..."
                      disabled={uploading}
                    />
                  </div>

                  {/* Alt Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alt Text *
                      <span className="text-xs text-gray-500 ml-2">(For accessibility)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.altText}
                      onChange={(e) => setFormData({...formData, altText: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the image for screen readers"
                      required
                      disabled={uploading}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="flex text-sm font-medium text-gray-700 mb-2 items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={uploading}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="sticky bottom-6">
                <button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className={`w-full py-4 rounded-xl cursor-pointer font-semibold text-lg transition-all ${
                    uploading || !selectedFile
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  } text-white`}
                >
                  {uploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Uploading...
                    </span>
                  ) : (
                    'Upload Image'
                  )}
                </button>
                
                {!selectedFile && (
                  <p className="text-sm text-red-600 mt-2 text-center">
                    Please select an image to upload
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}