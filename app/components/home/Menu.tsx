import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../ProductCard";
import { products } from "@/app/data/products";

export default function Menu() {
  return (
    <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
      <Container>
        <SectionTitle
          badge="🍓 Menu Favorit"
          title="Pilih Varian"
          highlight="Favoritmu"
          description="Tiga varian premium dengan pilihan ukuran yang bisa disesuaikan dengan kebutuhanmu."
        />

        <div className="grid gap-8 lg:grid-cols-3">
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