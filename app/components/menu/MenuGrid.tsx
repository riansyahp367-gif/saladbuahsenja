import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function MenuGrid() {
  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-white py-20"
    >
      {/* Background dekorasi */}
      <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-pink-100/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-96 h-72 w-72 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50 px-5 py-2 text-xs font-bold text-pink-600 shadow-sm">
            🍓 Menu Favorit
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Salad Premium{" "}
            <span className="text-pink-600">
              Pilihan
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Nikmati berbagai pilihan menu Salad Buah Senja
            dengan buah segar, saus creamy premium,
            dan taburan keju melimpah.
          </p>

        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 text-center">

          <p className="mb-4 text-sm text-slate-500">
            Mau pesan untuk acara atau jumlah banyak?
          </p>

          <a
            href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20pesan%20untuk%20acara."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            💬 Pesan untuk Acara
          </a>

        </div>

      </div>
    </section>
  );
}