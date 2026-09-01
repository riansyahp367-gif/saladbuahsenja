import Container from "../ui/Container";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function Menu() {
  return (
    <section
      id="menu"
      className="bg-white py-20 md:py-24"
    >
      <Container>

        {/* Judul Section */}
        <div className="mx-auto mb-12 max-w-2xl text-center">

          <span className="inline-flex items-center rounded-full bg-pink-100 px-5 py-2 text-sm font-bold text-pink-600">
            🍓 Menu Favorit
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            Salad Premium{" "}
            <span className="text-pink-600">
              Pilihan
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500 md:text-lg">
            Nikmati berbagai varian Salad Buah Senja dengan buah segar,
            saus creamy premium, dan taburan keju melimpah.
          </p>

        </div>

        {/* Product Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
            xl:gap-8
          "
        >

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </Container>
    </section>
  );
}