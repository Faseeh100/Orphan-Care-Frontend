'use client';

import { useState, useEffect } from 'react';

interface DatabaseStat {
  key: string;
  value: string;
  label: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success || !Array.isArray(result.data)) {
        throw new Error('Invalid data format');
      }

      const statsObj: Record<string, number> = {};
      
      result.data.forEach((stat: DatabaseStat) => {
        const cleanValue = stat.value.replace('+', '');
        const numValue = parseInt(cleanValue);
        
        if (!isNaN(numValue)) {
          statsObj[stat.key] = numValue;
        }
      });
      
      setStats(statsObj);
    } catch (err: any) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatStatValue = (value: number, key: string): string => {
    if ((key === 'children_helped' || key === 'volunteers') && value >= 50) {
      return `${Math.floor(value / 50) * 50}+`;
    } 
    if (key === 'years_service' && value >= 5) {
      return `${Math.floor(value / 5) * 5}+`;
    }
    return value.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Loading statistics...</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Administrator</p>
        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            Error: {error}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition
            cursor-pointer"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-blue-800 h-14 mb-2">Total Children</h3>
            <p className="text-3xl font-bold text-blue-900">
              {stats.children_helped ? formatStatValue(stats.children_helped, 'children_helped') : '--'}
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-green-800 h-14 mb-2">Active Volunteers</h3>
            <p className="text-3xl font-bold text-green-900">
              {stats.volunteers ? formatStatValue(stats.volunteers, 'volunteers') : '--'}
            </p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="text-lg font-semibold text-purple-800 h-14 mb-2">Years of Experience</h3>
            <p className="text-3xl font-bold text-purple-900">
              {stats.years_service ? formatStatValue(stats.years_service, 'years_service') : '--'}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-yellow-800 h-14 mb-2">Shelter Homes</h3>
            <p className="text-3xl font-bold text-yellow-900">
              {stats.shelter_homes || '--'}
            </p>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Message</h3>
          <p className="text-gray-700">
            Welcome to the Orphan Care Admin Dashboard. Here you can manage all aspects 
            of our organization including children's records, volunteer management, 
            donations tracking, and service updates.
          </p>
        </div>
      </div>
    </div>
  );
}