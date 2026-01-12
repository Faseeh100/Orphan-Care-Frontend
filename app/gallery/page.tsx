import GalleryHero from "./galleryhero"
import GallerySection from "./gallerySection"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export default function Gallery(){
    return (
        <>
            <Navbar />
            <GalleryHero />
            <GallerySection />
            <Footer />
        </>
    )
}