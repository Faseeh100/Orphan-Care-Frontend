'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, User, Mail, Upload, Camera, X } from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  profileImage?: string
  created_at: string
}

export default function EditAdminPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        
        if (data.success) {
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
          })
          if (data.user.profileImage) {
            setProfileImage(data.user.profileImage)
            // Apply replace directly here
            setImagePreview(
              data.user.profileImage.startsWith('http')
                ? data.user.profileImage
                : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${data.user.profileImage}`
            )
          }
        } else {
          setError(data.message || 'Administrator not found')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        if (error instanceof Error) {
          setError(`Unable to load administrator details: ${error.message}`)
        } else {
          setError('Unable to load administrator details: Unknown error')
        }
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)')
        return
      }
      
      if (file.size > 2 * 1024 * 1024) {
        alert('Profile image must be less than 2MB')
        return
      }
      
      setSelectedFile(file)
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload profile image to backend
  const uploadProfileImage = async (): Promise<string | null> => {
    if (!selectedFile) return null

    try {
      setUploadingImage(true)
      
      // Create FormData
      const imageFormData = new FormData()
      imageFormData.append('image', selectedFile)
      
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return null
      }

      // Upload to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: imageFormData
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success && data.user && data.user.profileImage) {
        return data.user.profileImage
      } else {
        throw new Error(data.message || 'Upload failed without specific error')
      }
    } catch (error) {
      console.error('Profile image upload error:', error)
      
      let errorMessage = 'Failed to upload profile image'
      if (error instanceof Error) {
        errorMessage = `Failed to upload profile image: ${error.message}`
      } else if (typeof error === 'string') {
        errorMessage = `Failed to upload profile image: ${error}`
      }
      
      alert(errorMessage)
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  // Remove profile image
  const removeProfileImage = () => {
    setSelectedFile(null)
    if (profileImage) {
      // Apply replace directly here
      setImagePreview(
        profileImage.startsWith('http')
          ? profileImage
          : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${profileImage}`
      )
    } else {
      setImagePreview(null)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      let profileImagePath = profileImage
      
      // Upload new image if selected
      if (selectedFile) {
        const uploadedPath = await uploadProfileImage()
        if (uploadedPath) {
          profileImagePath = uploadedPath
        }
      }

      // Prepare update data
      const updateData: any = {
        name: formData.name,
        email: formData.email,
      }

      // Only include profileImage if we have a new path
      if (profileImagePath && profileImagePath !== profileImage) {
        updateData.profileImage = profileImagePath
      }

      // Update user details
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update administrator')
      }

      if (data.success) {
        alert('Administrator updated successfully!')
        router.push('/admin/users')
      } else {
        setError(data.message || 'Failed to update administrator')
      }
    } catch (error) {
      console.error('Update error:', error)
      if (error instanceof Error) {
        setError(`Failed to update administrator: ${error.message}`)
      } else {
        setError('Failed to update administrator. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading administrator details...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Administrators
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Administrator</h1>
              <p className="text-gray-600 mt-1">Update administrator details and profile</p>
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Profile Image */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Profile Image
                </h3>
                
                <div className="space-y-4">
                  {/* Current Profile Image */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt={formData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
                          {getUserInitials(formData.name)}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Recommended: Square image, 400×400 pixels, JPG or PNG format
                    </p>
                  </div>

                  {/* Image Upload Controls */}
                  <div className="space-y-3">
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    
                    <div className="flex gap-3">
                      <label
                        htmlFor="profile-upload"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                          uploadingImage
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white`}
                      >
                        {uploadingImage ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            {selectedFile ? 'Change Image' : 'Upload Image'}
                          </>
                        )}
                      </label>
                      
                      {(imagePreview || selectedFile) && (
                        <button
                          type="button"
                          onClick={removeProfileImage}
                          className="px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {selectedFile && (
                      <p className="text-sm text-gray-600">
                        Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - User Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                
                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter administrator name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="administrator@example.com"
                    />
                  </div>

                  {/* User Info */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Created:</span> {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/admin/users')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg cursor-pointer
                    hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || uploadingImage}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {saving || uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        {uploadingImage ? 'Uploading...' : 'Saving...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}