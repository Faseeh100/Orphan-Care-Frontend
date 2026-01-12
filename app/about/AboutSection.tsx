import { Heart, Users, Home, Shield } from 'lucide-react'

interface Program {
  id: number
  title: string
  description: string
  icon: string
  isActive: boolean
}

interface Stat {
  key: string
  value: string
  label: string
}

// Icon mapping function
function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    Education: '🎓',
    Health: '🏥',
    Food: '🍎',
    Home: '🏠',
    Training: '🔧',
    Heart: '❤️',
    Book: '📚',
    Default: '🌟'
  }
  return icons[iconName] || icons.Default
}

// Function to get 4 lines from description
function getFourLines(description: string): string {
  const lines = description.split('\n').filter(line => line.trim() !== '')
  
  if (lines.length >= 4) {
    return lines.slice(0, 4).join(' ')
  }
  
  const sentences = description.split(/[.!?]+/).filter(s => s.trim() !== '')
  
  if (sentences.length >= 4) {
    return sentences.slice(0, 4).join('. ') + '.'
  }
  
  const words = description.split(' ')
  let result = ''
  let lineCount = 0
  
  for (let i = 0; i < words.length && lineCount < 4; i++) {
    result += words[i] + ' '
    if ((i + 1) % 15 === 0) {
      lineCount++
    }
  }
  
  return result.trim() + (lineCount >= 4 ? '...' : '')
}

// Get color based on even/odd index
function getCardColor(index: number): string {
  return index % 2 === 0 
    ? 'bg-purple-50 border-purple-100 hover:border-purple-300'
    : 'bg-blue-50 border-blue-100 hover:border-blue-300'
}

// Get icon color based on even/odd index
function getIconColor(index: number): string {
  return index % 2 === 0 
    ? 'text-purple-600'
    : 'text-blue-600'
}

// Fetch programs
async function getDynamicPrograms(): Promise<Program[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      return result.data
        .filter((program: Program) => program.isActive)
        .slice(0, 4)
    } else {
      throw new Error(`API returned error: ${result.message}`)
    }
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

// Fetch stats from backend
async function getDynamicStats(): Promise<Stat[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
      cache: 'no-store',
    })
    
    console.log('📡 About page fetching stats from backend...')
    
    if (!response.ok) {
      throw new Error(`Stats API Error: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('📊 Stats API response:', result)
    
    if (result.success && result.data) {
      console.log('✅ Stats loaded:', result.data)
      return result.data
    } else {
      console.log('❌ No stats data')
      return []
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return []
  }
}

// Get stat value with fallback
function getStatValue(stats: Stat[], key: string): string {
  const stat = stats.find(s => s.key === key)
  return stat ? stat.value : '--'
}

export default async function AboutSection() {
  console.log('🔄 AboutSection loading...')
  
  // Fetch both programs and stats in parallel
  const [programs, stats] = await Promise.all([
    getDynamicPrograms(),
    getDynamicStats()
  ])

  console.log('📊 Stats received:', stats)
  console.log('📋 Programs received:', programs.length)

  // Get stats values
  const childrenValue = getStatValue(stats, 'children_helped')
  const volunteersValue = getStatValue(stats, 'volunteers')
  const homesValue = getStatValue(stats, 'shelter_homes')
  const yearsValue = getStatValue(stats, 'years_service')

  const values = [
    {
      title: 'Our Mission',
      description: 'To provide orphaned children with a loving home, quality education, and the emotional support needed to build a bright future.',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Our Vision', 
      description: 'A world where every orphaned child has equal opportunities to thrive and become responsible, contributing members of society.',
      color: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Our Promise',
      description: 'To ensure every child in our care receives love, protection, education, and healthcare in a family-like environment.',
      color: 'bg-green-50 border-green-200'
    }
  ]

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">

      {/* Stats Section - DYNAMIC */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {/* Children Helped */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="text-purple-600 flex justify-center mb-3">
            <Heart className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {childrenValue}
          </div>
          <div className="text-gray-600 text-sm">
            Children Helped
          </div>
        </div>

        {/* Volunteers */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="text-purple-600 flex justify-center mb-3">
            <Users className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {volunteersValue}
          </div>
          <div className="text-gray-600 text-sm">
            Volunteers
          </div>
        </div>

        {/* Shelter Homes */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="text-purple-600 flex justify-center mb-3">
            <Home className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {homesValue}
          </div>
          <div className="text-gray-600 text-sm">
            Shelter Homes
          </div>
        </div>

        {/* Years of Service */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="text-purple-600 flex justify-center mb-3">
            <Shield className="w-8 h-8" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {yearsValue}
          </div>
          <div className="text-gray-600 text-sm">
            Years of Service
          </div>
        </div>
      </div>

      {/* Mission/Vision Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {values.map((item, index) => (
          <div key={index} className={`${item.color} border-2 p-6 rounded-xl`}>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Story Section */}
      <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Our Story
        </h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Founded in 2008, Orphan Care began with a simple mission: to rescue children from the streets 
            and provide them with a loving home. What started as a small shelter for 5 children has now grown 
            into a network of 12 homes across the region.
          </p>
          <p>
            Our founder, Mrs. Sarah Johnson, witnessed the plight of orphaned children while volunteering 
            at a local hospital. Moved by their struggles, she dedicated her life to creating a safe haven 
            where children could heal, learn, and dream.
          </p>
          <p>
            Today, we&apos;ve helped over 500 children find permanent homes, provided education to 300+ students, 
            and supported 200+ youths in vocational training programs.
          </p>
        </div>
      </div>

      {/* Programs Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Programs
        </h2>
        
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No programs available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div 
                key={program.id} 
                className={`${getCardColor(index)} border-2 p-6 rounded-xl transition-all 
                duration-300 hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className={`${getIconColor(index)} text-2xl flex items-center 
                    justify-center`}>
                      {getIcon(program.icon)}
                    </div>
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="h-14 flex items-start">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                        {program.title}
                      </h3>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                        {getFourLines(program.description)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}