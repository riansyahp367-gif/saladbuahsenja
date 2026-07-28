import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

export default function MemberPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            🎁 Program Member
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Member Salad Buah Senja
          </h1>

          <p className="mt-5 text-lg text-gray-500">
            Belanja lebih hemat dan kumpulkan poin setiap transaksi.
          </p>

        </section>

        {/* Card Point */}

        <section className="mx-auto max-w-6xl px-6 pb-20">

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <h2 className="text-3xl font-bold text-center">
              Cara Mendapatkan Poin
            </h2>

            <div className="mt-10 grid gap-8 md:grid-cols-3">

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">🛍️</div>

                <h3 className="mt-5 text-2xl font-bold">
                  Belanja
                </h3>

                <p className="mt-3 text-gray-500">
                  Setiap transaksi senilai Rp1.000 mendapatkan <strong>1 poin</strong>.
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">⭐</div>

                <h3 className="mt-5 text-2xl font-bold">
                  Kumpulkan
                </h3>

                <p className="mt-3 text-gray-500">
                  Semakin sering belanja, semakin banyak poin yang terkumpul.
                </p>

              </div>

              <div className="rounded-2xl bg-pink-50 p-8 text-center">

                <div className="text-5xl">🎉</div>

                <h3 className="mt-5 text-2xl font-bold">
                  Tukarkan
                </h3>

                <p className="mt-3 text-gray-500">
                  100 poin dapat ditukar dengan <strong>1 cup Salad Buah Senja ukuran 200 ml</strong>.
                </p>

              </div>

            </div>

            <div className="mt-12 rounded-3xl bg-pink-600 p-10 text-center text-white">

              <h2 className="text-4xl font-bold">
                Rp1.000 = 1 Poin
              </h2>

              <p className="mt-4 text-xl">
                Kumpulkan 100 poin dan nikmati hadiah gratis dari kami.
              </p>

            </div>

            <div className="mt-12 rounded-3xl border border-pink-200 bg-pink-50 p-8">

              <h3 className="text-2xl font-bold">
                Cara Menjadi Member
              </h3>

              <ol className="mt-5 list-decimal space-y-3 pl-6 text-gray-700">
                <li>Belanja di salah satu cabang Salad Buah Senja.</li>
                <li>Daftarkan nomor WhatsApp kamu kepada kasir.</li>
                <li>Poin akan dicatat setiap transaksi.</li>
                <li>Tukarkan poin ketika sudah memenuhi syarat.</li>
              </ol>

            </div>

            <a
              href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20bergabung%20menjadi%20member."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block rounded-2xl bg-pink-600 py-4 text-center text-xl font-bold text-white transition hover:bg-pink-700"
            >
              Daftar Member Sekarang
            </a>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}