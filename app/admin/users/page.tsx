// 'use client'

// import { useState, useEffect } from 'react'
// import { User, Edit, Trash2, Shield, Mail, Calendar, Image as ImageIcon } from 'lucide-react'

// interface AdminUser {
//   id: string
//   name: string
//   email: string
//   profileImage?: string
//   created_at: string
//   updated_at: string
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<AdminUser[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)


//   // Fetch all users
//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       const token = localStorage.getItem('token')
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })

//       const data = await response.json()
      
//       if (data.success) {
//         setUsers(data.users || [])
//       } else {
//         setError(data.message || 'Failed to load users')
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error)
//       setError('Unable to load administrators. Please try again.')
//       setUsers([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDeleteUser = async (id: string) => {
//     try {
//       const token = localStorage.getItem('token')
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })

//       const data = await response.json()
      
//       if (data.success) {
//         setUsers(users.filter(user => user.id !== id))
//         setDeleteConfirm(null)
//       } else {
//         alert(data.message || 'Failed to delete administrator')
//       }
//     } catch (error) {
//       console.error('Delete error:', error)
//       alert('Failed to delete administrator. Please try again.')
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     })
//   }

//   // Get user initials for avatar
//   const getUserInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map(word => word[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2)
//   }

//   // Get random color for avatar
//   const getAvatarColor = (id: string) => {
//     const colors = [
//       'bg-gradient-to-br from-blue-500 to-blue-600',
//       'bg-gradient-to-br from-green-500 to-green-600',
//       'bg-gradient-to-br from-purple-500 to-purple-600',
//       'bg-gradient-to-br from-amber-500 to-amber-600',
//       'bg-gradient-to-br from-pink-500 to-pink-600',
//       'bg-gradient-to-br from-teal-500 to-teal-600'
//     ]
//     const index = parseInt(id.slice(-1), 16) % colors.length
//     return colors[index]
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900">Administrators</h1>
//             <p className="text-gray-600 mt-2">Loading administrators...</p>
//           </div>
          
//           {/* Loading Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <div key={i} className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="animate-pulse">
//                   <div className="flex flex-col items-center text-center">
//                     <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                     <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
//           <div className="flex items-center gap-3">
//             <div className="p-3 bg-blue-100 rounded-xl">
//               <Shield className="w-8 h-8 text-blue-600" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Administrators</h1>
//               <p className="text-gray-600 mt-1">Manage system administrators</p>
//             </div>
//           </div>
          
//           {/* Stats */}
//           <div className="mt-6 flex flex-wrap gap-4">
//             <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
//               <span className="font-semibold">{users.length}</span> Administrators
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//             <p className="font-medium">Error loading administrators</p>
//             <p className="text-sm">{error}</p>
//             <button 
//               onClick={fetchUsers}
//               className="mt-2 text-sm underline hover:text-red-800"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {/* Cards Grid - 3 columns */}
//         {users.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
//             <div className="mx-auto w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
//               <User className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">No administrators found</h3>
//             <p className="text-gray-600">
//               No administrators have been registered yet.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {users.map((user) => (
//               <div 
//                 key={user.id}
//                 className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
//               >
//                 {/* Profile Image/Initials */}
//                 <div className="p-6 flex flex-col items-center text-center">
//                   {user.profileImage ? (
//                     <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
//                       <img
//                         src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${user.profileImage}`}
//                         alt={user.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div className={`w-24 h-24 ${getAvatarColor(user.id)} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg`}>
//                       {getUserInitials(user.name)}
//                     </div>
//                   )}
                  
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h3>
                  
//                   <div className="flex items-center justify-center text-gray-600 mb-2">
//                     <Mail className="w-4 h-4 mr-2" />
//                     <span className="truncate">{user.email}</span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
//                   <button
//                     onClick={() => window.location.href = `/admin/users/edit/${user.id}`}
//                     className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
//                   >
//                     <Edit className="w-4 h-4" />
//                     <span className="text-sm font-medium">Edit</span>
//                   </button>
                  
//                   <button
//                     onClick={() => setDeleteConfirm(user.id)}
//                     className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     <span className="text-sm font-medium">Delete</span>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Delete Confirmation Modal */}
//         {deleteConfirm && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Administrator</h3>
//               <p className="text-gray-600 mb-6">
//                 Are you sure you want to delete this administrator? This action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handleDeleteUser(deleteConfirm)}
//                   className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setDeleteConfirm(null)}
//                   className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }






'use client'

import { useState, useEffect } from 'react'
import { User, Edit, Trash2, Shield, Mail, Calendar, Image as ImageIcon } from 'lucide-react'

interface AdminUser {
  id: string
  name: string
  email: string
  profileImage?: string
  created_at: string
  updated_at: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ✅ ADD THIS HELPER FUNCTION
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL (from Backblaze B2)
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a local path (legacy) - prepend base URL
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${imagePath}`;
  };

  // Fetch all users
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setUsers(data.users || [])
      } else {
        setError(data.message || 'Failed to load users')
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('Unable to load administrators. Please try again.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      
      if (data.success) {
        setUsers(users.filter(user => user.id !== id))
        setDeleteConfirm(null)
      } else {
        alert(data.message || 'Failed to delete administrator')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete administrator. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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

  // Get random color for avatar
  const getAvatarColor = (id: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-amber-500 to-amber-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-teal-500 to-teal-600'
    ]
    const index = parseInt(id.slice(-1), 16) % colors.length
    return colors[index]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Administrators</h1>
            <p className="text-gray-600 mt-2">Loading administrators...</p>
          </div>
          
          {/* Loading Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <div className="animate-pulse">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Administrators</h1>
              <p className="text-gray-600 mt-1">Manage system administrators</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <span className="font-semibold">{users.length}</span> Administrators
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error loading administrators</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchUsers}
              className="mt-2 text-sm underline hover:text-red-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Cards Grid - 3 columns */}
        {users.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="mx-auto w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No administrators found</h3>
            <p className="text-gray-600">
              No administrators have been registered yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div 
                key={user.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Profile Image/Initials */}
                <div className="p-6 flex flex-col items-center text-center">
                  {user.profileImage ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                      {/* ✅ FIXED: Use the helper function */}
                      <img
                        src={getImageUrl(user.profileImage)}
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Hide broken images and show initials instead
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-24 h-24 ${getAvatarColor(user.id)} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                ${getUserInitials(user.name)}
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`w-24 h-24 ${getAvatarColor(user.id)} text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg`}>
                      {getUserInitials(user.name)}
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h3>
                  
                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => window.location.href = `/admin/users/edit/${user.id}`}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  
                  <button
                    onClick={() => setDeleteConfirm(user.id)}
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Administrator</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this administrator? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteUser(deleteConfirm)}
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
    </div>
  )
}