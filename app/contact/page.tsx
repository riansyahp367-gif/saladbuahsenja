import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

export const metadata: Metadata = {
  title: "Kontak Salad Buah Senja Palembang",
  description:
    "Hubungi Salad Buah Senja di Palembang melalui WhatsApp dan media sosial resmi. Lihat jam operasional, informasi pemesanan, dan lokasi 4 cabang Salad Buah Senja.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kontak Salad Buah Senja | Palembang",
    description:
      "Hubungi Salad Buah Senja untuk pemesanan salad buah premium, informasi produk, promo, dan lokasi cabang di Palembang.",
    url: "/contact",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">
        {/* HERO */}
        <section
          aria-labelledby="contact-heading"
          className="mx-auto max-w-5xl px-6 py-20 text-center"
        >
          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            📞 Hubungi Kami
          </span>

          <h1
            id="contact-heading"
            className="mt-6 text-5xl font-extrabold text-gray-900"
          >
            Kontak Salad Buah Senja Palembang
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
            Hubungi Salad Buah Senja melalui WhatsApp atau media sosial resmi
            kami untuk pemesanan, informasi menu, promo, dan kebutuhan lainnya.
          </p>
        </section>

        {/* CONTACT CARDS */}
        <section
          aria-labelledby="contact-info-heading"
          className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-2"
        >
          {/* CONTACT INFO */}
          <article className="rounded-3xl bg-white p-8 shadow-xl">
            <h2
              id="contact-info-heading"
              className="mb-8 text-3xl font-bold text-gray-900"
            >
              Informasi Kontak
            </h2>

            <div className="space-y-6 text-lg text-gray-700">
              <p>
                📞 WhatsApp
                <br />
                <strong className="text-gray-900">0813-1472-0307</strong>
              </p>

              <p>
                📸 Instagram
                <br />
                <strong className="text-gray-900">@saladbuahsenja</strong>
              </p>

              <p>
                🎵 TikTok
                <br />
                <strong className="text-gray-900">@saladbuahsenja</strong>
              </p>

              <p>
                🕒 Jam Operasional
                <br />
                <strong className="text-gray-900">
                  09.00 - 21.00 WIB
                </strong>
              </p>

              <p>
                🚗 GrabFood
                <br />
                <strong className="text-gray-900">
                  Salad Buah Senja
                </strong>
              </p>

              <p>
                🛵 ShopeeFood
                <br />
                <strong className="text-gray-900">
                  Salad Buah Senja
                </strong>
              </p>
            </div>
          </article>

          {/* LOCATION */}
          <article className="rounded-3xl bg-white p-8 shadow-xl">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">
              Lokasi Salad Buah Senja
            </h2>

            <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50">
              <div className="px-6 text-center">
                <div className="text-4xl">📍</div>

                <p className="mt-3 font-semibold text-gray-700">
                  4 Cabang Salad Buah Senja
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Temukan alamat dan Google Maps setiap outlet Salad Buah Senja
                  di halaman cabang.
                </p>

                <Link
                  href="/cabang"
                  className="mt-5 inline-block rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
                >
                  Lihat Semua Cabang
                </Link>
              </div>
            </div>

            <a
              href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20bertanya."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-2xl bg-pink-600 py-4 text-center text-lg font-bold text-white transition hover:bg-pink-700"
            >
              Chat via WhatsApp
            </a>
          </article>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Mau Pesan Salad Buah Senja?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Lihat pilihan menu salad buah premium kami atau cek promo terbaru
              sebelum melakukan pemesanan.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Lihat Menu
              </Link>

              <Link
                href="/promo"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Lihat Promo
              </Link>

              <Link
                href="/cabang"
                className="rounded-xl border border-pink-200 bg-white px-7 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                Lihat Cabang
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}