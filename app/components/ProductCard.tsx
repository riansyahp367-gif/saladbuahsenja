"use client";

import { useState } from "react";

type ProductSize = {
  id: string;
  label: string;
  volume: string;
  price: number;
  points: number;
  package: string;
  image: string;
};

type Product = {
  id: string;
  name: string;
  badge: string;
  rating: number;
  description: string;
  sizes: ProductSize[];
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* FOTO PRODUK */}
      <div className="relative h-[250px] w-full overflow-hidden bg-pink-50">

        <img
          src={selectedSize.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />

        {/* BADGE */}
        <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-pink-600 shadow-md">
          {product.badge}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-pink-600 px-4 py-2 text-xs font-bold text-white shadow-md">
          BEST SELLER
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* RATING */}
        <div className="mb-2 text-sm">
          <span className="text-yellow-500">★</span>{" "}
          <span className="font-bold">{product.rating}</span>
          <span className="text-gray-400"> /5</span>
        </div>

        {/* NAME */}
        <h3 className="text-xl font-black text-gray-900">
          {product.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="mt-2 min-h-[55px] text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        {/* UKURAN */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold text-gray-700">
            Pilih Ukuran
          </p>

          <div className="flex flex-wrap gap-2">

            {product.sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  selectedSize.id === size.id
                    ? "border-pink-600 bg-pink-600 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-pink-400"
                }`}
              >
                {size.label}
                <span className="ml-1 block text-[10px] opacity-80">
                  {size.volume}
                </span>
              </button>
            ))}

          </div>
        </div>

        {/* PACKAGE + POINT */}
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-pink-50 p-4">

          <div>
            <p className="text-[10px] text-gray-500">
              Kemasan
            </p>

            <p className="text-sm font-bold text-gray-800">
              📦 {selectedSize.package}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-gray-500">
              Reward
            </p>

            <p className="text-sm font-bold text-pink-600">
              🎁 +{selectedSize.points} Point
            </p>
          </div>

        </div>

        {/* HARGA */}
        <div className="mt-5 rounded-2xl bg-gradient-to-r from-pink-600 to-pink-500 p-5 text-white shadow-md">

          <p className="text-xs">
            Mulai dari
          </p>

          <p className="mt-1 text-3xl font-black">
            Rp {formatPrice(selectedSize.price)}
          </p>

        </div>

        {/* FRESH */}
        <div className="mt-4 rounded-xl bg-green-50 py-3 text-center text-xs font-semibold text-green-600">
          🕒 Dibuat Fresh Setiap Hari
        </div>

        {/* ORDER */}
        <button
          onClick={() => {
            const message = `Halo Salad Buah Senja 👋%0ASaya mau pesan:%0A%0A${product.name}%0AUkuran: ${selectedSize.label} (${selectedSize.volume})%0AHarga: Rp ${formatPrice(selectedSize.price)}`;

            window.open(
              `https://wa.me/6281314720307?text=${message}`,
              "_blank"
            );
          }}
          className="mt-3 w-full rounded-xl bg-pink-600 py-3 text-sm font-bold text-white transition hover:bg-pink-700"
        >
          🛍️ Pesan Sekarang
        </button>

      </div>
    </div>
  );
}