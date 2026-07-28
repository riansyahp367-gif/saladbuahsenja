import Image from "next/image";
import Container from "../ui/Container";

const images = [
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
  "/images/hero-premium.jpg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-24">
      <Container>

        <div className="text-center">

          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            📸 Galeri Produk
          </span>

          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Salad Buah Yang Menggugah Selera
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Dibuat dari buah segar pilihan dengan saus premium dan keju
            melimpah di setiap cup.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {images.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl shadow-lg"
            >
              <Image
                src={image}
                alt={`Gallery ${index + 1}`}
                width={600}
                height={600}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}