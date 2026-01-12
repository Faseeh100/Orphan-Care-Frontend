import AboutHero from './AboutHero'
import AboutSection from './AboutSection'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Orphan Care Foundation',
  description: 'Learn about our mission, vision, and impact in transforming lives of orphaned children',
  keywords: ['orphan care', 'children charity', 'nonprofit', 'education', 'healthcare'],
  openGraph: {
    title: 'About Our Foundation',
    description: '15+ years of service helping 500+ children find homes and education',
    type: 'website',
  },
}

export default async function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHero />
      <AboutSection />
      <Footer />
    </>
  )
}