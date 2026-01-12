'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pathname === '/admin') {
      setActiveTab('dashboard');
    } else if (pathname.startsWith('/admin/services')) {
      setActiveTab('services');
    } else if (pathname.startsWith('/admin/gallery')) {
      setActiveTab('gallery');
    } else if (pathname.startsWith('/admin/users')) {
      setActiveTab('users');
    } else if (pathname.startsWith('/admin/programs')) {
      setActiveTab('programs');
    }
  }, [pathname]);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        router.replace('/login');
        return false;
      }
      
      setIsLoading(false);
      return true;
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content - Centered when sidebar is hidden on mobile */}
        <div className="flex-1 w-full md:w-[calc(100%-16rem)] md:ml-64">
          <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-7xl p-4 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}