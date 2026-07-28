import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

const promos = [
  {
    title: "🎉 Promo Member",
    description:
      "Setiap belanja Rp1.000 mendapatkan 1 poin. Kumpulkan 100 poin dan tukarkan dengan 1 Salad Buah Senja ukuran 200 ml GRATIS.",
    status: "Berlaku Setiap Hari",
  },
  {
    title: "🥗 Promo Bundling",
    description:
      "Beli 2 Salad ukuran 300 ml, hemat lebih banyak. Promo berlaku selama persediaan masih ada.",
    status: "Promo Terbatas",
  },
  {
    title: "🎂 Promo Ulang Tahun",
    description:
      "Rayakan ulang tahun bersama Salad Buah Senja. Tunjukkan identitasmu dan dapatkan promo spesial.",
    status: "Syarat & Ketentuan Berlaku",
  },
];

export default function PromoPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-20 text-center text-white">
          <h1 className="text-5xl font-extrabold">
            Promo Salad Buah Senja
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Nikmati berbagai promo menarik dan jangan lewatkan kesempatan
            mendapatkan keuntungan lebih setiap kali berbelanja.
          </p>
        </section>

        {/* Promo Card */}
        <section className="mx-auto max-w-6xl px-6 py-16">

          <div className="grid gap-8 md:grid-cols-3">

            {promos.map((promo) => (
              <div
                key={promo.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-pink-600">
                  {promo.title}
                </h2>

                <p className="mt-5 leading-7 text-gray-600">
                  {promo.description}
                </p>

                <span className="mt-6 inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
                  {promo.status}
                </span>

                <a
                  href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20klaim%20promo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block rounded-xl bg-pink-600 py-3 text-center font-semibold text-white transition hover:bg-pink-700"
                >
                  Klaim Promo
                </a>
              </div>
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}