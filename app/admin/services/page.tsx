'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  icon: string;
  created_at: string;
}

export default function AdminServicesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from backend
  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setServices(result.services || []);
      } else {
        throw new Error(result.message || 'Failed to load services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error instanceof Error ? error.message : 'Failed to load services');
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle status');
      }
      
      // Update local state
      setServices(services.map(service => 
        service.id === id ? { ...service, isActive: !service.isActive } : service
      ));
      
    } catch (error) {
      console.error('Toggle status error:', error);
      alert('Failed to update service status');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      // Remove from local state
      setServices(services.filter(service => service.id !== id));
      
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete service');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Main content - Sidebar is in layout */}
        <div className="flex-1 p-8">
          {/* Header with Add Service button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
              <p className="text-gray-600 mt-2">Manage all orphan care services from this admin panel</p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/services/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Service
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Error loading services</p>
              <p className="text-sm">{error}</p>
              <button 
                onClick={fetchServices}
                className="mt-2 text-sm underline hover:text-red-800"
              >
                Try again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading services...</p>
            </div>
          )}

          {/* Services Table - Only show when not loading and no error */}
          {!isLoading && !error && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              {/* Fixed Width Table Container */}
              <div className="w-full overflow-hidden">
                <div className="min-w-0">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Details
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {services.map((service, index) => (
                        <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center justify-center">
                              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold mr-3">
                                {index + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="min-w-0">
                              <div className="text-gray-900 font-medium truncate">{service.name}</div>
                              {service.description && (
                                <div className="text-gray-600 text-sm mt-1 truncate max-w-62.5">
                                  {service.description}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {service.category || 'Uncategorized'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                service.isActive
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              } transition-colors`}
                            >
                              {service.isActive ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Inactive
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-gray-600 text-sm">
                              {formatDate(service.created_at)}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => router.push(`/admin/services/edit/${service.id}`)}
                                className="p-2 text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors"
                                title="Edit Service"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-2 text-red-600 hover:bg-red-50 cursor-pointer rounded-lg transition-colors"
                                title="Delete Service"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {services.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600 mb-6">Add your first service to get started</p>
                  <Link
                    href="/admin/services/add"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Service
                  </Link>
                </div>
              )}

              {/* Table Footer */}
              {services.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {services.length} service{services.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Stats */}
          {!isLoading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Active Services</h3>
                <p className="text-3xl font-bold text-blue-900">
                  {services.filter(s => s.isActive).length}
                </p>
                <p className="text-sm text-blue-600 mt-2">Currently available for children</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Total Services</h3>
                <p className="text-3xl font-bold text-green-900">{services.length}</p>
                <p className="text-sm text-green-600 mt-2">Across all categories</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}