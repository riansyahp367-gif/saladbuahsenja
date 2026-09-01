import Container from "../ui/Container";

export default function Promo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600 py-20 lg:py-24">

      {/* Decorative blur */}
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <Container>

        <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-white p-8 text-center shadow-2xl sm:p-12 lg:p-16">

          {/* Badge */}
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-600">
            🎉 Promo Hari Ini
          </span>

          {/* Heading */}
          <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Beli 3 Cup
          </h2>

          <h3 className="mt-2 text-4xl font-black text-pink-600 sm:text-5xl">
            Hemat 10%
          </h3>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Nikmati promo spesial untuk pembelian minimal 3 cup
            <span className="font-semibold text-pink-600">
              {" "}Salad Buah Senja.
            </span>{" "}
            Cocok untuk keluarga, teman kantor, atau acara spesial.
          </p>

          {/* Promo info */}
          <div className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-3">

            <div className="rounded-xl bg-pink-50 px-5 py-3">
              <p className="text-xs text-gray-500">
                Minimal Pembelian
              </p>
              <p className="mt-1 font-black text-pink-600">
                3 Cup
              </p>
            </div>

            <div className="rounded-xl bg-pink-50 px-5 py-3">
              <p className="text-xs text-gray-500">
                Keuntungan
              </p>
              <p className="mt-1 font-black text-pink-600">
                Hemat 10%
              </p>
            </div>

          </div>

          {/* CTA */}
          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan%20promo."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center justify-center rounded-2xl bg-pink-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-pink-700 hover:shadow-xl sm:px-10 sm:text-lg"
          >
            🍓 Klaim Promo Sekarang
          </a>

          <p className="mt-4 text-xs text-gray-400">
            Hubungi kami melalui WhatsApp untuk melakukan pemesanan.
          </p>

        </div>

      </Container>
    </section>
  );
}