'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Trash2, Eye, Folder, Calendar, FileText } from 'lucide-react'

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

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`)
      const data = await response.json()
      if (data.success) {
        setImages(data.data)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setImages(images.filter(img => img.id !== id))
        setDeleteConfirm(null)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Failed to delete image')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))]
  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory)

  const totalSize = images.reduce((acc, img) => acc + img.size, 0)

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 
        bg-white rounded-2xl shadow-lg">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Folder className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Gallery</h1>
                <p className="text-gray-600 mt-1">Manage and organize your gallery images</p>
              </div>
            </div>
          </div>
          
          <Link
            href="/admin/gallery/add"
            className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Images</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Images</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{images.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{categories.length - 1}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Folder className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="mx-auto w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory === 'all' 
                ? 'Upload your first image to get started' 
                : `No images found in "${selectedCategory}" category`}
            </p>
            <Link
              href="/admin/gallery/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Upload Image
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full bg-linear-to-br from-gray-100 to-gray-200">
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${image.filePath}`}
                    src={image.filePath}
                    alt={image.altText || image.originalName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized={true}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                      {image.originalName}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(image.createdAt)}</span>
                    </div>
                    <span className="font-medium">{formatFileSize(image.size)}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      // onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL}${image.filePath}`, '_blank')}
                      onClick={() => window.open(image.filePath, '_blank')}
                      className="flex-1 flex items-center justify-center cursor-pointer gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">View</span>
                    </button>
                    
                    <button
                      onClick={() => setDeleteConfirm(image.id)}
                      className="flex-1 flex items-center justify-center cursor-pointer gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm === image.id && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Delete Image</h3>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to delete "{image.originalName}"? This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}