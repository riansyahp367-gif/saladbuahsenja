import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Menu from "./components/home/Menu";
import Features from "./components/home/Features";
import Promo from "./components/home/Promo";
import Testimonials from "./components/home/Testimonials";
import Gallery from "./components/home/Gallery";
import Footer from "./components/home/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-pink-50">
        <Hero />
        <Menu />
        <Features />
        <Promo />
        <Testimonials />
        <Gallery />
        <Footer />
      </main>

      <FloatingWhatsApp />
    </>
  );
}