import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            📞 Hubungi Kami
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Kami Siap Melayani Anda
          </h1>

          <p className="mt-5 text-lg text-gray-500">
            Hubungi Salad Buah Senja melalui WhatsApp atau media sosial resmi kami.
          </p>

        </section>

        {/* Contact Card */}

        <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-2">

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold">
              Informasi Kontak
            </h2>

            <div className="space-y-6 text-lg">

              <p>📞 WhatsApp<br /><strong>0813-1472-0307</strong></p>

              <p>📸 Instagram<br /><strong>@saladbuahsenja</strong></p>

              <p>🎵 TikTok<br /><strong>@saladbuahsenja</strong></p>

              <p>🕒 Jam Operasional<br /><strong>09.00 - 21.00 WIB</strong></p>

              <p>🚗 GrabFood<br /><strong>Salad Buah Senja</strong></p>

              <p>🛵 ShopeeFood<br /><strong>Salad Buah Senja</strong></p>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl">

            <h2 className="mb-8 text-3xl font-bold">
              Lokasi
            </h2>

            <div className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50">

              <p className="text-center text-gray-500">
                📍 Google Maps akan ditambahkan di sini
              </p>

            </div>

            <a
              href="https://wa.me/6281314720307"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-2xl bg-pink-600 py-4 text-center text-lg font-bold text-white transition hover:bg-pink-700"
            >
              Chat via WhatsApp
            </a>

          </div>

        </section>

      </main>

      <Footer />

    </>
  );
}