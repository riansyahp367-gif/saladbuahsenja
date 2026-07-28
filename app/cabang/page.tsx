import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";

const branches = [
  {
    name: "Salad Buah Senja Tanjung Barangan",
    address:
      "Jl. Tanjung Bubuk, Tanjung Barangan, Bukit Baru, Palembang",
  },
  {
    name: "Salad Buah Senja UIN",
    address:
      "Jl. Rawa Jaya, Belakang Kampus UIN, Kemuning, Palembang",
  },
  {
    name: "Salad Buah Senja Musi 6",
    address:
      "Jl. Walikota H. Husni, 3–4 Ulu, Palembang",
  },
  {
    name: "Salad Buah Senja Plaju",
    address:
      "Jl. KH. Balqi, Plaju, Palembang",
  },
];

export default function CabangPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-pink-50">

        <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-20 text-center text-white">
          <h1 className="text-5xl font-extrabold">
            Cabang Salad Buah Senja
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Temukan cabang Salad Buah Senja terdekat dan nikmati salad buah
            premium favoritmu.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">

          <div className="grid gap-8 md:grid-cols-2">

            {branches.map((branch) => (
              <div
                key={branch.name}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-pink-600">
                  🍓 {branch.name}
                </h2>

                <p className="mt-5 leading-7 text-gray-600">
                  📍 {branch.address}
                </p>

                <p className="mt-4 text-gray-600">
                  🕘 Buka setiap hari<br />
                  09.00 – 21.00 WIB
                </p>

                <div className="mt-8 flex flex-col gap-3">

                  <a
                    href="https://wa.me/6281314720307"
                    target="_blank"
                    className="rounded-xl bg-pink-600 py-3 text-center font-semibold text-white hover:bg-pink-700"
                  >
                    💬 Pesan via WhatsApp
                  </a>

                  <a
                    href="#"
                    className="rounded-xl border border-pink-600 py-3 text-center font-semibold text-pink-600 hover:bg-pink-50"
                  >
                    📍 Lihat Google Maps
                  </a>

                </div>
              </div>
            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}