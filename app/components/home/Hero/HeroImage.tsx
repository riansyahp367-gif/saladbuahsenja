import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute h-[520px] w-[520px] rounded-full bg-pink-300/30 blur-3xl" />

      <div className="absolute h-[420px] w-[420px] rounded-full border border-pink-200/50 bg-white/20 backdrop-blur-xl" />

      {/* Floating Fruit */}
      <div className="absolute left-0 top-10 animate-bounce text-5xl">
        🍓
      </div>

      <div className="absolute right-4 top-20 animate-pulse text-5xl">
        🥭
      </div>

      <div className="absolute bottom-12 left-8 animate-bounce text-4xl">
        🥝
      </div>

      <div className="absolute bottom-8 right-10 animate-pulse text-4xl">
        🧀
      </div>

      {/* Product */}
      <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white p-5 shadow-[0_25px_80px_rgba(236,72,153,0.35)] transition-all duration-700 hover:-translate-y-2 hover:scale-105">

        <Image
          src="/images/hero-premium.jpg"
          alt="Salad Buah Senja"
          width={650}
          height={650}
          priority
          className="rounded-[28px] object-cover"
        />

      </div>

      {/* Floating Card */}
      <div className="absolute -left-4 bottom-10 rounded-3xl border border-pink-100 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">

        <p className="text-2xl font-black text-pink-600">
          ⭐ 4.9
        </p>

        <p className="text-sm text-gray-500">
          Customer Rating
        </p>

      </div>

      {/* Floating Card */}
      <div className="absolute -right-5 top-12 rounded-3xl border border-pink-100 bg-white/90 px-5 py-4 shadow-xl backdrop-blur-md">

        <p className="text-2xl font-black text-pink-600">
          🥗 Fresh
        </p>

        <p className="text-sm text-gray-500">
          Every Day
        </p>

      </div>

    </div>
  );
}