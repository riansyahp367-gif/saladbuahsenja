import ProductCard from "../ProductCard";

const products = [
  {
    title: "Salad Original",
    flavor: "Original",
    size: "200 ml",
    price: "Rp 10.000",
    image: "/images/hero-premium.jpg",
    badge: "Best Seller",
  },
  {
    title: "Salad Original",
    flavor: "Original",
    size: "300 ml",
    price: "Rp 15.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Original",
    flavor: "Original",
    size: "500 ml",
    price: "Rp 25.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Mangga Mayo",
    flavor: "Mangga Mayo",
    size: "200 ml",
    price: "Rp 10.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Mangga Mayo",
    flavor: "Mangga Mayo",
    size: "300 ml",
    price: "Rp 15.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Mangga Mayo",
    flavor: "Mangga Mayo",
    size: "500 ml",
    price: "Rp 25.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Strawberry Mayo",
    flavor: "Strawberry Mayo",
    size: "200 ml",
    price: "Rp 10.000",
    image: "/images/hero-premium.jpg",
    badge: "Favorit",
  },
  {
    title: "Salad Strawberry Mayo",
    flavor: "Strawberry Mayo",
    size: "300 ml",
    price: "Rp 15.000",
    image: "/images/hero-premium.jpg",
  },
  {
    title: "Salad Strawberry Mayo",
    flavor: "Strawberry Mayo",
    size: "500 ml",
    price: "Rp 25.000",
    image: "/images/hero-premium.jpg",
  },
];

export default function MenuGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
}