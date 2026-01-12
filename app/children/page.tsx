import ChildrenHero from './ChildrenHero'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChildrenSection from './ChildrenSection'



export default function page() {
  return (
    <div>
        <Navbar />
        <ChildrenHero />
        <ChildrenSection />
        <Footer />
    </div>
  )
}
