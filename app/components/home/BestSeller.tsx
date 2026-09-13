import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../ProductCard";
import { products } from "@/app/data/products";

export default function BestSeller() {
  const bestSeller = [
    products.find((product) =>
      product.name.toLowerCase().includes("original")
    ),

    products.find((product) =>
      product.name.toLowerCase().includes("mangga")
    ),

    products.find((product) =>
      product.name.toLowerCase().includes("strawberry") ||
      product.name.toLowerCase().includes("stroberi")
    ),
  ].filter(Boolean);

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-24">
      <Container>

        <SectionTitle
          badge="🔥 Menu Favorit"
          title="Best Seller"
          highlight="Pelanggan"
          description="Tiga varian salad buah favorit yang paling cocok untuk menikmati kesegaran Salad Buah Senja."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {bestSeller.map((product) => (
            <ProductCard
              key={product!.id}
              product={product!}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}