import Container from "../ui/Container";
import HeroContent from "./Hero/HeroContent";
import HeroImage from "./Hero/HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 pt-32 pb-20 lg:pt-36 lg:pb-28">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-pink-200/30 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-pink-100/40 blur-[140px]" />

      <Container>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Hero Text */}
          <HeroContent />

          {/* Hero Image */}
          <HeroImage />

        </div>

      </Container>

    </section>
  );
}