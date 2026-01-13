'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Eye } from 'lucide-react'

interface GalleryImage {
  id: string
  filename: string
  originalName: string
  filePath: string
  description: string
  altText: string
  category: string
  size: number
  mimeType: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')

  // Fetch only 3 latest images
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`)
        const data = await response.json()
        
        if (data.success) {
          // Take only the first 3 images (latest)
          const latestThree = data.data.slice(0, 3)
          setImages(latestThree)
        } else {
          setError('Failed to load gallery images')
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error)
        setError('Unable to load gallery. Please try again.')
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryImages()
  }, [API_URL])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Bytes'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Images</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || images.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
            <p className="text-gray-600">Preview of recent moments</p>
          </div>
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {error || 'No images available yet'}
            </h3>
            <p className="text-gray-500">
              Check back soon for gallery updates
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Images</span>
          </h2>
        </div>

        {/* Three Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {images.map((image) => (
            <div 
              key={image.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full bg-gray-100">
                <Image
                  // src={`${BACKEND_URL}${image.filePath}`}
                  src={image.filePath}
                  alt={image.altText || image.originalName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}