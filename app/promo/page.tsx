import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

export const metadata: Metadata = {
  title: "Promo Salad Buah Palembang",
  description:
    "Dapatkan promo Salad Buah Senja di Palembang. Nikmati promo member, bundling salad buah, promo ulang tahun, dan berbagai keuntungan menarik setiap kali berbelanja.",
  alternates: {
    canonical: "/promo",
  },
  openGraph: {
    title: "Promo Salad Buah Senja | Promo Salad Buah Palembang",
    description:
      "Nikmati berbagai promo menarik Salad Buah Senja di Palembang, mulai dari promo member, bundling hingga promo ulang tahun.",
    url: "/promo",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
        {/* HERO */}
        <section
          aria-labelledby="promo-heading"
          className="bg-gradient-to-r from-pink-500 to-pink-600 py-20 text-center text-white"
        >
          <h1
            id="promo-heading"
            className="text-5xl font-extrabold"
          >
            Promo Salad Buah Senja
          </h1>

          <p className="mx-auto mt-6 max-w-2xl px-6 text-lg">
            Nikmati promo salad buah menarik di Palembang dan dapatkan
            keuntungan lebih setiap kali berbelanja di Salad Buah Senja.
          </p>
        </section>

        {/* PROMO CARDS */}
        <section
          aria-labelledby="promo-list-heading"
          className="mx-auto max-w-6xl px-6 py-16"
        >
          <div className="mb-12 text-center">
            <h2
              id="promo-list-heading"
              className="text-3xl font-extrabold text-gray-900"
            >
              Promo Terbaru Salad Buah Senja
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              Pilih promo favoritmu dan nikmati salad buah premium dengan
              penawaran yang lebih hemat.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {promos.map((promo) => (
              <article
                key={promo.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-2xl font-bold text-pink-600">
                  {promo.title}
                </h3>

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
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Siap Nikmati Salad Buah Senja?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Lihat menu lengkap kami atau temukan cabang Salad Buah Senja
              terdekat di Palembang.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Lihat Menu
              </Link>

              <Link
                href="/cabang"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Lihat Cabang
              </Link>

              <Link
                href="/member"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Program Member
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}