import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";
import Menu from "../components/home/Menu";

export const metadata: Metadata = {
  title: "Menu Salad Buah Premium Palembang",
  description:
    "Lihat menu lengkap Salad Buah Senja di Palembang. Pilihan salad buah premium dengan buah segar, saus creamy, keju, dan berbagai varian favorit. Tersedia ukuran 200 ml, 300 ml, dan 500 ml.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu Salad Buah Premium Palembang | Salad Buah Senja",
    description:
      "Temukan menu lengkap Salad Buah Senja dengan pilihan salad buah premium, buah segar, saus creamy, keju, dan berbagai varian favorit.",
    url: "/menu",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MenuPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50 pt-10">
        <section
          aria-labelledby="menu-heading"
          className="text-center py-16"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            🥗 Menu Lengkap
          </span>

          <h1
            id="menu-heading"
            className="mt-6 text-5xl font-extrabold text-gray-900"
          >
            Menu Salad Buah Premium di Palembang
          </h1>

          <p className="mx-auto mt-4 max-w-2xl px-6 text-lg text-gray-500">
            Pilih ukuran dan varian favoritmu dari menu Salad Buah Senja.
            Tersedia salad buah dengan buah segar dan saus creamy premium.
          </p>
        </section>

        <Menu />

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Mau Pesan Salad Buah Senja?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Nikmati salad buah premium dengan buah pilihan dan saus creamy
              khas Salad Buah Senja. Cek promo terbaru atau temukan cabang
              terdekat di Palembang.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Pesan Sekarang
              </a>

              <Link
                href="/cabang"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Lihat Cabang
              </Link>

              <Link
                href="/promo"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Lihat Promo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}