import Image from "next/image";

type ProductCardProps = {
  title: string;
  flavor: string;
  size: string;
  price: string;
  image: string;
  badge?: string;
};

export default function ProductCard({
  title,
  flavor,
  size,
  price,
  image,
  badge,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Gambar */}
      <div className="relative overflow-hidden">

        {badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-pink-600 px-3 py-1 text-xs font-bold text-white shadow">
            {badge}
          </span>
        )}

        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      {/* Konten */}
      <div className="p-6">

        <p className="text-sm font-semibold text-pink-600">
          {flavor}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-500">
          Ukuran {size}
        </p>

        <div className="mt-6 flex items-center justify-between">

          <span className="text-3xl font-extrabold text-pink-600">
            {price}
          </span>

          <div className="text-yellow-400">
            ⭐⭐⭐⭐⭐
          </div>

        </div>

        <a
          href="https://wa.me/6281314720307?text=Halo%20Salad%20Buah%20Senja,%20saya%20ingin%20memesan."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block rounded-2xl bg-pink-600 py-3 text-center font-semibold text-white transition hover:bg-pink-700"
        >
          Pesan Sekarang
        </a>

      </div>

    </div>
  );
}