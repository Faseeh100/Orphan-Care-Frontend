'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Loader, AlertCircle, GraduationCap, Home, Users, Shield, Utensils, Briefcase, Book } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services ONLY from backend
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch services`);
        }
        
        const result = await response.json();
        
        if (result.success && Array.isArray(result.services)) {
          // Get only ACTIVE services
          const activeServices = result.services
            .filter((service: Service) => service.isActive === true)
            .slice(0, 3);
          
          setServices(activeServices);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load services');
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Icons array - will cycle through these
  const serviceIcons = [
    <GraduationCap className="w-12 h-12" />,
    <Home className="w-12 h-12" />,
    <Users className="w-12 h-12" />,
    <Shield className="w-12 h-12" />,
    <Utensils className="w-12 h-12" />,
    <Briefcase className="w-12 h-12" />,
    <Book className="w-12 h-12" />,
    <Heart className="w-12 h-12" />
  ];

  // Colors for cards
  const cardStyles = [
    { bg: 'bg-blue-50', border: 'border-blue-200', iconColor: 'text-blue-600' },
    { bg: 'bg-green-50', border: 'border-green-200', iconColor: 'text-green-600' },
    { bg: 'bg-purple-50', border: 'border-purple-200', iconColor: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen max-w-7xl bg-linear-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-blue-600 mr-3" />
            <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
              Our Commitment
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-blue-600">Services</span> We Provide
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive services designed to nurture, protect, and empower 
            every child in our care.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {/* Services Cards WITH ICONS */}
        {!isLoading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const style = cardStyles[index % cardStyles.length];
              const icon = serviceIcons[index % serviceIcons.length];
              
              return (
                <div 
                  key={service.id}
                  className={`${style.bg} ${style.border} border rounded-3xl p-8 
                    shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {/* Lucide React Icon */}
                  <div className={`w-20 h-20 ${style.bg} rounded-2xl flex items-center 
                    justify-center mb-6 border ${style.border}`}>
                    <div className={style.iconColor}>
                      {icon}
                    </div>
                  </div>
                  
                  {/* Service Name - FROM DATABASE */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.name}
                  </h3>
                  
                  {/* Service Description - FROM DATABASE */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && services.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No active services available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}