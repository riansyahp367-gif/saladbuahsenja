import Navbar from "../components/layout/Navbar";
import Footer from "../components/home/Footer";
import Menu from "../components/home/Menu";

export default function MenuPage() {
  return (
    <>
      <Navbar />

      <main className="bg-pink-50 min-h-screen pt-10">

        <div className="text-center py-16">

          <span className="bg-pink-100 text-pink-600 px-5 py-2 rounded-full font-semibold">
            🥗 Menu Lengkap
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-gray-900">
            Semua Menu Salad Buah Senja
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            Pilih ukuran dan varian favoritmu.
          </p>

        </div>

        <Menu />

      </main>

      <Footer />

    </>
  );
}