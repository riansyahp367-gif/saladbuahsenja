import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../ProductCard";
import { products } from "@/app/data/products";

export default function BestSeller() {
  const bestSeller = [
    products[0], // Original
    products[3], // Oreo Cheese
    products[5], // Sandwich
  ].filter(Boolean);

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-24">

      <Container>

        <SectionTitle
          badge="🔥 Menu Favorit"
          title="Best Seller"
          highlight="Pelanggan"
          description="Menu yang paling sering dipesan pelanggan Salad Buah Senja."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {bestSeller.map((product) => (
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