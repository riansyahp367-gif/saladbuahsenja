import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function MenuGrid() {
  return (
    <section
      id="menu"
      className="bg-white py-16"
    >

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            🍓 Menu Favorit
          </span>

          <h2 className="mt-5 text-4xl font-black text-gray-900 md:text-5xl">
            Salad Premium{" "}
            <span className="text-pink-600">
              Pilihan
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Nikmati berbagai pilihan menu Salad Buah Senja
            dengan buah segar, saus creamy premium, dan
            rasa yang bikin nagih.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

      </div>

    </section>
  );
}