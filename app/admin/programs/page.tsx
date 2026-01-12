'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Program {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface Stat {
  key: string;
  value: string;
  label: string;
}

function StatsManagementSection() {
  
  const statOrder = [
    'children_helped',
    'volunteers', 
    'shelter_homes',
    'years_service'
  ];
  
  // Initialize with correct order
  const [stats, setStats] = useState<Stat[]>(() => 
    statOrder.map(key => ({
      key,
      value: '',
      label: key === 'children_helped' ? 'Children Helped' :
             key === 'volunteers' ? 'Volunteers' :
             key === 'shelter_homes' ? 'Shelter Homes' :
             'Years of Service'
    }))
  );
  
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsMessage, setStatsMessage] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('📡 Fetching stats from backend...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const result = await response.json();
      console.log('📊 Backend response:', result);
      
      if (result.success && result.data && result.data.length > 0) {
        console.log('✅ Stats loaded from database:', result.data);
        
        // Create a map of fetched stats for easy lookup
        const fetchedStatsMap = new Map();
        result.data.forEach((stat: Stat) => {
          fetchedStatsMap.set(stat.key, stat);
        });
        
        // Create new stats array in correct order with fetched values
        const orderedStats = statOrder.map(key => {
          const fetchedStat = fetchedStatsMap.get(key);
          return {
            key,
            value: fetchedStat ? fetchedStat.value.replace('+', '') : '',
            label: key === 'children_helped' ? 'Children Helped' :
                   key === 'volunteers' ? 'Volunteers' :
                   key === 'shelter_homes' ? 'Shelter Homes' :
                   'Years of Service'
          };
        });
        
        setStats(orderedStats);
      } else {
        console.log('⚠️ No stats in database, keeping empty fields');
        // Keep the initial ordered empty fields
      }
      setHasLoaded(true);
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      setHasLoaded(true);
    }
  };

  const handleStatChange = (index: number, value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], value };
    setStats(newStats);
  };

  const handleUpdateStats = async () => {
    const hasEmpty = stats.some(stat => stat.value.trim() === '');
    if (hasEmpty) {
      setStatsMessage('❌ Please fill in all fields');
      return;
    }

    setLoadingStats(true);
    setStatsMessage('');
    
    try {
      const dataToSend = stats.map(stat => ({
        key: stat.key,
        value: stat.value.trim(),
        label: stat.label
      }));
      
      console.log('📤 Sending to backend:', dataToSend);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      
      console.log('📥 Response status:', response.status);
      
      const result = await response.json();
      console.log('📦 Backend result:', result);
      
      if (result.success) {
        setStatsMessage('✅ Statistics saved successfully!');
        await fetchStats();
    

        setTimeout(() => {
          setStatsMessage('');
        }, 2000);
      } else {
        setStatsMessage(`❌ Error: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setStatsMessage('❌ Failed to save. Check backend connection.');
    } finally {
      setLoadingStats(false);
    }
  };

  const getPreviewValue = (stat: Stat) => {
    const value = stat.value.trim();
    if (!value) return '--';
    
    const num = parseInt(value);
    if (isNaN(num)) return 'Invalid';
    
    if (stat.key === 'children_helped' || stat.key === 'volunteers') {
      if (num >= 50) {
        const rounded = Math.floor(num / 50) * 50;
        return `${rounded}+`;
      }
      return num.toString();
    } 
    else if (stat.key === 'years_service') {
      if (num >= 5) {
        const rounded = Math.floor(num / 5) * 5;
        return `${rounded}+`;
      }
      return num.toString();
    }
    // For shelter_homes - exact number
    return num.toString();
  };

  // Render stats in correct order
  const orderedStats = stats.sort((a, b) => {
    return statOrder.indexOf(a.key) - statOrder.indexOf(b.key);
  });

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Website Statistics</h2>
          <p className="text-gray-600">Update numbers to display on page</p>
        </div>
        <button
          onClick={handleUpdateStats}
          disabled={loadingStats}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer
          flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loadingStats ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Statistics'
          )}
        </button>
      </div>

      {statsMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          statsMessage.includes('✅') 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <div className="flex justify-between items-center">
            <span>{statsMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orderedStats.map((stat, index) => (
          <div key={stat.key} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {stat.label}
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={stat.value}
                onChange={(e) => handleStatChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter number"
                min="0"
                required
              />
              <div className="text-sm text-gray-600 min-w-25">
                <div className="text-gray-500">Will show:</div>
                <div className="font-bold text-green-700 text-lg">
                  {getPreviewValue(stat)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const router = useRouter();

  // Filter programs based on status
  const filteredPrograms = programs.filter(program => {
    if (filter === 'all') return true;
    if (filter === 'active') return program.isActive;
    if (filter === 'inactive') return !program.isActive;
    return true;
  });

  // Fetch programs from backend
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/admin`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setPrograms(result.data);
      } else {
        console.error('API error:', result.message);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      alert('Failed to load programs. Please check if backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgram = () => {
    router.push('/admin/programs/new');
  };

  const handleEditProgram = (id: number) => {
    router.push(`/admin/programs/edit/${id}`);
  };

  const handleDeleteProgram = async (id: number) => {
    if (!confirm('Are you sure you want to delete this program? This action cannot be undone.')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/admin/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPrograms(programs.filter(program => program.id !== id));
        alert('Program deleted successfully!');
      } else {
        alert(`Failed to delete program: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Error deleting program. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
        <p className="text-gray-600">Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programs Management</h1>
          <p className="text-gray-600">Manage orphanage programs displayed on the website</p>
        </div>
        <button
          onClick={handleAddProgram}
          className="bg-purple-600 hover:bg-purple-700 text-white sm:px-4 sm:py-2.5 rounded-lg flex 
          items-center sm:gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Program
        </button>
      </div>

      {/* Stats Management Section */}
      <StatsManagementSection />

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Programs</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{programs.filter(p => p.isActive).length} Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>{programs.filter(p => !p.isActive).length} Inactive</span>
            </div>
          </div>
        </div>
        
        <div className="flex border-b">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              filter === 'all' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Programs ({programs.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              filter === 'active' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active ({programs.filter(p => p.isActive).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              filter === 'inactive' 
                ? 'text-purple-600 border-b-2 border-purple-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inactive ({programs.filter(p => !p.isActive).length})
          </button>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4 text-6xl">📋</div>
            <p className="text-gray-500 text-lg mb-2">
              {filter === 'all' 
                ? 'No programs found' 
                : filter === 'active' 
                  ? 'No active programs' 
                  : 'No inactive programs'
              }
            </p>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start by adding programs for the orphanage.' 
                : filter === 'active' 
                  ? 'All programs are currently inactive.' 
                  : 'All programs are currently active.'
              }
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                View all programs →
              </button>
            )}
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-700 text-sm font-medium">
                  <th className="py-3 px-6 font-semibold w-1/4">Program Name</th>
                  <th className="py-3 px-6 font-semibold w-2/4">Details</th>
                  <th className="py-3 px-6 font-semibold w-1/6">Status</th>
                  <th className="py-3 px-6 font-semibold w-1/6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrograms.map((program) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                    {/* Program Name Column */}
                    <td className="py-4 px-6 w-1/4">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{program.title}</h3>
                        </div>
                      </div>
                    </td>
                    
                    {/* Details Column */}
                    <td className="py-4 px-6 w-2/4">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {program.description}
                      </p>
                    </td>
                    
                    {/* Status Column */}
                    <td className="py-4 px-6 w-1/6">
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          program.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {program.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="py-4 px-6 w-1/6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEditProgram(program.id)}
                          className="p-1.5 bg-blue-50 text-blue-600 cursor-pointer rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit Program"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="p-1.5 bg-red-50 text-red-600 cursor-pointer rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete Program"
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
        )}
      </div>
    </div>
  );
}