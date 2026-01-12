'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProgramPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const params = useParams();
  const programId = params.id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Education',
    isActive: true,
  });

  // Fetch program data
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/admin/${programId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
          setFormData(result.data);
        } else {
          alert('Program not found: ' + result.message);
          router.push('/admin/programs');
        }
      } catch (error) {
        console.error('Error fetching program:', error);
        alert('Failed to load program. Please check if backend is running.');
        router.push('/admin/programs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProgram();
  }, [programId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/admin/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Program updated successfully!');
        router.push('/admin/programs');
      } else {
        alert('Failed to update program: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error updating program');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const getIconEmoji = (iconName: string) => {
    const icons: Record<string, string> = {
      Education: '🎓',
      Health: '🏥',
      Food: '🍎',
      Home: '🏠',
      Training: '🔧',
      Heart: '❤️',
      Book: '📚',
    };
    return icons[iconName] || '🌟';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl cursor-pointer font-bold text-gray-900">Back Program</h1>
          <p className="text-gray-600">Update program details</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Program Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Educational Support Program"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe the program details, goals, and impact..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="Education">🎓 Education</option>
                <option value="Health">🏥 Health & Medical</option>
                <option value="Food">🍎 Nutrition & Food</option>
                <option value="Home">🏠 Shelter & Home</option>
                <option value="Training">🔧 Vocational Training</option>
                <option value="Heart">❤️ Emotional Support</option>
                <option value="Book">📚 Learning & Development</option>
              </select>
            </div>
          </div>

          {/* Active/Inactive Checkbox */}
          <div className="flex items-start p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                id="isActive"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="isActive" className="font-medium text-gray-900">
                Program Status
              </label>
              <p className="text-sm text-gray-600">
                {formData.isActive 
                  ? '✓ This program will be visible on the public website' 
                  : '✗ This program will be hidden from the public website'}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-blue-900 mb-4">Preview</h3>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">
                {getIconEmoji(formData.icon)}
              </span>
              <div>
                <h4 className="font-semibold text-lg">{formData.title || 'Program Title'}</h4>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded ${
                    formData.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {formData.description || 'Program description...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}