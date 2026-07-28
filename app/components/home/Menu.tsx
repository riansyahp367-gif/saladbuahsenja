import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function Menu() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="text-center mb-14">
        <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full font-semibold">
          🍓 Menu Favorit
        </span>

        <h2 className="text-5xl font-bold text-gray-800 mt-6">
          Pilihan Favorit Hari Ini
        </h2>

        <p className="text-gray-500 mt-4 text-lg">
          Dibuat dari buah segar pilihan dengan saus premium yang creamy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            flavor={product.flavor}
            size={product.size}
            price={product.price}
            image={product.image}
            badge={product.badge}
          />
        ))}
      </div>

    </section>
  );
}