import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Stats from "./components/home/Stats";
import BestSeller from "./components/home/BestSeller";
import Features from "./components/home/Features";
import Menu from "./components/home/Menu";
import MemberRewards from "./components/home/MemberRewards";
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

        <Stats />

        <BestSeller />

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