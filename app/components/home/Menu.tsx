import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function Menu() {
  return (
    <section
      id="menu"
      className="bg-white py-24"
    >
      <Container>

        <SectionTitle
          badge="🍓 Menu Favorit"
          title="Salad Premium"
          highlight="Pilihan"
          description="Nikmati berbagai varian Salad Buah Senja dengan buah segar, saus creamy premium, dan taburan keju melimpah."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

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