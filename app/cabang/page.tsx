import type { Metadata } from "next";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";
import LocalFAQ from "../components/home/LocalFAQ";
import { branches } from "../data/branches";

export const metadata: Metadata = {
  title: "Cabang Salad Buah Senja di Palembang",
  description:
    "Temukan 4 cabang Salad Buah Senja di Palembang. Lihat alamat, jam operasional, Google Maps, dan pesan WhatsApp untuk outlet Tanjung Barangan, Musi 6, Plaju Banten, dan UIN Palembang.",
  alternates: {
    canonical: "/cabang",
  },
  openGraph: {
    title: "Cabang Salad Buah Senja di Palembang",
    description:
      "Temukan 4 outlet Salad Buah Senja di Palembang lengkap dengan alamat, jam operasional, Google Maps, dan kontak WhatsApp.",
    url: "/cabang",
    siteName: "Salad Buah Senja",
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CabangPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@graph": branches.map((branch) => ({
      "@type": "Restaurant",
      name: branch.name,
      description:
        "Salad buah premium, dessert, dan fruit sandwich dengan bahan pilihan dan dibuat fresh setiap hari.",
      telephone: `+${branch.whatsapp}`,
      url: "https://saladbuahsenja-web.vercel.app/cabang",
      address: {
        "@type": "PostalAddress",
        streetAddress: branch.address,
        addressLocality: branch.city,
        addressRegion: branch.province,
        postalCode: branch.postalCode,
        addressCountry: "ID",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: branch.openingHours,
          closes: branch.closingHours,
        },
      ],
      hasMap: branch.googleMaps,
      servesCuisine: [
        "Fruit Salad",
        "Dessert",
        "Fruit Sandwich",
      ],
      priceRange: "Rp",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <Navbar />

      <main className="min-h-screen bg-pink-50">
        {/* HERO */}
        <section
          aria-labelledby="cabang-heading"
          className="bg-gradient-to-r from-pink-500 to-pink-600 py-20 text-center text-white"
        >
          <div className="mx-auto max-w-4xl px-6">
            <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
              📍 4 Outlet di Palembang
            </span>

            <h1
              id="cabang-heading"
              className="mt-6 text-4xl font-extrabold md:text-5xl"
            >
              Cabang Salad Buah Senja di Palembang
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-pink-50">
              Temukan outlet Salad Buah Senja terdekat dan nikmati
              salad buah premium, dessert, dan fruit sandwich favoritmu
              di berbagai lokasi Palembang.
            </p>
          </div>
        </section>

        {/* BRANCHES */}
        <section
          aria-labelledby="branches-heading"
          className="mx-auto max-w-6xl px-6 py-16"
        >
          <div className="mb-12 text-center">
            <h2
              id="branches-heading"
              className="text-3xl font-extrabold text-gray-900"
            >
              Outlet Salad Buah Senja
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              Pilih cabang yang paling dekat dengan lokasimu untuk
              melihat alamat, jam operasional, Google Maps, dan kontak
              WhatsApp.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="rounded-3xl border border-pink-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Branch Name */}
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-2xl">
                    🍓
                  </div>

                  <div>
                    <h3 className="text-xl font-bold leading-7 text-gray-900">
                      {branch.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-pink-600">
                      Salad Buah Senja
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-6 rounded-2xl bg-pink-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    📍 Alamat
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {branch.address}
                  </p>
                </div>

                {/* Opening Hours */}
                <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    🕐 Jam Operasional
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    Setiap hari
                  </p>

                  <p className="mt-1 font-semibold text-pink-600">
                    {branch.openingHours} – {branch.closingHours} WIB
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-pink-600 py-3 text-center font-semibold text-white transition hover:bg-pink-700"
                  >
                    💬 Pesan WhatsApp
                  </a>

                  <a
                    href={branch.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-pink-600 py-3 text-center font-semibold text-pink-600 transition hover:bg-pink-50"
                  >
                    📍 Google Maps
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* LOCAL FAQ */}
        <LocalFAQ />
      </main>

      <Footer />
    </>
  );
}