import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

export default function ContactPage() {
  return (
    <div>
        <Navbar />
        <ContactHero />
        <ContactForm />
        <Footer />
    </div>
  );
}