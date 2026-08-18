import Image from "next/image";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const gallery = [
  "/images/products/original-200.jpg",
  "/images/products/mangga-200.jpg",
  "/images/products/strawberry-200.jpg",
  "/images/products/original-200.jpg",
  "/images/products/mangga-200.jpg",
  "/images/products/strawberry-200.jpg",
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="bg-pink-50 py-24"
    >
      <Container>

        <SectionTitle
          badge="📷 Gallery"
          title="Lihat Kesegaran"
          highlight="Produk Kami"
          description="Dibuat dari buah segar pilihan dengan tampilan premium yang menggugah selera."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {gallery.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-square overflow-hidden">

                <Image
                  src={image}
                  alt="Gallery Salad Buah Senja"
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

              </div>
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}