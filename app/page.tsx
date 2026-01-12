import Navbar from "@/components/Navbar"
import Info from "@/components/Info"
import Message from "@/components/Message"
import Services from "@/components/Services";
import Footer from "@/components/Footer"


export default function Home() {
  return (
    <>
      <Navbar />
      <Info />
      <Message />
      <Services />
      <Footer />
    </>
  );
}