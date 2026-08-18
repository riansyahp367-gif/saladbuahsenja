import Container from "../ui/Container";
import HeroContent from "./Hero/HeroContent";
import HeroImage from "./Hero/HeroImage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20 lg:py-28">
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-pink-200/30 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-pink-100/30 blur-[140px]" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <HeroContent />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
}