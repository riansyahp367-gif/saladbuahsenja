import Button from "../../ui/Button";

export default function HeroContent() {
  return (
    <div className="flex flex-col justify-center">

      {/* Badge */}
      <div className="inline-flex w-fit items-center rounded-full border border-pink-200 bg-white/80 px-5 py-2 text-sm font-semibold text-pink-600 shadow-lg backdrop-blur-md">
        🍓 Premium Fruit Salad
      </div>

      {/* Heading */}
      <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-tight text-gray-900 lg:text-7xl">
        Segarnya Buah,
        <br />

        <span className="bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 bg-clip-text text-transparent">
          Istimewanya Saus.
        </span>

      </h1>

      {/* Description */}
      <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
        Dibuat dari buah segar pilihan, saus creamy premium, dan taburan
        keju melimpah. Nikmati sensasi salad buah yang lebih segar,
        lebih creamy, dan bikin nagih di setiap gigitan.
      </p>

      {/* CTA */}
      <div className="mt-10 flex flex-wrap gap-4">

        <Button
          href="https://wa.me/6281314720307"
          variant="whatsapp"
          size="lg"
        >
          🍓 Pesan Sekarang
        </Button>

        <Button
          href="#menu"
          variant="secondary"
          size="lg"
        >
          📋 Lihat Menu
        </Button>

      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">

        <div className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <p className="text-3xl font-black text-pink-600">
            ⭐ 4.9
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Rating Pelanggan
          </p>

        </div>

        <div className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <p className="text-3xl font-black text-pink-600">
            🥗 Fresh
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Dibuat Setiap Hari
          </p>

        </div>

        <div className="rounded-3xl border border-pink-100 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <p className="text-3xl font-black text-pink-600">
            🎁 Reward
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Point Setiap Belanja
          </p>

        </div>

      </div>

    </div>
  );
}