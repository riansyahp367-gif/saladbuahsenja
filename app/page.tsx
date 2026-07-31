import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import Menu from "./components/home/Menu";
import Features from "./components/home/Features";
import Promo from "./components/home/Promo";
import Testimonials from "./components/home/Testimonials";
import Gallery from "./components/home/Gallery";
import Footer from "./components/home/Footer";
import MemberRewards from "./components/home/MemberRewards";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-pink-50">
        <Hero />
        <Stats />
          <Features />
        <Menu />
         <MemberRewards />
        <Promo />
        <Testimonials />
        <Gallery />
        <Footer />
      </main>

      <FloatingWhatsApp />
    </>
  );
}