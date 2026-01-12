'use client'

import { BookOpen, Palette, Music, Utensils, Volleyball, Microscope, Code, Heart } from 'lucide-react'


interface ActivityCategory {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  programsCount?: number
  colorClass: string
}

export default function ChildrenSection() {
  // Data for activity categories
  const activityCategories: ActivityCategory[] = [
    {
      id: 1,
      title: 'Reading & Literacy',
      description: 'Fostering a love for stories and building strong language skills through our library and reading programs.',
      icon: <BookOpen className="w-8 h-8" />,
      programsCount: 3,
      colorClass: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Arts & Crafts',
      description: 'Encouraging creativity and self-expression through painting, drawing, pottery, and various craft projects.',
      icon: <Palette className="w-8 h-8" />,
      programsCount: 5,
      colorClass: 'bg-purple-100 text-purple-600'
    },
    {
      id: 3,
      title: 'Music & Performance',
      description: 'Developing rhythm, confidence, and teamwork through singing, instrument lessons, and dance.',
      icon: <Music className="w-8 h-8" />,
      programsCount: 4,
      colorClass: 'bg-pink-100 text-pink-600'
    },
    {
      id: 4,
      title: 'Sports & Athletics',
      description: 'Promoting physical health, teamwork, and discipline through football, basketball, yoga, and outdoor games.',
      icon: <Volleyball className="w-8 h-8" />,
      programsCount: 6,
      colorClass: 'bg-green-100 text-green-600'
    },
    {
      id: 5,
      title: 'Life Skills & Cooking',
      description: 'Learning practical skills for independence, including basic cooking, nutrition, and household management.',
      icon: <Utensils className="w-8 h-8" />,
      programsCount: 2,
      colorClass: 'bg-amber-100 text-amber-600'
    },
    {
      id: 6,
      title: 'STEM Learning',
      description: 'Exploring science, technology, engineering, and math through fun experiments and interactive projects.',
      icon: <Microscope className="w-8 h-8" />,
      programsCount: 4,
      colorClass: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 7,
      title: 'Technology & Coding',
      description: 'Building digital literacy and problem-solving skills with computer basics and introductory coding.',
      icon: <Code className="w-8 h-8" />,
      programsCount: 3,
      colorClass: 'bg-cyan-100 text-cyan-600'
    },
    {
      id: 8,
      title: 'Emotional Well-being',
      description: 'Activities focused on mindfulness, emotional expression, and building resilience in a supportive setting.',
      icon: <Heart className="w-8 h-8" />,
      programsCount: 4,
      colorClass: 'bg-rose-100 text-rose-600'
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Children&apos;s</span> World
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We nurture holistic development through diverse programs. Here are the key areas where our 
            children learn, grow, and discover their talents in a safe and supportive environment.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activityCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-200
              hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl mb-4 ${category.colorClass}`}>
                {category.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action / Additional Note */}
        <div className="mt-16 text-center p-8 bg-linear-to-r from-blue-50 to-cyan-50 rounded-3xl border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supporting Holistic Growth
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Our programs are designed to ensure every child has opportunities to explore their interests, 
            develop new skills, and build confidence for the future. We focus on creating a balanced 
            environment for education, creativity, physical health, and emotional well-being.
          </p>
        </div>
      </div>
    </div>
  )
}